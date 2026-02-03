import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ActivityLog({ scans, loading }) {
  const [expandedId, setExpandedId] = useState(null);

  if (loading) {
    return (
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
        <h3 className="text-sm font-medium text-slate-300 mb-4">Activity Log</h3>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-14 bg-slate-700/30 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (!scans || scans.length === 0) {
    return (
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
        <h3 className="text-sm font-medium text-slate-300 mb-4">Activity Log</h3>
        <div className="text-center py-8">
          <svg className="w-10 h-10 text-slate-600 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-slate-500">No scans yet. Run your first scan to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
      <h3 className="text-sm font-medium text-slate-300 mb-4">Activity Log</h3>
      <div className="space-y-2">
        {scans.map((scan) => (
          <div key={scan.id} className="bg-slate-900/50 rounded-lg overflow-hidden">
            <button
              onClick={() => setExpandedId(expandedId === scan.id ? null : scan.id)}
              className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-slate-800/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${scan.status === 'completed' ? 'bg-emerald-400' : scan.status === 'failed' ? 'bg-red-400' : 'bg-amber-400'}`} />
                <span className="text-sm text-white">
                  {new Date(scan.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-slate-400">
                  {scan.reposFound ?? 0} repos found
                </span>
                {scan.prCreated && (
                  <span className="text-xs text-emerald-400">PR created</span>
                )}
                <svg
                  className={`w-4 h-4 text-slate-500 transition-transform ${expandedId === scan.id ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </div>
            </button>
            {expandedId === scan.id && (
              <div className="px-4 pb-4 border-t border-slate-800">
                <div className="pt-3 space-y-2">
                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <div className="bg-slate-800/50 rounded-lg p-3">
                      <span className="text-slate-500">New Repos</span>
                      <p className="text-white font-medium mt-1">{scan.newReposCount ?? 0}</p>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-3">
                      <span className="text-slate-500">Qualified</span>
                      <p className="text-emerald-400 font-medium mt-1">{scan.qualifiedCount ?? 0}</p>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-3">
                      <span className="text-slate-500">Skipped</span>
                      <p className="text-amber-400 font-medium mt-1">{scan.skippedCount ?? 0}</p>
                    </div>
                  </div>
                  {scan.prUrl && (
                    <a
                      href={scan.prUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300"
                    >
                      View Pull Request
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                    </a>
                  )}
                  <Link
                    to={`/scan/${scan.id}`}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-300 ml-4"
                  >
                    Full Details &rarr;
                  </Link>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
