import { useState } from 'react';

export default function SuggestionsPanel({ suggestions, alternativeAngles, executionPriorities }) {
  const [open, setOpen] = useState(false);

  const hasSuggestions = suggestions?.length > 0;
  const hasAngles      = alternativeAngles?.length > 0;
  const hasPriorities  = executionPriorities?.length > 0;

  if (!hasSuggestions && !hasAngles && !hasPriorities) return null;

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full card card-hover p-5 flex items-center justify-between group"
        style={{ borderColor: 'rgba(124,58,237,0.25)', background: 'rgba(124,58,237,0.04)' }}
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
            style={{ background: 'rgba(124,58,237,0.15)' }}>
            💡
          </div>
          <div className="text-left">
            <p className="font-display font-bold text-[14px] text-accentLight">Get Improvement Ideas</p>
            <p className="text-text-3 text-[12px] mt-0.5">
              {suggestions?.length || 0} suggestions · {alternativeAngles?.length || 0} pivots · {executionPriorities?.length || 0} quick wins
            </p>
          </div>
        </div>
        <span className="text-accentLight text-lg group-hover:translate-x-1 transition-transform">→</span>
      </button>
    );
  }

  return (
    <div className="space-y-3 animate-slide-up">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-3">
          <span>💡</span>
          <h2 className="section-title">How to Make It Better</h2>
          <div className="section-rule" />
        </div>
        <button onClick={() => setOpen(false)}
          className="text-text-3 hover:text-text-1 text-[12px] transition-colors shrink-0 ml-4">
          Hide ↑
        </button>
      </div>

      {hasSuggestions && (
        <div className="card p-5"
          style={{ background: 'rgba(124,58,237,0.04)', borderColor: 'rgba(124,58,237,0.18)' }}>
          <p className="font-display font-bold text-[13px] text-accentLight mb-4">Actionable suggestions</p>
          <ol className="space-y-3">
            {suggestions.map((s, i) => (
              <li key={i} className="flex gap-3 text-[13px] text-text-2">
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-[11px] shrink-0 mt-0.5 font-bold font-display text-accentLight"
                  style={{ background: 'rgba(124,58,237,0.2)' }}>
                  {i + 1}
                </span>
                {s}
              </li>
            ))}
          </ol>
        </div>
      )}

      {hasAngles && (
        <div className="card p-5"
          style={{ background: 'rgba(59,130,246,0.04)', borderColor: 'rgba(59,130,246,0.18)' }}>
          <p className="font-display font-bold text-[13px] text-blue-400 mb-4">Alternative angles / pivots</p>
          <ul className="space-y-3">
            {alternativeAngles.map((a, i) => (
              <li key={i} className="flex gap-3 text-[13px] text-text-2">
                <span className="text-blue-400 shrink-0">⇄</span>{a}
              </li>
            ))}
          </ul>
        </div>
      )}

      {hasPriorities && (
        <div className="card p-5"
          style={{ background: 'rgba(16,185,129,0.04)', borderColor: 'rgba(16,185,129,0.18)' }}>
          <p className="font-display font-bold text-[13px] text-emerald-400 mb-4">Do these first</p>
          <ul className="space-y-2.5">
            {executionPriorities.map((p, i) => (
              <li key={i} className="flex gap-3 text-[13px] text-text-2">
                <span className="text-emerald-400 shrink-0">✓</span>{p}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
