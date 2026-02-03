/**
 * Select Component - Synthwave Terminal Edition
 * 
 * Retro-styled dropdown following terminal aesthetics.
 * 
 * @example
 * <Select label="SYSTEM" options={[{value: 'a', label: 'Option A'}]} />
 */

import { forwardRef } from 'react';

const Select = forwardRef(function Select({
    label,
    options = [],
    error,
    hint,
    placeholder = 'Select option...',
    fullWidth = true,
    className = '',
    ...props
}, ref) {
    const baseClasses = `
        ${fullWidth ? 'w-full' : ''}
        px-4 py-3 pr-10
        bg-[#0f0f23]
        border-2
        text-[#e8e8e8]
        focus:outline-none
        transition-all duration-100
        appearance-none
        cursor-pointer
    `;

    const stateClasses = error
        ? 'border-[#ff3366] focus:border-[#ff3366] focus:shadow-[0_0_10px_rgba(255,51,102,0.4)]'
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
                <select
                    ref={ref}
                    className={`${baseClasses} ${stateClasses} ${className}`}
                    {...props}
                >
                    {placeholder && (
                        <option value="" disabled>
                            {placeholder}
                        </option>
                    )}
                    {options.map((option) => (
                        <option
                            key={option.value}
                            value={option.value}
                            className="bg-[#1a1a2e] text-[#e8e8e8]"
                        >
                            {option.label}
                        </option>
                    ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#4cc9f0]">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="square" strokeLinejoin="miter" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
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

export default Select;
