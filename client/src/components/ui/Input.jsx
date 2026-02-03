/**
 * Input Component - Synthwave Terminal Edition
 * 
 * Terminal-inspired input with neon focus glow.
 * 
 * @example
 * <Input placeholder="Enter command..." />
 * <Input type="password" label="ACCESS CODE" error="Invalid code" />
 * <Input icon={<SearchIcon />} placeholder="Search..." variant="terminal" />
 */

import { forwardRef } from 'react';

const Input = forwardRef(function Input({
    label,
    error,
    hint,
    icon,
    iconPosition = 'left',
    fullWidth = true,
    variant = 'default',
    className = '',
    ...props
}, ref) {
    const baseClasses = `
        ${fullWidth ? 'w-full' : ''}
        px-4 py-3
        bg-[#0f0f23]
        border-2
        text-[#e8e8e8]
        placeholder:text-[#666666] placeholder:italic
        focus:outline-none
        transition-all duration-100
        ${icon && iconPosition === 'left' ? 'pl-11' : ''}
        ${icon && iconPosition === 'right' ? 'pr-11' : ''}
    `;

    const stateClasses = error
        ? 'border-[#ff3366] focus:border-[#ff3366] focus:shadow-[0_0_10px_rgba(255,51,102,0.4)]'
        : variant === 'terminal'
            ? 'border-[#39ff14] focus:border-[#39ff14] focus:shadow-[0_0_10px_rgba(57,255,20,0.4)]'
            : 'border-[#2a2a4a] focus:border-[#4cc9f0] focus:shadow-[0_0_10px_rgba(76,201,240,0.4)]';

    return (
        <div className={fullWidth ? 'w-full' : ''}>
            {label && (
                <label className="block text-xs font-bold text-[#a0a0a0] mb-2 uppercase tracking-widest">
                    <span className="text-[#f72585] mr-1">&gt;</span>
                    {label}
                </label>
            )}
            <div className="relative">
                {icon && iconPosition === 'left' && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666666]">
                        {icon}
                    </div>
                )}
                <input
                    ref={ref}
                    className={`${baseClasses} ${stateClasses} ${className}`}
                    {...props}
                />
                {icon && iconPosition === 'right' && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#666666]">
                        {icon}
                    </div>
                )}
            </div>
            {error && (
                <p className="mt-2 text-xs text-[#ff3366] font-medium uppercase tracking-wide flex items-center gap-1">
                    <span>⚠</span> {error}
                </p>
            )}
            {hint && !error && (
                <p className="mt-2 text-xs text-[#666666] italic">
                    {hint}
                </p>
            )}
        </div>
    );
});

export default Input;
