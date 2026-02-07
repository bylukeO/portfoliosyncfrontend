import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const { isAuthenticated, loading, login } = useAuth();
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [error, setError] = useState(null);

    // If already logged in, redirect to dashboard
    if (!loading && isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    const handleGitHubLogin = async () => {
        setIsLoggingIn(true);
        setError(null);
        try {
            await login();
            // login() redirects to GitHub, so we won't reach here
        } catch (err) {
            setError('Failed to connect to authentication service');
            setIsLoggingIn(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f] relative overflow-hidden">
                {/* Grid pattern background */}
                <div className="absolute inset-0 opacity-5 bg-[linear-gradient(#2a2a4a_1px,transparent_1px),linear-gradient(90deg,#2a2a4a_1px,transparent_1px)] bg-[size:50px_50px]" />

                <div className="relative w-16 h-16 mx-auto">
                    <div className="absolute inset-0 border-3 border-[#2a2a4a]" />
                    <div className="absolute inset-0 border-3 border-transparent border-t-[#f72585] border-r-[#4cc9f0] animate-spin" />
                    <div className="absolute inset-2 bg-[#0a0a0f] flex items-center justify-center">
                        <div className="w-2 h-2 bg-[#f72585] animate-pulse shadow-[0_0_10px_rgba(247,37,133,0.6)]" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0f] relative overflow-hidden p-4">
            {/* Grid pattern background */}
            <div className="absolute inset-0 opacity-5 bg-[linear-gradient(#2a2a4a_1px,transparent_1px),linear-gradient(90deg,#2a2a4a_1px,transparent_1px)] bg-[size:50px_50px]" />

            {/* Radial glows */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#f72585] opacity-[0.05] blur-[100px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#4cc9f0] opacity-[0.05] blur-[100px] rounded-full" />
            </div>

            <div className="relative z-10 bg-[#1a1a2e] border-3 border-[#f72585] p-8 max-w-md w-full shadow-[4px_4px_0_rgba(247,37,133,0.6),0_0_20px_rgba(247,37,133,0.3)] my-auto">
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#f72585] via-[#4cc9f0] to-[#f72585]" />

                {/* Scanline overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-30 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.3)_2px,rgba(0,0,0,0.3)_4px)]" />

                <div className="relative">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <div className="w-12 h-12 border-2 border-[#f72585] bg-[#0a0a0f] flex items-center justify-center shadow-[0_0_10px_rgba(247,37,133,0.4)]">
                                <svg className="w-7 h-7 text-[#f72585]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="square" strokeLinejoin="miter" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L6.75 2.906M12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                </svg>
                            </div>
                        </div>
                        <h1 className="text-2xl font-bold text-[#e8e8e8] tracking-widest uppercase mb-2">
                            Portfolio<span className="text-[#f72585]">Sync</span>
                        </h1>
                        <p className="text-[#666666] font-mono text-xs uppercase tracking-widest">
              // Keep your portfolio synced
                        </p>
                    </div>

                    {/* Error message */}
                    {error && (
                        <div className="mb-6 border-2 border-[#ff3366] bg-[rgba(255,51,102,0.1)] p-4">
                            <p className="text-[#ff3366] font-mono text-sm">
                                <span className="text-[#666666]">&gt;</span> {error}
                            </p>
                        </div>
                    )}

                    {/* GitHub login button */}
                    <button
                        onClick={handleGitHubLogin}
                        disabled={isLoggingIn}
                        className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-[#0a0a0f] border-3 border-[#4cc9f0] text-[#4cc9f0] font-bold uppercase tracking-wide text-sm transition-all hover:bg-[#4cc9f0] hover:text-[#0a0a0f] hover:shadow-[0_0_15px_rgba(76,201,240,0.5)] disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                        {isLoggingIn ? (
                            <>
                                <div className="w-5 h-5 border-2 border-current border-t-transparent animate-spin" />
                                <span>Connecting...</span>
                            </>
                        ) : (
                            <>
                                <GitHubIcon className="w-5 h-5" />
                                <span>Continue with GitHub</span>
                            </>
                        )}
                    </button>

                    {/* Divider */}
                    <div className="my-6 flex items-center gap-4">
                        <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-[#2a2a4a] to-transparent" />
                        <span className="text-[10px] text-[#666666] font-mono uppercase tracking-widest">
              // secure oauth
                        </span>
                        <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-[#2a2a4a] to-transparent" />
                    </div>

                    {/* Info section */}
                    <div className="space-y-4">
                        <div className="border-2 border-[#2a2a4a] bg-[#0a0a0f] p-4">
                            <h3 className="text-[10px] text-[#666666] font-mono uppercase tracking-widest mb-3">
                // What happens next
                            </h3>
                            <ul className="space-y-2">
                                <li className="flex items-start gap-2 text-sm text-[#a0a0a0]">
                                    <span className="text-[#39ff14] mt-1">▸</span>
                                    <span>You'll be redirected to GitHub to authorize</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm text-[#a0a0a0]">
                                    <span className="text-[#39ff14] mt-1">▸</span>
                                    <span>We'll access your public repositories</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm text-[#a0a0a0]">
                                    <span className="text-[#39ff14] mt-1">▸</span>
                                    <span>Your portfolio stays automatically synced</span>
                                </li>
                            </ul>
                        </div>

                        <p className="text-[10px] text-[#444455] font-mono text-center">
                            By signing in, you agree to grant PortfolioSync access to your GitHub
                            repositories for portfolio synchronization.
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-16 mb-4 text-[10px] text-[#444455] font-mono z-20">
                © 2026 // PORTFOLIOSYNC // SECURE CONNECTION
            </div>
        </div>
    );
}

// GitHub Icon component
function GitHubIcon({ className }) {
    return (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
        </svg>
    );
}
