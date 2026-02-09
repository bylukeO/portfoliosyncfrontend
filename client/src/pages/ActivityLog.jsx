import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function ActivityLog() {
    const [scans, setScans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('all'); // all, completed, failed, pending, processing
    const [expandedIds, setExpandedIds] = useState(new Set());

    // Fetch scans from correct API endpoint
    const fetchScans = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const { data } = await api.get('/scans');
            // API returns: { success: true, results: [...] }
            setScans(data.results || []);
        } catch (err) {
            console.error('Failed to fetch scans:', err);
            setError('Failed to load activity log');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchScans();
    }, [fetchScans]);

    const toggleExpand = (id) => {
        setExpandedIds(prev => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    };

    const filteredScans = scans.filter(scan => {
        if (filter === 'all') return true;
        if (filter === 'pending') {
            return scan.status === 'pending' || scan.status === 'processing';
        }
        return scan.status === filter;
    });

    const expandAll = () => {
        setExpandedIds(new Set(filteredScans.map(s => s.id)));
    };

    const collapseAll = () => {
        setExpandedIds(new Set());
    };

    // Calculate stats from actual API data
    const stats = {
        total: scans.length,
        completed: scans.filter(s => s.status === 'completed').length,
        failed: scans.filter(s => s.status === 'failed').length,
        pending: scans.filter(s => s.status === 'pending' || s.status === 'processing').length,
        totalRepos: scans.reduce((sum, s) => sum + (s.new_repos?.length || 0), 0),
        totalProcessed: scans.reduce((sum, s) => sum + (s.processed_repos?.length || 0), 0),
        totalPRs: scans.reduce((sum, s) => sum + (s.pr_urls?.length || 0), 0),
    };

    // Get status color
    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'bg-[#39ff14]';
            case 'failed': return 'bg-[#ff3366]';
            case 'processing': return 'bg-[#4cc9f0] animate-pulse';
            case 'pending': return 'bg-[#FFA500] animate-pulse';
            default: return 'bg-[#666666]';
        }
    };

    // Get status badge
    const getStatusBadge = (status) => {
        const config = {
            completed: { label: 'Completed', color: 'text-[#39ff14]', bg: 'bg-[#39ff14]/10', border: 'border-[#39ff14]' },
            processing: { label: 'Processing', color: 'text-[#4cc9f0]', bg: 'bg-[#4cc9f0]/10', border: 'border-[#4cc9f0]' },
            failed: { label: 'Failed', color: 'text-[#ff3366]', bg: 'bg-[#ff3366]/10', border: 'border-[#ff3366]' },
            pending: { label: 'Pending', color: 'text-[#FFA500]', bg: 'bg-[#FFA500]/10', border: 'border-[#FFA500]' },
        };
        const c = config[status] || config.pending;
        return (
            <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 ${c.color} ${c.bg} border ${c.border}`}>
                {c.label}
            </span>
        );
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Unknown';
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    if (loading) {
        return (
            <div className="p-6 md:p-8 max-w-5xl mx-auto">
                {/* Header Skeleton */}
                <div className="mb-8">
                    <div className="h-8 w-48 bg-[#2a2a4a] animate-pulse mb-2" />
                    <div className="h-4 w-64 bg-[#2a2a4a] animate-pulse" />
                </div>

                {/* Stats Skeleton */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-24 bg-[#1a1a2e] border-2 border-[#2a2a4a] animate-pulse" />
                    ))}
                </div>

                {/* List Skeleton */}
                <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="h-20 bg-[#1a1a2e] border-2 border-[#2a2a4a] animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 md:p-8 max-w-5xl mx-auto">
                <div className="border-2 border-[#ff3366] bg-[rgba(255,51,102,0.1)] p-6 text-center">
                    <svg className="w-12 h-12 text-[#ff3366] mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="square" strokeLinejoin="miter" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                    </svg>
                    <p className="text-[#ff3366] font-mono mb-4">{error}</p>
                    <button
                        onClick={fetchScans}
                        className="px-4 py-2 border-2 border-[#4cc9f0] text-[#4cc9f0] font-bold uppercase text-sm hover:bg-[#4cc9f0] hover:text-[#0a0a0f] transition-all"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 md:p-8 max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl md:text-3xl font-bold text-[#e8e8e8] tracking-wide uppercase">
                        Activity Log
                    </h1>
                    <span className="w-2 h-2 bg-[#39ff14] animate-pulse shadow-[0_0_8px_rgba(57,255,20,0.6)]" />
                </div>
                <p className="text-[#666666] font-mono text-sm">
                    <span className="text-[#f72585]">&gt;</span> Complete history of portfolio sync operations
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-[#1a1a2e] border-2 border-[#2a2a4a] p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 border-2 border-[#4cc9f0] bg-[#0a0a0f] flex items-center justify-center">
                            <svg className="w-5 h-5 text-[#4cc9f0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="square" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-[10px] text-[#666666] font-mono uppercase tracking-widest">Total Scans</p>
                            <p className="text-2xl font-bold text-[#e8e8e8]">{stats.total}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-[#1a1a2e] border-2 border-[#39ff14] p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 border-2 border-[#39ff14] bg-[#0a0a0f] flex items-center justify-center">
                            <svg className="w-5 h-5 text-[#39ff14]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="square" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-[10px] text-[#666666] font-mono uppercase tracking-widest">Completed</p>
                            <p className="text-2xl font-bold text-[#39ff14]">{stats.completed}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-[#1a1a2e] border-2 border-[#ff3366] p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 border-2 border-[#ff3366] bg-[#0a0a0f] flex items-center justify-center">
                            <svg className="w-5 h-5 text-[#ff3366]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="square" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-[10px] text-[#666666] font-mono uppercase tracking-widest">Failed</p>
                            <p className="text-2xl font-bold text-[#ff3366]">{stats.failed}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-[#1a1a2e] border-2 border-[#FFA500] p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 border-2 border-[#FFA500] bg-[#0a0a0f] flex items-center justify-center">
                            <svg className="w-5 h-5 text-[#FFA500]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="square" d="M12 6v6l4 2" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-[10px] text-[#666666] font-mono uppercase tracking-widest">Pending</p>
                            <p className="text-2xl font-bold text-[#FFA500]">{stats.pending}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Secondary Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-[#0a0a0f] border border-[#2a2a4a] p-4 text-center">
                    <p className="text-[10px] text-[#666666] uppercase tracking-widest mb-1">Total Repos Found</p>
                    <p className="text-xl font-bold text-[#4cc9f0]">{stats.totalRepos}</p>
                </div>
                <div className="bg-[#0a0a0f] border border-[#2a2a4a] p-4 text-center">
                    <p className="text-[10px] text-[#666666] uppercase tracking-widest mb-1">Repos Processed</p>
                    <p className="text-xl font-bold text-[#39ff14]">{stats.totalProcessed}</p>
                </div>
                <div className="bg-[#0a0a0f] border border-[#2a2a4a] p-4 text-center">
                    <p className="text-[10px] text-[#666666] uppercase tracking-widest mb-1">PRs Created</p>
                    <p className="text-xl font-bold text-[#f72585]">{stats.totalPRs}</p>
                </div>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                {/* Filter Tabs */}
                <div className="flex gap-2">
                    {['all', 'completed', 'failed', 'pending'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 text-xs font-bold uppercase tracking-wide transition-all border-2 ${
                                filter === f
                                    ? 'border-[#f72585] bg-[#f72585] text-[#0a0a0f]'
                                    : 'border-[#2a2a4a] text-[#a0a0a0] hover:border-[#4cc9f0] hover:text-[#4cc9f0]'
                            }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {/* Expand/Collapse */}
                <div className="flex gap-2">
                    <button
                        onClick={expandAll}
                        className="px-3 py-2 text-xs font-mono text-[#4cc9f0] hover:text-[#e8e8e8] transition-colors"
                    >
                        [Expand All]
                    </button>
                    <button
                        onClick={collapseAll}
                        className="px-3 py-2 text-xs font-mono text-[#4cc9f0] hover:text-[#e8e8e8] transition-colors"
                    >
                        [Collapse All]
                    </button>
                </div>
            </div>

            {/* Scans List */}
            {filteredScans.length === 0 ? (
                <div className="border-2 border-[#2a2a4a] bg-[#1a1a2e] p-12 text-center">
                    <svg className="w-16 h-16 text-[#2a2a4a] mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="square" strokeLinejoin="miter" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-[#666666] font-mono text-sm">
                        {filter === 'all'
                            ? '// No scans found. Run your first scan to get started.'
                            : `// No ${filter} scans found.`
                        }
                    </p>
                    <Link
                        to="/dashboard"
                        className="inline-block mt-4 px-4 py-2 border-2 border-[#f72585] text-[#f72585] font-bold uppercase text-xs hover:bg-[#f72585] hover:text-[#0a0a0f] transition-all"
                    >
                        Go to Dashboard
                    </Link>
                </div>
            ) : (
                <div className="space-y-3">
                    {filteredScans.map((scan) => {
                        const newRepos = scan.new_repos || [];
                        const processedRepos = scan.processed_repos || [];
                        const skippedRepos = scan.skipped_repos || [];
                        const prUrls = scan.pr_urls || [];
                        const scanDate = scan.scanned_at || scan.created_at;
                        const isExpanded = expandedIds.has(scan.id);

                        return (
                            <div
                                key={scan.id}
                                className="bg-[#1a1a2e] border-2 border-[#2a2a4a] hover:border-[#4cc9f0] transition-colors overflow-hidden"
                            >
                                {/* Header Row */}
                                <button
                                    onClick={() => toggleExpand(scan.id)}
                                    className="w-full flex items-center justify-between px-4 py-4 text-left"
                                >
                                    <div className="flex items-center gap-4">
                                        {/* Status Indicator */}
                                        <div className={`w-3 h-3 ${getStatusColor(scan.status)}`} />

                                        {/* Date & Time */}
                                        <div>
                                            <p className="text-[#e8e8e8] font-mono text-sm">
                                                {formatDate(scanDate)}
                                            </p>
                                            <p className="text-[#666666] text-xs font-mono">
                                                Scan ID: #{scan.id}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        {/* Quick Stats */}
                                        <div className="hidden md:flex items-center gap-4 text-xs">
                                            <span className="text-[#4cc9f0]">{newRepos.length} new</span>
                                            <span className="text-[#39ff14]">{processedRepos.length} qualified</span>
                                            {prUrls.length > 0 && (
                                                <span className="text-[10px] text-[#39ff14] bg-[#39ff14]/10 px-2 py-0.5 border border-[#39ff14]">
                                                    {prUrls.length} PR{prUrls.length > 1 ? 's' : ''}
                                                </span>
                                            )}
                                        </div>

                                        {/* Status Badge */}
                                        {getStatusBadge(scan.status)}

                                        {/* Expand Icon */}
                                        <svg
                                            className={`w-5 h-5 text-[#4cc9f0] transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path strokeLinecap="square" strokeLinejoin="miter" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    </div>
                                </button>

                                {/* Expanded Details */}
                                {isExpanded && (
                                    <div className="border-t-2 border-[#2a2a4a] px-4 py-4">
                                        {/* Detailed Stats Grid */}
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                            <div className="bg-[#0a0a0f] border border-[#4cc9f0]/30 p-3">
                                                <p className="text-[10px] text-[#666666] font-mono uppercase tracking-widest">New Repos</p>
                                                <p className="text-xl font-bold text-[#4cc9f0]">{newRepos.length}</p>
                                            </div>
                                            <div className="bg-[#0a0a0f] border border-[#39ff14]/30 p-3">
                                                <p className="text-[10px] text-[#666666] font-mono uppercase tracking-widest">Qualified</p>
                                                <p className="text-xl font-bold text-[#39ff14]">{processedRepos.length}</p>
                                            </div>
                                            <div className="bg-[#0a0a0f] border border-[#FFA500]/30 p-3">
                                                <p className="text-[10px] text-[#666666] font-mono uppercase tracking-widest">Skipped</p>
                                                <p className="text-xl font-bold text-[#FFA500]">{skippedRepos.length}</p>
                                            </div>
                                            <div className="bg-[#0a0a0f] border border-[#f72585]/30 p-3">
                                                <p className="text-[10px] text-[#666666] font-mono uppercase tracking-widest">PRs Created</p>
                                                <p className="text-xl font-bold text-[#f72585]">{prUrls.length}</p>
                                            </div>
                                        </div>

                                        {/* Repo Lists Preview */}
                                        {processedRepos.length > 0 && (
                                            <div className="mb-4">
                                                <p className="text-[10px] text-[#39ff14] font-mono uppercase tracking-widest mb-2">
                                                    // Qualified Repositories
                                                </p>
                                                <div className="flex flex-wrap gap-2">
                                                    {processedRepos.slice(0, 5).map((repo, idx) => (
                                                        <span key={idx} className="text-xs bg-[#39ff14]/10 text-[#39ff14] px-2 py-1 border border-[#39ff14]/30 font-mono">
                                                            {typeof repo === 'string' ? repo : (repo.name || repo.full_name || 'Unknown')}
                                                        </span>
                                                    ))}
                                                    {processedRepos.length > 5 && (
                                                        <span className="text-xs text-[#666666] px-2 py-1 font-mono">
                                                            +{processedRepos.length - 5} more
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {skippedRepos.length > 0 && (
                                            <div className="mb-4">
                                                <p className="text-[10px] text-[#FFA500] font-mono uppercase tracking-widest mb-2">
                                                    // Skipped Repositories
                                                </p>
                                                <div className="flex flex-wrap gap-2">
                                                    {skippedRepos.slice(0, 5).map((repo, idx) => (
                                                        <span key={idx} className="text-xs bg-[#FFA500]/10 text-[#FFA500] px-2 py-1 border border-[#FFA500]/30 font-mono">
                                                            {typeof repo === 'string' ? repo : (repo.name || repo.full_name || 'Unknown')}
                                                        </span>
                                                    ))}
                                                    {skippedRepos.length > 5 && (
                                                        <span className="text-xs text-[#666666] px-2 py-1 font-mono">
                                                            +{skippedRepos.length - 5} more
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {/* Error Message for failed scans */}
                                        {scan.status === 'failed' && scan.error && (
                                            <div className="mb-4 bg-[rgba(255,51,102,0.1)] border border-[#ff3366] p-3">
                                                <p className="text-[10px] text-[#ff3366] font-mono uppercase mb-1">Error</p>
                                                <p className="text-sm text-[#ff3366] font-mono">{scan.error}</p>
                                            </div>
                                        )}

                                        {/* Actions */}
                                        <div className="flex flex-wrap items-center gap-3">
                                            <Link
                                                to={`/scan/${scan.id}`}
                                                className="inline-flex items-center gap-2 px-4 py-2 border-2 border-[#4cc9f0] text-[#4cc9f0] font-bold uppercase text-xs hover:bg-[#4cc9f0] hover:text-[#0a0a0f] transition-all"
                                            >
                                                View Full Details
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="square" strokeLinejoin="miter" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                                </svg>
                                            </Link>

                                            {prUrls.length > 0 && prUrls.map((prUrl, idx) => (
                                                <a
                                                    key={idx}
                                                    href={prUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 px-4 py-2 border-2 border-[#39ff14] text-[#39ff14] font-bold uppercase text-xs hover:bg-[#39ff14] hover:text-[#0a0a0f] transition-all"
                                                >
                                                    {prUrls.length > 1 ? `PR #${idx + 1}` : 'View PR'}
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                        <path strokeLinecap="square" strokeLinejoin="miter" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                                    </svg>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Footer */}
            <div className="mt-8 text-center">
                <p className="text-[10px] text-[#444455] font-mono">
                    // Showing {filteredScans.length} of {scans.length} scans
                </p>
            </div>
        </div>
    );
}
