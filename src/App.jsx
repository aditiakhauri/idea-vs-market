import { useState } from 'react';
import StartupForm from './components/StartupForm.jsx';
import AnalysisResult from './components/AnalysisResult.jsx';
import LoadingScreen from './components/LoadingScreen.jsx';

const STATS = [
  { value: '~20s',   label: 'Time to insight' },
  { value: 'Free',   label: 'No credit card' },
  { value: 'AI',     label: 'Gemini powered' },
];

export default function App() {
  const [view, setView] = useState('form');
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState(null);

  async function handleSubmit(data) {
    setFormData(data);
    setError(null);
    setView('loading');
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Analysis failed');
      setAnalysis(result);
      setView('result');
    } catch (err) {
      setError(err.message);
      setView('form');
    }
  }

  function handleReset() {
    setView('form');
    setAnalysis(null);
    setError(null);
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="header-border sticky top-0 z-50 backdrop-blur-xl bg-bg/80">
        <div className="max-w-6xl mx-auto px-6 h-[60px] flex items-center justify-between">
          <button onClick={handleReset} className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-sm shadow-lg shadow-violet-500/30">
              🚀
            </div>
            <span className="font-display font-bold text-[15px] text-text-1 tracking-tight group-hover:text-accentLight transition-colors">
              StartupLens
            </span>
          </button>

          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-surface/50 text-xs text-text-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            AI analysis online
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* ── FORM VIEW ───────────────────────────────── */}
        {view === 'form' && (
          <div className="animate-fade-in">
            {/* Hero */}
            <div className="relative overflow-hidden flex flex-col items-center text-center pt-20 pb-16">
              {/* Orbs */}
              <div className="orb w-[600px] h-[600px] bg-violet-600/10 animate-float"
                style={{ top: '-200px', left: '-220px' }} />
              <div className="orb w-[500px] h-[500px] bg-blue-500/8 animate-float-slow"
                style={{ top: '-120px', right: '-180px', animationDelay: '3s' }} />
              <div className="orb w-[350px] h-[350px] bg-indigo-500/6 animate-float-med"
                style={{ bottom: '-80px', left: '35%', animationDelay: '5s' }} />

              <div className="relative z-10 flex flex-col items-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-border bg-surface/60 backdrop-blur-sm text-xs text-text-2 font-medium animate-bounce-in">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                  AI-powered startup intelligence
                  <span className="text-text-3">·</span>
                  <span className="text-accentLight">Free forever</span>
                </div>

                {/* Headline */}
                <h1 className="font-display font-extrabold text-5xl sm:text-6xl lg:text-[72px] leading-[1.04] tracking-tight mb-6 max-w-4xl">
                  Will your startup idea<br />
                  <span className="gradient-text">actually work?</span>
                </h1>

                {/* Sub */}
                <p className="text-text-2 text-lg sm:text-xl max-w-2xl leading-relaxed mb-10">
                  Get a brutally honest AI analysis — market fit, competitive landscape,
                  investor perspective and execution risks. In about 20 seconds.
                </p>

                {/* Stats row */}
                <div className="flex items-center gap-6 sm:gap-8 mb-2">
                  {STATS.map(({ value, label }, i) => (
                    <div key={label} className="flex items-center gap-6 sm:gap-8">
                      <div className="text-center">
                        <div className="font-display font-bold text-xl text-text-1">{value}</div>
                        <div className="text-[11px] text-text-3 mt-0.5 uppercase tracking-wider">{label}</div>
                      </div>
                      {i < STATS.length - 1 && <div className="stat-divider" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="max-w-3xl mx-auto mb-6 flex items-start gap-3 bg-red-500/8 border border-red-500/20 rounded-2xl p-4 text-red-400 text-sm animate-slide-up">
                <span className="mt-0.5 shrink-0">⚠</span>
                <span>{error}</span>
              </div>
            )}

            <StartupForm onSubmit={handleSubmit} />

            {/* Footer note */}
            <p className="text-center text-text-3 text-xs mt-8 mb-16">
              No account required · Your data is never stored or used for training
            </p>
          </div>
        )}

        {/* ── LOADING ─────────────────────────────────── */}
        {view === 'loading' && <LoadingScreen startupName={formData?.name} />}

        {/* ── RESULT ──────────────────────────────────── */}
        {view === 'result' && analysis && (
          <div className="animate-fade-in">
            <div className="flex items-center pt-8 pb-6">
              <button
                onClick={handleReset}
                className="group flex items-center gap-2 text-text-3 hover:text-text-1 transition-colors text-sm"
              >
                <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
                Analyze another idea
              </button>
            </div>
            <AnalysisResult analysis={analysis} startupName={formData?.name} />
          </div>
        )}
      </main>
    </div>
  );
}
