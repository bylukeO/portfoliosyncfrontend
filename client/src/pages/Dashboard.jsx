import { useState, useEffect, useCallback, useRef } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';
import ScanProgress from '../components/ScanProgress';
import ScanResults from '../components/ScanResults';
import ActivityLog from '../components/ActivityLog';
import { Button, Card } from '../components/ui';

export default function Dashboard() {
  const toast = useToast();
  const [lastScan, setLastScan] = useState(null);
  const [latestResult, setLatestResult] = useState(null);
  const [scans, setScans] = useState([]);
  const [scansLoading, setScansLoading] = useState(true);
  const [scanning, setScanning] = useState(false);
  const [currentScanId, setCurrentScanId] = useState(null);
  const [scanStatus, setScanStatus] = useState(null); // 'pending', 'processing', 'completed', 'failed'
  const pollingIntervalRef = useRef(null);

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

  // Poll scan status
  const pollScanStatus = useCallback(async (scanId) => {
    try {
      const { data } = await api.get(`/scans/${scanId}`);
      // API returns: { success: true, result: { id, status, new_repos, processed_repos, ... } }
      const scanData = data.result || data;
      
      setScanStatus(scanData.status);
      
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
          toast(`Scan completed! Found ${newCount} new repos, ${processedCount} qualified for portfolio.`, 'success');
        } else {
          toast('Scan failed. Please try again.', 'error');
        }
        
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

  // Run scan
  const runScan = async () => {
    setScanning(true);
    setScanStatus('pending');
    setLatestResult(null);

    try {
      // Trigger the scan - API returns: { success: true, message: "...", scan_id: "..." }
      const { data } = await api.post('/scans/trigger');
      const scanId = data.scan_id;
      
      if (!scanId) {
        throw new Error('No scan ID returned from server');
      }
      
      setCurrentScanId(scanId);
      toast('Scan initiated. Polling for results...', 'info');
      
      // Start polling for status
      startPolling(scanId);
    } catch (err) {
      console.error('Scan trigger error:', err);
      setScanning(false);
      setScanStatus(null);
      toast(err.response?.data?.error || 'Failed to trigger scan. Please try again.', 'error');
    }
  };

  // Calculate dynamic stats from scans data
  const stats = {
    totalScans: scans.length,
    totalReposFound: scans.reduce((sum, scan) => sum + (scan.new_repos?.length || 0), 0),
    totalProcessed: scans.reduce((sum, scan) => sum + (scan.processed_repos?.length || 0), 0),
    totalSkipped: scans.reduce((sum, scan) => sum + (scan.skipped_repos?.length || 0), 0),
    completedScans: scans.filter(s => s.status === 'completed').length,
    failedScans: scans.filter(s => s.status === 'failed').length,
    processingScans: scans.filter(s => s.status === 'processing' || s.status === 'pending').length,
    totalPRs: scans.reduce((sum, scan) => sum + (scan.pr_urls?.length || 0), 0),
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
        <Button
          variant="primary"
          onClick={runScan}
          disabled={scanning}
          icon={
            scanning ? (
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
          {scanning ? 'Scanning...' : 'Run Scan'}
        </Button>
      </div>

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
              <div className="text-xl font-bold text-[#f72585]">{stats.totalPRs}</div>
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
      {scanning && <ScanProgress status={scanStatus} />}

      {/* Scan Results */}
      {!scanning && latestResult && (
        <div className="mb-8">
          <div className="text-xs font-bold text-[#666666] uppercase tracking-widest mb-4 flex items-center gap-2">
            <span className="text-[#f72585]">//</span>
            Latest Scan Results
          </div>
          <ScanResults scan={latestResult} />
        </div>
      )}

      {/* Activity Log */}
      <div className="mt-8">
        <ActivityLog scans={scans} loading={scansLoading} showActivities={true} />
      </div>
    </div>
  );
}
