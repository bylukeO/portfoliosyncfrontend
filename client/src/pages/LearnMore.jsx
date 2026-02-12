import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui';
import githubConnectionDemo from '../assets/github-connection-demo.png';
import projectSelectionDemo from '../assets/project-selection-demo.png';
import monitoringDashboardDemo from '../assets/monitoring-dashboard-demo.png';
import apiIntegrationDemo from '../assets/api-integration-demo.png';

// Icon Components
function SyncIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="square" strokeLinejoin="miter" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L6.75 2.906M12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
        </svg>
    );
}

function RocketIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="square" strokeLinejoin="miter" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
        </svg>
    );
}

function GitHubIcon({ className }) {
    return (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
    );
}

function MagicIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="square" strokeLinejoin="miter" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 22.5l-.394-1.933a2.25 2.25 0 00-1.423-1.423L12.75 18.75l1.933-.394a2.25 2.25 0 001.423-1.423l.394-1.933.394 1.933a2.25 2.25 0 001.423 1.423l1.933.394-1.933.394a2.25 2.25 0 00-1.423 1.423z" />
        </svg>
    );
}

function CheckIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="square" strokeLinejoin="miter" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
    );
}

export default function LearnMore() {
    return (
        <div className="bg-[#0a0a0f] min-h-screen relative overflow-x-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                {/* Grid pattern */}
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(#2a2a4a_1px,transparent_1px),linear-gradient(90deg,#2a2a4a_1px,transparent_1px)] bg-[size:50px_50px]" />

                {/* Glow spots */}
                <div className="absolute top-[-20%] left-[20%] w-[60%] h-[60%] bg-[#f72585] opacity-[0.03] blur-[150px] rounded-full" />
                <div className="absolute bottom-[-20%] right-[20%] w-[60%] h-[60%] bg-[#4cc9f0] opacity-[0.03] blur-[150px] rounded-full" />

                {/* Scanlines */}
                <div className="absolute inset-0 z-50 pointer-events-none opacity-5 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.1),rgba(0,0,0,0.1)_1px,transparent_1px,transparent_2px)]" />
            </div>

            {/* Navigation */}
            <nav className="absolute top-0 left-0 right-0 z-50 px-4 md:px-6 py-4 md:py-6 flex items-center justify-between max-w-7xl mx-auto">
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
                <div className="flex items-center gap-2 md:gap-4">
                    {/* <Link to="/login">
                        <Button variant="ghost" className="inline-flex">LOGIN</Button>
                    </Link> */}
                    <Link to="/">
                        <Button variant="primary" glow>JOIN WAITLIST</Button>
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 z-10">
                <div className="max-w-5xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 bg-[rgba(76,201,240,0.1)] border border-[#4cc9f0] text-[#4cc9f0] text-[10px] font-bold uppercase tracking-widest shadow-[0_0_10px_rgba(76,201,240,0.2)]">
                        <span className="w-2 h-2 bg-[#4cc9f0] animate-pulse" />
                        <span>Everything You Need to Know</span>
                    </div>

                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight text-[#e8e8e8] uppercase tracking-wide">
                        What is <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f72585] via-[#b537f2] to-[#4cc9f0]">
                            PortfolioSync
                        </span>?
                    </h1>

                    <p className="text-xl md:text-2xl text-[#a0a0a0] max-w-3xl mx-auto leading-relaxed">
                        A clear, straightforward explanation of how it works
                    </p>
                </div>
            </section>

            {/* Simple Explanation Section */}
            <section className="py-16 px-6 relative z-10">
                <div className="max-w-5xl mx-auto">
                    <div className="card-sleek md:card-retro p-8 md:p-12 bg-gradient-to-br from-[#1a1a2e] to-[#0f0f23]">
                        <div className="flex items-start gap-6 mb-8">
                            <div className="w-16 h-16 flex-shrink-0 border-3 border-[#f72585] bg-[#0a0a0f] flex items-center justify-center shadow-[0_0_20px_rgba(247,37,133,0.4)]">
                                <RocketIcon className="w-8 h-8 text-[#f72585]" />
                            </div>
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold text-[#e8e8e8] uppercase tracking-wide mb-4">
                                    The Core Concept
                                </h2>
                                <p className="text-lg md:text-xl text-[#a0a0a0] leading-relaxed">
                                    PortfolioSync eliminates the manual work of keeping your portfolio website updated with your latest GitHub projects.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-6 text-lg text-[#a0a0a0] leading-relaxed border-l-3 border-[#2a2a4a] pl-8">
                            <p>
                                Here's the problem: You build something awesome, push it to GitHub, and then remember –
                                <span className="text-[#f72585] font-bold"> you need to manually update your portfolio website</span> with this new project.
                            </p>
                            <p>
                                This means editing HTML, updating JSON files, re-deploying your site, and doing this <span className="text-[#ff3366] font-bold">every single time</span> you finish a project.
                            </p>
                            <p className="text-xl text-[#4cc9f0] font-bold">
                                PortfolioSync automates this entire process.
                            </p>
                            <p>
                                When you push code to GitHub, we automatically detect the changes and update your portfolio data.
                                Your website can then fetch this data through our API – <span className="text-[#39ff14] font-bold">no manual updates needed</span>.
                            </p>
                            <p className="text-[#e8e8e8]">
                                It's like having a dedicated system watching your GitHub account and keeping your portfolio perfectly synchronized with your actual work.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* The Problem Section */}
            <section className="py-16 px-6 relative z-10 bg-[#0f0f23]/50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <span className="w-2 h-2 bg-[#f72585] shadow-[0_0_10px_#f72585]" />
                            <span className="text-xs font-bold text-[#f72585] uppercase tracking-[0.2em] font-mono">
                                The Problem
                            </span>
                            <span className="w-2 h-2 bg-[#f72585] shadow-[0_0_10px_#f72585]" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-[#e8e8e8] uppercase tracking-wide">
                            Why This Exists
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="card-sleek md:card-retro p-8 border-3 border-[#ff3366]/50">
                            <div className="w-14 h-14 border-2 border-[#ff3366] bg-[#0a0a0f] flex items-center justify-center mb-4 font-mono font-bold text-[#ff3366] text-lg">OLD</div>
                            <h3 className="text-2xl font-bold text-[#ff3366] uppercase mb-4">Before PortfolioSync</h3>
                            <ul className="space-y-3 text-[#a0a0a0]">
                                <li className="flex items-start gap-3">
                                    <span className="text-[#ff3366] text-xl">×</span>
                                    <span>Work on a cool project for weeks</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-[#ff3366] text-xl">×</span>
                                    <span>Push to GitHub and feel accomplished</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-[#ff3366] text-xl">×</span>
                                    <span>Remember you need to update your portfolio...</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-[#ff3366] text-xl">×</span>
                                    <span>Spend 30 minutes manually editing HTML/JSON</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-[#ff3366] text-xl">×</span>
                                    <span>Deploy the changes</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-[#ff3366] text-xl">×</span>
                                    <span>Repeat this process for every project</span>
                                </li>
                            </ul>
                        </div>

                        <div className="card-sleek md:card-retro p-8 border-3 border-[#39ff14]/50">
                            <div className="w-14 h-14 border-2 border-[#39ff14] bg-[#0a0a0f] flex items-center justify-center mb-4 font-mono font-bold text-[#39ff14] text-lg">NEW</div>
                            <h3 className="text-2xl font-bold text-[#39ff14] uppercase mb-4">With PortfolioSync</h3>
                            <ul className="space-y-3 text-[#a0a0a0]">
                                <li className="flex items-start gap-3">
                                    <CheckIcon className="w-6 h-6 text-[#39ff14] flex-shrink-0" />
                                    <span>Work on your amazing project</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckIcon className="w-6 h-6 text-[#39ff14] flex-shrink-0" />
                                    <span>Push to GitHub</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckIcon className="w-6 h-6 text-[#39ff14] flex-shrink-0" />
                                    <span className="text-[#39ff14] font-bold">That's it!</span>
                                </li>
                                <li className="flex items-start gap-3 ml-8 mt-6">
                                    <span className="text-[#4cc9f0]">→</span>
                                    <span className="text-[#e8e8e8]">Your portfolio updates automatically</span>
                                </li>
                                <li className="flex items-start gap-3 ml-8">
                                    <span className="text-[#4cc9f0]">→</span>
                                    <span className="text-[#e8e8e8]">Always shows your latest work</span>
                                </li>
                                <li className="flex items-start gap-3 ml-8">
                                    <span className="text-[#4cc9f0]">→</span>
                                    <span className="text-[#e8e8e8]">Zero manual maintenance</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works - Step by Step */}
            <section className="py-20 px-6 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <span className="w-2 h-2 bg-[#4cc9f0] shadow-[0_0_10px_#4cc9f0]" />
                            <span className="text-xs font-bold text-[#4cc9f0] uppercase tracking-[0.2em] font-mono">
                                Step by Step
                            </span>
                            <span className="w-2 h-2 bg-[#4cc9f0] shadow-[0_0_10px_#4cc9f0]" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-[#e8e8e8] uppercase tracking-wide">
                            How It Actually Works
                        </h2>
                    </div>

                    <div className="space-y-12">
                        {/* Step 1 */}
                        <StepCard
                            number="01"
                            title="Connect Your GitHub Account"
                            icon={<GitHubIcon className="w-12 h-12" />}
                            color="#f72585"
                            demoPlaceholder="github_connection"
                        >
                            <p className="text-lg text-[#a0a0a0] mb-4">
                                First, you'll link your GitHub account to PortfolioSync. Don't worry – we only ask for <span className="text-[#39ff14] font-bold">read-only access</span> to your public repositories.
                            </p>
                            <div className="bg-[#0a0a0f] border-2 border-[#2a2a4a] p-4 rounded font-mono text-sm">
                                <div className="text-[#666666]">// What we can do:</div>
                                <div className="text-[#39ff14]">✓ Read your public repos</div>
                                <div className="text-[#39ff14]">✓ See commit history</div>
                                <div className="text-[#39ff14]">✓ Check README files</div>
                                <div className="mt-3 text-[#666666]">// What we CANNOT do:</div>
                                <div className="text-[#ff3366]">× Modify your code</div>
                                <div className="text-[#ff3366]">× Delete anything</div>
                                <div className="text-[#ff3366]">× Access private repos (unless you choose to share them)</div>
                            </div>
                        </StepCard>

                        {/* Step 2 */}
                        <StepCard
                            number="02"
                            title="Choose Which Projects to Showcase"
                            icon={<CheckIcon className="w-12 h-12" />}
                            color="#4cc9f0"
                            demoPlaceholder="project_selection"
                            reverse
                        >
                            <p className="text-lg text-[#a0a0a0] mb-4">
                                Not all projects need to be on your portfolio! Pick the ones you're proud of and want to show off to potential employers or clients.
                            </p>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="bg-[#0a0a0f] border-2 border-[#4cc9f0] p-4">
                                    <div className="text-[#4cc9f0] font-bold mb-2">✓ Perfect For Portfolio:</div>
                                    <ul className="text-sm text-[#a0a0a0] space-y-1">
                                        <li>• Finished projects</li>
                                        <li>• Side projects you're proud of</li>
                                        <li>• Open source contributions</li>
                                        <li>• School/work projects</li>
                                    </ul>
                                </div>
                                <div className="bg-[#0a0a0f] border-2 border-[#666666] p-4">
                                    <div className="text-[#666666] font-bold mb-2">Maybe Skip These:</div>
                                    <ul className="text-sm text-[#666666] space-y-1">
                                        <li>• Practice/learning repos</li>
                                        <li>• Forks you haven't modified</li>
                                        <li>• Random experiments</li>
                                        <li>• Config files repos</li>
                                    </ul>
                                </div>
                            </div>
                        </StepCard>

                        {/* Step 3 */}
                        <StepCard
                            number="03"
                            title="We Monitor Your Repositories"
                            icon={<SyncIcon className="w-12 h-12" />}
                            color="#b537f2"
                            demoPlaceholder="monitoring_dashboard"
                        >
                            <p className="text-lg text-[#a0a0a0] mb-4">
                                Once connected, PortfolioSync keeps an eye on your selected repositories. Whenever you push new code, we detect it automatically!
                            </p>
                            <div className="bg-[#16213e] border-2 border-[#b537f2] p-6 font-mono">
                                <div className="text-[#666666] mb-2">$ git push origin main</div>
                                <div className="text-[#39ff14] mb-4">✓ Pushed to GitHub</div>
                                <div className="h-px bg-[#2a2a4a] my-3"></div>
                                <div className="text-[#b537f2] mb-2">[SYNC] PortfolioSync detected changes</div>
                                <div className="text-[#4cc9f0]">→ Scanning repository...</div>
                                <div className="text-[#4cc9f0]">→ Analyzing new commits...</div>
                                <div className="text-[#4cc9f0]">→ Updating portfolio data...</div>
                                <div className="text-[#39ff14] mt-2">✓ Portfolio synced successfully!</div>
                            </div>
                        </StepCard>

                        {/* Step 4 */}
                        <StepCard
                            number="04"
                            title="Access Your Data via API"
                            icon={<MagicIcon className="w-12 h-12" />}
                            color="#39ff14"
                            demoPlaceholder="api_integration"
                            reverse
                        >
                            <p className="text-lg text-[#a0a0a0] mb-4">
                                PortfolioSync provides a clean API endpoint that your portfolio website can call to get all your latest project data. Just fetch and display!
                            </p>
                            <div className="bg-[#0a0a0f] border-2 border-[#39ff14] p-4 rounded">
                                <div className="text-[#666666] text-xs mb-2">// Example: Fetching your projects</div>
                                <pre className="text-sm text-[#e8e8e8] overflow-x-auto">
                                    {`fetch('https://api.portfoliosync.io/projects')
  .then(res => res.json())
  .then(projects => {
    // Display on your portfolio
    projects.forEach(project => {
      showProject(project);
    });
  });`}
                                </pre>
                            </div>
                            <p className="text-sm text-[#4cc9f0] mt-4 italic">
                                You can also use webhooks for real-time notifications or query specific projects individually.
                            </p>
                        </StepCard>
                    </div>
                </div>
            </section>

            {/* Key Features */}
            <section className="py-20 px-6 relative z-10 bg-[#0f0f23]/50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <span className="w-2 h-2 bg-[#f72585] shadow-[0_0_10px_#f72585]" />
                            <span className="text-xs font-bold text-[#f72585] uppercase tracking-[0.2em] font-mono">
                                Features
                            </span>
                            <span className="w-2 h-2 bg-[#f72585] shadow-[0_0_10px_#f72585]" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-[#e8e8e8] uppercase tracking-wide">
                            What Makes Us Special
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <FeatureBox
                            abbr="SEC"
                            title="Secure & Safe"
                            description="We use OAuth authentication and only request read-only access. Your code stays yours."
                            color="#39ff14"
                        />
                        <FeatureBox
                            abbr="RT"
                            title="Real-Time Updates"
                            description="Changes reflect within minutes of pushing to GitHub. No manual triggers needed."
                            color="#f72585"
                        />
                        <FeatureBox
                            abbr="FLT"
                            title="Smart Filtering"
                            description="Choose exactly which repos appear on your portfolio. Full control in your hands."
                            color="#4cc9f0"
                        />
                        <FeatureBox
                            abbr="META"
                            title="Rich Metadata"
                            description="We extract languages, stars, forks, descriptions, and more from your repos."
                            color="#b537f2"
                        />
                        <FeatureBox
                            abbr="API"
                            title="Easy Integration"
                            description="Simple REST API. Works with any tech stack — React, Vue, vanilla JS, you name it."
                            color="#f9a825"
                        />
                        <FeatureBox
                            abbr="FREE"
                            title="Always Free Tier"
                            description="Our core features are free forever. Premium features coming soon for power users."
                            color="#39ff14"
                        />
                    </div>
                </div>
            </section>

            {/* Who Is This For? */}
            <section className="py-20 px-6 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <span className="w-2 h-2 bg-[#4cc9f0] shadow-[0_0_10px_#4cc9f0]" />
                            <span className="text-xs font-bold text-[#4cc9f0] uppercase tracking-[0.2em] font-mono">
                                Perfect For
                            </span>
                            <span className="w-2 h-2 bg-[#4cc9f0] shadow-[0_0_10px_#4cc9f0]" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-[#e8e8e8] uppercase tracking-wide">
                            Who Should Use This?
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <PersonaCard
                            abbr="01"
                            title="Students & Bootcamp Grads"
                            description="Building projects constantly? Stop wasting time updating your portfolio manually. Focus on learning and building — we handle the rest."
                        />
                        <PersonaCard
                            abbr="02"
                            title="Job Seekers"
                            description="Keep your portfolio fresh with your latest projects automatically. Recruiters appreciate seeing active developers who ship code regularly."
                        />
                        <PersonaCard
                            abbr="03"
                            title="Freelancers"
                            description="Show potential clients your most recent work without lifting a finger. Your portfolio stays updated as you complete projects."
                        />
                        <PersonaCard
                            abbr="04"
                            title="Professional Developers"
                            description="Maintain a polished online presence without the overhead. Your side projects automatically appear on your personal brand."
                        />
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 px-6 relative z-10 bg-[#0f0f23]/50">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <span className="w-2 h-2 bg-[#b537f2] shadow-[0_0_10px_#b537f2]" />
                            <span className="text-xs font-bold text-[#b537f2] uppercase tracking-[0.2em] font-mono">
                                Questions
                            </span>
                            <span className="w-2 h-2 bg-[#b537f2] shadow-[0_0_10px_#b537f2]" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-[#e8e8e8] uppercase tracking-wide">
                            Frequently Asked Questions
                        </h2>
                    </div>

                    <div className="space-y-6">
                        <FAQItem
                            question="Is PortfolioSync really free?"
                            answer="Yes! Our core features are completely free forever. We're planning premium features for power users in the future, but the essentials will always be free."
                        />
                        <FAQItem
                            question="Can you access my private repositories?"
                            answer="Only if you explicitly grant us permission! By default, we only access public repositories. You have full control over what we can see."
                        />
                        <FAQItem
                            question="How fast are the updates?"
                            answer="Usually within 2-5 minutes of pushing to GitHub! We use webhooks to detect changes instantly and process them in real-time."
                        />
                        <FAQItem
                            question="Do I need to code my own portfolio?"
                            answer="Yes, PortfolioSync provides the data – you build the display. This gives you complete creative freedom! We have example templates and code snippets to help you get started."
                        />
                        <FAQItem
                            question="What if I make my repo private later?"
                            answer="No problem! We'll automatically stop tracking it and remove it from your portfolio data. You have full control at all times."
                        />
                        <FAQItem
                            question="Can I use this with GitLab or Bitbucket?"
                            answer="Currently, we only support GitHub. GitLab and Bitbucket support is on our roadmap! Want to see it sooner? Let us know!"
                        />
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-20 md:py-32 px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="relative md:bg-[#1a1a2e] md:border-4 md:border-[#f72585] p-8 md:p-12 shadow-[0_0_50px_rgba(247,37,133,0.2)] overflow-hidden group hover:shadow-[0_0_80px_rgba(247,37,133,0.4)] transition-all duration-500 rounded-2xl md:rounded-none">
                        {/* Background gradient */}
                        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent,rgba(247,37,133,0.05),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        <h2 className="text-4xl md:text-5xl font-bold text-[#e8e8e8] uppercase tracking-wide mb-4">
                            Ready to Automate Your Portfolio?
                        </h2>
                        <p className="text-xl text-[#a0a0a0] mb-10 max-w-2xl mx-auto">
                            Join developers who have automated their portfolio maintenance. Free to start, no credit card required.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link to="/">
                                <Button size="lg" variant="primary" glow>
                                    JOIN WAITLIST
                                </Button>
                            </Link>
                        </div>

                        <p className="text-sm text-[#666666] mt-8">
                            No credit card required • Setup in under 2 minutes • Free forever
                        </p>
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
                        {/* <Link to="/login" className="hover:text-[#f72585] transition-colors">Login</Link> */}
                    </div>
                </div>
            </footer>
        </div>
    );
}

// Sub-components
function StepCard({ number, title, icon, color, children, demoPlaceholder, reverse = false }) {
    return (
        <div className={`grid lg:grid-cols-2 gap-8 items-center ${reverse ? 'lg:grid-flow-dense' : ''}`}>
            <div className={reverse ? 'lg:col-start-2' : ''}>
                <div className="flex items-start gap-4 mb-6">
                    <div
                        className="w-16 h-16 flex-shrink-0 border-3 bg-[#0a0a0f] flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.6)]"
                        style={{ borderColor: color }}
                    >
                        <div style={{ color }}>{icon}</div>
                    </div>
                    <div>
                        <div className="text-sm font-mono font-bold mb-1" style={{ color }}>
                            // STEP {number}
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-[#e8e8e8] uppercase tracking-wide">
                            {title}
                        </h3>
                    </div>
                </div>
                {children}
            </div>
            <div className={reverse ? 'lg:col-start-1 lg:row-start-1' : ''}>
                <DemoPlaceholder name={demoPlaceholder} color={color} />
            </div>
        </div>
    );
}

function DemoPlaceholder({ name, color }) {
    // Map demo names to their corresponding images
    const imageMap = {
        'github_connection': githubConnectionDemo,
        'project_selection': projectSelectionDemo,
        'monitoring_dashboard': monitoringDashboardDemo,
        'api_integration': apiIntegrationDemo,
    };

    const image = imageMap[name];

    return (
        <div
            className="aspect-video border-3 bg-[#0a0a0f] relative overflow-hidden group"
            style={{ borderColor: color }}
        >
            {/* Glow effect */}
            <div
                className="absolute inset-0 opacity-5 blur-[60px]"
                style={{ background: color }}
            />

            {/* Demo Image */}
            {image && (
                <img
                    src={image}
                    alt={name.replace(/_/g, ' ')}
                    className="w-full h-full object-cover"
                />
            )}

            {/* Scanline effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white to-transparent opacity-0 group-hover:opacity-5 translate-y-[-100%] group-hover:translate-y-[100%] transition-all duration-1000 pointer-events-none" />
        </div>
    );
}

function FeatureBox({ abbr, title, description, color }) {
    return (
        <div className="card-sleek md:card-retro p-6 hover:-translate-y-2 transition-transform group">
            <div
                className="w-14 h-14 border-2 bg-[#0a0a0f] flex items-center justify-center mb-4 font-mono font-bold text-sm transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(0,0,0,0.5)]"
                style={{ borderColor: color, color: color }}
            >
                {abbr}
            </div>
            <h3
                className="text-xl font-bold uppercase mb-3 tracking-wide"
                style={{ color }}
            >
                {title}
            </h3>
            <p className="text-[#a0a0a0] leading-relaxed text-sm">
                {description}
            </p>
        </div>
    );
}

function PersonaCard({ abbr, title, description }) {
    return (
        <div className="card-sleek md:card-retro p-8 border-l-4 border-[#f72585]">
            <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex-shrink-0 border-2 border-[#f72585] bg-[#0a0a0f] flex items-center justify-center font-mono font-bold text-[#f72585] text-sm">
                    {abbr}
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-[#e8e8e8] uppercase mb-3 tracking-wide">
                        {title}
                    </h3>
                    <p className="text-[#a0a0a0] leading-relaxed">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
}

function FAQItem({ question, answer }) {
    return (
        <div className="card-sleek md:card-retro p-6 border-l-3 border-[#4cc9f0]">
            <h3 className="text-lg md:text-xl font-bold text-[#e8e8e8] mb-3">
                {question}
            </h3>
            <p className="text-[#a0a0a0] leading-relaxed">
                {answer}
            </p>
        </div>
    );
}
