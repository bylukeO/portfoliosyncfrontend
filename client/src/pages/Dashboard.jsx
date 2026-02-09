import { useState, useEffect, useCallback, useRef } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';
import ScanProgress from '../components/ScanProgress';
import ScanResults from '../components/ScanResults';
import ActivityLog from '../components/ActivityLog';
import RepoSelection from '../components/RepoSelection';
import { Button, Card } from '../components/ui';

export default function Dashboard() {
  const toast = useToast();
  const [lastScan, setLastScan] = useState(null);
  const [latestResult, setLatestResult] = useState(null);
  const [scans, setScans] = useState([]);
  const [scansLoading, setScansLoading] = useState(true);
  const [scanning, setScanning] = useState(false);
  const [scanType, setScanType] = useState(null); // 'quick' or 'full'
  const [currentScanId, setCurrentScanId] = useState(null);
  const [scanStatus, setScanStatus] = useState(null); // 'pending', 'processing', 'completed', 'failed'
  const [confirmPopup, setConfirmPopup] = useState(null); // For full scan confirmation
  const pollingIntervalRef = useRef(null);
  
  // NEW: State for accurate PR tracking and activity feed
  const [prStats, setPrStats] = useState({
    totalPRs: 0,
    totalScansWithPRs: 0,
    loading: true
  });
  const [portfolioStats, setPortfolioStats] = useState({
    totalRepos: 0,
    loading: true
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [activityLoading, setActivityLoading] = useState(true);

  // Fetch all scans
  const fetchScans = useCallback(async () => {
    try {
      const { data } = await api.get('/scans');
      // API returns: { success: true, results: [...] }
      const list = data.results || [];
      setScans(list);
      if (list.length > 0) {
        const latest = list[0];
        setLastScan(latest.scanned_at || latest.created_at || new Date().toISOString());
        // Only set latest result if not currently scanning or if scan is completed
        if (!scanning || latest.status === 'completed' || latest.status === 'failed') {
          setLatestResult(latest);
        }
      }
    } catch (error) {
      console.error('Error fetching scans:', error);
      // Endpoint may not exist yet — silently fail
    } finally {
      setScansLoading(false);
    }
  }, [scanning]);
  
  // NEW: Fetch accurate PR statistics
  const fetchPRStats = useCallback(async () => {
    try {
      const { data } = await api.get('/user/prs');
      setPrStats({
        totalPRs: data.total_prs || 0,
        totalScansWithPRs: data.total_scans_with_prs || 0,
        loading: false
      });
    } catch (error) {
      console.error('Error fetching PR stats:', error);
      // Fall back to calculating from scans if endpoint doesn't exist
      const totalPRs = scans.reduce((sum, scan) => {
        const prUrls = scan.pr_urls || [];
        return sum + prUrls.length;
      }, 0);
      setPrStats({
        totalPRs,
        totalScansWithPRs: scans.filter(s => s.pr_urls && s.pr_urls.length > 0).length,
        loading: false
      });
    }
  }, [scans]);
  
  // NEW: Fetch portfolio repository statistics
  const fetchPortfolioStats = useCallback(async () => {
    try {
      const { data } = await api.get('/user/portfolio-repos');
      setPortfolioStats({
        totalRepos: data.total_repos || 0,
        loading: false
      });
    } catch (error) {
      console.error('Error fetching portfolio stats:', error);
      // Fall back to calculating from scan data
      const reposAddedSet = new Set();
      scans.forEach(scan => {
        const reposAdded = scan.repos_added_to_pr || [];
        reposAdded.forEach(repo => reposAddedSet.add(repo));
      });
      setPortfolioStats({
        totalRepos: reposAddedSet.size,
        loading: false
      });
    }
  }, [scans]);
  
  // NEW: Fetch recent activity
  const fetchActivity = useCallback(async () => {
    try {
      const { data } = await api.get('/activity?limit=10');
      setRecentActivity(data.activities || []);
      setActivityLoading(false);
    } catch (error) {
      console.error('Error fetching activity:', error);
      setActivityLoading(false);
    }
  }, []);

  // Poll scan status
  const pollScanStatus = useCallback(async (scanId) => {
    try {
      const { data } = await api.get(`/scans/${scanId}`);
      // API returns: { success: true, result: { id, status, new_repos, processed_repos, pr_urls, ... } }
      const scanData = data.result || data;
      
      setScanStatus(scanData.status);
      
      // If awaiting_selection, stop polling and show selection UI
      if (scanData.status === 'awaiting_selection') {
        clearInterval(pollingIntervalRef.current);
        pollingIntervalRef.current = null;
        setScanning(false);
        setLatestResult(scanData);
        setLastScan(scanData.scanned_at || new Date().toISOString());
        
        const qualifiedCount = scanData.processed_repos?.length || 0;
        toast(`✓ ${qualifiedCount} repositories qualified for your portfolio. Select which ones to add!`, 'info');
        
        setScanType(null);
        // Refresh the scans list
        fetchScans();
        return;
      }
      
      // If completed or failed, stop polling
      if (scanData.status === 'completed' || scanData.status === 'failed') {
        clearInterval(pollingIntervalRef.current);
        pollingIntervalRef.current = null;
        setScanning(false);
        setLatestResult(scanData);
        setLastScan(scanData.scanned_at || new Date().toISOString());
        
        if (scanData.status === 'completed') {
          const newCount = scanData.new_repos?.length || 0;
          const processedCount = scanData.processed_repos?.length || 0;
          const prCount = scanData.pr_urls?.length || 0;
          
          if (prCount > 0) {
            // Full scan completed with PR created
            toast(`🎉 Full scan complete! ${processedCount} repos added to portfolio. ${prCount} PR created!`, 'success');
          } else {
            toast(`Scan completed! Found ${newCount} new repos, ${processedCount} qualified for portfolio.`, 'success');
          }
        } else {
          toast('Scan failed. Please check your settings and try again.', 'error');
        }
        
        setScanType(null);
        // Refresh the scans list
        fetchScans();
      }
    } catch (error) {
      console.error('Error polling scan status:', error);
      // If scan not found or error, stop polling
      if (error.response?.status === 404 || error.response?.status === 401) {
        clearInterval(pollingIntervalRef.current);
        pollingIntervalRef.current = null;
        setScanning(false);
        setScanType(null);
        toast('Scan error occurred. Please try again.', 'error');
      }
    }
  }, [fetchScans, toast]);

  // Start polling
  const startPolling = useCallback((scanId) => {
    // Clear any existing polling
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
    }
    
    // Poll immediately
    pollScanStatus(scanId);
    
    // Then poll every 2 seconds
    pollingIntervalRef.current = setInterval(() => {
      pollScanStatus(scanId);
    }, 2000);
  }, [pollScanStatus]);

  // Cleanup polling on unmount
  useEffect(() => {
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchScans();
  }, [fetchScans]);
  
  // NEW: Fetch tracking data when scans are loaded
  useEffect(() => {
    if (scans.length > 0 && !scansLoading) {
      fetchPRStats();
      fetchPortfolioStats();
    }
  }, [scans, scansLoading, fetchPRStats, fetchPortfolioStats]);
  
  // NEW: Fetch activity feed on mount
  useEffect(() => {
    fetchActivity();
  }, [fetchActivity]);

  // Run scan (supports both quick and full scan)
  const runScan = async (type = 'quick', forceContinue = false) => {
    setScanning(true);
    setScanType(type);
    setScanStatus('pending');
    setLatestResult(null);

    try {
      // Determine endpoint based on scan type
      const endpoint = type === 'full' ? '/scan/trigger/full' : '/scans/trigger';
      
      // Build request body for full scan
      const body = type === 'full' && forceContinue ? { force_continue: true } : {};
      
      // Trigger the scan - API returns:
      // { success: true, message: "...", scan_id: "..." }
      // OR for full scan with confirmation needed: { success: true, action: "confirm_required", prompt: {...} }
      // OR for full scan with selection needed: { scanId, status: "awaiting_selection", action: "selection_required", qualifiedRepos: [...], ... }
      const { data } = await api.post(endpoint, body);
      
      // Check if confirmation is required (no new repos found)
      if (data.action === 'confirm_required') {
        setScanning(false);
        setScanType(null);
        setScanStatus(null);
        setConfirmPopup(data.prompt);
        return;
      }
      
      // Check if selection is required (qualified repos ready)
      if (data.action === 'selection_required' && data.status === 'awaiting_selection') {
        setScanning(false);
        setScanType(null);
        setScanStatus('awaiting_selection');
        setCurrentScanId(data.scanId);
        
        // Build scan result object for selection UI
        const selectionScanData = {
          id: data.scanId,
          status: 'awaiting_selection',
          new_repos: data.newReposFound ? [] : [], // New repos already evaluated
          processed_repos: data.qualifiedRepos || [],
          skipped_repos: data.skippedRepos || [],
          pr_urls: [],
          scanned_at: new Date().toISOString()
        };
        
        setLatestResult(selectionScanData);
        setLastScan(selectionScanData.scanned_at);
        
        const qualifiedCount = data.qualifiedRepos?.length || 0;
        toast(`✓ ${qualifiedCount} repositories qualified! Select which ones to add to your portfolio.`, 'info');
        
        // Refresh the scans list
        fetchScans();
        return;
      }
      
      const scanId = data.scan_id || data.scanId;
      
      if (type === 'full') {
        // Full scan runs in background - show immediate feedback
        toast('🚀 Full AI scan triggered! This may take 2-5 minutes...', 'success');
        
        if (scanId) {
          setCurrentScanId(scanId);
          // Start polling for status
          startPolling(scanId);
        } else {
          // No scan_id returned for full scan (runs async)
          // Refresh scans list after a delay
          setTimeout(() => {
            fetchScans();
            setScanning(false);
            setScanType(null);
          }, 5000);
        }
      } else {
        // Quick scan - poll for results
        if (!scanId) {
          throw new Error('No scan ID returned from server');
        }
        
        setCurrentScanId(scanId);
        toast('Scan initiated. Polling for results...', 'info');
        
        // Start polling for status
        startPolling(scanId);
      }
    } catch (err) {
      console.error('Scan trigger error:', err);
      setScanning(false);
      setScanType(null);
      setScanStatus(null);
      
      // Check for specific error messages
      const errorMsg = err.response?.data?.error || err.response?.data?.message || 'Failed to trigger scan. Please try again.';
      
      if (errorMsg.toLowerCase().includes('settings')) {
        toast('⚠️ Please configure your portfolio settings first!', 'warning');
      } else {
        toast(errorMsg, 'error');
      }
    }
  };

  // Handle confirmation popup response
  const handleConfirmation = async (optionId) => {
    if (optionId === 'cancel') {
      setConfirmPopup(null);
      toast('Scan cancelled.', 'info');
      return;
    }

    if (optionId === 'continue_anyway') {
      setConfirmPopup(null);
      // Trigger full scan with force_continue
      runScan('full', true);
    }
  };

  // Handle repo selection completion (PR created)
  const handleSelectionComplete = async (prData) => {
    // Clear the selection UI
    setLatestResult(null);
    setScanStatus(null);
    setCurrentScanId(null);
    
    // Refresh scans to show updated status
    await fetchScans();
    
    // NEW: Refresh tracking data after PR creation
    await fetchPRStats();
    await fetchPortfolioStats();
    await fetchActivity();
    
    // If there's a PR URL, show it
    if (prData.pr_url) {
      toast(`🔗 View PR: ${prData.pr_url}`, 'info');
    }
  };

  // Handle repo selection cancellation
  const handleSelectionCancel = () => {
    // Clear the selection UI
    setLatestResult(null);
    setScanStatus(null);
    setCurrentScanId(null);
    toast('Selection cancelled. You can run another scan anytime.', 'info');
  };

  // ESC key to close confirmation popup
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && confirmPopup) {
        handleConfirmation('cancel');
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [confirmPopup]);

  // Calculate dynamic stats from scans data
  const stats = {
    totalScans: scans.length,
    totalReposFound: scans.reduce((sum, scan) => sum + (scan.new_repos?.length || 0), 0),
    totalProcessed: scans.reduce((sum, scan) => sum + (scan.processed_repos?.length || 0), 0),
    totalSkipped: scans.reduce((sum, scan) => sum + (scan.skipped_repos?.length || 0), 0),
    completedScans: scans.filter(s => s.status === 'completed').length,
    failedScans: scans.filter(s => s.status === 'failed').length,
    processingScans: scans.filter(s => s.status === 'processing' || s.status === 'pending').length,
    // NEW: Use accurate PR count from tracking endpoint
    totalPRs: prStats.loading ? scans.reduce((sum, scan) => sum + (scan.pr_urls?.length || 0), 0) : prStats.totalPRs,
  };

  // Get current status
  const getCurrentStatus = () => {
    if (scanning) return { label: 'Scanning', color: 'text-[#4cc9f0]', pulse: true };
    if (stats.processingScans > 0) return { label: 'Processing', color: 'text-[#FFA500]', pulse: true };
    if (stats.failedScans > 0 && stats.completedScans === 0) return { label: 'Error', color: 'text-[#ff3366]', pulse: false };
    return { label: 'Online', color: 'text-[#39ff14]', pulse: false };
  };

  const currentStatus = getCurrentStatus();

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      {/* Status Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-2xl font-bold text-[#e8e8e8] uppercase tracking-wide">
              Dashboard
            </h2>
            <span className={`w-2 h-2 ${currentStatus.pulse ? 'animate-pulse' : ''} ${currentStatus.color.replace('text-', 'bg-')} shadow-[0_0_8px_rgba(57,255,20,0.6)]`} />
          </div>
          <p className="text-sm text-[#666666] font-mono">
            <span className="text-[#f72585]">&gt;</span>{' '}
            {lastScan
              ? `Last scan: ${new Date(lastScan).toLocaleString()}`
              : 'No scans yet // Awaiting initial sync'}
          </p>
        </div>
        
        {/* Scan Buttons */}
        <div className="flex items-center gap-3">
          {/* Quick Scan Button */}
          <Button
            variant="secondary"
            onClick={() => runScan('quick')}
            disabled={scanning}
            icon={
              scanning && scanType === 'quick' ? (
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="square" strokeLinejoin="miter" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              )
            }
          >
            {scanning && scanType === 'quick' ? 'Scanning...' : 'Quick Scan'}
          </Button>

          {/* Full AI Scan Button */}
          <button
            onClick={() => runScan('full')}
            disabled={scanning}
            className={`
              relative overflow-hidden flex items-center gap-2 px-5 py-2.5 
              font-bold uppercase tracking-wide text-sm transition-all
              border-2 border-[#f72585] 
              ${scanning && scanType === 'full' 
                ? 'bg-[#f72585]/20 text-[#f72585] cursor-wait' 
                : 'bg-gradient-to-r from-[#f72585] to-[#4cc9f0] text-[#0a0a0f] hover:shadow-[0_0_20px_rgba(247,37,133,0.5)] hover:scale-[1.02]'
              }
              disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none
            `}
          >
            {/* Animated background */}
            {!scanning && (
              <div className="absolute inset-0 bg-gradient-to-r from-[#f72585] via-[#4cc9f0] to-[#f72585] opacity-80 animate-pulse" 
                   style={{ backgroundSize: '200% 100%' }} />
            )}
            
            <span className="relative flex items-center gap-2">
              {scanning && scanType === 'full' ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  <span>AI Processing...</span>
                </>
              ) : (
                <>
                  <span className="text-base">🚀</span>
                  <span>Full Scan</span>
                  <span className="text-[10px] bg-[#0a0a0f]/30 px-1.5 py-0.5 rounded-sm">AI + PR</span>
                </>
              )}
            </span>
          </button>
        </div>
      </div>

      {/* Scan Type Info Banner */}
      {!scanning && (
        <div className="bg-[#0a0a0f] border border-[#2a2a4a] p-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 border border-[#4cc9f0] bg-[#4cc9f0]/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-[#4cc9f0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="square" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#4cc9f0] uppercase tracking-wider mb-1">Quick Scan</h4>
                <p className="text-[10px] text-[#666666] font-mono leading-relaxed">
                  Detects new repositories and compares with previous snapshot. Fast &amp; lightweight.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 border border-[#f72585] bg-[#f72585]/10 flex items-center justify-center flex-shrink-0">
                <span className="text-sm">🚀</span>
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#f72585] uppercase tracking-wider mb-1">Full Scan <span className="text-[8px] text-[#4cc9f0]">(AI + PR)</span></h4>
                <p className="text-[10px] text-[#666666] font-mono leading-relaxed">
                  AI analyzes READMEs, evaluates quality, generates portfolio entries &amp; creates PR. Takes 2-5 min.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Stats - Dynamic */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card variant="default" padding="md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border-2 border-[#4cc9f0] bg-[#0a0a0f] flex items-center justify-center">
              <svg className="w-5 h-5 text-[#4cc9f0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="square" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <div>
              <div className="text-[10px] text-[#666666] uppercase tracking-widest">Total Scans</div>
              <div className="text-xl font-bold text-[#e8e8e8]">{stats.totalScans}</div>
            </div>
          </div>
        </Card>

        <Card variant="default" padding="md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border-2 border-[#39ff14] bg-[#0a0a0f] flex items-center justify-center">
              <svg className="w-5 h-5 text-[#39ff14]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="square" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <div className="text-[10px] text-[#666666] uppercase tracking-widest">Qualified Repos</div>
              <div className="text-xl font-bold text-[#39ff14]">{stats.totalProcessed}</div>
            </div>
          </div>
        </Card>

        <Card variant="default" padding="md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border-2 border-[#f72585] bg-[#0a0a0f] flex items-center justify-center">
              <svg className="w-5 h-5 text-[#f72585]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="square" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757" />
              </svg>
            </div>
            <div>
              <div className="text-[10px] text-[#666666] uppercase tracking-widest">PRs Created</div>
              <div className="flex items-baseline gap-2">
                <div className="text-xl font-bold text-[#f72585]">{stats.totalPRs}</div>
                {!prStats.loading && prStats.totalScansWithPRs > 0 && (
                  <div className="text-[10px] text-[#666666] font-mono">
                    from {prStats.totalScansWithPRs} {prStats.totalScansWithPRs === 1 ? 'scan' : 'scans'}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>

        <Card variant="default" padding="md">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 border-2 ${currentStatus.color.replace('text-', 'border-')} bg-[#0a0a0f] flex items-center justify-center`}>
              <span className={`w-3 h-3 ${currentStatus.color.replace('text-', 'bg-')} ${currentStatus.pulse ? 'animate-pulse' : ''}`} />
            </div>
            <div>
              <div className="text-[10px] text-[#666666] uppercase tracking-widest">Status</div>
              <div className={`text-sm font-bold uppercase ${currentStatus.color}`}>{currentStatus.label}</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Secondary Stats Row */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-[#1a1a2e] border-2 border-[#2a2a4a] p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] text-[#666666] uppercase tracking-widest mb-1">New Repos Found</div>
              <div className="text-2xl font-bold text-[#4cc9f0]">{stats.totalReposFound}</div>
            </div>
            <svg className="w-8 h-8 text-[#4cc9f0]/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="square" strokeLinejoin="miter" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
        </div>

        <div className="bg-[#1a1a2e] border-2 border-[#2a2a4a] p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] text-[#666666] uppercase tracking-widest mb-1">Completed Scans</div>
              <div className="text-2xl font-bold text-[#39ff14]">{stats.completedScans}</div>
            </div>
            <svg className="w-8 h-8 text-[#39ff14]/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="square" strokeLinejoin="miter" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        <div className="bg-[#1a1a2e] border-2 border-[#2a2a4a] p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] text-[#666666] uppercase tracking-widest mb-1">Skipped Repos</div>
              <div className="text-2xl font-bold text-[#FFA500]">{stats.totalSkipped}</div>
            </div>
            <svg className="w-8 h-8 text-[#FFA500]/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="square" strokeLinejoin="miter" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
          </div>
        </div>
      </div>

      {/* Scan Progress */}
      {scanning && <ScanProgress status={scanStatus} scanType={scanType} />}
      
      {/* NEW: Recent Activity Feed */}
      {!scanning && recentActivity.length > 0 && (
        <div className="mb-8">
          <div className="text-xs font-bold text-[#666666] uppercase tracking-widest mb-4 flex items-center gap-2">
            <span className="text-[#4cc9f0]">//</span>
            Recent Activity
          </div>
          <div className="bg-[#1a1a2e] border-2 border-[#2a2a4a] overflow-hidden">
            <div className="max-h-64 overflow-y-auto">
              {activityLoading ? (
                <div className="p-4 text-center text-[#666666] font-mono text-sm">
                  Loading activity...
                </div>
              ) : (
                <div className="divide-y divide-[#2a2a4a]">
                  {recentActivity.map((activity, idx) => {
                    // Map event types to icons and colors
                    const eventConfig = {
                      scan_started: { icon: '▶', color: 'text-[#4cc9f0]', label: 'Scan Started' },
                      scan_completed: { icon: '✓', color: 'text-[#39ff14]', label: 'Scan Completed' },
                      scan_failed: { icon: '✕', color: 'text-[#ff3366]', label: 'Scan Failed' },
                      baseline_created: { icon: '★', color: 'text-[#FFA500]', label: 'Baseline Created' },
                      new_repo_detected: { icon: '+', color: 'text-[#4cc9f0]', label: 'New Repo Found' },
                      readme_quality_passed: { icon: '✓', color: 'text-[#39ff14]', label: 'README Passed' },
                      readme_quality_failed: { icon: '✕', color: 'text-[#ff3366]', label: 'README Failed' },
                      pr_created: { icon: '◆', color: 'text-[#f72585]', label: 'PR Created' },
                      pr_failed: { icon: '✕', color: 'text-[#ff3366]', label: 'PR Failed' }
                    }[activity.event_type] || { icon: '•', color: 'text-[#666666]', label: activity.event_type };

                    return (
                      <div key={idx} className="p-3 hover:bg-[#0a0a0f]/30 transition-colors">
                        <div className="flex items-start gap-3">
                          <div className={`w-6 h-6 border border-current ${eventConfig.color} bg-current/10 flex items-center justify-center flex-shrink-0 mt-0.5`}>
                            <span className="text-xs">{eventConfig.icon}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1">
                                <p className="text-sm text-[#e8e8e8] font-mono">
                                  {eventConfig.label}
                                </p>
                                {activity.message && (
                                  <p className="text-xs text-[#666666] mt-1 font-mono">
                                    {activity.message}
                                  </p>
                                )}
                              </div>
                              <span className="text-[10px] text-[#666666] font-mono whitespace-nowrap">
                                {new Date(activity.created_at).toLocaleTimeString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Repo Selection UI (for awaiting_selection status) */}
      {!scanning && latestResult && latestResult.status === 'awaiting_selection' && (
        <div className="mb-8">
          <RepoSelection 
            scan={latestResult} 
            onComplete={handleSelectionComplete}
            onCancel={handleSelectionCancel}
          />
        </div>
      )}

      {/* Scan Results (for completed/failed scans) */}
      {!scanning && latestResult && latestResult.status !== 'awaiting_selection' && (
        <div className="mb-8">
          <div className="text-xs font-bold text-[#666666] uppercase tracking-widest mb-4 flex items-center gap-2">
            <span className="text-[#f72585]">//</span>
            Latest Scan Results
          </div>
          <ScanResults scan={latestResult} onPRCreated={handleSelectionComplete} />
        </div>
      )}

      {/* Activity Log */}
      <div className="mt-8">
        <ActivityLog scans={scans} loading={scansLoading} showActivities={true} />
      </div>

      {/* Confirmation Popup Modal */}
      {confirmPopup && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-[#0a0a0f]/80 backdrop-blur-sm z-50"
            onClick={() => handleConfirmation('cancel')}
          />
          
          {/* Modal */}
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4">
            <div className="bg-[#1a1a2e] border-2 border-[#FFA500] shadow-[0_0_30px_rgba(255,165,0,0.3)] relative">
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FFA500] via-[#f72585] to-[#FFA500]" />
              
              {/* Scanline overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-20 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.3)_2px,rgba(0,0,0,0.3)_4px)]" />
              
              <div className="relative p-6">
                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 border-2 border-[#FFA500] bg-[#FFA500]/10 flex items-center justify-center">
                    <span className="text-3xl">
                      {confirmPopup.icon === 'info' && 'ℹ️'}
                      {confirmPopup.icon === 'warning' && '⚠️'}
                      {confirmPopup.icon === 'question' && '❓'}
                      {!confirmPopup.icon && '📋'}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-[#e8e8e8] text-center uppercase tracking-wide mb-3">
                  {confirmPopup.title || 'Confirmation Required'}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#a0a0a0] text-center font-mono mb-6 leading-relaxed">
                  <span className="text-[#666666]">&gt;</span> {confirmPopup.description || 'No new repositories were found since your last scan.'}
                </p>

                {/* Options */}
                <div className="flex flex-col gap-3">
                  {confirmPopup.options?.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleConfirmation(option.id)}
                      className={`
                        w-full p-4 border-2 transition-all font-bold uppercase tracking-wide text-sm
                        ${option.id === 'continue_anyway' 
                          ? 'border-[#39ff14] bg-[#39ff14]/10 text-[#39ff14] hover:bg-[#39ff14] hover:text-[#0a0a0f] hover:shadow-[0_0_15px_rgba(57,255,20,0.5)]' 
                          : 'border-[#2a2a4a] bg-[#0a0a0f] text-[#666666] hover:border-[#ff3366] hover:text-[#ff3366]'
                        }
                      `}
                    >
                      <div className="flex items-center justify-center gap-2">
                        {option.id === 'continue_anyway' && <span>🚀</span>}
                        {option.id === 'cancel' && <span>✕</span>}
                        <span>{option.label}</span>
                      </div>
                      {option.description && (
                        <p className="text-[10px] font-normal normal-case tracking-normal mt-1 opacity-70">
                          {option.description}
                        </p>
                      )}
                    </button>
                  )) || (
                    <>
                      {/* Default buttons if options not provided */}
                      <button
                        onClick={() => handleConfirmation('continue_anyway')}
                        className="w-full p-4 border-2 border-[#39ff14] bg-[#39ff14]/10 text-[#39ff14] font-bold uppercase tracking-wide text-sm hover:bg-[#39ff14] hover:text-[#0a0a0f] hover:shadow-[0_0_15px_rgba(57,255,20,0.5)] transition-all"
                      >
                        <div className="flex items-center justify-center gap-2">
                          <span>🚀</span>
                          <span>Continue Anyway</span>
                        </div>
                        <p className="text-[10px] font-normal normal-case tracking-normal mt-1 opacity-70">
                          Scan existing repos and update portfolio
                        </p>
                      </button>
                      <button
                        onClick={() => handleConfirmation('cancel')}
                        className="w-full p-4 border-2 border-[#2a2a4a] bg-[#0a0a0f] text-[#666666] font-bold uppercase tracking-wide text-sm hover:border-[#ff3366] hover:text-[#ff3366] transition-all"
                      >
                        <div className="flex items-center justify-center gap-2">
                          <span>✕</span>
                          <span>Cancel</span>
                        </div>
                        <p className="text-[10px] font-normal normal-case tracking-normal mt-1 opacity-70">
                          Skip this scan
                        </p>
                      </button>
                    </>
                  )}
                </div>

                {/* Footer hint */}
                <p className="text-[10px] text-[#444455] font-mono text-center mt-4">
                  // Press ESC or click outside to cancel
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
