const QUADRANTS = [
  { key: 'strengths',     label: 'Strengths',     icon: '💪', color: '#10b981', border: 'rgba(16,185,129,0.2)',  bg: 'rgba(16,185,129,0.04)'  },
  { key: 'weaknesses',    label: 'Weaknesses',    icon: '⚠️', color: '#f97316', border: 'rgba(249,115,22,0.2)',  bg: 'rgba(249,115,22,0.04)'  },
  { key: 'opportunities', label: 'Opportunities', icon: '🎯', color: '#3b82f6', border: 'rgba(59,130,246,0.2)',  bg: 'rgba(59,130,246,0.04)'  },
  { key: 'threats',       label: 'Threats',       icon: '🛡️', color: '#ef4444', border: 'rgba(239,68,68,0.2)',   bg: 'rgba(239,68,68,0.04)'   },
];

export default function SwotAnalysis({ swot }) {
  if (!swot) return null;

  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <span className="text-base">🔷</span>
        <h2 className="section-title">SWOT Analysis</h2>
        <div className="section-rule" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {QUADRANTS.map(({ key, label, icon, color, border, bg }, qi) => (
          <div
            key={key}
            className="card card-hover p-5"
            style={{
              background: bg,
              borderColor: border,
              opacity: 0,
              animation: `slideUpFade 0.45s ease-out ${qi * 0.1}s forwards`,
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-base">{icon}</span>
              <span className="font-display font-bold text-[13px] tracking-tight" style={{ color }}>
                {label}
              </span>
            </div>
            <ul className="space-y-2.5">
              {(swot[key] || []).map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[13px] text-text-2"
                  style={{ opacity: 0, animation: `slideUpFade 0.35s ease-out ${qi * 0.1 + 0.15 + i * 0.07}s forwards` }}>
                  <span className="shrink-0 mt-0.5 text-[10px]" style={{ color }}>▸</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
