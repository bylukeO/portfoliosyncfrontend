
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Input, Button } from '../components/ui';
import Checkbox from '../components/ui/Checkbox';
import Divider from '../components/ui/Divider';
import SocialButton, { GitHubIcon } from '../components/SocialButton';

export default function Register() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Register attempt:', formData);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f] relative overflow-hidden p-4">
            {/* Grid pattern background */}
            <div className="absolute inset-0 opacity-5 bg-[linear-gradient(#2a2a4a_1px,transparent_1px),linear-gradient(90deg,#2a2a4a_1px,transparent_1px)] bg-[size:50px_50px]" />

            {/* Radial glows */}
            <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#f72585] opacity-[0.05] blur-[100px] rounded-full" />
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#39ff14] opacity-[0.05] blur-[100px] rounded-full" />
            </div>

            <Card variant="accent" glow className="w-full max-w-md relative z-10 scanlines">
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="w-10 h-10 border-2 border-[#f72585] bg-[#0a0a0f] flex items-center justify-center shadow-[0_0_10px_rgba(247,37,133,0.4)]">
                            <svg className="w-6 h-6 text-[#f72585]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="square" strokeLinejoin="miter" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L6.75 2.906M12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                            </svg>
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-[#e8e8e8] tracking-widest uppercase mb-2">
                        Create Account
                    </h1>
                    <p className="text-[#a0a0a0] font-mono text-sm">
            // Initialize new user profile
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <Input
                            label="&gt; FULL NAME"
                            type="text"
                            name="fullName"
                            placeholder="JANE DOE"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            label="&gt; EMAIL"
                            type="email"
                            name="email"
                            placeholder="user@system.net"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            label="&gt; PASSWORD"
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            label="&gt; CONFIRM PASSWORD"
                            type="password"
                            name="confirmPassword"
                            placeholder="••••••••"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="flex items-start gap-2">
                        <Checkbox
                            name="agreeToTerms"
                            checked={formData.agreeToTerms}
                            onChange={handleChange}
                        />
                        <span className="text-xs text-[#a0a0a0] mt-0.5">
                            I agree to the <a href="#" className="text-[#4cc9f0] hover:text-[#e8e8e8] underline">Terms of Service</a> and <a href="#" className="text-[#4cc9f0] hover:text-[#e8e8e8] underline">Privacy Policy</a>
                        </span>
                    </div>

                    <Button type="submit" variant="primary" fullWidth className="group">
                        <span className="group-hover:text-shadow-glow transition-all">
                            Create Account
                        </span>
                    </Button>
                </form>

                <Divider label="// OR SIGN UP WITH" />

                <div className="space-y-4">
                    <SocialButton
                        icon={GitHubIcon}
                        onClick={() => console.log('GitHub signup')}
                    >
                        SIGN UP WITH GITHUB
                    </SocialButton>

                    <div className="text-center mt-6">
                        <p className="text-[#666666] text-xs uppercase tracking-wider mb-2">
                            Already have an account?
                        </p>
                        <Link
                            to="/login"
                            className="text-[#f72585] hover:text-[#ffffff] font-bold uppercase tracking-widest text-sm transition-all hover:text-shadow-glow"
                        >
                            Sign In -&gt;
                        </Link>
                    </div>
                </div>
            </Card>

            <div className="absolute bottom-4 text-[10px] text-[#444455] font-mono">
                © 2026 // PORTFOLIOSYNC // NEW USER PROTOCOL
            </div>
        </div>
    );
}
