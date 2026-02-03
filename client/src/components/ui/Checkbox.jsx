
import React from 'react';

export function Checkbox({ label, checked, onChange, name, id }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group" htmlFor={id || name}>
      <div className={`
        relative w-5 h-5 flex items-center justify-center
        bg-[#0a0a0f] border-2 transition-all duration-100 ease-out
        ${checked 
          ? 'border-[#f72585] shadow-[0_0_10px_rgba(247,37,133,0.3)]' 
          : 'border-[#2a2a4a] group-hover:border-[#666666]'}
      `}>
        <input
          type="checkbox"
          id={id || name}
          name={name}
          checked={checked}
          onChange={onChange}
          className="sr-only"
        />
        {checked && (
          <span className="text-[#f72585] text-sm font-bold animate-in fade-in zoom-in duration-200">
            ✓
          </span>
        )}
      </div>
      {label && (
        <span className={`
          text-sm font-medium tracking-wide transition-colors duration-100
          ${checked ? 'text-[#e8e8e8]' : 'text-[#a0a0a0] group-hover:text-[#cccccc]'}
        `}>
          {label}
        </span>
      )}
    </label>
  );
}

export default Checkbox;
