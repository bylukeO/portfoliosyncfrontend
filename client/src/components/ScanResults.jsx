import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useToast } from "./Toast";

export default function ScanResults({ scan, onPRCreated }) {
  const toast = useToast();
  const [expandedSkipped, setExpandedSkipped] = useState({});
  const [selectedRepos, setSelectedRepos] = useState(new Set());
  const [creatingPR, setCreatingPR] = useState(false);
  const [showSelection, setShowSelection] = useState(false);

  if (!scan) return null;

  // Handle the actual API response structure
  const newRepos = scan.new_repos || [];
  const allProcessedRepos = scan.processed_repos || [];
  const skippedRepos = scan.skipped_repos || [];
  const rawPrUrls = scan.pr_urls || [];
  const status = scan.status;
  const scanId = scan.id;

  // NEW: Track repos already added to portfolio
  const reposAddedToPR = scan.repos_added_to_pr || [];
  const alreadyUsedRepos = scan.already_used_repos || [];

  // Parse PR URLs - handle both old format (array of strings) and new format (array of objects)
  const prData = rawPrUrls.map((item) => {
    // New format: PR object with metadata
    if (typeof item === "object" && item.url) {
      return {
        url: item.url,
        created_at: item.created_at,
        repos_added: item.repos_added || [],
        branch_name: item.branch_name,
        repos_count: item.repos_count || item.repos_added?.length || 0,
      };
    }
    // Old format: just URL string (backward compatibility)
    if (typeof item === "string") {
      return {
        url: item,
        created_at: null,
        repos_added: [],
        branch_name: null,
        repos_count: 0,
      };
    }
    return null;
  }).filter(Boolean);

  const prUrls = prData.map((pr) => pr.url); // For backward compatibility with existing code

  // Calculate remaining repos (exclude ones already added to PR)
  const processedRepos = allProcessedRepos.filter(
    (repo) => !reposAddedToPR.includes(repo.full_name || repo.id),
  );

  const remainingCount = processedRepos.length;
  const hasRemainingRepos = remainingCount > 0;

  // Toggle repo selection
  const toggleRepoSelection = (repoId) => {
    setSelectedRepos((prev) => {
      const next = new Set(prev);
      if (next.has(repoId)) {
        next.delete(repoId);
      } else {
        next.add(repoId);
      }
      return next;
    });
  };

  // Select all processed repos
  const selectAll = () => {
    const allIds = processedRepos.map((r) => r.id || r.full_name);
    setSelectedRepos(new Set(allIds));
  };

  // Deselect all
  const deselectAll = () => {
    setSelectedRepos(new Set());
  };

  // Create PR from selected repos
  const handleCreatePR = async () => {
    if (selectedRepos.size === 0) {
      toast("⚠️ Please select at least one repository", "warning");
      return;
    }

    setCreatingPR(true);
    try {
      const { data } = await api.post("/scan/create-pr", {
        scan_id: scanId,
        selected_repo_ids: Array.from(selectedRepos),
      });

      if (data.success) {
        // Show success message with remaining count
        const remainingReposCount = data.remaining_repos_count ?? 0;

        if (remainingReposCount > 0) {
          toast(
            `✅ PR created! ${data.repos_added} repo(s) added. ${remainingReposCount} remaining`,
            "success",
          );
        } else {
          toast(
            `✅ PR created! ${data.repos_added} repo(s) added. All repos from this scan are now in your portfolio!`,
            "success",
          );
        }

        // Reset selection
        setSelectedRepos(new Set());

        // Keep selection mode open if there are remaining repos
        if (remainingReposCount === 0) {
          setShowSelection(false);
        }

        // Notify parent to refresh scan data
        onPRCreated?.(data);
      }
    } catch (err) {
      console.error("Failed to create PR:", err);
      const errorMsg =
        err.response?.data?.error || "Failed to create pull request";
      toast(`❌ ${errorMsg}`, "error");
    } finally {
      setCreatingPR(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Status Badge */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <StatusBadge status={status} />
          {scanId && (
            <span className="text-xs text-[#666666] font-mono">
              Scan ID: #{scanId}
            </span>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* New Repos Count */}
        <div className="bg-[#1a1a2e] border-2 border-[#4cc9f0] p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] text-[#666666] uppercase tracking-widest mb-1">
                New Repos Detected
              </div>
              <div className="text-2xl font-bold text-[#4cc9f0]">
                {newRepos.length}
              </div>
            </div>
            <svg
              className="w-8 h-8 text-[#4cc9f0]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="square"
                strokeLinejoin="miter"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </div>
        </div>

        {/* Processed Count */}
        <div className="bg-[#1a1a2e] border-2 border-[#39ff14] p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] text-[#666666] uppercase tracking-widest mb-1">
                Qualified for Portfolio
              </div>
              <div className="text-2xl font-bold text-[#39ff14]">
                {processedRepos.length}
              </div>
            </div>
            <svg
              className="w-8 h-8 text-[#39ff14]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="square"
                strokeLinejoin="miter"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {/* Skipped Count */}
        <div className="bg-[#1a1a2e] border-2 border-[#FFA500] p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] text-[#666666] uppercase tracking-widest mb-1">
                Skipped
              </div>
              <div className="text-2xl font-bold text-[#FFA500]">
                {skippedRepos.length}
              </div>
            </div>
            <svg
              className="w-8 h-8 text-[#FFA500]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="square"
                strokeLinejoin="miter"
                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* New Repos List */}
      {newRepos.length > 0 && (
        <div className="bg-[#1a1a2e] border-2 border-[#2a2a4a] p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-[#e8e8e8] uppercase tracking-wide">
              <span className="text-[#4cc9f0]">//</span> New Repositories
            </h3>
            <span className="text-xs font-mono bg-[#4cc9f0]/10 text-[#4cc9f0] px-2 py-1 border border-[#4cc9f0]">
              {newRepos.length}
            </span>
          </div>
          <div className="space-y-2">
            {newRepos.map((repo) => (
              <RepoCard key={repo.full_name || repo.name} repo={repo} />
            ))}
          </div>
        </div>
      )}

      {/* Already in Portfolio Section (from previous scans) */}
      {alreadyUsedRepos.length > 0 && (
        <div className="bg-[#1a1a2e] border-2 border-[#39ff14] p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-[#39ff14]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-sm font-medium text-[#e8e8e8] uppercase tracking-wide">
                <span className="text-[#39ff14]">//</span> Already in Portfolio
              </h3>
            </div>
            <span className="text-xs font-mono bg-[#39ff14]/10 text-[#39ff14] px-2 py-1 border border-[#39ff14]">
              {alreadyUsedRepos.length} EXCLUDED
            </span>
          </div>
          <p className="text-xs text-[#888888] mb-3 font-mono">
            These repositories were added to your portfolio in previous scans
            and have been excluded.
          </p>
          <div className="space-y-2">
            {alreadyUsedRepos.map((repo) => (
              <div
                key={repo.full_name || repo.name}
                className="bg-[#16162a] p-3 border border-[#39ff14]/30 flex items-center justify-between"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <svg
                    className="w-4 h-4 text-[#39ff14] flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm text-white font-medium truncate">
                      {repo.projectDetails?.projectName || repo.name}
                    </h4>
                    <p className="text-xs text-[#666666] truncate font-mono">
                      {repo.full_name}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                  {repo.quality_score && (
                    <span className="text-xs font-mono text-[#39ff14]">
                      {repo.quality_score}%
                    </span>
                  )}
                  <span className="text-xs text-[#39ff14] font-mono">
                    ✓ Added
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Processed Repos List */}
      {processedRepos.length > 0 && (
        <div className="bg-[#1a1a2e] border-2 border-[#2a2a4a] p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-[#e8e8e8] uppercase tracking-wide">
              <span className="text-[#39ff14]">//</span> Processed for Portfolio
            </h3>
            <div className="flex items-center gap-3">
              {showSelection && (
                <span className="text-xs font-mono bg-[#f72585]/10 text-[#f72585] px-2 py-1 border border-[#f72585]">
                  {selectedRepos.size} SELECTED
                </span>
              )}
              <span className="text-xs font-mono bg-[#39ff14]/10 text-[#39ff14] px-2 py-1 border border-[#39ff14]">
                {processedRepos.length}
              </span>
              {/* Show CREATE PR button if: not in selection mode AND (no PR exists OR has remaining repos) */}
              {!showSelection && hasRemainingRepos && (
                <button
                  onClick={() => setShowSelection(true)}
                  className="text-xs font-mono text-[#4cc9f0] hover:text-[#39ff14] uppercase tracking-wide transition-colors px-2 py-1 border border-[#4cc9f0] hover:border-[#39ff14]"
                >
                  {prUrls.length > 0 ? "[CREATE ANOTHER PR]" : "[CREATE PR]"}
                </button>
              )}
            </div>
          </div>

          {/* Selection Mode Controls */}
          {showSelection && (
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#2a2a4a]">
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
              <button
                onClick={() => {
                  setShowSelection(false);
                  setSelectedRepos(new Set());
                }}
                className="text-xs font-mono text-[#666666] hover:text-[#ff3366] transition-colors uppercase tracking-wide"
              >
                [CANCEL]
              </button>
            </div>
          )}

          <div className="space-y-2">
            {processedRepos.map((repo) => {
              const repoId = repo.id || repo.full_name;
              const isSelected = selectedRepos.has(repoId);

              return (
                <div
                  key={repo.full_name || repo.name}
                  className={`
                    ${showSelection ? "flex items-start gap-3" : ""}
                    ${showSelection && isSelected ? "bg-[#39ff14]/5 border border-[#39ff14] p-3" : showSelection ? "border border-[#2a2a4a] p-3" : ""}
                  `}
                >
                  {showSelection && (
                    <button
                      onClick={() => toggleRepoSelection(repoId)}
                      className="flex-shrink-0 w-5 h-5 border-2 border-[#4cc9f0] bg-[#0a0a0f] flex items-center justify-center hover:border-[#39ff14] transition-colors mt-1"
                    >
                      {isSelected && (
                        <svg
                          className="w-3 h-3 text-[#39ff14]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="square"
                            strokeLinejoin="miter"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </button>
                  )}
                  <div className="flex-1">
                    <RepoCard repo={repo} variant="success" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Create PR Button */}
          {showSelection && (
            <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-[#2a2a4a]">
              <button
                onClick={handleCreatePR}
                disabled={creatingPR || selectedRepos.size === 0}
                className={`
                  px-6 py-3 font-mono text-sm uppercase tracking-wide transition-all
                  ${
                    creatingPR || selectedRepos.size === 0
                      ? "bg-[#2a2a4a] text-[#666666] cursor-not-allowed"
                      : "bg-[#39ff14] text-[#0a0a0f] hover:shadow-[0_0_15px_rgba(57,255,20,0.5)] border-2 border-[#39ff14]"
                  }
                `}
              >
                {creatingPR ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Creating PR...
                  </span>
                ) : (
                  `Create PR (${selectedRepos.size} selected)`
                )}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Skipped Repos */}
      {skippedRepos.length > 0 && (
        <div className="bg-[#1a1a2e] border-2 border-[#2a2a4a] p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-[#e8e8e8] uppercase tracking-wide">
              <span className="text-[#FFA500]">//</span> Skipped Repositories
            </h3>
            <span className="text-xs font-mono bg-[#FFA500]/10 text-[#FFA500] px-2 py-1 border border-[#FFA500]">
              {skippedRepos.length}
            </span>
          </div>
          <div className="space-y-2">
            {skippedRepos.map((repo) => (
              <div key={repo.full_name || repo.name}>
                <button
                  onClick={() =>
                    setExpandedSkipped((prev) => ({
                      ...prev,
                      [repo.name]: !prev[repo.name],
                    }))
                  }
                  className="w-full"
                >
                  <RepoCard repo={repo} variant="warning" expandable />
                </button>
                {expandedSkipped[repo.name] && repo.reason && (
                  <div className="ml-12 mt-2 p-3 bg-[#0a0a0f] border border-[#FFA500]/20">
                    <p className="text-xs text-[#FFA500] font-mono">
                      <span className="text-[#666666]">Reason:</span>{" "}
                      {repo.reason}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PR Links - Enhanced with metadata */}
      {prData.length > 0 && (
        <div className="bg-[#1a1a2e] border-2 border-[#39ff14] p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#39ff14]/10 border-2 border-[#39ff14] flex items-center justify-center">
              <svg
                className="w-5 h-5 text-[#39ff14]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                  d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-[#39ff14] uppercase tracking-wide">
                {prData.length} Pull Request{prData.length > 1 ? "s" : ""} Created
              </p>
              <p className="text-xs text-[#666666] mt-0.5 font-mono">
                {reposAddedToPR.length} repo{reposAddedToPR.length !== 1 ? "s" : ""} added to portfolio
              </p>
            </div>
          </div>
          
          {/* PR Cards */}
          <div className="space-y-3">
            {prData.map((pr, index) => (
              <div
                key={pr.url}
                className="bg-[#16162a] border border-[#39ff14]/30 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  {/* PR Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono bg-[#39ff14]/10 text-[#39ff14] px-2 py-1 border border-[#39ff14]">
                        PR #{index + 1}
                      </span>
                      {pr.repos_count > 0 && (
                        <span className="text-xs font-mono text-[#666666]">
                          {pr.repos_count} repo{pr.repos_count !== 1 ? "s" : ""}
                        </span>
                      )}
                      {pr.created_at && (
                        <span className="text-xs font-mono text-[#666666]">
                          {new Date(pr.created_at).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    
                    {/* Branch name */}
                    {pr.branch_name && (
                      <p className="text-xs font-mono text-[#888888] mb-2 truncate">
                        <span className="text-[#666666]">Branch:</span> {pr.branch_name}
                      </p>
                    )}
                    
                    {/* Repos added in this PR */}
                    {pr.repos_added.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs text-[#666666] mb-1 font-mono">Repositories:</p>
                        <div className="flex flex-wrap gap-1">
                          {pr.repos_added.slice(0, 3).map((repoName) => (
                            <span
                              key={repoName}
                              className="text-xs bg-[#2a2a4a] px-2 py-1 text-[#a0a0a0] font-mono"
                            >
                              {repoName.split("/")[1] || repoName}
                            </span>
                          ))}
                          {pr.repos_added.length > 3 && (
                            <span className="text-xs bg-[#2a2a4a] px-2 py-1 text-[#666666] font-mono">
                              +{pr.repos_added.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Open PR Button */}
                  <a
                    href={pr.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 bg-[#39ff14]/10 hover:bg-[#39ff14]/20 text-[#39ff14] border border-[#39ff14] text-xs font-medium uppercase tracking-wide transition-all"
                  >
                    Open
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="square"
                        strokeLinejoin="miter"
                        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {newRepos.length === 0 &&
        processedRepos.length === 0 &&
        skippedRepos.length === 0 && (
          <div className="bg-[#1a1a2e] border-2 border-[#2a2a4a] p-8 text-center">
            <svg
              className="w-16 h-16 mx-auto text-[#666666] mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="square"
                strokeLinejoin="miter"
                d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
              />
            </svg>
            <p className="text-sm text-[#666666] font-mono uppercase tracking-widest">
              No repositories found in this scan
            </p>
          </div>
        )}
    </div>
  );
}

// Status Badge Component
function StatusBadge({ status }) {
  const getStatusConfig = () => {
    switch (status) {
      case "pending":
        return {
          icon: "⏳",
          color: "text-[#FFA500]",
          bgColor: "bg-[#FFA500]/10",
          borderColor: "border-[#FFA500]",
          label: "Pending",
        };
      case "processing":
        return {
          icon: "⚙️",
          color: "text-[#3498DB]",
          bgColor: "bg-[#3498DB]/10",
          borderColor: "border-[#3498DB]",
          label: "Processing",
        };
      case "completed":
        return {
          icon: "✅",
          color: "text-[#2ECC71]",
          bgColor: "bg-[#2ECC71]/10",
          borderColor: "border-[#2ECC71]",
          label: "Completed",
        };
      case "failed":
        return {
          icon: "❌",
          color: "text-[#E74C3C]",
          bgColor: "bg-[#E74C3C]/10",
          borderColor: "border-[#E74C3C]",
          label: "Failed",
        };
      default:
        return {
          icon: "•",
          color: "text-[#666666]",
          bgColor: "bg-[#666666]/10",
          borderColor: "border-[#666666]",
          label: "Unknown",
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 ${config.bgColor} border ${config.borderColor}`}
    >
      <span className="text-sm">{config.icon}</span>
      <span
        className={`text-xs font-bold ${config.color} uppercase tracking-widest`}
      >
        {config.label}
      </span>
    </div>
  );
}

// Repo Card Component
function RepoCard({ repo, variant = "default", expandable = false }) {
  const borderColor =
    variant === "success"
      ? "border-[#39ff14]/30"
      : variant === "warning"
        ? "border-[#FFA500]/30"
        : "border-[#2a2a4a]";
  const hoverBorder =
    variant === "success"
      ? "hover:border-[#39ff14]"
      : variant === "warning"
        ? "hover:border-[#FFA500]"
        : "hover:border-[#4cc9f0]";

  return (
    <div
      className={`flex items-center justify-between py-3 px-4 bg-[#0a0a0f] border ${borderColor} ${hoverBorder} transition-colors`}
    >
      <div className="flex items-center gap-3">
        <svg
          className="w-5 h-5 text-[#666666]"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          />
        </svg>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#e8e8e8] font-medium">
              {repo.name}
            </span>
            {repo.private && (
              <span className="text-[10px] text-[#FFA500] bg-[#FFA500]/10 px-1.5 py-0.5 border border-[#FFA500]">
                PRIVATE
              </span>
            )}
            {expandable && (
              <svg
                className="w-3 h-3 text-[#666666]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
          {repo.description && (
            <p className="text-xs text-[#666666] mt-0.5 line-clamp-1">
              {repo.description}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3">
        {repo.language && (
          <span className="text-xs text-[#4cc9f0] bg-[#4cc9f0]/10 px-2 py-1 border border-[#4cc9f0] font-mono">
            {repo.language}
          </span>
        )}
        {repo.stargazers_count !== undefined && (
          <div className="flex items-center gap-1 text-xs text-[#666666]">
            <svg
              className="w-3.5 h-3.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {repo.stargazers_count}
          </div>
        )}
        {repo.html_url && (
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#4cc9f0] hover:text-[#f72585] transition-colors font-mono uppercase"
            onClick={(e) => e.stopPropagation()}
          >
            View →
          </a>
        )}
      </div>
    </div>
  );
}
