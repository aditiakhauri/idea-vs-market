function Badge({ value, map }) {
  const config = map[value] || { color: 'text-slate-400', bg: 'bg-slate-500/10', border: 'border-slate-500/20' };
  return (
    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${config.color} ${config.bg} ${config.border}`}>
      {value}
    </span>
  );
}

const TIMING_MAP = {
  excellent: { color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  good: { color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  neutral: { color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
  challenging: { color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
};

const INTENSITY_MAP = {
  low: { color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  medium: { color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
  high: { color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
  'very high': { color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
};

function StatCard({ label, value, sub }) {
  return (
    <div className="card p-4">
      <p className="text-slate-500 text-xs mb-1">{label}</p>
      <p className="text-white font-semibold text-sm">{value}</p>
      {sub && <p className="text-slate-500 text-xs mt-0.5">{sub}</p>}
    </div>
  );
}

export default function MarketInsights({ analysis }) {
  const { marketAnalysis, competition, customerAnalysis, businessModel } = analysis;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <span>📊</span> Market Overview
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          <StatCard label="Market Size (TAM)" value={marketAnalysis?.marketSize || '—'} />
          <StatCard label="Growth Rate" value={marketAnalysis?.growthRate || '—'} />
          <StatCard label="Market Timing" value={
            <Badge value={marketAnalysis?.timing} map={TIMING_MAP} />
          } />
          <StatCard label="Competition" value={
            <Badge value={competition?.intensity} map={INTENSITY_MAP} />
          } />
        </div>
        {marketAnalysis?.timingExplanation && (
          <div className="card p-4 bg-blue-500/5 border-blue-500/20">
            <p className="text-slate-400 text-xs mb-1">Timing analysis</p>
            <p className="text-sm text-slate-200">{marketAnalysis.timingExplanation}</p>
          </div>
        )}
      </div>

      {marketAnalysis?.keyTrends?.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-slate-400 mb-3">Key Market Trends</h3>
          <div className="flex flex-wrap gap-2">
            {marketAnalysis.keyTrends.map((t, i) => (
              <span key={i} className="bg-surface border border-border rounded-lg px-3 py-1.5 text-xs text-slate-300">
                {t}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {marketAnalysis?.tailwinds?.length > 0 && (
          <div className="card p-5 bg-emerald-500/5 border-emerald-500/20">
            <h3 className="text-emerald-400 font-medium text-sm mb-3 flex items-center gap-1.5">
              <span>✅</span> What's Working in This Space
            </h3>
            <ul className="space-y-2">
              {marketAnalysis.tailwinds.map((t, i) => (
                <li key={i} className="text-sm text-slate-300 flex gap-2">
                  <span className="text-emerald-500 mt-1 text-xs shrink-0">▲</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        )}
        {marketAnalysis?.headwinds?.length > 0 && (
          <div className="card p-5 bg-red-500/5 border-red-500/20">
            <h3 className="text-red-400 font-medium text-sm mb-3 flex items-center gap-1.5">
              <span>⚠️</span> Headwinds / Challenges
            </h3>
            <ul className="space-y-2">
              {marketAnalysis.headwinds.map((h, i) => (
                <li key={i} className="text-sm text-slate-300 flex gap-2">
                  <span className="text-red-500 mt-1 text-xs shrink-0">▼</span>
                  {h}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {competition?.directCompetitors?.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span>⚔️</span> Competitive Landscape
          </h2>
          <div className="space-y-3">
            <div>
              <h3 className="text-slate-500 text-xs uppercase tracking-wider mb-2">Direct Competitors</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {competition.directCompetitors.map((c, i) => (
                  <div key={i} className="card p-3 border-orange-500/20 bg-orange-500/5">
                    <p className="font-medium text-sm text-orange-300">{c.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{c.description}</p>
                  </div>
                ))}
              </div>
            </div>
            {competition.indirectCompetitors?.length > 0 && (
              <div>
                <h3 className="text-slate-500 text-xs uppercase tracking-wider mb-2">Indirect Competitors</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {competition.indirectCompetitors.map((c, i) => (
                    <div key={i} className="card p-3">
                      <p className="font-medium text-sm text-slate-300">{c.name}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{c.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {competition.differentiationOpportunities?.length > 0 && (
              <div className="card p-4 bg-violet-500/5 border-violet-500/20">
                <h3 className="text-violet-400 text-sm font-medium mb-2">Differentiation Opportunities</h3>
                <ul className="space-y-1.5">
                  {competition.differentiationOpportunities.map((d, i) => (
                    <li key={i} className="text-sm text-slate-300 flex gap-2">
                      <span className="text-violet-400">→</span> {d}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {(customerAnalysis || businessModel) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {customerAnalysis && (
            <div className="card p-5">
              <h3 className="text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
                <span>👥</span> Customer Analysis
              </h3>
              <div className="space-y-2 text-sm">
                {customerAnalysis.idealCustomer && (
                  <p className="text-slate-300">{customerAnalysis.idealCustomer}</p>
                )}
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="text-xs text-slate-500">Willingness to pay:</span>
                  <span className={`text-xs font-medium ${
                    customerAnalysis.willingnessToPay === 'high' ? 'text-emerald-400' :
                    customerAnalysis.willingnessToPay === 'medium' ? 'text-yellow-400' : 'text-red-400'
                  }`}>{customerAnalysis.willingnessToPay}</span>
                </div>
                {customerAnalysis.acquisitionExplanation && (
                  <p className="text-slate-400 text-xs mt-2">{customerAnalysis.acquisitionExplanation}</p>
                )}
              </div>
            </div>
          )}
          {businessModel && (
            <div className="card p-5">
              <h3 className="text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
                <span>💼</span> Business Model
              </h3>
              <div className="space-y-2 text-sm">
                {businessModel.revenueModelAssessment && (
                  <p className="text-slate-300">{businessModel.revenueModelAssessment}</p>
                )}
                <p className="text-slate-400 text-xs mt-2">{businessModel.pathToProfitability}</p>
                {businessModel.capitalRequirements && (
                  <div className="flex gap-2 mt-2">
                    <span className="text-xs text-slate-500">Capital needed:</span>
                    <span className={`text-xs font-medium ${
                      businessModel.capitalRequirements === 'low' ? 'text-emerald-400' :
                      businessModel.capitalRequirements === 'medium' ? 'text-yellow-400' :
                      'text-red-400'
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
