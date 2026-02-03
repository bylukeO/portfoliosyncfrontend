/**
 * Skeleton Component - Synthwave Terminal Edition
 * 
 * Retro-styled loading placeholders with scanline shimmer effect.
 * 
 * @example
 * <Skeleton />
 * <Skeleton variant="circle" size={40} />
 * <Skeleton variant="text" lines={3} />
 */

const variants = {
    rectangle: '',
    circle: 'rounded-full',
    text: '',
};

export default function Skeleton({
    variant = 'rectangle',
    width,
    height,
    size,
    lines = 1,
    className = '',
    ...props
}) {
    const baseClasses = `
        bg-gradient-to-r from-[#1a1a2e] via-[#2a2a4a] to-[#1a1a2e]
        bg-[length:200%_100%]
        animate-[shimmer-retro_1.5s_infinite]
        border border-[#2a2a4a]
    `;

    // For circle variant, size takes precedence
    if (variant === 'circle' && size) {
        return (
            <div
                className={`${baseClasses} ${variants[variant]} ${className}`}
                style={{ width: size, height: size }}
                {...props}
            />
        );
    }

    // For text variant, render multiple lines
    if (variant === 'text') {
        return (
            <div className={`space-y-2 ${className}`} {...props}>
                {Array.from({ length: lines }).map((_, i) => (
                    <div
                        key={i}
                        className={`${baseClasses} ${variants[variant]}`}
                        style={{
                            width: i === lines - 1 ? '75%' : '100%',
                            height: 16,
                        }}
                    />
                ))}
            </div>
        );
    }

    // Default rectangle
    return (
        <div
            className={`${baseClasses} ${variants[variant]} ${className}`}
            style={{
                width: width || '100%',
                height: height || 48,
            }}
            {...props}
        />
    );
}

// Card Skeleton - retro styled
Skeleton.Card = function SkeletonCard({ className = '' }) {
    return (
        <div className={`bg-[#1a1a2e] border-3 border-[#2a2a4a] p-6 shadow-[4px_4px_0_rgba(0,0,0,0.8)] ${className}`}>
            <div className="flex items-start gap-4">
                <Skeleton variant="circle" size={40} />
                <div className="flex-1">
                    <Skeleton width="60%" height={20} className="mb-2" />
                    <Skeleton width="40%" height={16} />
                </div>
            </div>
            <div className="mt-4">
                <Skeleton variant="text" lines={2} />
            </div>
        </div>
    );
};

// Table Row Skeleton
Skeleton.TableRow = function SkeletonTableRow({ columns = 4, className = '' }) {
    return (
        <div className={`flex items-center gap-4 py-4 border-b border-[#2a2a4a] ${className}`}>
            {Array.from({ length: columns }).map((_, i) => (
                <Skeleton
                    key={i}
                    width={i === 0 ? '30%' : `${20 + Math.random() * 10}%`}
                    height={16}
                />
            ))}
        </div>
    );
};

// Terminal loading skeleton
Skeleton.Terminal = function SkeletonTerminal({ lines = 3, className = '' }) {
    return (
        <div className={`bg-[#0a0a0f] border-2 border-[#39ff14] p-4 font-mono ${className}`}>
            <div className="text-[#39ff14] text-xs mb-2 opacity-50">$ loading...</div>
            {Array.from({ length: lines }).map((_, i) => (
                <div key={i} className="flex items-center gap-2 mb-1">
                    <span className="text-[#666666] text-xs">{'>'}</span>
                    <Skeleton
                        width={`${50 + Math.random() * 40}%`}
                        height={12}
                        className="opacity-50"
                    />
                </div>
            ))}
        </div>
    );
};
