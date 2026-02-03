/**
 * Card Component - Synthwave Terminal Edition
 * 
 * Retro-styled card with chunky borders and pixel shadows.
 * 
 * @example
 * <Card>Simple card content</Card>
 * <Card variant="accent" glow>Featured card with neon glow</Card>
 * <Card variant="terminal">Terminal-style card</Card>
 */

const variants = {
    default: 'bg-[#1a1a2e] border-[#2a2a4a]',
    elevated: 'bg-[#16213e] border-[#2a2a4a]',
    accent: 'bg-[#1a1a2e] border-[#f72585]',
    terminal: 'bg-[#0a0a0f] border-[#39ff14]',
    ghost: 'bg-transparent border-[#2a2a4a]/50',
};

const glowStyles = {
    default: '',
    accent: 'shadow-[0_0_10px_rgba(247,37,133,0.4),0_0_20px_rgba(247,37,133,0.2)]',
    terminal: 'shadow-[0_0_10px_rgba(57,255,20,0.4),0_0_20px_rgba(57,255,20,0.2)]',
};

export default function Card({
    children,
    variant = 'default',
    interactive = false,
    glow = false,
    scanlines = false,
    padding = 'md',
    className = '',
    onClick,
    ...props
}) {
    const paddingClasses = {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
    };

    const baseClasses = 'border-3 relative';
    const shadowClasses = 'shadow-[4px_4px_0_rgba(0,0,0,0.8)]';
    const interactiveClasses = interactive
        ? 'cursor-pointer hover:border-[#f72585] hover:shadow-[4px_4px_0_rgba(247,37,133,0.6)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-100'
        : '';
    const glowClasses = glow ? (glowStyles[variant] || glowStyles.accent) : '';
    const scanlineClasses = scanlines ? 'scanlines' : '';

    return (
        <div
            className={`
                ${baseClasses}
                ${variants[variant]}
                ${paddingClasses[padding]}
                ${shadowClasses}
                ${interactiveClasses}
                ${glowClasses}
                ${scanlineClasses}
                ${className}
            `}
            onClick={onClick}
            role={interactive ? 'button' : undefined}
            tabIndex={interactive ? 0 : undefined}
            {...props}
        >
            {/* Top accent line for accent variant */}
            {variant === 'accent' && (
                <div className="absolute -top-[3px] left-0 right-0 h-[3px] bg-gradient-to-r from-[#f72585] via-[#4cc9f0] to-[#f72585]" />
            )}
            {children}
        </div>
    );
}

// Card Header sub-component
Card.Header = function CardHeader({ children, className = '' }) {
    return (
        <div className={`flex items-center justify-between mb-4 pb-3 border-b-2 border-[#2a2a4a] ${className}`}>
            {children}
        </div>
    );
};

// Card Title sub-component
Card.Title = function CardTitle({ children, glitch = false, className = '' }) {
    return (
        <h3 className={`text-lg font-bold text-[#e8e8e8] uppercase tracking-wide ${glitch ? 'glitch-text' : ''} ${className}`}>
            {children}
        </h3>
    );
};

// Card Description sub-component
Card.Description = function CardDescription({ children, className = '' }) {
    return (
        <p className={`text-sm text-[#a0a0a0] mt-1 ${className}`}>
            {children}
        </p>
    );
};

// Card Content sub-component
Card.Content = function CardContent({ children, className = '' }) {
    return (
        <div className={className}>
            {children}
        </div>
    );
};

// Card Footer sub-component
Card.Footer = function CardFooter({ children, className = '' }) {
    return (
        <div className={`flex items-center justify-end gap-3 mt-6 pt-4 border-t-2 border-[#2a2a4a] ${className}`}>
            {children}
        </div>
    );
};

// Retro corner decorations component
Card.Corners = function CardCorners() {
    return (
        <>
            <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[#f72585]" />
            <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-[#f72585]" />
            <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-[#4cc9f0]" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-[#4cc9f0]" />
        </>
    );
};
