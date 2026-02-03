
import React from 'react';

export function Divider({ label }) {
    if (!label) {
        return <div className="h-[2px] w-full bg-[#2a2a4a] my-6" />;
    }

    return (
        <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-[#2a2a4a] to-transparent" />
            <span className="text-[10px] text-[#666666] uppercase tracking-[0.2em] font-mono">
                {label}
            </span>
            <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-[#2a2a4a] to-transparent" />
        </div>
    );
}

export default Divider;
