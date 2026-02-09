import { useState, useEffect } from 'react';
import api from '../services/api';
import { useToast } from './Toast';

export default function RepoSelection({ scan, onComplete, onCancel }) {
  const toast = useToast();
  const [selectedRepos, setSelectedRepos] = useState(new Set());
  const [expandedRepos, setExpandedRepos] = useState({});
  const [creating, setCreating] = useState(false);

  const qualifiedRepos = scan.processed_repos || [];
  const scanId = scan.id;

  // Initialize with all repos selected
  useEffect(() => {
    const allIds = qualifiedRepos.map(r => r.id || r.full_name);
    setSelectedRepos(new Set(allIds));
  }, [qualifiedRepos]);

  const toggleRepo = (repoId) => {
    setSelectedRepos(prev => {
      const next = new Set(prev);
      if (next.has(repoId)) {
        next.delete(repoId);
      } else {
        next.add(repoId);
      }
      return next;
    });
  };

  const toggleExpand = (repoId) => {
    setExpandedRepos(prev => ({
      ...prev,
      [repoId]: !prev[repoId]
    }));
  };

  const selectAll = () => {
    const allIds = qualifiedRepos.map(r => r.id || r.full_name);
    setSelectedRepos(new Set(allIds));
  };

  const deselectAll = () => {
    setSelectedRepos(new Set());
  };

  const handleCreatePR = async () => {
    if (selectedRepos.size === 0) {
      toast('⚠️ Please select at least one repository', 'warning');
      return;
    }

    setCreating(true);
    try {
      const { data } = await api.post('/scan/create-pr', {
        scan_id: scanId,
        selected_repo_ids: Array.from(selectedRepos)
      });

      if (data.success) {
        toast(`✅ PR created successfully! ${data.repos_added} repo(s) added`, 'success');
        if (data.pr_url) {
          // Show PR link
          toast(`🔗 ${data.pr_url}`, 'info');
        }
        onComplete?.(data);
      }
    } catch (err) {
      console.error('Failed to create PR:', err);
      const errorMsg = err.response?.data?.error || 'Failed to create pull request';
      toast(`❌ ${errorMsg}`, 'error');
    } finally {
      setCreating(false);
    }
  };

  const getQualityColor = (score) => {
    if (score >= 90) return 'text-[#39ff14] border-[#39ff14]'; // Green
    if (score >= 70) return 'text-[#FFA500] border-[#FFA500]'; // Orange
    return 'text-[#ff3366] border-[#ff3366]'; // Red
  };

  return (
    <div className="bg-[#1a1a2e] border-3 border-[#f72585] p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold text-[#e8e8e8] uppercase tracking-wide">
            <span className="text-[#f72585]">✓</span> Select Repositories for Portfolio
          </h2>
          <span className="text-xs font-mono bg-[#f72585]/10 text-[#f72585] px-3 py-1 border border-[#f72585]">
            {selectedRepos.size} / {qualifiedRepos.length} SELECTED
          </span>
        </div>
        <p className="text-sm text-[#666666] font-mono">
          <span className="text-[#f72585]">&gt;</span> Choose which repositories to add to your portfolio. All are pre-selected.
        </p>
      </div>

      {/* Top Action Bar */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#2a2a4a]">
        <div className="flex items-center gap-3">
          <button
            onClick={selectAll}
            className="text-xs font-mono text-[#4cc9f0] hover:text-[#39ff14] transition-colors uppercase tracking-wide"
          >
            [SELECT ALL]
          </button>
          <span className="text-[#2a2a4a]">|</span>
          <button
            onClick={deselectAll}
            className="text-xs font-mono text-[#666666] hover:text-[#FFA500] transition-colors uppercase tracking-wide"
          >
            [DESELECT ALL]
          </button>
        </div>
      </div>

      {/* Repository List */}
      <div className="space-y-3 mb-6 max-h-[60vh] overflow-y-auto">
        {qualifiedRepos.map((repo) => {
          const repoId = repo.id || repo.full_name;
          const isSelected = selectedRepos.has(repoId);
          const isExpanded = expandedRepos[repoId];
          const qualityScore = repo.quality_score || 0;
          const qualityReason = repo.quality_reason || '';
          const techStack = repo.tech_stack || [];
          const category = repo.category || 'Uncategorized';
          const projectDetails = repo.project_details || {};

          return (
            <div
              key={repoId}
              className={`
                border-2 transition-all
                ${isSelected 
                  ? 'border-[#39ff14] bg-[#39ff14]/5' 
                  : 'border-[#2a2a4a] bg-[#0a0a0f]'
                }
              `}
            >
              {/* Main Selection Row */}
              <div className="flex items-start gap-4 p-4">
                {/* Checkbox */}
                <button
                  onClick={() => toggleRepo(repoId)}
                  className="flex-shrink-0 w-5 h-5 border-2 border-[#4cc9f0] bg-[#0a0a0f] flex items-center justify-center hover:border-[#39ff14] transition-colors mt-1"
                >
                  {isSelected && (
                    <svg className="w-3 h-3 text-[#39ff14]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="square" strokeLinejoin="miter" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>

                {/* Repo Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-[#e8e8e8] mb-1">
                        {repo.name}
                      </h3>
                      {repo.description && (
                        <p className="text-xs text-[#a0a0a0] mb-2 line-clamp-2">
                          {repo.description}
                        </p>
                      )}
                    </div>

                    {/* Quality Score Badge */}
                    <div className={`flex-shrink-0 px-3 py-1 border ${getQualityColor(qualityScore)} font-mono text-xs font-bold`}>
                      {qualityScore}%
                    </div>
                  </div>

                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-3 text-xs">
                    {repo.language && (
                      <span className="text-[#666666] font-mono">
                        <span className="text-[#4cc9f0]">▸</span> {repo.language}
                      </span>
                    )}
                    {category && (
                      <span className="text-[#666666] font-mono">
                        <span className="text-[#FFA500]">▸</span> {category}
                      </span>
                    )}
                    {techStack.length > 0 && (
                      <span className="text-[#666666] font-mono">
                        <span className="text-[#f72585]">▸</span> {techStack.join(', ')}
                      </span>
                    )}
                  </div>

                  {/* Quality Reason */}
                  {qualityReason && (
                    <div className="mt-2 text-xs text-[#39ff14] font-mono">
                      <span className="text-[#666666]">✓</span> {qualityReason}
                    </div>
                  )}

                  {/* Expand/Collapse Preview */}
                  {projectDetails && Object.keys(projectDetails).length > 0 && (
                    <button
                      onClick={() => toggleExpand(repoId)}
                      className="mt-2 text-xs font-mono text-[#4cc9f0] hover:text-[#39ff14] transition-colors uppercase tracking-wide"
                    >
                      {isExpanded ? '[HIDE PREVIEW]' : '[SHOW PREVIEW]'}
                    </button>
                  )}
                </div>
              </div>

              {/* Expanded Preview */}
              {isExpanded && projectDetails && (
                <div className="border-t border-[#2a2a4a] p-4 bg-[#0a0a0f]">
                  <div className="text-[10px] text-[#666666] uppercase tracking-widest mb-2">
                    // Generated Portfolio Entry Preview
                  </div>
                  <div className="space-y-2 text-sm">
                    {projectDetails.title && (
                      <div>
                        <span className="text-[#4cc9f0] font-mono">Title:</span>{' '}
                        <span className="text-[#e8e8e8]">{projectDetails.title}</span>
                      </div>
                    )}
                    {projectDetails.description && (
                      <div>
                        <span className="text-[#4cc9f0] font-mono">Description:</span>{' '}
                        <span className="text-[#a0a0a0]">{projectDetails.description}</span>
                      </div>
                    )}
                    {projectDetails.features && projectDetails.features.length > 0 && (
                      <div>
                        <span className="text-[#4cc9f0] font-mono">Features:</span>
                        <ul className="ml-4 mt-1 space-y-1">
                          {projectDetails.features.map((feature, idx) => (
                            <li key={idx} className="text-[#a0a0a0] text-xs">
                              <span className="text-[#39ff14]">•</span> {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-4 pt-4 border-t border-[#2a2a4a]">
        <button
          onClick={onCancel}
          disabled={creating}
          className="px-6 py-3 border-2 border-[#666666] text-[#666666] hover:border-[#ff3366] hover:text-[#ff3366] font-mono text-sm uppercase tracking-wide transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
        <button
          onClick={handleCreatePR}
          disabled={creating || selectedRepos.size === 0}
          className={`
            px-6 py-3 font-mono text-sm uppercase tracking-wide transition-all
            ${creating || selectedRepos.size === 0
              ? 'bg-[#2a2a4a] text-[#666666] cursor-not-allowed'
              : 'bg-[#39ff14] text-[#0a0a0f] hover:shadow-[0_0_15px_rgba(57,255,20,0.5)] border-2 border-[#39ff14]'
            }
          `}
        >
          {creating ? (
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Creating PR...
            </span>
          ) : (
            `Create PR (${selectedRepos.size} selected)`
          )}
        </button>
      </div>
    </div>
  );
}
