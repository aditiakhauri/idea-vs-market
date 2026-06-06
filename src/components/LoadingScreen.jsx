import { useState, useEffect } from 'react';

const STEPS = [
  { icon: '📊', text: 'Reading market valuations and trends...' },
  { icon: '🔍', text: 'Scanning competitive landscape...' },
  { icon: '💰', text: 'Evaluating business model viability...' },
  { icon: '📈', text: 'Analyzing investor sentiment...' },
  { icon: '⚡', text: 'Identifying risks and opportunities...' },
  { icon: '🎯', text: 'Generating personalized recommendations...' },
];

export default function LoadingScreen({ startupName }) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(prev => (prev < STEPS.length - 1 ? prev + 1 : prev));
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const progress = ((currentStep + 1) / STEPS.length) * 100;

  return (
    <div className="flex flex-col items-center justify-center min-h-[72vh] animate-fade-in">

      {/* Orbital spinner */}
      <div className="relative mb-10" style={{ width: 168, height: 168 }}>
        {/* Expanding pulse rings */}
        <div className="absolute inset-0 rounded-full border border-violet-500/30 pulse-ring" />
        <div className="absolute inset-0 rounded-full border border-blue-400/20 pulse-ring-delay" />

        {/* Outer spinning arc */}
        <div
          className="absolute inset-0 rounded-full border-2 border-transparent animate-spin"
          style={{ borderTopColor: '#7c3aed', borderRightColor: 'rgba(124,58,237,0.2)' }}
        />

        {/* Middle static ring */}
        <div className="absolute inset-4 rounded-full border border-border/50" />

        {/* Inner reverse-spinning arc */}
        <div
          className="absolute inset-4 rounded-full border border-transparent animate-spin-reverse"
          style={{ borderBottomColor: 'rgba(96,165,250,0.55)', borderLeftColor: 'rgba(96,165,250,0.15)' }}
        />

        {/* Innermost ring */}
        <div className="absolute inset-8 rounded-full border border-border/30" />

        {/* Center icon */}
        <div className="absolute inset-10 rounded-full bg-surface border border-border/70 flex items-center justify-center shadow-inner">
          <span
            key={currentStep}
            className="text-2xl animate-bounce-in"
          >
            {STEPS[currentStep].icon}
          </span>
        </div>

        {/* Scan line overlay */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div className="scan-line" />
        </div>
      </div>

      {/* Title */}
      <h2 className="text-xl font-semibold mb-1.5 neon-text">
        Analyzing{startupName ? ` "${startupName}"` : ' your idea'}
      </h2>

      {/* Step text */}
      <p
        key={currentStep}
        className="text-slate-400 text-sm mb-8 text-center max-w-xs animate-fade-in"
      >
        {STEPS[currentStep].text}
      </p>

      {/* Progress bar */}
      <div className="w-72 mb-8">
        <div className="flex justify-between text-xs mb-2">
          <span className="text-slate-600">Step {currentStep + 1} of {STEPS.length}</span>
          <span className="text-violet-400/80 font-medium">{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 bg-border rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #7c3aed, #818cf8, #60a5fa)',
              boxShadow: '0 0 8px rgba(124,58,237,0.6)',
            }}
          />
        </div>
      </div>

      {/* Step dots */}
      <div className="flex gap-2 mb-8">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-500"
            style={{
              width: i === currentStep ? 24 : 8,
              height: 8,
              background: i < currentStep
                ? 'rgba(124,58,237,0.5)'
                : i === currentStep
                  ? 'linear-gradient(90deg,#7c3aed,#60a5fa)'
                  : '#2a2a4a',
              boxShadow: i === currentStep ? '0 0 10px rgba(124,58,237,0.6)' : 'none',
            }}
          />
        ))}
      </div>

      {/* Info card */}
      <div className="glass-card px-5 py-3 max-w-sm text-center">
        <p className="text-slate-400 text-xs">
          Powered by Gemini AI · Checking market conditions, competitor landscape & 2025 funding trends
        </p>
      </div>
    </div>
  );
}
