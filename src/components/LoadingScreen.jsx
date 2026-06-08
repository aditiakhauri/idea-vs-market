import { useState, useEffect } from 'react';

const STEPS = [
  { icon: '📊', label: 'Market analysis',     text: 'Reading market valuations and growth trends…' },
  { icon: '🔍', label: 'Competition',          text: 'Scanning the competitive landscape…' },
  { icon: '💰', label: 'Business model',       text: 'Evaluating revenue model viability…' },
  { icon: '📈', label: 'Investor view',        text: 'Analyzing investor sentiment for this space…' },
  { icon: '⚡', label: 'Risk assessment',      text: 'Identifying risks and opportunities…' },
  { icon: '🎯', label: 'Recommendations',      text: 'Generating personalized action plan…' },
];

export default function LoadingScreen({ startupName }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setStep(p => Math.min(p + 1, STEPS.length - 1)), 3500);
    return () => clearInterval(t);
  }, []);

  const pct = Math.round(((step + 1) / STEPS.length) * 100);

  return (
    <div className="flex flex-col items-center justify-center min-h-[74vh] animate-fade-in">
      {/* Spinner */}
      <div className="relative mb-12" style={{ width: 160, height: 160 }}>
        <div className="absolute inset-0 rounded-full pulse-ring" style={{ border: '1px solid rgba(124,58,237,0.3)' }} />
        <div className="absolute inset-0 rounded-full pulse-ring-delay" style={{ border: '1px solid rgba(124,58,237,0.15)' }} />
        {/* Outer arc */}
        <div className="absolute inset-0 rounded-full border-[2.5px] border-transparent animate-spin"
          style={{ borderTopColor: '#7c3aed', borderRightColor: 'rgba(124,58,237,0.15)' }} />
        {/* Static mid ring */}
        <div className="absolute inset-5 rounded-full border border-white/5" />
        {/* Inner reverse arc */}
        <div className="absolute inset-5 rounded-full border border-transparent animate-spin-reverse"
          style={{ borderBottomColor: 'rgba(96,165,250,0.5)', borderLeftColor: 'rgba(96,165,250,0.1)' }} />
        {/* Center */}
        <div className="absolute inset-10 rounded-full bg-surface border border-white/5 flex items-center justify-center shadow-inner">
          <span key={step} className="text-2xl animate-bounce-in">{STEPS[step].icon}</span>
        </div>
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div className="scan-line" />
        </div>
      </div>

      {/* Title */}
      <h2 className="font-display font-bold text-xl text-text-1 mb-1 neon-text tracking-tight">
        Analyzing{startupName ? ` "${startupName}"` : ' your startup'}
      </h2>
      <p key={step} className="text-text-2 text-sm mb-10 animate-fade-in max-w-xs text-center">
        {STEPS[step].text}
      </p>

      {/* Step pills */}
      <div className="flex gap-2 flex-wrap justify-center mb-8 max-w-sm">
        {STEPS.map((s, i) => (
          <span
            key={i}
            className="text-[11px] px-2.5 py-1 rounded-full border transition-all duration-500"
            style={{
              borderColor: i <= step ? 'rgba(124,58,237,0.4)' : 'rgba(255,255,255,0.06)',
              background:  i === step ? 'rgba(124,58,237,0.15)' : i < step ? 'rgba(124,58,237,0.06)' : 'transparent',
              color:       i <= step ? '#a78bfa' : '#52566e',
            }}
          >
            {i < step ? '✓ ' : ''}{s.label}
          </span>
        ))}
      </div>

      {/* Progress */}
      <div className="w-72 mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-[11px] text-text-3">Step {step + 1} of {STEPS.length}</span>
          <span className="text-[11px] font-medium text-accentLight">{pct}%</span>
        </div>
        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={{
              width: `${pct}%`,
              background: 'linear-gradient(90deg, #7c3aed, #6366f1, #3b82f6)',
              boxShadow: '0 0 10px rgba(124,58,237,0.5)',
            }}
          />
        </div>
      </div>

      {/* Footer card */}
      <div className="card px-5 py-3 max-w-sm text-center">
        <p className="text-text-3 text-[11px]">
          Powered by Gemini AI · Checking live market conditions and 2025 funding trends
        </p>
      </div>
    </div>
  );
}
