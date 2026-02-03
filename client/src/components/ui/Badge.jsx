/**
 * Badge Component - Synthwave Terminal Edition
 * 
 * Retro pixel-art inspired status badges.
 * 
 * @example
 * <Badge variant="success">ONLINE</Badge>
 * <Badge variant="warning" dot pulse>PENDING</Badge>
 * <Badge variant="error">FAILED</Badge>
 */

const variants = {
    success: 'bg-[rgba(57,255,20,0.15)] text-[#39ff14] border-[#39ff14]',
    warning: 'bg-[rgba(249,168,37,0.15)] text-[#f9a825] border-[#f9a825]',
    error: 'bg-[rgba(255,51,102,0.15)] text-[#ff3366] border-[#ff3366]',
    info: 'bg-[rgba(76,201,240,0.15)] text-[#4cc9f0] border-[#4cc9f0]',
    neutral: 'bg-[rgba(100,100,100,0.15)] text-[#a0a0a0] border-[#666666]',
    pink: 'bg-[rgba(247,37,133,0.15)] text-[#f72585] border-[#f72585]',
};

const sizes = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-3 py-1 text-[11px]',
    lg: 'px-4 py-1.5 text-xs',
};

const dotColors = {
    success: 'bg-[#39ff14]',
    warning: 'bg-[#f9a825]',
    error: 'bg-[#ff3366]',
    info: 'bg-[#4cc9f0]',
    neutral: 'bg-[#a0a0a0]',
    pink: 'bg-[#f72585]',
};

export default function Badge({
    children,
    variant = 'neutral',
    size = 'md',
    dot = false,
    pulse = false,
    className = '',
    ...props
}) {
    return (
        <span
            className={`
                inline-flex items-center gap-1.5
                font-bold uppercase tracking-widest
                border-2
                ${variants[variant]}
                ${sizes[size]}
                ${className}
            `}
            {...props}
        >
            {dot && (
                <span
                    className={`
                        w-1.5 h-1.5 
                        ${dotColors[variant]}
                        ${pulse ? 'animate-pulse shadow-[0_0_6px_currentColor]' : ''}
                    `}
                />
            )}
            {children}
        </span>
    );
}
