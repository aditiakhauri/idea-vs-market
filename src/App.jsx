import { useState } from 'react';
import StartupForm from './components/StartupForm.jsx';
import AnalysisResult from './components/AnalysisResult.jsx';
import LoadingScreen from './components/LoadingScreen.jsx';

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
      <header className="header-gradient-border sticky top-0 z-50 backdrop-blur-md bg-bg/85">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <button onClick={handleReset} className="flex items-center gap-2.5 hover:opacity-80 transition-opacity group">
            <span className="text-2xl group-hover:animate-bounce-in">🚀</span>
            <span className="font-bold text-lg gradient-text">StartupLens</span>
          </button>
          <div className="hidden sm:flex items-center gap-1.5 text-slate-500 text-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            AI-Powered Market Analyzer
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        {view === 'form' && (
          <div className="animate-fade-in">
            {/* Hero section with floating orbs */}
            <div className="relative overflow-hidden">
              <div className="orb w-[520px] h-[520px] bg-violet-700/12 animate-float"
                style={{ top: '-180px', left: '-180px' }} />
              <div className="orb w-[420px] h-[420px] bg-blue-500/10 animate-float-slow"
                style={{ top: '-80px', right: '-140px', animationDelay: '2.5s' }} />
              <div className="orb w-[300px] h-[300px] bg-purple-500/8 animate-float-med"
                style={{ top: '200px', left: '45%', animationDelay: '5s' }} />

              <div className="text-center pt-16 pb-12 relative z-10">
                <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-4 py-1.5 text-sm text-accentLight mb-6 animate-bounce-in">
                  <span className="w-1.5 h-1.5 rounded-full bg-accentLight animate-pulse" />
                  Real-time market intelligence
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
                  Will your startup<br />
                  <span className="gradient-text">actually work?</span>
                </h1>
                <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
                  Get an honest, AI-powered analysis of market trends, competitive landscape, and viability —
                  before you spend a year building the wrong thing.
                </p>
              </div>
            </div>

            {error && (
              <div className="max-w-3xl mx-auto mb-6 bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm animate-slide-up">
                ⚠ {error}
              </div>
            )}
            <StartupForm onSubmit={handleSubmit} />
          </div>
        )}

        {view === 'loading' && <LoadingScreen startupName={formData?.name} />}

        {view === 'result' && analysis && (
          <div className="animate-fade-in">
            <div className="flex items-center gap-4 pt-8 pb-6">
              <button
                onClick={handleReset}
                className="flex items-center gap-2 text-slate-400 hover:text-accentLight transition-colors text-sm group"
              >
                <span className="group-hover:-translate-x-1 transition-transform">←</span>
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
