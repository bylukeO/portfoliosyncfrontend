import { useState, useEffect, useCallback } from 'react';
import api from '../api';
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
  const [scanStep, setScanStep] = useState(0);

  const fetchScans = useCallback(async () => {
    try {
      const { data } = await api.get('/scans');
      const list = data.scans || data.data || [];
      setScans(list);
      if (list.length > 0) {
        setLastScan(list[0].created_at || list[0].createdAt);
        setLatestResult(list[0]);
      }
    } catch {
      // Endpoint may not exist yet — silently fail
    } finally {
      setScansLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchScans();
  }, [fetchScans]);

  const runScan = async () => {
    setScanning(true);
    setScanStep(0);
    setLatestResult(null);

    try {
      // Simulate step progression while waiting for the actual API call
      const stepInterval = setInterval(() => {
        setScanStep((prev) => {
          if (prev < 5) return prev + 1;
          return prev;
        });
      }, 2500);

      const { data } = await api.post('/scan/trigger');

      clearInterval(stepInterval);
      setScanStep(6); // All steps done

      // Brief pause to show completion
      await new Promise((r) => setTimeout(r, 800));

      setLatestResult(data.result || data);
      setLastScan(new Date().toISOString());
      toast('Scan completed successfully!', 'success');
      fetchScans();
    } catch (err) {
      toast(err.response?.data?.error || 'Scan failed. Please check your settings.', 'error');
    } finally {
      setScanning(false);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Status Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-2xl font-bold text-[#e8e8e8] uppercase tracking-wide">
              Dashboard
            </h2>
            <span className="w-2 h-2 bg-[#39ff14] animate-pulse shadow-[0_0_8px_rgba(57,255,20,0.6)]" />
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

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <Card variant="default" padding="md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border-2 border-[#4cc9f0] bg-[#0a0a0f] flex items-center justify-center">
              <svg className="w-5 h-5 text-[#4cc9f0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="square" d="M12 6v6l4 2" />
                <circle cx="12" cy="12" r="9" strokeWidth={2} />
              </svg>
            </div>
            <div>
              <div className="text-[10px] text-[#666666] uppercase tracking-widest">Total Scans</div>
              <div className="text-xl font-bold text-[#e8e8e8]">{scans.length}</div>
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
              <div className="text-[10px] text-[#666666] uppercase tracking-widest">Status</div>
              <div className="text-sm font-bold text-[#39ff14] uppercase">Online</div>
            </div>
          </div>
        </Card>

        <Card variant="default" padding="md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border-2 border-[#f72585] bg-[#0a0a0f] flex items-center justify-center">
              <svg className="w-5 h-5 text-[#f72585]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="square" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <div className="text-[10px] text-[#666666] uppercase tracking-widest">Sync Mode</div>
              <div className="text-sm font-bold text-[#f72585] uppercase">Auto</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Scan Progress */}
      {scanning && <ScanProgress currentStep={scanStep} />}

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
        <ActivityLog scans={scans} loading={scansLoading} />
      </div>
    </div>
  );
}
