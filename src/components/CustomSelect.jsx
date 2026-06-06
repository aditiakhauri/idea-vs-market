import { useState, useRef, useEffect } from 'react';

export default function CustomSelect({ value, onChange, options, placeholder = 'Select...', className = '' }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function select(val) {
    onChange({ target: { value: val } });
    setOpen(false);
  }

  const selected = options.find(o => o === value);

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className={`w-full bg-surface border rounded-xl px-4 py-3 text-sm text-left flex items-center justify-between gap-2
          focus:outline-none transition-all duration-200
          ${open
            ? 'border-accent/60 shadow-[0_0_0_1px_rgba(124,58,237,0.3),0_0_15px_rgba(124,58,237,0.1)]'
            : 'border-border hover:border-border/80'
          }
          ${selected ? 'text-white' : 'text-slate-600'}
        `}
      >
        <span className="truncate">{selected || placeholder}</span>
        <svg
          className={`shrink-0 w-4 h-4 text-slate-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute z-50 mt-1.5 w-full rounded-xl border border-border overflow-hidden shadow-xl shadow-black/40"
          style={{
            background: '#16162a',
            animation: 'slideUpFade 0.15s ease-out both',
            transformOrigin: 'top',
          }}
        >
          <div className="max-h-56 overflow-y-auto py-1 custom-dropdown-scroll">
            {options.map(opt => (
              <button
                key={opt}
                type="button"
                onClick={() => select(opt)}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors duration-100
                  ${opt === value
                    ? 'bg-accent/20 text-accentLight font-medium'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
              >
                {opt === value && (
                  <span className="mr-2 text-accentLight text-xs">✓</span>
                )}
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
