import { useState, useEffect, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useToast } from "../components/Toast";
import ScanResults from "../components/ScanResults";

export default function ScanDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [scan, setScan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // Handle PR created from selection
  const handlePRCreated = async (prData) => {
    await fetchScan(); // Refresh scan data
    if (prData.pr_url) {
      toast(`🔗 View PR: ${prData.pr_url}`, 'info');
    }
  };

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

      {/* Scan Results with Selection Capability */}
      <ScanResults scan={scan} onPRCreated={handlePRCreated} />
    </div>
  );
}
