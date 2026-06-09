const CATEGORY = {
  short:  { label: 'Short-lived',  color: 'text-red-400',     bg: 'rgba(239,68,68,0.06)',    border: 'rgba(239,68,68,0.2)',    bar: '#f87171' },
  medium: { label: 'Mid-term',     color: 'text-yellow-400',  bg: 'rgba(245,158,11,0.06)',   border: 'rgba(245,158,11,0.2)',   bar: '#fbbf24' },
  long:   { label: 'Long-lasting', color: 'text-emerald-400', bg: 'rgba(16,185,129,0.06)',   border: 'rgba(16,185,129,0.2)',   bar: '#34d399' },
};

const DEATH_COLOR = {
  low:    { color: 'text-emerald-400', bg: 'rgba(16,185,129,0.08)',  border: 'rgba(16,185,129,0.2)'  },
  medium: { color: 'text-yellow-400',  bg: 'rgba(245,158,11,0.08)',  border: 'rgba(245,158,11,0.2)'  },
  high:   { color: 'text-red-400',     bg: 'rgba(239,68,68,0.08)',   border: 'rgba(239,68,68,0.2)'   },
};

function SurvivalBar({ label, pct, color }) {
  return (
    <div>
      <div className="flex justify-between items-baseline mb-1.5">
        <span className="text-[12px] text-text-3">{label}</span>
        <span className="font-display font-bold text-sm" style={{ color }}>{pct}%</span>
      </div>
      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
    </div>
  );
}

export default function LifespanCard({ lifespan }) {
  if (!lifespan) return null;

  const cat = CATEGORY[lifespan.lifespanCategory] || CATEGORY.medium;
  const { survivalProbability: sp } = lifespan;

  return (
    <div className="card p-7 sm:p-8 space-y-6">
      {/* Header row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-base">⏳</span>
            <span className={`font-display font-bold text-lg ${cat.color}`}>{cat.label}</span>
            <span
              className={`ml-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border font-display ${cat.color}`}
              style={{ background: cat.bg, borderColor: cat.border }}
            >
              {lifespan.lifespanCategory}
            </span>
          </div>
          <p className="text-text-3 text-[12px]">Estimated life span</p>
        </div>

        <div className="text-center sm:text-right">
          <div className="font-display font-extrabold text-2xl text-text-1">{lifespan.projectedRunway}</div>
          <div className="text-[11px] text-text-3 uppercase tracking-wider mt-0.5">projected runway</div>
        </div>
      </div>

      {/* Survival probability bars */}
      {sp && (
        <div
          className="rounded-2xl p-5 space-y-4"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <p className="label-text mb-3">Survival probability</p>
          <SurvivalBar label="After 1 year"  pct={sp.oneYear}   color={cat.bar} />
          <SurvivalBar label="After 3 years" pct={sp.threeYear} color={cat.bar} />
          <SurvivalBar label="After 5 years" pct={sp.fiveYear}  color={cat.bar} />
        </div>
      )}

      {/* Assessment */}
      {lifespan.assessment && (
        <p className="text-sm text-text-2 leading-relaxed">{lifespan.assessment}</p>
      )}

      {/* Critical milestones + longevity factors side by side */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {lifespan.criticalMilestones?.length > 0 && (
          <div>
            <p className="label-text mb-3">Critical milestones</p>
            <ul className="space-y-2">
              {lifespan.criticalMilestones.map((m, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-text-2">
                  <span className="text-violet-400 mt-0.5 shrink-0">◆</span>
                  {m}
                </li>
              ))}
            </ul>
          </div>
        )}

        {lifespan.longevityFactors?.length > 0 && (
          <div>
            <p className="label-text mb-3">Longevity boosters</p>
            <ul className="space-y-2">
              {lifespan.longevityFactors.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-text-2">
                  <span className="text-emerald-400 mt-0.5 shrink-0">↑</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Death scenarios */}
      {lifespan.deathScenarios?.length > 0 && (
        <div>
          <p className="label-text mb-3">Failure modes</p>
          <div className="space-y-2">
            {lifespan.deathScenarios.map((d, i) => {
              const s = DEATH_COLOR[d.likelihood] || DEATH_COLOR.medium;
              return (
                <div
                  key={i}
                  className="flex items-start justify-between gap-3 rounded-xl px-4 py-3"
                  style={{ background: s.bg, border: `1px solid ${s.border}` }}
                >
                  <p className="text-sm text-text-2 flex-1">{d.scenario}</p>
                  <span
                    className={`shrink-0 text-[11px] font-bold px-2 py-0.5 rounded-full font-display ${s.color}`}
                    style={{ background: s.bg, border: `1px solid ${s.border}` }}
                  >
                    {d.likelihood}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
