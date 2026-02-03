import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ScanResults({ scan }) {
  const [expandedSkipped, setExpandedSkipped] = useState({});

  if (!scan) return null;

  const { newRepos = [], qualified = [], skipped = [], prUrl, id } = scan;

  return (
    <div className="space-y-4">
      {/* New Repos */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-slate-300">New Repos Detected</h3>
          <span className="text-xs font-mono bg-cyan-500/10 text-cyan-400 px-2 py-1 rounded-full">
            {newRepos.length}
          </span>
        </div>
        {newRepos.length === 0 ? (
          <p className="text-sm text-slate-500">No new repos found</p>
        ) : (
          <div className="space-y-2">
            {newRepos.map((repo) => (
              <div key={repo.name} className="flex items-center justify-between py-2 px-3 bg-slate-900/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                  </svg>
                  <span className="text-sm text-white font-medium">{repo.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  {repo.language && (
                    <span className="text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                      {repo.language}
                    </span>
                  )}
                  {repo.createdAt && (
                    <span className="text-xs text-slate-500">
                      {new Date(repo.createdAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Qualified + Skipped row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-slate-300">Qualified for Portfolio</h3>
            <span className="text-xs font-mono bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full">
              {qualified.length}
            </span>
          </div>
          {qualified.length === 0 ? (
            <p className="text-sm text-slate-500">None qualified</p>
          ) : (
            <div className="space-y-1.5 mt-3">
              {qualified.map((r) => (
                <div key={r.name} className="text-sm text-emerald-400 flex items-center gap-2">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  {r.name}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-slate-300">Skipped</h3>
            <span className="text-xs font-mono bg-amber-500/10 text-amber-400 px-2 py-1 rounded-full">
              {skipped.length}
            </span>
          </div>
          {skipped.length === 0 ? (
            <p className="text-sm text-slate-500">None skipped</p>
          ) : (
            <div className="space-y-1.5 mt-3">
              {skipped.map((r) => (
                <div key={r.name}>
                  <button
                    onClick={() =>
                      setExpandedSkipped((prev) => ({
                        ...prev,
                        [r.name]: !prev[r.name],
                      }))
                    }
                    className="text-sm text-amber-400 flex items-center gap-2 w-full text-left hover:text-amber-300 transition-colors"
                  >
                    <svg
                      className={`w-3 h-3 transition-transform ${expandedSkipped[r.name] ? 'rotate-90' : ''}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                    </svg>
                    {r.name}
                  </button>
                  {expandedSkipped[r.name] && (
                    <p className="text-xs text-slate-500 ml-5 mt-1">{r.reason || 'No reason provided'}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* PR Link */}
      {prUrl && (
        <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-1.135a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 00-6.364 6.364L4.34 8.374" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-emerald-400">Pull Request Created</p>
              <p className="text-xs text-slate-500 mt-0.5">Review and merge to update your portfolio</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {id && (
              <Link
                to={`/scan/${id}`}
                className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                View Details
              </Link>
            )}
            <a
              href={prUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-lg text-sm font-medium transition-colors"
            >
              Open on GitHub
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
