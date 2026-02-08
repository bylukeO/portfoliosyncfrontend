import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AuthCallback() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { setToken } = useAuth();
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = searchParams.get('token');
        const errorMessage = searchParams.get('error');

        if (errorMessage) {
            setError(decodeURIComponent(errorMessage));
            return;
        }

        if (token) {
            // Store the JWT token
            localStorage.setItem('auth_token', token);
            setToken(token);

            // Redirect to dashboard
            navigate('/dashboard', { replace: true });
        } else {
            setError('No authentication token received');
        }
    }, [searchParams, navigate, setToken]);

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f] relative overflow-hidden p-4">
                {/* Grid pattern background */}
                <div className="absolute inset-0 opacity-5 bg-[linear-gradient(#2a2a4a_1px,transparent_1px),linear-gradient(90deg,#2a2a4a_1px,transparent_1px)] bg-[size:50px_50px]" />

                {/* Radial glows */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#ff3366] opacity-[0.05] blur-[100px] rounded-full" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#4cc9f0] opacity-[0.05] blur-[100px] rounded-full" />
                </div>

                <div className="relative z-10 bg-[#1a1a2e] border-3 border-[#ff3366] p-8 max-w-md w-full text-center shadow-[0_0_20px_rgba(255,51,102,0.3)]">
                    {/* Top accent line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ff3366] via-[#ff6b35] to-[#ff3366]" />

                    <div className="w-16 h-16 border-2 border-[#ff3366] bg-[#0a0a0f] flex items-center justify-center mx-auto mb-6 shadow-[0_0_10px_rgba(255,51,102,0.4)]">
                        <svg className="w-8 h-8 text-[#ff3366]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="square" strokeLinejoin="miter" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>

                    <h1 className="text-2xl font-bold text-[#e8e8e8] tracking-widest uppercase mb-4">
                        Authentication Failed
                    </h1>

                    <p className="text-[#a0a0a0] font-mono text-sm mb-6 border-2 border-[#2a2a4a] bg-[#0a0a0f] p-4">
                        <span className="text-[#ff3366]">&gt;</span> {error}
                    </p>

                    <a
                        href="/login"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#ff3366] border-3 border-[#ff3366] text-white font-bold uppercase tracking-wide text-sm hover:shadow-[0_0_15px_rgba(255,51,102,0.5)] transition-all"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="square" strokeLinejoin="miter" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Try Again
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f] relative overflow-hidden">
            {/* Grid pattern background */}
            <div className="absolute inset-0 opacity-5 bg-[linear-gradient(#2a2a4a_1px,transparent_1px),linear-gradient(90deg,#2a2a4a_1px,transparent_1px)] bg-[size:50px_50px]" />

            {/* Radial glows */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#f72585] opacity-[0.05] blur-[100px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#4cc9f0] opacity-[0.05] blur-[100px] rounded-full" />
            </div>

            <div className="relative z-10 text-center">
                {/* Animated spinner */}
                <div className="relative w-16 h-16 mx-auto mb-6">
                    <div className="absolute inset-0 border-3 border-[#2a2a4a]" />
                    <div className="absolute inset-0 border-3 border-transparent border-t-[#f72585] border-r-[#4cc9f0] animate-spin" />
                    <div className="absolute inset-2 bg-[#0a0a0f] flex items-center justify-center">
                        <div className="w-2 h-2 bg-[#f72585] animate-pulse shadow-[0_0_10px_rgba(247,37,133,0.6)]" />
                    </div>
                </div>

                <p className="text-[#e8e8e8] font-mono uppercase tracking-widest text-sm mb-2">
                    Completing Authentication
                </p>
                <p className="text-[#666666] font-mono text-xs">
                    <span className="text-[#4cc9f0]">&gt;</span> Initializing session...
                </p>
            </div>
        </div>
    );
}
