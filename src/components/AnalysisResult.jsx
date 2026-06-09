import RatingGauge from './RatingGauge.jsx';
import SwotAnalysis from './SwotAnalysis.jsx';
import MarketInsights from './MarketInsights.jsx';
import SuggestionsPanel from './SuggestionsPanel.jsx';
import LifespanCard from './LifespanCard.jsx';

const SEV = {
  low:      { color: 'text-emerald-400', bg: 'rgba(16,185,129,0.06)',  border: 'rgba(16,185,129,0.2)',  label: 'Low'      },
  medium:   { color: 'text-yellow-400',  bg: 'rgba(245,158,11,0.06)',  border: 'rgba(245,158,11,0.2)',  label: 'Medium'   },
  high:     { color: 'text-orange-400',  bg: 'rgba(249,115,22,0.06)',  border: 'rgba(249,115,22,0.2)',  label: 'High'     },
  critical: { color: 'text-red-400',     bg: 'rgba(239,68,68,0.06)',   border: 'rgba(239,68,68,0.2)',   label: 'Critical' },
};

function SectionHeading({ icon, children }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="text-base">{icon}</span>
      <h2 className="section-title">{children}</h2>
      <div className="section-rule" />
    </div>
  );
}

function fadeIn(delay) {
  return { style: { opacity: 0, animation: `slideUpFade 0.5s ease-out ${delay}s forwards` } };
}

export default function AnalysisResult({ analysis, startupName }) {
  const { rating, verdict, summary, risks, investorPerspective,
    suggestions, alternativeAngles, executionPriorities, swot, lifespan } = analysis;

  return (
    <div className="space-y-5 pb-20">

      {/* ── Hero card ────────────────────────── */}
      <div {...fadeIn(0.05)} className="card card-hover p-7 sm:p-10">
        <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start">
          <div className="shrink-0">
            <RatingGauge rating={rating || 0} verdict={verdict || 'Moderate Potential'} />
          </div>
          <div className="flex-1 min-w-0">
            {startupName && <p className="text-text-3 text-xs mb-1 uppercase tracking-wider">{startupName}</p>}
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight mb-3 gradient-text">
              {verdict}
            </h1>
            <p className="text-text-2 leading-relaxed">{summary}</p>

            {investorPerspective && (
              <div className="mt-6 p-4 rounded-2xl border"
                style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.07)' }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="label-text">Investor perspective</span>
                  <span className={`ml-auto text-[11px] px-2.5 py-0.5 rounded-full font-semibold font-display border ${
                    investorPerspective.fundable
                      ? 'text-emerald-400 border-emerald-400/25 bg-emerald-400/8'
                      : 'text-red-400 border-red-400/25 bg-red-400/8'
                  }`}>
                    {investorPerspective.fundable ? '✓ Fundable' : '✗ Hard to fund'}
                  </span>
                </div>
                <p className="text-sm text-text-2">{investorPerspective.assessment}</p>
                {investorPerspective.investorTypes?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {investorPerspective.investorTypes.map((t, i) => (
                      <span key={i} className="trend-tag">{t}</span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Market insights ──────────────────── */}
      <div {...fadeIn(0.12)}>
        <MarketInsights analysis={analysis} />
      </div>

      {/* ── SWOT ─────────────────────────────── */}
      <div {...fadeIn(0.20)}>
        <SwotAnalysis swot={swot} />
      </div>

      {/* ── Lifespan ─────────────────────────── */}
      {lifespan && (
        <div {...fadeIn(0.26)}>
          <SectionHeading icon="⏳">Life Span Forecast</SectionHeading>
          <LifespanCard lifespan={lifespan} />
        </div>
      )}

      {/* ── Risks ────────────────────────────── */}
      {risks?.length > 0 && (
        <div {...fadeIn(0.28)}>
          <SectionHeading icon="⚡">Risk Assessment</SectionHeading>
          <div className="space-y-2.5">
            {risks.map((r, i) => {
              const s = SEV[r.severity] || SEV.medium;
              return (
                <div key={i} className="card card-hover p-4"
                  style={{
                    background: s.bg,
                    borderColor: s.border,
                    opacity: 0,
                    animation: `slideUpFade 0.4s ease-out ${0.3 + i * 0.07}s forwards`,
                  }}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-text-1">{r.risk}</p>
                      {r.mitigation && (
                        <p className="text-[12px] text-text-3 mt-1.5">
                          <span className="text-text-3">Mitigation: </span>{r.mitigation}
                        </p>
                      )}
                    </div>
                    <span className={`shrink-0 text-[11px] font-bold px-2.5 py-1 rounded-full border font-display ${s.color}`}
                      style={{ borderColor: s.border, background: s.bg }}>
                      {s.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Suggestions ──────────────────────── */}
      <div {...fadeIn(0.36)}>
        <SuggestionsPanel
          suggestions={suggestions}
          alternativeAngles={alternativeAngles}
          executionPriorities={executionPriorities}
        />
      </div>

      {/* ── Footer ───────────────────────────── */}
      <div {...fadeIn(0.44)} className="card p-4 text-center">
        <p className="text-text-3 text-[11px]">
          Analysis by Gemini AI · Based on 2024-2025 market data · For informational purposes only
        </p>
      </div>
    </div>
  );
}
