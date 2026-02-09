export default function ScanProgress({ status = 'pending', scanType = 'quick' }) {
  // Status can be: 'pending', 'processing', 'completed', 'failed'
  // scanType can be: 'quick' or 'full'
  
  const isFullScan = scanType === 'full';
  
  const getStatusDisplay = () => {
    switch (status) {
      case 'pending':
        return {
          icon: isFullScan ? '🚀' : '⏳',
          color: 'text-[#FFA500]',
          bgColor: 'bg-[#FFA500]/20',
          borderColor: 'border-[#FFA500]',
          message: isFullScan 
            ? 'Full AI scan queued. Preparing Gemini analysis...'
            : 'Scan queued and waiting to start...',
        };
      case 'processing':
        return {
          icon: isFullScan ? '🤖' : '⚙️',
          color: isFullScan ? 'text-[#f72585]' : 'text-[#3498DB]',
          bgColor: isFullScan ? 'bg-[#f72585]/20' : 'bg-[#3498DB]/20',
          borderColor: isFullScan ? 'border-[#f72585]' : 'border-[#3498DB]',
          message: isFullScan 
            ? 'AI analyzing repos, generating portfolio entries & creating PR...'
            : 'Scanning repositories and analyzing code...',
        };
      case 'completed':
        return {
          icon: '✅',
          color: 'text-[#2ECC71]',
          bgColor: 'bg-[#2ECC71]/20',
          borderColor: 'border-[#2ECC71]',
          message: isFullScan 
            ? 'Full scan completed! Check your GitHub for the new PR.'
            : 'Scan completed successfully!',
        };
      case 'failed':
        return {
          icon: '❌',
          color: 'text-[#E74C3C]',
          bgColor: 'bg-[#E74C3C]/20',
          borderColor: 'border-[#E74C3C]',
          message: isFullScan 
            ? 'Full scan failed. Check settings and try again.'
            : 'Scan failed. Please try again.',
        };
      default:
        return {
          icon: isFullScan ? '🚀' : '⏳',
          color: 'text-[#FFA500]',
          bgColor: 'bg-[#FFA500]/20',
          borderColor: 'border-[#FFA500]',
          message: isFullScan 
            ? 'Initializing AI-powered full scan...'
            : 'Initializing scan...',
        };
    }
  };

  const display = getStatusDisplay();

  return (
    <div className={`bg-[#1a1a2e] border-2 ${display.borderColor} p-6 mb-8 shadow-[0_0_15px_rgba(247,37,133,0.2)]`}>
      <div className="flex items-center gap-4">
        {/* Status Icon */}
        <div className={`w-14 h-14 ${display.bgColor} border-2 ${display.borderColor} flex items-center justify-center text-2xl`}>
          {status === 'processing' ? (
            <div className="w-8 h-8 border-3 border-transparent border-t-[#3498DB] border-r-[#3498DB] animate-spin" />
          ) : (
            <span>{display.icon}</span>
          )}
        </div>

        {/* Status Message */}
        <div className="flex-1">
          <div className={`text-sm font-bold ${display.color} uppercase tracking-widest mb-1`}>
            Status: {status}
          </div>
          <p className="text-sm text-[#a0a0a0] font-mono">
            <span className="text-[#666666]">&gt;</span> {display.message}
          </p>
        </div>

        {/* Polling Indicator */}
        {(status === 'pending' || status === 'processing') && (
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#4cc9f0] animate-pulse rounded-full" />
              <span className="text-xs text-[#4cc9f0] font-mono uppercase">Polling...</span>
            </div>
            <span className="text-[10px] text-[#666666] font-mono">Updates every 2s</span>
          </div>
        )}
      </div>

      {/* Progress Bar for Processing */}
      {status === 'processing' && (
        <div className="mt-4">
          <div className="h-1 bg-[#2a2a4a] overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#f72585] via-[#4cc9f0] to-[#f72585] animate-[shimmer_2s_infinite] w-1/2" />
          </div>
        </div>
      )}
    </div>
  );
}
