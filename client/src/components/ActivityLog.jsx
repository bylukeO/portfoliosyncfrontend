import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function ActivityLog({ scans = [], loading: scansLoading, showActivities = true }) {
  const [expandedId, setExpandedId] = useState(null);
  const [activities, setActivities] = useState([]);
  const [activitiesLoading, setActivitiesLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('scans'); // 'scans' or 'activity'

  // Fetch activity log from API
  const fetchActivities = useCallback(async () => {
    if (!showActivities) return;
    
    setActivitiesLoading(true);
    try {
      const { data } = await api.get('/activity', {
        params: { limit: 50 }
      });
      // API returns: { success: true, count: number, activities: [...] }
      setActivities(data.activities || []);
    } catch (error) {
      console.error('Error fetching activities:', error);
      // Silently fail - activities are optional
    } finally {
      setActivitiesLoading(false);
    }
  }, [showActivities]);

  useEffect(() => {
    if (showActivities && activeTab === 'activity') {
      fetchActivities();
    }
  }, [fetchActivities, showActivities, activeTab]);

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-[#39ff14]';
      case 'processing':
        return 'bg-[#4cc9f0] animate-pulse';
      case 'failed':
        return 'bg-[#ff3366]';
      case 'pending':
        return 'bg-[#FFA500] animate-pulse';
      default:
        return 'bg-[#666666]';
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
      <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 ${c.color} ${c.bg} border ${c.border}`}>
        {c.label}
      </span>
    );
  };

  // Format date
  const formatDate = (dateStr) => {
    if (!dateStr) return 'Unknown';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Loading state
  if (scansLoading && activeTab === 'scans') {
    return (
      <div className="bg-[#1a1a2e] border-2 border-[#2a2a4a] p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-[#e8e8e8] uppercase tracking-wide">
            <span className="text-[#4cc9f0]">//</span> Activity Log
          </h3>
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-14 bg-[#0a0a0f] border border-[#2a2a4a] animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  // Empty state for scans
  if ((!scans || scans.length === 0) && activeTab === 'scans') {
    return (
      <div className="bg-[#1a1a2e] border-2 border-[#2a2a4a] p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-[#e8e8e8] uppercase tracking-wide">
            <span className="text-[#4cc9f0]">//</span> Activity Log
          </h3>
        </div>
        <div className="text-center py-8">
          <svg className="w-12 h-12 text-[#666666] mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="square" strokeLinejoin="miter" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-[#666666] font-mono uppercase tracking-widest">
            No scans yet // Run your first scan
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1a1a2e] border-2 border-[#2a2a4a] p-6">
      {/* Header with Tabs */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-[#e8e8e8] uppercase tracking-wide">
          <span className="text-[#4cc9f0]">//</span> Activity Log
        </h3>
        {showActivities && (
          <div className="flex border border-[#2a2a4a]">
            <button
              onClick={() => setActiveTab('scans')}
              className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest transition-colors ${
                activeTab === 'scans'
                  ? 'bg-[#4cc9f0] text-[#0a0a0f]'
                  : 'text-[#666666] hover:text-[#4cc9f0]'
              }`}
            >
              Scans
            </button>
            <button
              onClick={() => setActiveTab('activity')}
              className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest transition-colors border-l border-[#2a2a4a] ${
                activeTab === 'activity'
                  ? 'bg-[#f72585] text-[#0a0a0f]'
                  : 'text-[#666666] hover:text-[#f72585]'
              }`}
            >
              Activity
            </button>
          </div>
        )}
      </div>

      {/* Scans Tab */}
      {activeTab === 'scans' && (
        <div className="space-y-2">
          {scans.map((scan) => {
            const newReposCount = scan.new_repos?.length || 0;
            const processedCount = scan.processed_repos?.length || 0;
            const skippedCount = scan.skipped_repos?.length || 0;
            const prUrls = scan.pr_urls || [];
            const scanDate = scan.scanned_at || scan.created_at;
            
            return (
              <div key={scan.id} className="bg-[#0a0a0f] border border-[#2a2a4a] overflow-hidden">
                <button
                  onClick={() => setExpandedId(expandedId === scan.id ? null : scan.id)}
                  className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-[#1a1a2e] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 ${getStatusColor(scan.status)}`} />
                    <span className="text-sm text-[#e8e8e8] font-mono">
                      {formatDate(scanDate)}
                    </span>
                    {getStatusBadge(scan.status)}
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-[#666666] font-mono">
                      <span className="text-[#4cc9f0]">{newReposCount}</span> new • 
                      <span className="text-[#39ff14]"> {processedCount}</span> qualified
                    </span>
                    {prUrls.length > 0 && (
                      <span className="text-[10px] text-[#39ff14] bg-[#39ff14]/10 px-2 py-0.5 border border-[#39ff14]">
                        PR
                      </span>
                    )}
                    <svg
                      className={`w-4 h-4 text-[#666666] transition-transform ${expandedId === scan.id ? 'rotate-180' : ''}`}
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
                {expandedId === scan.id && (
                  <div className="px-4 pb-4 border-t border-[#2a2a4a]">
                    <div className="pt-3 space-y-3">
                      {/* Stats Grid */}
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-[#1a1a2e] border border-[#4cc9f0]/30 p-3">
                          <span className="text-[10px] text-[#666666] uppercase tracking-widest">New Repos</span>
                          <p className="text-lg text-[#4cc9f0] font-bold mt-1">{newReposCount}</p>
                        </div>
                        <div className="bg-[#1a1a2e] border border-[#39ff14]/30 p-3">
                          <span className="text-[10px] text-[#666666] uppercase tracking-widest">Qualified</span>
                          <p className="text-lg text-[#39ff14] font-bold mt-1">{processedCount}</p>
                        </div>
                        <div className="bg-[#1a1a2e] border border-[#FFA500]/30 p-3">
                          <span className="text-[10px] text-[#666666] uppercase tracking-widest">Skipped</span>
                          <p className="text-lg text-[#FFA500] font-bold mt-1">{skippedCount}</p>
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex items-center gap-4">
                        {prUrls.length > 0 && (
                          <a
                            href={prUrls[0]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-[#39ff14] hover:text-[#4cc9f0] transition-colors font-mono uppercase"
                          >
                            View Pull Request →
                          </a>
                        )}
                        <Link
                          to={`/scan/${scan.id}`}
                          className="inline-flex items-center gap-1.5 text-xs text-[#4cc9f0] hover:text-[#f72585] transition-colors font-mono uppercase"
                        >
                          Full Details →
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Activity Tab */}
      {activeTab === 'activity' && (
        <div className="space-y-2">
          {activitiesLoading ? (
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-12 bg-[#0a0a0f] border border-[#2a2a4a] animate-pulse" />
              ))}
            </div>
          ) : activities.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-sm text-[#666666] font-mono uppercase tracking-widest">
                No activity recorded yet
              </p>
            </div>
          ) : (
            activities.map((activity, idx) => (
              <div
                key={activity.id || idx}
                className="bg-[#0a0a0f] border border-[#2a2a4a] px-4 py-3 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <ActivityIcon type={activity.type} />
                  <div>
                    <p className="text-sm text-[#e8e8e8]">{activity.message || activity.action}</p>
                    {activity.details && (
                      <p className="text-xs text-[#666666] mt-0.5 font-mono">{activity.details}</p>
                    )}
                  </div>
                </div>
                <span className="text-[10px] text-[#666666] font-mono">
                  {formatDate(activity.timestamp || activity.created_at)}
                </span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

// Activity Icon Component
function ActivityIcon({ type }) {
  const iconClass = "w-4 h-4";
  
  switch (type) {
    case 'scan_started':
      return (
        <div className="w-6 h-6 bg-[#4cc9f0]/10 border border-[#4cc9f0] flex items-center justify-center">
          <svg className={`${iconClass} text-[#4cc9f0]`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="square" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </div>
      );
    case 'scan_completed':
      return (
        <div className="w-6 h-6 bg-[#39ff14]/10 border border-[#39ff14] flex items-center justify-center">
          <svg className={`${iconClass} text-[#39ff14]`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="square" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      );
    case 'scan_failed':
      return (
        <div className="w-6 h-6 bg-[#ff3366]/10 border border-[#ff3366] flex items-center justify-center">
          <svg className={`${iconClass} text-[#ff3366]`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="square" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      );
    case 'pr_created':
      return (
        <div className="w-6 h-6 bg-[#f72585]/10 border border-[#f72585] flex items-center justify-center">
          <svg className={`${iconClass} text-[#f72585]`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="square" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757" />
          </svg>
        </div>
      );
    default:
      return (
        <div className="w-6 h-6 bg-[#666666]/10 border border-[#666666] flex items-center justify-center">
          <svg className={`${iconClass} text-[#666666]`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="square" d="M12 6v6l4 2" />
          </svg>
        </div>
      );
  }
}
