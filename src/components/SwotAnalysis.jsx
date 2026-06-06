const QUADRANTS = [
  { key: 'strengths',    label: 'Strengths',    icon: '💪', color: 'text-emerald-400', bg: 'bg-emerald-500/5',  border: 'border-emerald-500/25' },
  { key: 'weaknesses',   label: 'Weaknesses',   icon: '⚠️', color: 'text-orange-400', bg: 'bg-orange-500/5',  border: 'border-orange-500/25'  },
  { key: 'opportunities',label: 'Opportunities',icon: '🎯', color: 'text-blue-400',   bg: 'bg-blue-500/5',    border: 'border-blue-500/25'    },
  { key: 'threats',      label: 'Threats',      icon: '🛡️', color: 'text-red-400',    bg: 'bg-red-500/5',     border: 'border-red-500/25'     },
];

export default function SwotAnalysis({ swot }) {
  if (!swot) return null;

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <span>🔷</span> SWOT Analysis
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {QUADRANTS.map(({ key, label, icon, color, bg, border }, qi) => (
          <div
            key={key}
            className={`card p-5 ${bg} border ${border} card-hover animate-slide-up-fade`}
            style={{ animationDelay: `${qi * 0.1}s`, animationFillMode: 'both' }}
          >
            <div className={`flex items-center gap-2 mb-3 ${color} font-medium`}>
              <span>{icon}</span>
              <span>{label}</span>
            </div>
            <ul className="space-y-2">
              {(swot[key] || []).map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-slate-300"
                  style={{
                    opacity: 0,
                    animation: `slideUpFade 0.35s ease-out ${qi * 0.1 + 0.15 + i * 0.08}s forwards`,
                  }}
                >
                  <span className={`mt-1 ${color} text-xs shrink-0`}>▸</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
