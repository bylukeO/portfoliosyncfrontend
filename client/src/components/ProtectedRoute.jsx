import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();

    if (loading) {
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
                        Loading
                    </p>
                    <p className="text-[#666666] font-mono text-xs">
                        <span className="text-[#4cc9f0]">&gt;</span> Verifying session...
                    </p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        // Redirect to login, but save the attempted URL
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}
