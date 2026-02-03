import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';
import { useToast } from '../components/Toast';

export default function ScanDetail() {
  const { id } = useParams();
  const toast = useToast();
  const [scan, setScan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`/scans/${id}`);
        setScan(data);
      } catch (err) {
        toast(err.response?.data?.error || 'Failed to load scan details', 'error');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) {
    return (
      <div className="p-8 max-w-5xl mx-auto">
        <div className="h-8 w-48 bg-slate-700/30 rounded animate-pulse mb-6" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-slate-800/50 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (!scan) {
    return (
      <div className="p-8 max-w-5xl mx-auto">
        <div className="text-center py-16">
          <svg className="w-12 h-12 text-slate-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-slate-400">Scan not found</p>
          <Link to="/" className="text-cyan-400 text-sm mt-2 inline-block hover:text-cyan-300">
            &larr; Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const qualified = scan.qualified || [];
  const diff = scan.diff || '';

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link to="/" className="text-sm text-slate-400 hover:text-slate-300 mb-2 inline-flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to Dashboard
          </Link>
          <h2 className="text-2xl font-semibold text-white">Scan Details</h2>
          <p className="text-sm text-slate-400 mt-1">
            {new Date(scan.createdAt).toLocaleString()}
          </p>
        </div>
        {scan.prUrl && (
          <a
            href={scan.prUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-semibold rounded-lg text-sm transition-colors"
          >
            View Pull Request
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </a>
        )}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Status', value: scan.status, color: scan.status === 'completed' ? 'text-emerald-400' : 'text-amber-400' },
          { label: 'New Repos', value: scan.newReposCount ?? 0, color: 'text-cyan-400' },
          { label: 'Qualified', value: scan.qualifiedCount ?? 0, color: 'text-emerald-400' },
          { label: 'Skipped', value: scan.skippedCount ?? 0, color: 'text-amber-400' },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
            <p className="text-xs text-slate-500 mb-1">{label}</p>
            <p className={`text-xl font-semibold ${color}`}>
              {typeof value === 'string' ? value.charAt(0).toUpperCase() + value.slice(1) : value}
            </p>
          </div>
        ))}
      </div>

      {/* Qualified Projects */}
      {qualified.length > 0 && (
        <section className="mb-8">
          <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-4">
            Qualified Projects
          </h3>
          <div className="space-y-3">
            {qualified.map((project) => (
              <div key={project.name} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-white font-medium">{project.name}</h4>
                    {project.description && (
                      <p className="text-sm text-slate-400 mt-1">{project.description}</p>
                    )}
                  </div>
                </div>
                {project.techStack && project.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2.5 py-1 bg-cyan-500/10 text-cyan-400 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Diff Preview */}
      {diff && (
        <section>
          <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-4">
            Portfolio Diff
          </h3>
          <div className="bg-slate-900 border border-slate-700/50 rounded-xl overflow-hidden">
            <div className="px-4 py-2.5 border-b border-slate-800 flex items-center gap-2">
              <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              <span className="text-xs text-slate-400 font-mono">portfolio diff</span>
            </div>
            <pre className="p-4 text-sm font-mono overflow-x-auto">
              {diff.split('\n').map((line, i) => {
                let cls = 'text-slate-400';
                let bgCls = '';
                if (line.startsWith('+')) {
                  cls = 'text-emerald-400';
                  bgCls = 'diff-add';
                } else if (line.startsWith('-')) {
                  cls = 'text-red-400';
                  bgCls = 'diff-remove';
                } else if (line.startsWith('@@')) {
                  cls = 'text-cyan-400';
                }
                return (
                  <div key={i} className={`${bgCls} px-2 -mx-2`}>
                    <span className={cls}>{line}</span>
                  </div>
                );
              })}
            </pre>
          </div>
        </section>
      )}
    </div>
  );
}
