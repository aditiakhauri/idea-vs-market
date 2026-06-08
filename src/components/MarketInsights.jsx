function Badge({ value, map }) {
  const c = map[value] || { color: '#8b8faa', border: 'rgba(255,255,255,0.08)', bg: 'rgba(255,255,255,0.04)' };
  return (
    <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold font-display border"
      style={{ color: c.color, borderColor: c.border, background: c.bg }}>
      {value}
    </span>
  );
}

const TIMING_MAP = {
  excellent:   { color: '#10b981', border: 'rgba(16,185,129,0.25)',  bg: 'rgba(16,185,129,0.08)' },
  good:        { color: '#3b82f6', border: 'rgba(59,130,246,0.25)',  bg: 'rgba(59,130,246,0.08)' },
  neutral:     { color: '#f59e0b', border: 'rgba(245,158,11,0.25)',  bg: 'rgba(245,158,11,0.08)' },
  challenging: { color: '#ef4444', border: 'rgba(239,68,68,0.25)',   bg: 'rgba(239,68,68,0.08)'  },
};
const INTENSITY_MAP = {
  low:       { color: '#10b981', border: 'rgba(16,185,129,0.25)',  bg: 'rgba(16,185,129,0.08)' },
  medium:    { color: '#f59e0b', border: 'rgba(245,158,11,0.25)',  bg: 'rgba(245,158,11,0.08)' },
  high:      { color: '#f97316', border: 'rgba(249,115,22,0.25)',  bg: 'rgba(249,115,22,0.08)' },
  'very high':{ color: '#ef4444', border: 'rgba(239,68,68,0.25)', bg: 'rgba(239,68,68,0.08)'  },
};

function StatCard({ label, value }) {
  return (
    <div className="card p-4 flex flex-col gap-1.5">
      <p className="label-text">{label}</p>
      <div className="font-display font-semibold text-[13px] text-text-1">{value}</div>
    </div>
  );
}

function SectionHeading({ icon, children }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span>{icon}</span>
      <h2 className="section-title">{children}</h2>
      <div className="section-rule" />
    </div>
  );
}

export default function MarketInsights({ analysis }) {
  const { marketAnalysis, competition, customerAnalysis, businessModel } = analysis;

  return (
    <div className="space-y-6">
      {/* Market overview */}
      <div>
        <SectionHeading icon="📊">Market Overview</SectionHeading>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
          <StatCard label="Market Size (TAM)"  value={marketAnalysis?.marketSize || '—'} />
          <StatCard label="Growth Rate"        value={marketAnalysis?.growthRate || '—'} />
          <StatCard label="Market Timing"      value={<Badge value={marketAnalysis?.timing} map={TIMING_MAP} />} />
          <StatCard label="Competition"        value={<Badge value={competition?.intensity} map={INTENSITY_MAP} />} />
        </div>
        {marketAnalysis?.timingExplanation && (
          <div className="card p-4" style={{ background: 'rgba(59,130,246,0.04)', borderColor: 'rgba(59,130,246,0.15)' }}>
            <p className="label-text mb-1">Timing analysis</p>
            <p className="text-sm text-text-2">{marketAnalysis.timingExplanation}</p>
          </div>
        )}
      </div>

      {/* Trends */}
      {marketAnalysis?.keyTrends?.length > 0 && (
        <div>
          <p className="label-text mb-3">Key market trends</p>
          <div className="flex flex-wrap gap-2">
            {marketAnalysis.keyTrends.map((t, i) => (
              <span key={i} className="trend-tag">{t}</span>
            ))}
          </div>
        </div>
      )}

      {/* Tailwinds / Headwinds */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {marketAnalysis?.tailwinds?.length > 0 && (
          <div className="card p-5"
            style={{ background: 'rgba(16,185,129,0.04)', borderColor: 'rgba(16,185,129,0.18)' }}>
            <p className="font-display font-bold text-[13px] text-emerald-400 mb-3 flex items-center gap-1.5">
              <span>✅</span> What's working in this space
            </p>
            <ul className="space-y-2">
              {marketAnalysis.tailwinds.map((t, i) => (
                <li key={i} className="text-[13px] text-text-2 flex gap-2">
                  <span className="text-emerald-500 mt-0.5 text-[10px] shrink-0">▲</span>{t}
                </li>
              ))}
            </ul>
          </div>
        )}
        {marketAnalysis?.headwinds?.length > 0 && (
          <div className="card p-5"
            style={{ background: 'rgba(239,68,68,0.04)', borderColor: 'rgba(239,68,68,0.18)' }}>
            <p className="font-display font-bold text-[13px] text-red-400 mb-3 flex items-center gap-1.5">
              <span>⚠️</span> Headwinds / challenges
            </p>
            <ul className="space-y-2">
              {marketAnalysis.headwinds.map((h, i) => (
                <li key={i} className="text-[13px] text-text-2 flex gap-2">
                  <span className="text-red-500 mt-0.5 text-[10px] shrink-0">▼</span>{h}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Competitors */}
      {competition?.directCompetitors?.length > 0 && (
        <div>
          <SectionHeading icon="⚔️">Competitive Landscape</SectionHeading>
          <div className="space-y-3">
            <div>
              <p className="label-text mb-2">Direct competitors</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {competition.directCompetitors.map((c, i) => (
                  <div key={i} className="card p-3.5"
                    style={{ background: 'rgba(249,115,22,0.04)', borderColor: 'rgba(249,115,22,0.18)' }}>
                    <p className="font-display font-bold text-[13px] text-orange-300">{c.name}</p>
                    <p className="text-[12px] text-text-3 mt-1">{c.description}</p>
                  </div>
                ))}
              </div>
            </div>
            {competition.indirectCompetitors?.length > 0 && (
              <div>
                <p className="label-text mb-2">Indirect competitors</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {competition.indirectCompetitors.map((c, i) => (
                    <div key={i} className="card p-3.5">
                      <p className="font-display font-bold text-[13px] text-text-1">{c.name}</p>
                      <p className="text-[12px] text-text-3 mt-1">{c.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {competition.differentiationOpportunities?.length > 0 && (
              <div className="card p-4"
                style={{ background: 'rgba(124,58,237,0.05)', borderColor: 'rgba(124,58,237,0.2)' }}>
                <p className="font-display font-bold text-[13px] text-accentLight mb-2.5">Differentiation opportunities</p>
                <ul className="space-y-1.5">
                  {competition.differentiationOpportunities.map((d, i) => (
                    <li key={i} className="text-[13px] text-text-2 flex gap-2">
                      <span className="text-accentLight shrink-0">→</span>{d}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Customer + Business model */}
      {(customerAnalysis || businessModel) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {customerAnalysis && (
            <div className="card p-5">
              <p className="font-display font-bold text-[13px] text-text-1 mb-3 flex items-center gap-2">
                <span>👥</span> Customer Analysis
              </p>
              <div className="space-y-2 text-[13px]">
                {customerAnalysis.idealCustomer && (
                  <p className="text-text-2">{customerAnalysis.idealCustomer}</p>
                )}
                <div className="flex items-center gap-2 mt-2">
                  <span className="label-text">Willingness to pay:</span>
                  <span className={`font-semibold text-[12px] ${
                    customerAnalysis.willingnessToPay === 'high' ? 'text-emerald-400' :
                    customerAnalysis.willingnessToPay === 'medium' ? 'text-yellow-400' : 'text-red-400'
                  }`}>{customerAnalysis.willingnessToPay}</span>
                </div>
                {customerAnalysis.acquisitionExplanation && (
                  <p className="text-text-3 text-[12px]">{customerAnalysis.acquisitionExplanation}</p>
                )}
              </div>
            </div>
          )}
          {businessModel && (
            <div className="card p-5">
              <p className="font-display font-bold text-[13px] text-text-1 mb-3 flex items-center gap-2">
                <span>💼</span> Business Model
              </p>
              <div className="space-y-2 text-[13px]">
                {businessModel.revenueModelAssessment && (
                  <p className="text-text-2">{businessModel.revenueModelAssessment}</p>
                )}
                <p className="text-text-3 text-[12px]">{businessModel.pathToProfitability}</p>
                {businessModel.capitalRequirements && (
                  <div className="flex items-center gap-2 mt-1">
                    <span className="label-text">Capital needed:</span>
                    <span className={`font-semibold text-[12px] ${
                      businessModel.capitalRequirements === 'low' ? 'text-emerald-400' :
                      businessModel.capitalRequirements === 'medium' ? 'text-yellow-400' : 'text-red-400'
                    }`}>{businessModel.capitalRequirements}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
