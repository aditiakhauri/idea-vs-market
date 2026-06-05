import RatingGauge from './RatingGauge.jsx';
import SwotAnalysis from './SwotAnalysis.jsx';
import MarketInsights from './MarketInsights.jsx';
import SuggestionsPanel from './SuggestionsPanel.jsx';

const SEVERITY_MAP = {
  low: { color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', label: 'Low' },
  medium: { color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', label: 'Medium' },
  high: { color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20', label: 'High' },
  critical: { color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20', label: 'Critical' },
};

export default function AnalysisResult({ analysis, startupName }) {
  const {
    rating, verdict, summary,
    risks, investorPerspective,
    suggestions, alternativeAngles, executionPriorities,
    swot,
  } = analysis;

  return (
    <div className="space-y-6 animate-slide-up pb-16">
      <div className="card p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start">
          <div className="shrink-0">
            <RatingGauge rating={rating || 0} verdict={verdict || 'Moderate Potential'} />
          </div>
          <div className="flex-1">
            {startupName && (
              <p className="text-slate-500 text-sm mb-1">{startupName}</p>
            )}
            <h1 className="text-2xl font-bold mb-3">{verdict}</h1>
            <p className="text-slate-300 leading-relaxed">{summary}</p>

            {investorPerspective && (
              <div className="mt-5 p-4 rounded-xl bg-surface border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm">💰</span>
                  <span className="text-slate-400 text-xs font-medium uppercase tracking-wide">Investor Perspective</span>
                  <span className={`ml-auto text-xs px-2 py-0.5 rounded-full font-medium ${
                    investorPerspective.fundable
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-red-500/10 text-red-400 border border-red-500/20'
                  }`}>
                    {investorPerspective.fundable ? 'Fundable' : 'Hard to Fund'}
                  </span>
                </div>
                <p className="text-sm text-slate-300">{investorPerspective.assessment}</p>
                {investorPerspective.investorTypes?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {investorPerspective.investorTypes.map((t, i) => (
                      <span key={i} className="text-xs bg-surface border border-border rounded-full px-2.5 py-1 text-slate-400">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <MarketInsights analysis={analysis} />

      <SwotAnalysis swot={swot} />

      {risks?.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span>⚡</span> Risk Assessment
          </h2>
          <div className="space-y-3">
            {risks.map((r, i) => {
              const sev = SEVERITY_MAP[r.severity] || SEVERITY_MAP.medium;
              return (
                <div key={i} className={`card p-4 border ${sev.border} ${sev.bg}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-200">{r.risk}</p>
                      {r.mitigation && (
                        <p className="text-xs text-slate-500 mt-1.5 flex gap-1.5">
                          <span className="text-slate-600">Mitigation:</span> {r.mitigation}
                        </p>
                      )}
                    </div>
                    <span className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-full border ${sev.color} ${sev.bg} ${sev.border}`}>
                      {sev.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <SuggestionsPanel
        suggestions={suggestions}
        alternativeAngles={alternativeAngles}
        executionPriorities={executionPriorities}
      />

      <div className="card p-4 border-slate-700/50 text-center">
        <p className="text-slate-600 text-xs">
          Analysis powered by Claude AI · Market data based on 2024-2025 trends · For informational purposes only
        </p>
      </div>
    </div>
  );
}
