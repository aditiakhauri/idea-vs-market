import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function CustomSelect({ value, onChange, options, placeholder = 'Select...', className = '' }) {
  const [open, setOpen] = useState(false);
  const [rect, setRect] = useState(null);
  const triggerRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handleClick(e) {
      if (triggerRef.current && !triggerRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  // Close on scroll or resize so the portal doesn't drift
  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    window.addEventListener('scroll', close, true);
    window.addEventListener('resize', close);
    return () => {
      window.removeEventListener('scroll', close, true);
      window.removeEventListener('resize', close);
    };
  }, [open]);

  function toggle() {
    if (!open) setRect(triggerRef.current.getBoundingClientRect());
    setOpen(o => !o);
  }

  function select(val) {
    onChange({ target: { value: val } });
    setOpen(false);
  }

  const selected = options.find(o => o === value);

  const dropdown = open && rect && createPortal(
    <div
      onMouseDown={e => e.stopPropagation()}
      style={{
        position: 'fixed',
        top: rect.bottom + 6,
        left: rect.left,
        width: rect.width,
        zIndex: 9999,
        background: '#16162a',
        border: '1px solid #2a2a4a',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.7), 0 0 0 1px rgba(124,58,237,0.1)',
        animation: 'slideUpFade 0.15s ease-out both',
        transformOrigin: 'top',
      }}
    >
      <div className="max-h-56 overflow-y-auto py-1 custom-dropdown-scroll">
        {options.map(opt => (
          <button
            key={opt}
            type="button"
            onMouseDown={e => { e.preventDefault(); select(opt); }}
            className={`w-full text-left px-4 py-2.5 text-sm transition-colors duration-100
              ${opt === value
                ? 'bg-accent/20 text-accentLight font-medium'
                : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
          >
            {opt === value && <span className="mr-2 text-accentLight text-xs">✓</span>}
            {opt}
          </button>
        ))}
      </div>
    </div>,
    document.body
  );

  return (
    <div ref={triggerRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={toggle}
        className={`w-full bg-surface border rounded-xl px-4 py-3 text-sm text-left flex items-center justify-between gap-2
          focus:outline-none transition-all duration-200
          ${open
            ? 'border-accent/60 shadow-[0_0_0_1px_rgba(124,58,237,0.3),0_0_15px_rgba(124,58,237,0.1)]'
            : 'border-border hover:border-border/80'
          }
          ${selected ? 'text-white' : 'text-slate-600'}`}
      >
        <span className="truncate">{selected || placeholder}</span>
        <svg
          className={`shrink-0 w-4 h-4 text-slate-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {dropdown}
    </div>
  );
}
