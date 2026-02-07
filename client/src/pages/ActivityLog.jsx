import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { Badge } from '../components/ui';

export default function ActivityLog() {
    const [scans, setScans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('all'); // all, completed, failed, pending
    const [expandedIds, setExpandedIds] = useState(new Set());

    useEffect(() => {
        fetchScans();
    }, []);

    const fetchScans = async () => {
        try {
            setLoading(true);
            const response = await api.get('/scan/results');
            setScans(response.data.scans || []);
        } catch (err) {
            console.error('Failed to fetch scans:', err);
            setError('Failed to load activity log');
        } finally {
            setLoading(false);
        }
    };

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

    const expandAll = () => {
        setExpandedIds(new Set(filteredScans.map(s => s.id)));
    };

    const collapseAll = () => {
        setExpandedIds(new Set());
    };

    const filteredScans = scans.filter(scan => {
        if (filter === 'all') return true;
        return scan.status === filter;
    });

    const stats = {
        total: scans.length,
        completed: scans.filter(s => s.status === 'completed').length,
        failed: scans.filter(s => s.status === 'failed').length,
        pending: scans.filter(s => s.status === 'pending' || s.status === 'running').length,
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'completed':
                return <Badge variant="success" dot>Completed</Badge>;
            case 'failed':
                return <Badge variant="error" dot>Failed</Badge>;
            case 'running':
                return <Badge variant="info" dot>Running</Badge>;
            case 'pending':
                return <Badge variant="warning" dot>Pending</Badge>;
            default:
                return <Badge variant="neutral">{status}</Badge>;
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const formatDuration = (startTime, endTime) => {
        if (!startTime || !endTime) return '-';
        const duration = new Date(endTime) - new Date(startTime);
        const seconds = Math.floor(duration / 1000);
        if (seconds < 60) return `${seconds}s`;
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}m ${remainingSeconds}s`;
    };

    if (loading) {
        return (
            <div className="p-6 md:p-8">
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
            <div className="p-6 md:p-8">
                <div className="border-2 border-[#ff3366] bg-[rgba(255,51,102,0.1)] p-6 text-center">
                    <svg className="w-12 h-12 text-[#ff3366] mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
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
        <div className="p-6 md:p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-[#e8e8e8] tracking-wide uppercase mb-2">
                    Activity Log
                </h1>
                <p className="text-[#666666] font-mono text-sm">
                    // Complete history of portfolio sync operations
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-[#1a1a2e] border-2 border-[#2a2a4a] p-4">
                    <p className="text-[10px] text-[#666666] font-mono uppercase tracking-widest mb-2">
                        // Total Scans
                    </p>
                    <p className="text-3xl font-bold text-[#e8e8e8]">{stats.total}</p>
                </div>
                <div className="bg-[#1a1a2e] border-2 border-[#39ff14] p-4">
                    <p className="text-[10px] text-[#666666] font-mono uppercase tracking-widest mb-2">
                        // Completed
                    </p>
                    <p className="text-3xl font-bold text-[#39ff14]">{stats.completed}</p>
                </div>
                <div className="bg-[#1a1a2e] border-2 border-[#ff3366] p-4">
                    <p className="text-[10px] text-[#666666] font-mono uppercase tracking-widest mb-2">
                        // Failed
                    </p>
                    <p className="text-3xl font-bold text-[#ff3366]">{stats.failed}</p>
                </div>
                <div className="bg-[#1a1a2e] border-2 border-[#ffcc00] p-4">
                    <p className="text-[10px] text-[#666666] font-mono uppercase tracking-widest mb-2">
                        // Pending
                    </p>
                    <p className="text-3xl font-bold text-[#ffcc00]">{stats.pending}</p>
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
                            className={`px-4 py-2 text-xs font-bold uppercase tracking-wide transition-all border-2 ${filter === f
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
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-[#666666] font-mono text-sm">
                        {filter === 'all'
                            ? '// No scans found. Run your first scan to get started.'
                            : `// No ${filter} scans found.`
                        }
                    </p>
                </div>
            ) : (
                <div className="space-y-3">
                    {filteredScans.map((scan) => (
                        <div
                            key={scan.id}
                            className="bg-[#1a1a2e] border-2 border-[#2a2a4a] hover:border-[#4cc9f0] transition-colors"
                        >
                            {/* Header Row */}
                            <button
                                onClick={() => toggleExpand(scan.id)}
                                className="w-full flex items-center justify-between px-4 py-4 text-left"
                            >
                                <div className="flex items-center gap-4">
                                    {/* Status Indicator */}
                                    <div className={`w-3 h-3 ${scan.status === 'completed' ? 'bg-[#39ff14]' :
                                            scan.status === 'failed' ? 'bg-[#ff3366]' :
                                                scan.status === 'running' ? 'bg-[#4cc9f0] animate-pulse' :
                                                    'bg-[#ffcc00]'
                                        }`} />

                                    {/* Date & Time */}
                                    <div>
                                        <p className="text-[#e8e8e8] font-mono text-sm">
                                            {formatDate(scan.createdAt)}
                                        </p>
                                        <p className="text-[#666666] text-xs font-mono">
                                            ID: {scan.id}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6">
                                    {/* Quick Stats */}
                                    <div className="hidden md:flex items-center gap-6 text-xs">
                                        <div className="text-center">
                                            <p className="text-[#666666] font-mono">Repos</p>
                                            <p className="text-[#e8e8e8] font-bold">{scan.reposFound ?? 0}</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-[#666666] font-mono">Qualified</p>
                                            <p className="text-[#39ff14] font-bold">{scan.qualifiedCount ?? 0}</p>
                                        </div>
                                        {scan.prCreated && (
                                            <Badge variant="success" size="sm">PR Created</Badge>
                                        )}
                                    </div>

                                    {/* Status Badge */}
                                    {getStatusBadge(scan.status)}

                                    {/* Expand Icon */}
                                    <svg
                                        className={`w-5 h-5 text-[#4cc9f0] transition-transform ${expandedIds.has(scan.id) ? 'rotate-180' : ''
                                            }`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </div>
                            </button>

                            {/* Expanded Details */}
                            {expandedIds.has(scan.id) && (
                                <div className="border-t-2 border-[#2a2a4a] px-4 py-4">
                                    {/* Detailed Stats Grid */}
                                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                                        <div className="bg-[#0a0a0f] border border-[#2a2a4a] p-3">
                                            <p className="text-[10px] text-[#666666] font-mono uppercase">Repos Found</p>
                                            <p className="text-xl font-bold text-[#e8e8e8]">{scan.reposFound ?? 0}</p>
                                        </div>
                                        <div className="bg-[#0a0a0f] border border-[#2a2a4a] p-3">
                                            <p className="text-[10px] text-[#666666] font-mono uppercase">New Repos</p>
                                            <p className="text-xl font-bold text-[#4cc9f0]">{scan.newReposCount ?? 0}</p>
                                        </div>
                                        <div className="bg-[#0a0a0f] border border-[#2a2a4a] p-3">
                                            <p className="text-[10px] text-[#666666] font-mono uppercase">Qualified</p>
                                            <p className="text-xl font-bold text-[#39ff14]">{scan.qualifiedCount ?? 0}</p>
                                        </div>
                                        <div className="bg-[#0a0a0f] border border-[#2a2a4a] p-3">
                                            <p className="text-[10px] text-[#666666] font-mono uppercase">Skipped</p>
                                            <p className="text-xl font-bold text-[#ffcc00]">{scan.skippedCount ?? 0}</p>
                                        </div>
                                        <div className="bg-[#0a0a0f] border border-[#2a2a4a] p-3">
                                            <p className="text-[10px] text-[#666666] font-mono uppercase">Duration</p>
                                            <p className="text-xl font-bold text-[#a0a0a0]">
                                                {formatDuration(scan.createdAt, scan.completedAt)}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Error Message */}
                                    {scan.status === 'failed' && scan.errorMessage && (
                                        <div className="mb-4 bg-[rgba(255,51,102,0.1)] border border-[#ff3366] p-3">
                                            <p className="text-[10px] text-[#ff3366] font-mono uppercase mb-1">Error</p>
                                            <p className="text-sm text-[#ff3366] font-mono">{scan.errorMessage}</p>
                                        </div>
                                    )}

                                    {/* Actions */}
                                    <div className="flex items-center gap-4">
                                        <Link
                                            to={`/scan/${scan.id}`}
                                            className="inline-flex items-center gap-2 px-4 py-2 border-2 border-[#4cc9f0] text-[#4cc9f0] font-bold uppercase text-xs hover:bg-[#4cc9f0] hover:text-[#0a0a0f] transition-all"
                                        >
                                            View Full Details
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                            </svg>
                                        </Link>

                                        {scan.prUrl && (
                                            <a
                                                href={scan.prUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 px-4 py-2 border-2 border-[#39ff14] text-[#39ff14] font-bold uppercase text-xs hover:bg-[#39ff14] hover:text-[#0a0a0f] transition-all"
                                            >
                                                View Pull Request
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                                </svg>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
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
