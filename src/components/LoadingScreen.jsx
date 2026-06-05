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

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] animate-fade-in">
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-full border-2 border-accent/30 flex items-center justify-center animate-pulse-glow">
          <div className="w-16 h-16 rounded-full border-2 border-t-accent border-accentLight/20 animate-spin" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-3xl">
          {STEPS[currentStep].icon}
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-2">
        Analyzing{startupName ? ` "${startupName}"` : ' your idea'}
      </h2>
      <p className="text-slate-400 text-sm mb-10 text-center max-w-sm transition-all duration-500">
        {STEPS[currentStep].text}
      </p>

      <div className="flex gap-1.5 mb-8">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i <= currentStep ? 'bg-accent w-8' : 'bg-border w-4'
            }`}
          />
        ))}
      </div>

      <div className="card p-4 max-w-sm text-center">
        <p className="text-slate-400 text-xs">
          Powered by Claude AI — checking real market conditions, competitor landscape, and 2025 funding trends
        </p>
      </div>
    </div>
  );
}
