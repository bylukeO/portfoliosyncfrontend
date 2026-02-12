
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Badge } from '../components/ui';

// Section Header Component
function SectionHeader({ title, subtitle, className = "" }) {
    return (
        <div className={`text-center mb-16 ${className}`}>
            <div className="flex items-center justify-center gap-2 mb-4">
                <span className="w-2 h-2 bg-[#f72585] shadow-[0_0_10px_#f72585]" />
                <span className="text-xs font-bold text-[#f72585] uppercase tracking-[0.2em] font-mono">
          // {title}
                </span>
                <span className="w-2 h-2 bg-[#f72585] shadow-[0_0_10px_#f72585]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#e8e8e8] uppercase tracking-wide">
                {subtitle}
            </h2>
        </div>
    );
}

// Icon Components
function SyncIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="square" strokeLinejoin="miter" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L6.75 2.906M12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
        </svg>
    );
}

function CodeIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="square" strokeLinejoin="miter" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
        </svg>
    );
}

function LightningIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="square" strokeLinejoin="miter" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
    );
}

function ShieldIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="square" strokeLinejoin="miter" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
        </svg>
    );
}

const WaitlistForm = ({ className = "" }) => {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("idle");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) return;

        setStatus("loading");

        // TODO: Connect this to your backend or Google Sheets
        console.log("WAITLIST_LEAD:", email);

        setTimeout(() => {
            setStatus("success");
            setEmail("");
        }, 1500);
    };

    if (status === "success") {
        return (
            <div className={`p-6 bg-[#0f0f23] border border-[#39ff14] relative overflow-hidden group ${className}`}>
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent,rgba(57,255,20,0.1),transparent)] opacity-20" />
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-2 h-2 bg-[#39ff14] rounded-full animate-pulse shadow-[0_0_10px_#39ff14]" />
                        <span className="text-[#39ff14] font-bold tracking-widest uppercase text-sm">Access Requested</span>
                    </div>
                    <p className="text-[#a0a0a0] text-sm leading-relaxed">
                        You've been added to the priority queue. We'll verify your GitHub profile and send an invite code shortly.
                    </p>
                    <button
                        onClick={() => setStatus("idle")}
                        className="mt-4 text-[10px] text-[#666666] hover:text-[#e8e8e8] uppercase tracking-wider transition-colors"
                    >
                        // Add another email
                    </button>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className={`w-full max-w-md ${className}`}>
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-grow relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#f72585] to-[#4cc9f0] opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-lg rounded-lg" />
                    <input
                        type="email"
                        placeholder="ENTER EMAIL ADDRESS..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="relative z-10 w-full px-6 py-4 bg-[#0a0a0f] border-2 border-[#2a2a4a] text-[#e8e8e8] placeholder:text-[#666666] focus:border-[#f72585] focus:outline-none focus:shadow-[0_0_20px_rgba(247,37,133,0.2)] transition-all font-mono text-sm"
                        required
                        disabled={status === "loading"}
                    />
                </div>
                <Button
                    type="submit"
                    variant="primary"
                    glow
                    disabled={status === "loading"}
                    className="whitespace-nowrap px-8 py-4"
                >
                    {status === "loading" ? "PROCESSING..." : "JOIN WAITLIST"}
                </Button>
            </div>
            <p className="mt-4 text-[10px] text-[#666666] font-mono uppercase tracking-widest pl-1">
                // Limited Spots Available for Beta v1.0
            </p>
        </form>
    );
};

export default function Landing() {
    const scrollToFeatures = () => {
        document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
    };

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
                <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-10 h-10 border-2 border-[#f72585] bg-[#0a0a0f] flex items-center justify-center shadow-[0_0_10px_rgba(247,37,133,0.4)]">
                        <span className="text-[#f72585]">
                            <SyncIcon className="w-5 h-5" />
                        </span>
                    </div>
                    <span className="text-xl font-bold text-[#e8e8e8] tracking-wide hidden sm:block">
                        PORTFOLIO<span className="text-[#f72585]">SYNC</span>
                    </span>
                </div>
                <div className="flex items-center gap-2 md:gap-4">
                    {/* Hidden Login for Admin/Early Access */}
                    {/* <Link to="/login" className="opacity-0 hover:opacity-100 transition-opacity">
                        <Button variant="ghost" className="inline-flex text-[10px]">ADMIN</Button>
                    </Link> */}
                    <div className="px-3 py-1 border border-[#f72585] bg-[rgba(247,37,133,0.1)] text-[#f72585] text-[10px] font-bold uppercase tracking-widest shadow-[0_0_10px_rgba(247,37,133,0.3)] animate-pulse">
                        Private Beta
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-24 md:pt-32 pb-20 px-6 z-10 min-h-screen flex flex-col justify-center">
                <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 bg-[rgba(76,201,240,0.1)] border border-[#4cc9f0] text-[#4cc9f0] text-[10px] font-bold uppercase tracking-widest shadow-[0_0_10px_rgba(76,201,240,0.2)]">
                            <span className="w-2 h-2 bg-[#4cc9f0] animate-pulse" />
                            <span>System Online v1.0</span>
                        </div>

                        <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight text-[#e8e8e8] uppercase tracking-wide glitch-text">
                            Keep Your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f72585] via-[#b537f2] to-[#4cc9f0]">
                                Portfolio
                            </span> <br />
                            In Sync
                        </h1>

                        <p className="text-lg md:text-xl text-[#a0a0a0] mb-8 max-w-lg font-light leading-relaxed border-l-2 border-[#2a2a4a] pl-6">
                            Automatically detect changes in your GitHub repositories and update your portfolio site in real-time. No more manual updates.
                        </p>

                        <div className="flex flex-col gap-6">
                            <WaitlistForm />
                        </div>

                        {/* Tech stack indicators */}
                        <div className="mt-12 flex items-center gap-6 opacity-50 grayscale hover:grayscale-0 transition-all duration-300">
                            {/* Placeholders for tech logos if needed */}
                            <div className="h-8 w-24 bg-[#2a2a4a] border border-[#444455]" />
                            <div className="h-8 w-24 bg-[#2a2a4a] border border-[#444455]" />
                            <div className="h-8 w-24 bg-[#2a2a4a] border border-[#444455]" />
                        </div>
                    </div>

                    {/* Hero Visual - Dashboard Preview */}
                    <div className="relative hidden lg:block">
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#f72585] to-[#4cc9f0] opacity-20 blur-[80px]" />
                        <div className="relative z-10 border-4 border-[#2a2a4a] bg-[#0a0a0f] p-2 shadow-[20px_20px_0_rgba(0,0,0,0.5)] transform rotate-3 hover:rotate-0 transition-transform duration-500">
                            {/* Terminal Header */}
                            <div className="h-8 bg-[#1a1a2e] border-b-2 border-[#2a2a4a] flex items-center px-4 gap-2">
                                <div className="w-3 h-3 bg-[#ff3366] rounded-full" />
                                <div className="w-3 h-3 bg-[#f9a825] rounded-full" />
                                <div className="w-3 h-3 bg-[#39ff14] rounded-full" />
                                <div className="ml-4 text-[10px] text-[#666666] font-mono">user@portfoliosync:~</div>
                            </div>

                            {/* Code Preview */}
                            <div className="p-6 font-mono text-sm">
                                <div className="text-[#a0a0a0] mb-2">$ portfoliosync init</div>
                                <div className="text-[#39ff14] mb-4">Initializing sync engine... [OK]</div>

                                <div className="grid gap-4">
                                    <div className="border-2 border-[#2a2a4a] p-4 bg-[#16213e]">
                                        <div className="flex justify-between mb-2">
                                            <span className="text-[#f72585]">project-alpha</span>
                                            <span className="text-[#4cc9f0]">SYNCED</span>
                                        </div>
                                        <div className="h-1 bg-[#2a2a4a] w-full">
                                            <div className="h-full bg-[#f72585] w-[75%]" />
                                        </div>
                                    </div>
                                    <div className="border-2 border-[#2a2a4a] p-4 bg-[#16213e]">
                                        <div className="flex justify-between mb-2">
                                            <span className="text-[#f72585]">web-app-v2</span>
                                            <span className="text-[#f9a825]">PENDING</span>
                                        </div>
                                        <div className="h-1 bg-[#2a2a4a] w-full">
                                            <div className="h-full bg-[#f9a825] w-[30%]" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-16 md:py-24 px-4 md:px-6 relative z-10 bg-[#0f0f23]/50">
                <div className="max-w-7xl mx-auto">
                    <SectionHeader
                        title="CAPABILITIES"
                        subtitle="Upgrade Your Workflow"
                    />

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <FeatureCard
                            icon={<SyncIcon className="w-8 h-8" />}
                            title="Auto-Sync"
                            description="Automatically detects pushes to your GitHub repositories."
                            color="#f72585"
                        />
                        <FeatureCard
                            icon={<CodeIcon className="w-8 h-8" />}
                            title="Smart Updates"
                            description="Only syncs what changed. Optimized for performance and speed."
                            color="#4cc9f0"
                        />
                        <FeatureCard
                            icon={<ShieldIcon className="w-8 h-8" />}
                            title="Portfolio Ready"
                            description="Formats data perfectly for your frontend portfolio display."
                            color="#39ff14"
                        />
                        <FeatureCard
                            icon={<LightningIcon className="w-8 h-8" />}
                            title="Real-time"
                            description="Changes reflect instantly. No more manual data entry."
                            color="#b537f2"
                        />
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-16 md:py-24 px-4 md:px-6 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <SectionHeader
                        title="PROTOCOL"
                        subtitle="How It Works"
                    />

                    <div className="relative mt-20">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-[#2a2a4a] -translate-y-1/2 z-0" />

                        <div className="grid lg:grid-cols-3 gap-12 relative z-10">
                            <StepCard
                                number="01"
                                title="Connect GitHub"
                                description="Securely link your GitHub account to give read-only access to your repos."
                            />
                            <StepCard
                                number="02"
                                title="Select Repos"
                                description="Choose which repositories you want to showcase on your portfolio."
                            />
                            <StepCard
                                number="03"
                                title="Auto-Sync"
                                description="Our engine watches for changes and updates your portfolio automatically."
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 md:py-32 px-4 md:px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="relative gradient-border-mask md:bg-[#1a1a2e] md:border-4 md:border-[#f72585] p-8 md:p-12 shadow-[0_0_30px_rgba(247,37,133,0.15)] md:shadow-[0_0_50px_rgba(247,37,133,0.2)] overflow-hidden group hover:shadow-[0_0_50px_rgba(247,37,133,0.3)] md:hover:shadow-[0_0_80px_rgba(247,37,133,0.4)] transition-all duration-500 rounded-2xl md:rounded-none">
                        {/* Background gradient */}
                        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent,rgba(247,37,133,0.05),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform translate-x-[-100%] group-hover:translate-x-[100%]" />

                        <h2 className="text-4xl font-bold text-[#e8e8e8] uppercase tracking-wide mb-6">
                            Secure Your Access
                        </h2>
                        <p className="text-xl text-[#a0a0a0] mb-10 max-w-xl mx-auto">
                            Join the private beta and be among the first to experience automated portfolio synchronization.
                        </p>
                        <div className="flex justify-center">
                            <WaitlistForm className="max-w-lg mx-auto" />
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
                        <a href="#features" className="hover:text-[#f72585] transition-colors">Features</a>
                        <Link to="/learn-more" className="hover:text-[#f72585] transition-colors">Learn More</Link>
                        <Link to="/docs" className="hover:text-[#f72585] transition-colors">Documentation</Link>
                        <Link to="/login" className="hover:text-[#f72585] transition-colors">Login</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}

// Sub-components
function FeatureCard({ icon, title, description, color }) {
    return (
        <div className="card-sleek md:card-retro p-6 md:p-8 group hover:-translate-y-2">
            <div
                className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center mb-6 bg-[#0a0a0f] rounded-lg md:rounded-none border border-[#2a2a4a] md:border-2 transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_20px_rgba(0,0,0,0.6)]"
                style={{ borderColor: 'rgba(255,255,255,0.1)' }}
            >
                <div className="text-white group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" style={{ color }}>
                    {icon}
                </div>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-[#e8e8e8] uppercase mb-3 tracking-wide">{title}</h3>
            <p className="text-[#a0a0a0] leading-relaxed text-sm">{description}</p>
        </div>
    );
}

function StepCard({ number, title, description }) {
    return (
        <div className="bg-[#0a0a0f] border-3 border-[#2a2a4a] p-8 relative">
            <div className="absolute -top-6 left-8 bg-[#0a0a0f] px-2 text-[#4cc9f0] font-mono font-bold text-lg border-2 border-[#2a2a4a]">
        // STEP {number}
            </div>
            <h3 className="text-xl font-bold text-[#e8e8e8] uppercase mb-3 tracking-wide mt-2">{title}</h3>
            <p className="text-[#a0a0a0] leading-relaxed text-sm">{description}</p>
        </div>
    );
}
