const SCAN_STEPS = [
  { key: 'fetch', label: 'Fetching repos...' },
  { key: 'compare', label: 'Comparing with last scan...' },
  { key: 'evaluate', label: 'Evaluating READMEs with AI...' },
  { key: 'analyze', label: 'Analyzing portfolio format...' },
  { key: 'generate', label: 'Generating project entries...' },
  { key: 'pr', label: 'Creating pull request...' },
];

export default function ScanProgress({ currentStep }) {
  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 mt-4">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <span className="text-sm font-medium text-cyan-400">Scan in progress</span>
      </div>
      <div className="space-y-3">
        {SCAN_STEPS.map((step, i) => {
          const isCompleted = i < currentStep;
          const isActive = i === currentStep;
          const isPending = i > currentStep;

          return (
            <div key={step.key} className="flex items-center gap-3">
              {isCompleted && (
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
              )}
              {isActive && (
                <div className="w-6 h-6 rounded-full border-2 border-cyan-400 flex items-center justify-center shrink-0">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                </div>
              )}
              {isPending && (
                <div className="w-6 h-6 rounded-full border border-slate-600 shrink-0" />
              )}
              <span
                className={`text-sm ${
                  isCompleted
                    ? 'text-emerald-400'
                    : isActive
                    ? 'text-white font-medium'
                    : 'text-slate-500'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
