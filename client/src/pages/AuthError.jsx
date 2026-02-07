import { useSearchParams, Link } from 'react-router-dom';

export default function AuthError() {
    const [searchParams] = useSearchParams();
    const message = searchParams.get('message') || 'An unknown error occurred during authentication';

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f] relative overflow-hidden p-4">
            {/* Grid pattern background */}
            <div className="absolute inset-0 opacity-5 bg-[linear-gradient(#2a2a4a_1px,transparent_1px),linear-gradient(90deg,#2a2a4a_1px,transparent_1px)] bg-[size:50px_50px]" />

            {/* Radial glows */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#ff3366] opacity-[0.05] blur-[100px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#ff6b35] opacity-[0.05] blur-[100px] rounded-full" />
            </div>

            <div className="relative z-10 bg-[#1a1a2e] border-3 border-[#ff3366] p-8 max-w-md w-full text-center shadow-[0_0_20px_rgba(255,51,102,0.3)]">
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ff3366] via-[#ff6b35] to-[#ff3366]" />

                {/* Scanline overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-30 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.3)_2px,rgba(0,0,0,0.3)_4px)]" />

                <div className="relative">
                    {/* Error icon */}
                    <div className="w-16 h-16 border-2 border-[#ff3366] bg-[#0a0a0f] flex items-center justify-center mx-auto mb-6 shadow-[0_0_10px_rgba(255,51,102,0.4)]">
                        <svg className="w-8 h-8 text-[#ff3366]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="square" strokeLinejoin="miter" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>

                    <h1 className="text-2xl font-bold text-[#e8e8e8] tracking-widest uppercase mb-2">
                        System Error
                    </h1>

                    <p className="text-[#666666] font-mono text-xs uppercase tracking-widest mb-6">
            // Authentication failure detected
                    </p>

                    <div className="border-2 border-[#2a2a4a] bg-[#0a0a0f] p-4 mb-6">
                        <p className="text-[#ff3366] font-mono text-sm">
                            <span className="text-[#666666]">&gt;</span> {decodeURIComponent(message)}
                        </p>
                    </div>

                    <div className="space-y-3">
                        <Link
                            to="/login"
                            className="block w-full px-6 py-3 bg-[#f72585] border-3 border-[#f72585] text-white font-bold uppercase tracking-wide text-sm hover:shadow-[0_0_15px_rgba(247,37,133,0.5)] transition-all text-center"
                        >
                            Back to Login
                        </Link>

                        <Link
                            to="/"
                            className="block w-full px-6 py-3 bg-transparent border-3 border-[#2a2a4a] text-[#a0a0a0] font-bold uppercase tracking-wide text-sm hover:border-[#4cc9f0] hover:text-[#4cc9f0] transition-all text-center"
                        >
                            Return Home
                        </Link>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-4 text-[10px] text-[#444455] font-mono">
                © 2026 // PORTFOLIOSYNC // ERROR CODE: AUTH_FAIL
            </div>
        </div>
    );
}
