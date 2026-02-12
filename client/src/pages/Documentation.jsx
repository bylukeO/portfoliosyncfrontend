import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui';

// ─── Icon Components ─────────────────────────────────────────────────────────

function SyncIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="square" strokeLinejoin="miter" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L6.75 2.906M12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
        </svg>
    );
}

function CopyIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="square" strokeLinejoin="miter" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
        </svg>
    );
}

function ChevronIcon({ className, direction = 'down' }) {
    const rotation = direction === 'down' ? '' : 'rotate-180';
    return (
        <svg className={`${className} ${rotation} transition-transform duration-200`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="square" strokeLinejoin="miter" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
    );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function SectionHeader({ tag, title }) {
    return (
        <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 bg-[#f72585] shadow-[0_0_10px_#f72585]" />
                <span className="text-xs font-bold text-[#f72585] uppercase tracking-[0.2em] font-mono">
                    // {tag}
                </span>
                <span className="w-2 h-2 bg-[#f72585] shadow-[0_0_10px_#f72585]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#e8e8e8] uppercase tracking-wide">
                {title}
            </h2>
        </div>
    );
}

function CodeBlock({ title, language = 'bash', children }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(children.trim());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="my-6 bg-[#0a0a0f] border-2 border-[#2a2a4a] overflow-hidden group">
            {/* Header bar */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#1a1a2e] border-b-2 border-[#2a2a4a]">
                <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#ff3366]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#f9a825]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#39ff14]" />
                    </div>
                    {title && (
                        <span className="text-[10px] text-[#666666] font-mono uppercase tracking-widest">
                            {title}
                        </span>
                    )}
                </div>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-[10px] text-[#666666] hover:text-[#4cc9f0] transition-colors font-mono uppercase tracking-wider"
                >
                    <CopyIcon className="w-3.5 h-3.5" />
                    {copied ? 'Copied!' : 'Copy'}
                </button>
            </div>
            {/* Code content */}
            <pre className="p-5 overflow-x-auto text-sm font-mono leading-relaxed text-[#e8e8e8]">
                <code>{children.trim()}</code>
            </pre>
        </div>
    );
}

function EndpointCard({ method, path, description, responseExample, params }) {
    const [expanded, setExpanded] = useState(false);

    const methodColors = {
        GET: '#39ff14',
        POST: '#4cc9f0',
        PUT: '#f9a825',
        DELETE: '#ff3366',
        PATCH: '#b537f2',
    };

    const color = methodColors[method] || '#a0a0a0';

    return (
        <div className="border-2 border-[#2a2a4a] bg-[#0f0f23] mb-4 group hover:border-[#444455] transition-colors">
            <button
                onClick={() => setExpanded(!expanded)}
                className="w-full flex items-center gap-4 p-5 text-left"
            >
                <span
                    className="px-3 py-1 border-2 text-xs font-bold font-mono tracking-widest flex-shrink-0"
                    style={{ borderColor: color, color: color, backgroundColor: `${color}10` }}
                >
                    {method}
                </span>
                <span className="font-mono text-[#e8e8e8] text-sm flex-grow">{path}</span>
                <ChevronIcon
                    className="w-5 h-5 text-[#666666]"
                    direction={expanded ? 'up' : 'down'}
                />
            </button>

            {expanded && (
                <div className="px-5 pb-5 border-t-2 border-[#2a2a4a] pt-5 space-y-4">
                    <p className="text-[#a0a0a0] leading-relaxed">{description}</p>

                    {params && params.length > 0 && (
                        <div>
                            <h4 className="text-[10px] text-[#666666] font-mono uppercase tracking-widest mb-3">
                                // Parameters
                            </h4>
                            <div className="space-y-2">
                                {params.map((p, i) => (
                                    <div key={i} className="flex items-start gap-3 text-sm">
                                        <code className="text-[#4cc9f0] font-mono bg-[#0a0a0f] px-2 py-0.5 border border-[#2a2a4a] flex-shrink-0">
                                            {p.name}
                                        </code>
                                        <span className="text-[10px] text-[#666666] font-mono uppercase mt-1 flex-shrink-0">
                                            {p.type}
                                        </span>
                                        <span className="text-[#a0a0a0]">{p.desc}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {responseExample && (
                        <div>
                            <h4 className="text-[10px] text-[#666666] font-mono uppercase tracking-widest mb-3">
                                // Example Response
                            </h4>
                            <CodeBlock language="json">{responseExample}</CodeBlock>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

function SidebarLink({ label, id, active, onClick }) {
    return (
        <button
            onClick={() => onClick(id)}
            className={`block w-full text-left px-4 py-2.5 text-sm font-mono uppercase tracking-wider transition-all border-l-2 ${active
                ? 'text-[#f72585] border-[#f72585] bg-[rgba(247,37,133,0.05)]'
                : 'text-[#666666] border-transparent hover:text-[#a0a0a0] hover:border-[#2a2a4a]'
                }`}
        >
            {label}
        </button>
    );
}

// ─── Main Documentation Page ─────────────────────────────────────────────────

export default function Documentation() {
    const [activeSection, setActiveSection] = useState('getting-started');

    const scrollTo = (id) => {
        setActiveSection(id);
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const sections = [
        { id: 'getting-started', label: 'Getting Started' },
        { id: 'authentication', label: 'Authentication' },
        { id: 'api-reference', label: 'API Reference' },
        { id: 'webhooks', label: 'Webhooks' },
        { id: 'rate-limits', label: 'Rate Limits' },
        { id: 'sdks', label: 'SDKs & Libraries' },
        { id: 'faq', label: 'FAQ' },
    ];

    return (
        <div className="bg-[#0a0a0f] min-h-screen relative overflow-x-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(#2a2a4a_1px,transparent_1px),linear-gradient(90deg,#2a2a4a_1px,transparent_1px)] bg-[size:50px_50px]" />
                <div className="absolute top-[-20%] left-[20%] w-[60%] h-[60%] bg-[#f72585] opacity-[0.03] blur-[150px] rounded-full" />
                <div className="absolute bottom-[-20%] right-[20%] w-[60%] h-[60%] bg-[#4cc9f0] opacity-[0.03] blur-[150px] rounded-full" />
                <div className="absolute inset-0 z-50 pointer-events-none opacity-5 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.1),rgba(0,0,0,0.1)_1px,transparent_1px,transparent_2px)]" />
            </div>

            {/* Navigation */}
            <nav className="sticky top-0 z-50 px-4 md:px-6 py-4 flex items-center justify-between max-w-7xl mx-auto bg-[#0a0a0f]/90 backdrop-blur-md border-b border-[#2a2a4a]">
                <Link to="/" className="flex items-center gap-2 md:gap-3">
                    <div className="w-10 h-10 border-2 border-[#f72585] bg-[#0a0a0f] flex items-center justify-center shadow-[0_0_10px_rgba(247,37,133,0.4)]">
                        <span className="text-[#f72585]">
                            <SyncIcon className="w-5 h-5" />
                        </span>
                    </div>
                    <span className="text-xl font-bold text-[#e8e8e8] tracking-wide hidden sm:block">
                        PORTFOLIO<span className="text-[#f72585]">SYNC</span>
                    </span>
                </Link>
                <div className="flex items-center gap-3">
                    <span className="text-[10px] text-[#4cc9f0] font-mono uppercase tracking-widest hidden md:block border border-[#4cc9f0] px-3 py-1 bg-[rgba(76,201,240,0.05)]">
                        // Documentation v1.0
                    </span>
                    <Link to="/">
                        <Button variant="primary" glow>JOIN WAITLIST</Button>
                    </Link>
                </div>
            </nav>

            {/* Hero */}
            <section className="relative pt-16 pb-12 px-6 z-10">
                <div className="max-w-5xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 bg-[rgba(76,201,240,0.1)] border border-[#4cc9f0] text-[#4cc9f0] text-[10px] font-bold uppercase tracking-widest shadow-[0_0_10px_rgba(76,201,240,0.2)]">
                        <span className="w-2 h-2 bg-[#4cc9f0] animate-pulse" />
                        <span>Developer Documentation</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight text-[#e8e8e8] uppercase tracking-wide">
                        Build With{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f72585] via-[#b537f2] to-[#4cc9f0]">
                            PortfolioSync
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-[#a0a0a0] max-w-2xl mx-auto leading-relaxed">
                        Everything you need to integrate PortfolioSync into your portfolio website. Simple REST API, real-time webhooks, and comprehensive guides.
                    </p>
                </div>
            </section>

            {/* Main Content Area */}
            <section className="relative z-10 px-4 md:px-6 pb-20">
                <div className="max-w-7xl mx-auto flex gap-8">

                    {/* Sidebar Navigation */}
                    <aside className="hidden lg:block w-64 flex-shrink-0">
                        <div className="sticky top-24 space-y-1">
                            <div className="text-[10px] text-[#666666] font-mono uppercase tracking-widest mb-4 px-4">
                                // Navigation
                            </div>
                            {sections.map((s) => (
                                <SidebarLink
                                    key={s.id}
                                    label={s.label}
                                    id={s.id}
                                    active={activeSection === s.id}
                                    onClick={scrollTo}
                                />
                            ))}
                        </div>
                    </aside>

                    {/* Content */}
                    <div className="flex-grow min-w-0 max-w-4xl">

                        {/* ─── Getting Started ─────────────────────────────── */}
                        <div id="getting-started" className="scroll-mt-24 mb-20">
                            <SectionHeader tag="Quick Start" title="Getting Started" />

                            <div className="prose-synthwave space-y-6 text-[#a0a0a0] leading-relaxed">
                                <p className="text-lg">
                                    PortfolioSync provides a REST API that lets your portfolio website fetch your latest GitHub projects, commit activity, and repository metadata — <span className="text-[#39ff14] font-bold">all automatically kept in sync</span>.
                                </p>

                                <div className="card-sleek md:card-retro p-6 md:p-8 space-y-6">
                                    <h3 className="text-xl font-bold text-[#e8e8e8] uppercase tracking-wide">
                                        1. Create an Account
                                    </h3>
                                    <p>
                                        Sign up via GitHub OAuth. We request read-only access to your public repositories. No passwords to remember.
                                    </p>

                                    <h3 className="text-xl font-bold text-[#e8e8e8] uppercase tracking-wide">
                                        2. Select Your Repositories
                                    </h3>
                                    <p>
                                        From your dashboard, choose which repositories you want to showcase. You can include or exclude repos at any time.
                                    </p>

                                    <h3 className="text-xl font-bold text-[#e8e8e8] uppercase tracking-wide">
                                        3. Fetch Your Data
                                    </h3>
                                    <p>
                                        Use our API to retrieve your synced project data and display it on your portfolio site.
                                    </p>

                                    <CodeBlock title="Example: Fetch Projects">
                                        {`// Fetch your synced projects
const response = await fetch(
  'https://api.portfoliosync.io/v1/projects',
  {
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    }
  }
);

const projects = await response.json();
console.log(projects);`}
                                    </CodeBlock>
                                </div>
                            </div>
                        </div>

                        {/* ─── Authentication ──────────────────────────────── */}
                        <div id="authentication" className="scroll-mt-24 mb-20">
                            <SectionHeader tag="Security" title="Authentication" />

                            <div className="space-y-6 text-[#a0a0a0] leading-relaxed">
                                <p className="text-lg">
                                    All API requests require authentication via a <span className="text-[#4cc9f0] font-bold">Bearer token</span>. You can generate an API key from your Settings page after logging in.
                                </p>

                                <div className="card-sleek md:card-retro p-6 md:p-8">
                                    <h3 className="text-lg font-bold text-[#e8e8e8] uppercase tracking-wide mb-4">
                                        OAuth Flow
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex items-start gap-3">
                                            <span className="text-[#f72585] font-mono font-bold w-6 flex-shrink-0">01</span>
                                            <span>User clicks <code className="text-[#4cc9f0] bg-[#0a0a0f] px-2 py-0.5 border border-[#2a2a4a] text-xs">Login with GitHub</code></span>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <span className="text-[#f72585] font-mono font-bold w-6 flex-shrink-0">02</span>
                                            <span>Redirects to GitHub OAuth consent screen</span>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <span className="text-[#f72585] font-mono font-bold w-6 flex-shrink-0">03</span>
                                            <span>GitHub redirects back with an authorization code</span>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <span className="text-[#f72585] font-mono font-bold w-6 flex-shrink-0">04</span>
                                            <span>PortfolioSync exchanges code for a JWT token</span>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <span className="text-[#f72585] font-mono font-bold w-6 flex-shrink-0">05</span>
                                            <span>Use JWT in <code className="text-[#4cc9f0] bg-[#0a0a0f] px-2 py-0.5 border border-[#2a2a4a] text-xs">Authorization</code> header for all API calls</span>
                                        </div>
                                    </div>
                                </div>

                                <CodeBlock title="Header Format">
                                    {`Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
Content-Type: application/json`}
                                </CodeBlock>

                                <div className="border-2 border-[#f9a825] bg-[rgba(249,168,37,0.05)] p-5">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="w-2 h-2 bg-[#f9a825] rounded-full shadow-[0_0_8px_rgba(249,168,37,0.6)]" />
                                        <span className="text-[#f9a825] font-bold text-sm uppercase tracking-wider">Security Note</span>
                                    </div>
                                    <p className="text-[#a0a0a0] text-sm">
                                        Never expose your API key in client-side code. Use environment variables and server-side API calls to keep your token secure. Consider using a proxy endpoint on your own backend.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* ─── API Reference ───────────────────────────────── */}
                        <div id="api-reference" className="scroll-mt-24 mb-20">
                            <SectionHeader tag="Endpoints" title="API Reference" />

                            <div className="space-y-6 text-[#a0a0a0] leading-relaxed">
                                <p className="text-lg">
                                    Base URL: <code className="text-[#4cc9f0] bg-[#0a0a0f] px-3 py-1 border border-[#2a2a4a] text-sm">https://api.portfoliosync.io/v1</code>
                                </p>

                                <h3 className="text-xl font-bold text-[#e8e8e8] uppercase tracking-wide mt-8 mb-4">
                                    Projects
                                </h3>

                                <EndpointCard
                                    method="GET"
                                    path="/v1/projects"
                                    description="Returns a list of all synced projects for the authenticated user. Projects include repository metadata, language stats, and sync status."
                                    params={[
                                        { name: 'page', type: 'number', desc: 'Page number (default: 1)' },
                                        { name: 'limit', type: 'number', desc: 'Results per page (default: 20, max: 100)' },
                                        { name: 'sort', type: 'string', desc: 'Sort by: updated, created, name, stars' },
                                    ]}
                                    responseExample={`{
  "data": [
    {
      "id": "proj_abc123",
      "name": "my-awesome-app",
      "description": "A full-stack web application",
      "language": "TypeScript",
      "stars": 42,
      "forks": 8,
      "lastSynced": "2026-02-11T12:00:00Z",
      "syncStatus": "synced",
      "topics": ["react", "node", "typescript"],
      "url": "https://github.com/user/my-awesome-app"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 15
  }
}`}
                                />

                                <EndpointCard
                                    method="GET"
                                    path="/v1/projects/:id"
                                    description="Returns detailed information about a single project, including commit history summary, README quality score, and full metadata."
                                    params={[
                                        { name: 'id', type: 'string', desc: 'The project ID (e.g., proj_abc123)' },
                                    ]}
                                    responseExample={`{
  "id": "proj_abc123",
  "name": "my-awesome-app",
  "description": "A full-stack web application",
  "language": "TypeScript",
  "languages": {
    "TypeScript": 65.2,
    "CSS": 20.1,
    "HTML": 14.7
  },
  "stars": 42,
  "forks": 8,
  "readmeScore": 85,
  "lastCommit": "2026-02-10T18:30:00Z",
  "lastSynced": "2026-02-11T12:00:00Z",
  "syncStatus": "synced"
}`}
                                />

                                <h3 className="text-xl font-bold text-[#e8e8e8] uppercase tracking-wide mt-10 mb-4">
                                    Scans
                                </h3>

                                <EndpointCard
                                    method="POST"
                                    path="/v1/scans"
                                    description="Trigger a manual scan of your repositories. This will check for any changes since the last sync and update your project data accordingly."
                                    responseExample={`{
  "id": "scan_xyz789",
  "status": "in_progress",
  "startedAt": "2026-02-11T14:00:00Z",
  "repositoriesQueued": 12
}`}
                                />

                                <EndpointCard
                                    method="GET"
                                    path="/v1/scans/:id"
                                    description="Check the status and results of a specific scan operation."
                                    params={[
                                        { name: 'id', type: 'string', desc: 'The scan ID (e.g., scan_xyz789)' },
                                    ]}
                                    responseExample={`{
  "id": "scan_xyz789",
  "status": "completed",
  "startedAt": "2026-02-11T14:00:00Z",
  "completedAt": "2026-02-11T14:02:30Z",
  "changes": {
    "added": 1,
    "updated": 3,
    "unchanged": 8
  }
}`}
                                />

                                <h3 className="text-xl font-bold text-[#e8e8e8] uppercase tracking-wide mt-10 mb-4">
                                    Activity
                                </h3>

                                <EndpointCard
                                    method="GET"
                                    path="/v1/activity"
                                    description="Returns a chronological log of all sync events, scan results, and project changes."
                                    params={[
                                        { name: 'page', type: 'number', desc: 'Page number (default: 1)' },
                                        { name: 'type', type: 'string', desc: 'Filter by: scan, sync, change' },
                                    ]}
                                    responseExample={`{
  "data": [
    {
      "id": "act_001",
      "type": "sync",
      "message": "Project 'my-awesome-app' synced successfully",
      "timestamp": "2026-02-11T12:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "total": 48
  }
}`}
                                />
                            </div>
                        </div>

                        {/* ─── Webhooks ─────────────────────────────────────── */}
                        <div id="webhooks" className="scroll-mt-24 mb-20">
                            <SectionHeader tag="Real-Time" title="Webhooks" />

                            <div className="space-y-6 text-[#a0a0a0] leading-relaxed">
                                <p className="text-lg">
                                    Configure webhooks to receive <span className="text-[#b537f2] font-bold">real-time notifications</span> when your portfolio data changes. Perfect for triggering rebuilds of static sites or updating dynamic content.
                                </p>

                                <div className="card-sleek md:card-retro p-6 md:p-8">
                                    <h3 className="text-lg font-bold text-[#e8e8e8] uppercase tracking-wide mb-4">
                                        Available Events
                                    </h3>
                                    <div className="grid sm:grid-cols-2 gap-3">
                                        {[
                                            { event: 'project.synced', desc: 'A project was successfully synced' },
                                            { event: 'project.added', desc: 'A new project was added to sync' },
                                            { event: 'project.removed', desc: 'A project was removed from sync' },
                                            { event: 'scan.completed', desc: 'A scan operation finished' },
                                            { event: 'readme.updated', desc: 'A README quality score changed' },
                                            { event: 'sync.failed', desc: 'A sync operation encountered an error' },
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-start gap-3 p-3 bg-[#0a0a0f] border border-[#2a2a4a]">
                                                <code className="text-[#b537f2] text-xs font-mono flex-shrink-0">{item.event}</code>
                                                <span className="text-xs text-[#666666]">{item.desc}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <CodeBlock title="Webhook Payload Example">
                                    {`{
  "event": "project.synced",
  "timestamp": "2026-02-11T12:00:00Z",
  "data": {
    "projectId": "proj_abc123",
    "name": "my-awesome-app",
    "changes": {
      "commits": 3,
      "filesChanged": 7,
      "languagesUpdated": true
    }
  },
  "signature": "sha256=abc123..."
}`}
                                </CodeBlock>

                                <div className="border-2 border-[#39ff14] bg-[rgba(57,255,20,0.05)] p-5">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="w-2 h-2 bg-[#39ff14] rounded-full shadow-[0_0_8px_rgba(57,255,20,0.6)]" />
                                        <span className="text-[#39ff14] font-bold text-sm uppercase tracking-wider">Tip</span>
                                    </div>
                                    <p className="text-[#a0a0a0] text-sm">
                                        Use the <code className="text-[#4cc9f0] text-xs">signature</code> field to verify that webhook payloads are genuinely from PortfolioSync. Compare the HMAC-SHA256 signature against your webhook secret.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* ─── Rate Limits ──────────────────────────────────── */}
                        <div id="rate-limits" className="scroll-mt-24 mb-20">
                            <SectionHeader tag="Limits" title="Rate Limits" />

                            <div className="space-y-6 text-[#a0a0a0] leading-relaxed">
                                <p className="text-lg">
                                    To ensure fair usage and system stability, API requests are rate limited per account.
                                </p>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-2 border-[#2a2a4a]">
                                        <thead>
                                            <tr className="bg-[#1a1a2e] border-b-2 border-[#2a2a4a]">
                                                <th className="p-4 text-[10px] text-[#666666] font-mono uppercase tracking-widest">Plan</th>
                                                <th className="p-4 text-[10px] text-[#666666] font-mono uppercase tracking-widest">Requests / min</th>
                                                <th className="p-4 text-[10px] text-[#666666] font-mono uppercase tracking-widest">Scans / day</th>
                                                <th className="p-4 text-[10px] text-[#666666] font-mono uppercase tracking-widest">Webhooks</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="border-b border-[#2a2a4a]">
                                                <td className="p-4 text-[#39ff14] font-bold font-mono">FREE</td>
                                                <td className="p-4 text-[#e8e8e8]">60</td>
                                                <td className="p-4 text-[#e8e8e8]">10</td>
                                                <td className="p-4 text-[#e8e8e8]">3</td>
                                            </tr>
                                            <tr className="border-b border-[#2a2a4a]">
                                                <td className="p-4 text-[#4cc9f0] font-bold font-mono">PRO</td>
                                                <td className="p-4 text-[#e8e8e8]">300</td>
                                                <td className="p-4 text-[#e8e8e8]">Unlimited</td>
                                                <td className="p-4 text-[#e8e8e8]">10</td>
                                            </tr>
                                            <tr>
                                                <td className="p-4 text-[#f72585] font-bold font-mono">ENTERPRISE</td>
                                                <td className="p-4 text-[#e8e8e8]">Custom</td>
                                                <td className="p-4 text-[#e8e8e8]">Unlimited</td>
                                                <td className="p-4 text-[#e8e8e8]">Unlimited</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <CodeBlock title="Rate Limit Headers">
                                    {`X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1707660000`}
                                </CodeBlock>
                            </div>
                        </div>

                        {/* ─── SDKs & Libraries ────────────────────────────── */}
                        <div id="sdks" className="scroll-mt-24 mb-20">
                            <SectionHeader tag="Tools" title="SDKs & Libraries" />

                            <div className="space-y-6 text-[#a0a0a0] leading-relaxed">
                                <p className="text-lg">
                                    We're building official client libraries to make integration even easier. <span className="text-[#f9a825] font-bold">Coming soon!</span>
                                </p>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    {[
                                        { name: 'JavaScript / Node.js', status: 'In Development', color: '#f9a825', abbr: 'JS' },
                                        { name: 'Python', status: 'Planned', color: '#666666', abbr: 'PY' },
                                        { name: 'React Hook', status: 'In Development', color: '#f9a825', abbr: 'RH' },
                                        { name: 'CLI Tool', status: 'Planned', color: '#666666', abbr: 'CLI' },
                                    ].map((sdk, i) => (
                                        <div key={i} className="card-sleek md:card-retro p-6 flex items-start gap-4">
                                            <div
                                                className="w-12 h-12 flex-shrink-0 border-2 bg-[#0a0a0f] flex items-center justify-center font-mono font-bold text-sm"
                                                style={{ borderColor: sdk.color, color: sdk.color }}
                                            >
                                                {sdk.abbr}
                                            </div>
                                            <div>
                                                <h4 className="text-[#e8e8e8] font-bold uppercase tracking-wide mb-1">{sdk.name}</h4>
                                                <span
                                                    className="text-[10px] font-mono font-bold uppercase tracking-widest"
                                                    style={{ color: sdk.color }}
                                                >
                                                    // {sdk.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <CodeBlock title="Coming Soon: React Hook">
                                    {`import { usePortfolioSync } from '@portfoliosync/react';

function Projects() {
  const { projects, loading, error } = usePortfolioSync({
    apiKey: process.env.PORTFOLIOSYNC_KEY,
    sort: 'updated',
    limit: 6
  });

  if (loading) return <Spinner />;

  return (
    <div className="grid grid-cols-3 gap-4">
      {projects.map(project => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </div>
  );
}`}
                                </CodeBlock>
                            </div>
                        </div>

                        {/* ─── FAQ ─────────────────────────────────────────── */}
                        <div id="faq" className="scroll-mt-24 mb-20">
                            <SectionHeader tag="Help" title="Frequently Asked Questions" />

                            <div className="space-y-4">
                                {[
                                    {
                                        q: 'How do I get my API key?',
                                        a: 'After signing in with GitHub, navigate to your Settings page. You\'ll find an API Keys section where you can generate and manage your tokens.',
                                    },
                                    {
                                        q: 'What happens if my token expires?',
                                        a: 'JWT tokens expire after 24 hours. Use the refresh token endpoint to obtain a new access token without re-authenticating through GitHub.',
                                    },
                                    {
                                        q: 'Can I use the API with a static site (e.g., Next.js, Gatsby)?',
                                        a: 'Yes! For static sites, fetch data at build time using getStaticProps (Next.js) or gatsby-node.js (Gatsby). You can also set up webhooks to trigger a rebuild whenever your data changes.',
                                    },
                                    {
                                        q: 'Is there a GraphQL API?',
                                        a: 'Not yet, but it\'s on our roadmap! For now, the REST API provides all the data you need. Join the waitlist to be notified when GraphQL launches.',
                                    },
                                    {
                                        q: 'How do I report a bug or request a feature?',
                                        a: 'Open an issue on our GitHub repository or reach out via the contact form. We actively review all feedback from our beta users.',
                                    },
                                ].map((item, i) => (
                                    <div key={i} className="card-sleek md:card-retro p-6 border-l-3 border-[#4cc9f0]">
                                        <h3 className="text-lg font-bold text-[#e8e8e8] mb-3">{item.q}</h3>
                                        <p className="text-[#a0a0a0] leading-relaxed">{item.a}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ─── CTA ─────────────────────────────────────────── */}
                        <div className="card-sleek md:card-retro p-8 md:p-12 text-center border-2 border-[#f72585] bg-gradient-to-br from-[#1a1a2e] to-[#0f0f23] relative overflow-hidden group">
                            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent,rgba(247,37,133,0.05),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="relative z-10">
                                <h2 className="text-3xl md:text-4xl font-bold text-[#e8e8e8] uppercase tracking-wide mb-4">
                                    Ready to Build?
                                </h2>
                                <p className="text-xl text-[#a0a0a0] mb-8 max-w-xl mx-auto">
                                    Join the private beta to get your API key and start integrating PortfolioSync today.
                                </p>
                                <Link to="/">
                                    <Button size="lg" variant="primary" glow>
                                        JOIN WAITLIST
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t-2 border-[#2a2a4a] bg-[#0f0f23] py-12 px-6 relative z-10">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg md:rounded-none border border-[#f72585] md:border-2 bg-[#0a0a0f] flex items-center justify-center shadow-[0_0_10px_rgba(247,37,133,0.4)]">
                            <span className="text-[#f72585]">
                                <SyncIcon className="w-4 h-4" />
                            </span>
                        </div>
                        <div className="text-[#666666] text-xs font-mono">
                            © 2026 // ALL SYSTEMS NOMINAL
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm font-bold uppercase tracking-widest text-[#a0a0a0]">
                        <Link to="/" className="hover:text-[#f72585] transition-colors">Home</Link>
                        <Link to="/learn-more" className="hover:text-[#f72585] transition-colors">Learn More</Link>
                        <Link to="/docs" className="hover:text-[#f72585] transition-colors">Documentation</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
