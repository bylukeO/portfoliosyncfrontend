import { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import { useToast } from "../components/Toast";

export default function ScanDetail() {
  const { id } = useParams();
  const toast = useToast();
  const [scan, setScan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("new"); // 'new', 'processed', 'skipped'

  const fetchScan = useCallback(async () => {
    try {
      setError(null);
      const { data } = await api.get(`/scans/${id}`);
      // API returns: { success: true, result: {...} }
      setScan(data.result || data);
    } catch (err) {
      console.error("Failed to load scan:", err);
      setError(err.response?.data?.error || "Failed to load scan details");
      toast(
        err.response?.data?.error || "Failed to load scan details",
        "error",
      );
    } finally {
      setLoading(false);
    }
  }, [id, toast]);

  useEffect(() => {
    fetchScan();
  }, [fetchScan]);

  // Get status styling
  const getStatusConfig = (status) => {
    switch (status) {
      case "completed":
        return {
          label: "Completed",
          color: "text-[#39ff14]",
          bg: "bg-[#39ff14]/10",
          border: "border-[#39ff14]",
          icon: "✅",
        };
      case "processing":
        return {
          label: "Processing",
          color: "text-[#4cc9f0]",
          bg: "bg-[#4cc9f0]/10",
          border: "border-[#4cc9f0]",
          icon: "⚙️",
        };
      case "failed":
        return {
          label: "Failed",
          color: "text-[#ff3366]",
          bg: "bg-[#ff3366]/10",
          border: "border-[#ff3366]",
          icon: "❌",
        };
      case "pending":
        return {
          label: "Pending",
          color: "text-[#FFA500]",
          bg: "bg-[#FFA500]/10",
          border: "border-[#FFA500]",
          icon: "⏳",
        };
      default:
        return {
          label: status || "Unknown",
          color: "text-[#666666]",
          bg: "bg-[#666666]/10",
          border: "border-[#666666]",
          icon: "❓",
        };
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown";
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="p-6 md:p-8 max-w-5xl mx-auto">
        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="h-4 w-32 bg-[#2a2a4a] animate-pulse mb-4" />
          <div className="h-8 w-64 bg-[#2a2a4a] animate-pulse mb-2" />
          <div className="h-4 w-48 bg-[#2a2a4a] animate-pulse" />
        </div>

        {/* Stats Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-24 bg-[#1a1a2e] border-2 border-[#2a2a4a] animate-pulse"
            />
          ))}
        </div>

        {/* Content Skeleton */}
        <div className="bg-[#1a1a2e] border-2 border-[#2a2a4a] p-6">
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-16 bg-[#0a0a0f] border border-[#2a2a4a] animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !scan) {
    return (
      <div className="p-6 md:p-8 max-w-5xl mx-auto">
        <div className="border-2 border-[#ff3366] bg-[rgba(255,51,102,0.1)] p-8 text-center">
          <svg
            className="w-16 h-16 text-[#ff3366] mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="square"
              strokeLinejoin="miter"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
          <p className="text-[#ff3366] font-mono mb-4">
            {error || "Scan not found"}
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 px-4 py-2 border-2 border-[#4cc9f0] text-[#4cc9f0] font-bold uppercase text-sm hover:bg-[#4cc9f0] hover:text-[#0a0a0f] transition-all"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="square"
                strokeLinejoin="miter"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  // Extract data from API response
  const newRepos = scan.new_repos || [];
  const processedRepos = scan.processed_repos || [];
  const skippedRepos = scan.skipped_repos || [];
  const prUrls = scan.pr_urls || [];
  const scanDate = scan.scanned_at || scan.created_at;
  const statusConfig = getStatusConfig(scan.status);

  // Get active tab repos
  const getActiveRepos = () => {
    switch (activeTab) {
      case "new":
        return newRepos;
      case "processed":
        return processedRepos;
      case "skipped":
        return skippedRepos;
      default:
        return newRepos;
    }
  };

  const activeRepos = getActiveRepos();

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link
          to="/activity"
          className="inline-flex items-center gap-2 text-sm text-[#4cc9f0] hover:text-[#f72585] transition-colors mb-4 font-mono"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="square"
              strokeLinejoin="miter"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          Back to Activity Log
        </Link>

        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl md:text-3xl font-bold text-[#e8e8e8] tracking-wide uppercase">
                Scan Details
              </h1>
              <div
                className={`inline-flex items-center gap-2 px-3 py-1.5 ${statusConfig.bg} border ${statusConfig.border}`}
              >
                <span className="text-sm">{statusConfig.icon}</span>
                <span
                  className={`text-xs font-bold ${statusConfig.color} uppercase tracking-widest`}
                >
                  {statusConfig.label}
                </span>
              </div>
            </div>
            <p className="text-[#666666] font-mono text-sm">
              <span className="text-[#f72585]">&gt;</span> Scan ID: #{scan.id} •{" "}
              {formatDate(scanDate)}
            </p>
          </div>

          {/* PR Links */}
          {prUrls.length > 0 && (
            <div className="flex flex-col gap-2">
              {prUrls.map((url, idx) => (
                <a
                  key={idx}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 border-2 border-[#39ff14] text-[#39ff14] font-bold uppercase text-xs hover:bg-[#39ff14] hover:text-[#0a0a0f] transition-all"
                >
                  {prUrls.length > 1
                    ? `View PR #${idx + 1}`
                    : "View Pull Request"}
                  <svg
                    className="w-4 h-4"
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
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#1a1a2e] border-2 border-[#4cc9f0] p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border-2 border-[#4cc9f0] bg-[#0a0a0f] flex items-center justify-center">
              <svg
                className="w-5 h-5 text-[#4cc9f0]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="square" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </div>
            <div>
              <p className="text-[10px] text-[#666666] font-mono uppercase tracking-widest">
                New Repos
              </p>
              <p className="text-2xl font-bold text-[#4cc9f0]">
                {newRepos.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#1a1a2e] border-2 border-[#39ff14] p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border-2 border-[#39ff14] bg-[#0a0a0f] flex items-center justify-center">
              <svg
                className="w-5 h-5 text-[#39ff14]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="square" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-[10px] text-[#666666] font-mono uppercase tracking-widest">
                Qualified
              </p>
              <p className="text-2xl font-bold text-[#39ff14]">
                {processedRepos.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#1a1a2e] border-2 border-[#FFA500] p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border-2 border-[#FFA500] bg-[#0a0a0f] flex items-center justify-center">
              <svg
                className="w-5 h-5 text-[#FFA500]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="square"
                  d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                />
              </svg>
            </div>
            <div>
              <p className="text-[10px] text-[#666666] font-mono uppercase tracking-widest">
                Skipped
              </p>
              <p className="text-2xl font-bold text-[#FFA500]">
                {skippedRepos.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#1a1a2e] border-2 border-[#f72585] p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border-2 border-[#f72585] bg-[#0a0a0f] flex items-center justify-center">
              <svg
                className="w-5 h-5 text-[#f72585]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="square"
                  d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757"
                />
              </svg>
            </div>
            <div>
              <p className="text-[10px] text-[#666666] font-mono uppercase tracking-widest">
                PRs Created
              </p>
              <p className="text-2xl font-bold text-[#f72585]">
                {prUrls.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Repository Tabs */}
      <div className="bg-[#1a1a2e] border-2 border-[#2a2a4a]">
        {/* Tab Header */}
        <div className="flex border-b-2 border-[#2a2a4a]">
          <button
            onClick={() => setActiveTab("new")}
            className={`flex-1 px-4 py-3 text-xs font-bold uppercase tracking-widest transition-colors ${
              activeTab === "new"
                ? "bg-[#4cc9f0] text-[#0a0a0f]"
                : "text-[#666666] hover:text-[#4cc9f0] hover:bg-[#0a0a0f]"
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              New Repos
              <span
                className={`px-1.5 py-0.5 text-[10px] ${activeTab === "new" ? "bg-[#0a0a0f] text-[#4cc9f0]" : "bg-[#4cc9f0]/20 text-[#4cc9f0]"}`}
              >
                {newRepos.length}
              </span>
            </span>
          </button>
          <button
            onClick={() => setActiveTab("processed")}
            className={`flex-1 px-4 py-3 text-xs font-bold uppercase tracking-widest transition-colors border-l-2 border-[#2a2a4a] ${
              activeTab === "processed"
                ? "bg-[#39ff14] text-[#0a0a0f]"
                : "text-[#666666] hover:text-[#39ff14] hover:bg-[#0a0a0f]"
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              Qualified
              <span
                className={`px-1.5 py-0.5 text-[10px] ${activeTab === "processed" ? "bg-[#0a0a0f] text-[#39ff14]" : "bg-[#39ff14]/20 text-[#39ff14]"}`}
              >
                {processedRepos.length}
              </span>
            </span>
          </button>
          <button
            onClick={() => setActiveTab("skipped")}
            className={`flex-1 px-4 py-3 text-xs font-bold uppercase tracking-widest transition-colors border-l-2 border-[#2a2a4a] ${
              activeTab === "skipped"
                ? "bg-[#FFA500] text-[#0a0a0f]"
                : "text-[#666666] hover:text-[#FFA500] hover:bg-[#0a0a0f]"
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              Skipped
              <span
                className={`px-1.5 py-0.5 text-[10px] ${activeTab === "skipped" ? "bg-[#0a0a0f] text-[#FFA500]" : "bg-[#FFA500]/20 text-[#FFA500]"}`}
              >
                {skippedRepos.length}
              </span>
            </span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-4">
          {activeRepos.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="w-12 h-12 text-[#2a2a4a] mx-auto mb-3"
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
                No{" "}
                {activeTab === "new"
                  ? "new"
                  : activeTab === "processed"
                    ? "qualified"
                    : "skipped"}{" "}
                repositories
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {activeRepos.map((repo, idx) => {
                // Handle both string and object formats
                const repoName =
                  typeof repo === "string"
                    ? repo
                    : repo.name || repo.full_name || "Unknown";
                const repoFullName =
                  typeof repo === "string"
                    ? repo
                    : repo.full_name || repo.name || "Unknown";
                const repoUrl =
                  typeof repo === "string"
                    ? `https://github.com/${repo}`
                    : repo.html_url || `https://github.com/${repoFullName}`;
                const repoDescription =
                  typeof repo === "object" ? repo.description : null;
                const repoCreatedAt =
                  typeof repo === "object" ? repo.created_at : null;
                const repoReason =
                  typeof repo === "object" ? repo.reason : null;

                const borderColor =
                  activeTab === "new"
                    ? "border-[#4cc9f0]/30 hover:border-[#4cc9f0]"
                    : activeTab === "processed"
                      ? "border-[#39ff14]/30 hover:border-[#39ff14]"
                      : "border-[#FFA500]/30 hover:border-[#FFA500]";

                return (
                  <div
                    key={idx}
                    className={`bg-[#0a0a0f] border-2 ${borderColor} p-4 transition-colors`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <svg
                            className="w-4 h-4 text-[#666666] flex-shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="square"
                              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                            />
                          </svg>
                          <a
                            href={repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#e8e8e8] font-mono text-sm hover:text-[#4cc9f0] transition-colors truncate"
                          >
                            {repoFullName}
                          </a>
                        </div>
                        {repoDescription && (
                          <p className="text-xs text-[#666666] mt-1 line-clamp-2 ml-6">
                            {repoDescription}
                          </p>
                        )}
                        {repoCreatedAt && (
                          <p className="text-[10px] text-[#444455] font-mono mt-1 ml-6">
                            Created:{" "}
                            {new Date(repoCreatedAt).toLocaleDateString()}
                          </p>
                        )}
                        {repoReason && activeTab === "skipped" && (
                          <p className="text-xs text-[#FFA500] mt-2 ml-6 bg-[#FFA500]/10 px-2 py-1 inline-block">
                            Reason: {repoReason}
                          </p>
                        )}
                      </div>
                      <a
                        href={repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 ml-4 p-2 text-[#666666] hover:text-[#4cc9f0] transition-colors"
                      >
                        <svg
                          className="w-4 h-4"
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
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Error Message for Failed Scans */}
      {scan.status === "failed" && scan.error && (
        <div className="mt-6 bg-[rgba(255,51,102,0.1)] border-2 border-[#ff3366] p-4">
          <div className="flex items-start gap-3">
            <svg
              className="w-5 h-5 text-[#ff3366] flex-shrink-0 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="square"
                strokeLinejoin="miter"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
            <div>
              <p className="text-[10px] text-[#ff3366] font-mono uppercase tracking-widest mb-1">
                Error Message
              </p>
              <p className="text-sm text-[#ff3366] font-mono">{scan.error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-[10px] text-[#444455] font-mono">
          // Scan ID: #{scan.id} • User ID: {scan.user_id} • Status:{" "}
          {scan.status}
        </p>
      </div>
    </div>
  );
}
