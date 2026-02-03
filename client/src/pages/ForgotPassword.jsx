
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Input, Button } from '../components/ui';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        // Simulate API call
        console.log('Reset password for:', email);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f] relative overflow-hidden p-4">
            {/* Grid pattern background */}
            <div className="absolute inset-0 opacity-5 bg-[linear-gradient(#2a2a4a_1px,transparent_1px),linear-gradient(90deg,#2a2a4a_1px,transparent_1px)] bg-[size:50px_50px]" />

            {/* Radial glows */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] left-[50%] transform -translate-x-1/2 w-[60%] h-[60%] bg-[#4cc9f0] opacity-[0.03] blur-[100px] rounded-full" />
            </div>

            <Card variant="accent" glow className="w-full max-w-md relative z-10 scanlines">
                <div className="mb-6">
                    <Link
                        to="/login"
                        className="inline-flex items-center gap-2 text-xs font-bold text-[#666666] hover:text-[#f72585] uppercase tracking-widest transition-colors mb-6 group"
                    >
                        <span className="group-hover:-translate-x-1 transition-transform">{'<-'}</span>
                        Back to Login
                    </Link>

                    <h1 className="text-2xl font-bold text-[#e8e8e8] tracking-widest uppercase mb-2">
                        Reset Access Code
                    </h1>
                    <p className="text-[#a0a0a0] font-mono text-sm">
            // Enter your email and we'll send you a reset link
                    </p>
                </div>

                {!isSubmitted ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Input
                            label="&gt; EMAIL"
                            type="email"
                            placeholder="user@system.net"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <Button type="submit" variant="primary" fullWidth className="group">
                            <span className="group-hover:text-shadow-glow transition-all">
                                Send Reset Link
                            </span>
                        </Button>
                    </form>
                ) : (
                    <div className="space-y-6">
                        <div className="bg-[rgba(57,255,20,0.1)] border-2 border-[#39ff14] p-4 flex items-start gap-3">
                            <div className="text-[#39ff14] mt-0.5">✓</div>
                            <div>
                                <h3 className="text-[#39ff14] font-bold uppercase tracking-wider text-sm mb-1">
                                    Link Sent
                                </h3>
                                <p className="text-[#a0a0a0] text-sm">
                                    We've sent a password reset link to <span className="text-[#e8e8e8] font-bold">{email}</span>. Please check your inbox.
                                </p>
                            </div>
                        </div>

                        <Button
                            variant="secondary"
                            fullWidth
                            onClick={() => setIsSubmitted(false)}
                        >
                            TRY ANOTHER EMAIL
                        </Button>
                    </div>
                )}
            </Card>

            <div className="absolute bottom-4 text-[10px] text-[#444455] font-mono">
                © 2026 // PORTFOLIOSYNC // RECOVERY MODE
            </div>
        </div>
    );
}
