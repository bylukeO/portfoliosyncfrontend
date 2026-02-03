/**
 * Button Component - Synthwave Terminal Edition
 * 
 * Arcade-inspired buttons with chunky press effects and neon glow.
 * 
 * @example
 * <Button variant="primary">LAUNCH</Button>
 * <Button variant="secondary" icon={<Icon />}>CONNECT</Button>
 * <Button variant="danger" loading>DELETING...</Button>
 */

const variants = {
    primary: `
        bg-[#f72585] border-[#f72585] text-white
        shadow-[4px_4px_0_rgba(0,0,0,0.8)]
        hover:shadow-[4px_4px_0_rgba(0,0,0,0.8),0_0_15px_rgba(247,37,133,0.5)]
        hover:brightness-110
    `,
    secondary: `
        bg-transparent border-[#4cc9f0] text-[#4cc9f0]
        shadow-[3px_3px_0_rgba(0,0,0,0.8)]
        hover:bg-[#4cc9f0] hover:text-[#0a0a0f]
        hover:shadow-[3px_3px_0_rgba(0,0,0,0.8),0_0_15px_rgba(76,201,240,0.5)]
    `,
    ghost: `
        bg-transparent border-[#2a2a4a] text-[#a0a0a0]
        hover:border-[#e8e8e8] hover:text-[#e8e8e8]
    `,
    danger: `
        bg-transparent border-[#ff3366] text-[#ff3366]
        shadow-[3px_3px_0_rgba(0,0,0,0.8)]
        hover:bg-[#ff3366] hover:text-white
        hover:shadow-[3px_3px_0_rgba(0,0,0,0.8),0_0_15px_rgba(255,51,102,0.5)]
    `,
    success: `
        bg-transparent border-[#39ff14] text-[#39ff14]
        shadow-[3px_3px_0_rgba(0,0,0,0.8)]
        hover:bg-[#39ff14] hover:text-[#0a0a0f]
        hover:shadow-[3px_3px_0_rgba(0,0,0,0.8),0_0_15px_rgba(57,255,20,0.5)]
    `,
    terminal: `
        bg-[#0a0a0f] border-[#39ff14] text-[#39ff14]
        shadow-[3px_3px_0_rgba(57,255,20,0.3)]
        hover:shadow-[3px_3px_0_rgba(57,255,20,0.3),0_0_15px_rgba(57,255,20,0.4)]
    `,
};

const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5 border-2',
    md: 'px-5 py-2.5 text-sm gap-2 border-3',
    lg: 'px-7 py-3.5 text-base gap-2.5 border-3',
};

function LoadingSpinner() {
    return (
        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
    );
}

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    icon,
    iconPosition = 'left',
    loading = false,
    disabled = false,
    fullWidth = false,
    className = '',
    ...props
}) {
    const baseClasses = `
        inline-flex items-center justify-center 
        font-bold uppercase tracking-wider
        transition-all duration-100
        disabled:opacity-50 disabled:cursor-not-allowed
        active:translate-x-0.5 active:translate-y-0.5 active:shadow-none
    `;

    return (
        <button
            className={`
                ${baseClasses}
                ${variants[variant]}
                ${sizes[size]}
                ${fullWidth ? 'w-full' : ''}
                ${className}
            `}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <>
                    <LoadingSpinner />
                    <span className="ml-2">{children}</span>
                </>
            ) : (
                <>
                    {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
                    {children}
                    {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
                </>
            )}
        </button>
    );
}
