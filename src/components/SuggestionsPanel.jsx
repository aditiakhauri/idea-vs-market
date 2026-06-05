import { useState } from 'react';

export default function SuggestionsPanel({ suggestions, alternativeAngles, executionPriorities }) {
  const [open, setOpen] = useState(false);

  const hasSuggestions = suggestions?.length > 0;
  const hasAngles = alternativeAngles?.length > 0;
  const hasPriorities = executionPriorities?.length > 0;

  if (!hasSuggestions && !hasAngles && !hasPriorities) return null;

  return (
    <div className="space-y-4">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="w-full card card-hover border-violet-500/30 bg-violet-500/5 p-5 flex items-center justify-between group transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center text-xl">
              💡
            </div>
            <div className="text-left">
              <p className="font-semibold text-violet-300">Get Improvement Ideas</p>
              <p className="text-slate-500 text-sm">
                {suggestions?.length || 0} suggestions · {alternativeAngles?.length || 0} alternative angles · {executionPriorities?.length || 0} quick wins
              </p>
            </div>
          </div>
          <div className="text-violet-400 group-hover:translate-x-1 transition-transform text-lg">→</div>
        </button>
      ) : (
        <div className="animate-slide-up space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <span>💡</span> How to Make It Better
            </h2>
            <button
              onClick={() => setOpen(false)}
              className="text-slate-500 hover:text-slate-300 text-sm transition-colors"
            >
              Hide ↑
            </button>
          </div>

          {hasSuggestions && (
            <div className="card p-5 bg-violet-500/5 border-violet-500/20">
              <h3 className="text-violet-400 font-medium text-sm mb-4">Actionable Suggestions</h3>
              <ol className="space-y-3">
                {suggestions.map((s, i) => (
                  <li key={i} className="flex gap-3 text-sm text-slate-300">
                    <span className="w-5 h-5 rounded-full bg-violet-500/20 text-violet-400 text-xs flex items-center justify-center shrink-0 mt-0.5 font-medium">
                      {i + 1}
                    </span>
                    <span>{s}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {hasAngles && (
            <div className="card p-5 bg-blue-500/5 border-blue-500/20">
              <h3 className="text-blue-400 font-medium text-sm mb-4">Alternative Angles / Pivots</h3>
              <ul className="space-y-3">
                {alternativeAngles.map((a, i) => (
                  <li key={i} className="flex gap-3 text-sm text-slate-300">
                    <span className="text-blue-400 mt-0.5 shrink-0">⇄</span>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {hasPriorities && (
            <div className="card p-5 bg-emerald-500/5 border-emerald-500/20">
              <h3 className="text-emerald-400 font-medium text-sm mb-4">Execution Priorities (Do These First)</h3>
              <ul className="space-y-2">
                {executionPriorities.map((p, i) => (
                  <li key={i} className="flex gap-3 text-sm text-slate-300">
                    <span className="text-emerald-400 shrink-0">✓</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
