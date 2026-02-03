import { useState, useEffect } from 'react';
import api from '../api';
import { useToast } from '../components/Toast';

export default function Settings() {
  const toast = useToast();

  // Token state
  const [token, setToken] = useState('');
  const [tokenSaving, setTokenSaving] = useState(false);
  const [tokenValid, setTokenValid] = useState(null); // null | { username }
  const [tokenChecking, setTokenChecking] = useState(true);

  // Portfolio repo state
  const [repos, setRepos] = useState([]);
  const [reposLoading, setReposLoading] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState('');
  const [repoSearch, setRepoSearch] = useState('');
  const [filePath, setFilePath] = useState('');
  const [settingsSaving, setSettingsSaving] = useState(false);

  // Scan frequency
  const [frequency, setFrequency] = useState('daily');
  const [freqSaving, setFreqSaving] = useState(false);

  // Token check is handled by the settings load below
  useEffect(() => {
    setTokenChecking(false);
  }, []);

  // Load settings
  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get('/settings');
        const s = data.settings || data;
        if (s.portfolio_repo) setSelectedRepo(s.portfolio_repo);
        if (s.portfolio_file_path) setFilePath(s.portfolio_file_path);
        if (s.scan_frequency) setFrequency(s.scan_frequency);
        if (s.has_github_token) setTokenValid({ username: 'Connected' });
      } catch {
        // no settings yet
      }
    })();
  }, []);

  // Fetch repos when token is valid
  useEffect(() => {
    if (!tokenValid) return;
    setReposLoading(true);
    (async () => {
      try {
        const { data } = await api.get('/repos/list');
        setRepos(data.repos || []);
      } catch {
        toast('Failed to fetch repos', 'error');
      } finally {
        setReposLoading(false);
      }
    })();
  }, [tokenValid]);

  const saveToken = async () => {
    if (!token.trim()) return;
    setTokenSaving(true);
    try {
      const { data } = await api.post('/auth/token', { token: token.trim() });
      setTokenValid({ username: data.username });
      setToken('');
      toast('Token saved successfully!', 'success');
    } catch (err) {
      toast(err.response?.data?.error || 'Invalid token', 'error');
    } finally {
      setTokenSaving(false);
    }
  };

  const savePortfolioSettings = async () => {
    if (!selectedRepo) return;
    setSettingsSaving(true);
    try {
      await api.put('/settings', {
        portfolio_repo: selectedRepo,
        portfolio_file_path: filePath,
      });
      toast('Portfolio settings saved!', 'success');
    } catch (err) {
      toast(err.response?.data?.error || 'Failed to save settings', 'error');
    } finally {
      setSettingsSaving(false);
    }
  };

  const saveFrequency = async () => {
    setFreqSaving(true);
    try {
      await api.put('/settings', { scan_frequency: frequency });
      toast('Scan frequency updated!', 'success');
    } catch (err) {
      toast(err.response?.data?.error || 'Failed to save frequency', 'error');
    } finally {
      setFreqSaving(false);
    }
  };

  const filteredRepos = repos.filter((r) =>
    r.name?.toLowerCase().includes(repoSearch.toLowerCase())
  );

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-white mb-8">Settings</h2>

      {/* GitHub Token */}
      <section className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 mb-6">
        <h3 className="text-base font-medium text-white mb-1">GitHub Token</h3>
        <p className="text-sm text-slate-400 mb-5">
          Connect your GitHub account to enable repository scanning.
        </p>

        {tokenChecking ? (
          <div className="h-10 bg-slate-700/30 rounded-lg animate-pulse" />
        ) : tokenValid ? (
          <div className="flex items-center gap-3 p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-lg">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-emerald-400">
                Connected as {tokenValid.username}
              </p>
              <p className="text-xs text-slate-500">Token is encrypted at rest</p>
            </div>
            <button
              onClick={() => setTokenValid(null)}
              className="ml-auto text-xs text-slate-500 hover:text-slate-300"
            >
              Change
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="relative">
              <input
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20"
                onKeyDown={(e) => e.key === 'Enter' && saveToken()}
              />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-slate-500">
                Your token is encrypted at rest. We never store it in plain text.
              </p>
              <button
                onClick={saveToken}
                disabled={tokenSaving || !token.trim()}
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-semibold rounded-lg text-sm transition-colors"
              >
                {tokenSaving ? 'Saving...' : 'Save Token'}
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Portfolio Repo */}
      <section className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 mb-6">
        <h3 className="text-base font-medium text-white mb-1">Portfolio Repository</h3>
        <p className="text-sm text-slate-400 mb-5">
          Select the repo and file where your portfolio projects are listed.
        </p>

        <div className="space-y-4">
          {/* Repo selector */}
          <div>
            <label className="text-xs font-medium text-slate-400 mb-1.5 block">Repository</label>
            {reposLoading ? (
              <div className="h-10 bg-slate-700/30 rounded-lg animate-pulse" />
            ) : (
              <div className="relative">
                <input
                  type="text"
                  value={repoSearch}
                  onChange={(e) => setRepoSearch(e.target.value)}
                  placeholder={repos.length > 0 ? 'Search repositories...' : 'Connect GitHub first'}
                  disabled={repos.length === 0}
                  className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 disabled:opacity-50"
                />
                {repoSearch && filteredRepos.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-slate-800 border border-slate-700 rounded-lg shadow-xl max-h-48 overflow-y-auto">
                    {filteredRepos.map((repo) => (
                      <button
                        key={repo.full_name || repo.name}
                        onClick={() => {
                          setSelectedRepo(repo.full_name || repo.name);
                          setRepoSearch('');
                        }}
                        className="w-full text-left px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-700/50 hover:text-white transition-colors"
                      >
                        {repo.full_name || repo.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
            {selectedRepo && (
              <div className="mt-2 flex items-center gap-2 text-sm text-cyan-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                </svg>
                {selectedRepo}
              </div>
            )}
          </div>

          {/* File path */}
          <div>
            <label className="text-xs font-medium text-slate-400 mb-1.5 block">
              Portfolio file path
            </label>
            <input
              type="text"
              value={filePath}
              onChange={(e) => setFilePath(e.target.value)}
              placeholder="e.g., README.md or src/data/projects.json"
              className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20"
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={savePortfolioSettings}
              disabled={settingsSaving || !selectedRepo}
              className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-semibold rounded-lg text-sm transition-colors"
            >
              {settingsSaving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </section>

      {/* Scan Frequency */}
      <section className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
        <h3 className="text-base font-medium text-white mb-1">Scan Frequency</h3>
        <p className="text-sm text-slate-400 mb-5">
          How often should PortfolioSync check for new repositories?
        </p>

        <div className="flex items-center gap-3 mb-5">
          {['daily', 'weekly'].map((opt) => (
            <button
              key={opt}
              onClick={() => setFrequency(opt)}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                frequency === opt
                  ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                  : 'bg-slate-900/50 text-slate-400 border border-slate-700 hover:border-slate-600'
              }`}
            >
              {opt.charAt(0).toUpperCase() + opt.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex justify-end">
          <button
            onClick={saveFrequency}
            disabled={freqSaving}
            className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-semibold rounded-lg text-sm transition-colors"
          >
            {freqSaving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </section>
    </div>
  );
}
