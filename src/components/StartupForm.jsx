import { useState } from 'react';
import CustomSelect from './CustomSelect.jsx';

const INDUSTRIES = [
  'SaaS / Software', 'AI / ML', 'Fintech', 'Healthtech', 'Edtech', 'E-commerce',
  'Marketplace', 'Consumer App', 'B2B Enterprise', 'Deep Tech / Hardware',
  'Web3 / Crypto', 'Climate Tech / GreenTech', 'FoodTech', 'PropTech',
  'Gaming', 'Media / Content', 'Logistics / Supply Chain', 'HR Tech',
  'LegalTech', 'Other',
];

const STAGES = [
  'Just an idea', 'Research phase', 'Building MVP', 'MVP launched',
  'Early revenue', 'Growth stage',
];

const GEOGRAPHIES = [
  'Global', 'United States', 'Europe', 'India', 'Southeast Asia',
  'Latin America', 'Africa', 'Middle East', 'UK', 'Australia/NZ', 'Other',
];

export default function StartupForm({ onSubmit }) {
  const [form, setForm] = useState({
    name: '', oneLiner: '', description: '',
    industry: '', targetAudience: '', stage: '',
    geography: '', uvp: '',
  });
  const [submitting, setSubmitting] = useState(false);

  function set(field) {
    return e => setForm(f => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.description.trim()) return;
    setSubmitting(true);
    await onSubmit(form);
    setSubmitting(false);
  }

  const inputClass =
    'w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 ' +
    'focus:outline-none focus:border-accent/60 transition-all duration-200 ' +
    'hover:border-border/80';
  const labelClass = 'block text-sm font-medium text-slate-300 mb-2';

  const charCount = form.description.length;
  const charColor = charCount === 0
    ? 'text-slate-600'
    : charCount < 100
      ? 'text-orange-400/70'
      : charCount < 300
        ? 'text-yellow-400/70'
        : 'text-emerald-400/70';

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
      <div className="glass-card p-6 sm:p-8 space-y-6 glow-border">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-slide-up-fade stagger-1">
          <div>
            <label className={labelClass}>Startup Name <span className="text-slate-500">(optional)</span></label>
            <input
              type="text"
              className={inputClass}
              placeholder="e.g. Airbnb for Boats"
              value={form.name}
              onChange={set('name')}
            />
          </div>
          <div>
            <label className={labelClass}>Industry / Category</label>
            <CustomSelect
              value={form.industry}
              onChange={set('industry')}
              options={INDUSTRIES}
              placeholder="Select industry..."
            />
          </div>
        </div>

        <div className="animate-slide-up-fade stagger-2">
          <label className={labelClass}>
            One-liner <span className="text-slate-500">(what does it do in one sentence?)</span>
          </label>
          <input
            type="text"
            className={inputClass}
            placeholder="e.g. 'We help freelancers track invoices and taxes automatically'"
            value={form.oneLiner}
            onChange={set('oneLiner')}
          />
        </div>

        <div className="animate-slide-up-fade stagger-3">
          <label className={labelClass}>
            Describe your startup idea <span className="text-red-400">*</span>
            <span className="text-slate-500 font-normal ml-1">— be as detailed as possible</span>
          </label>
          <textarea
            className={`${inputClass} resize-none`}
            rows={5}
            placeholder="Explain your startup: what problem it solves, how it works, who it's for, your business model, and what makes it different from existing solutions..."
            value={form.description}
            onChange={set('description')}
            required
          />
          <p className={`text-xs mt-1.5 transition-colors duration-300 ${charColor}`}>
            {charCount} chars{charCount >= 300 ? ' · Great detail!' : charCount >= 100 ? ' · Keep going...' : ' — more detail = better analysis'}
          </p>
        </div>

        <div className="animate-slide-up-fade stagger-4">
          <label className={labelClass}>Unique Value Proposition</label>
          <input
            type="text"
            className={inputClass}
            placeholder="What makes you 10x better than existing alternatives?"
            value={form.uvp}
            onChange={set('uvp')}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 animate-slide-up-fade stagger-5">
          <div>
            <label className={labelClass}>Target Audience</label>
            <input
              type="text"
              className={inputClass}
              placeholder="e.g. SMB owners, Gen Z students"
              value={form.targetAudience}
              onChange={set('targetAudience')}
            />
          </div>
          <div>
            <label className={labelClass}>Current Stage</label>
            <CustomSelect
              value={form.stage}
              onChange={set('stage')}
              options={STAGES}
              placeholder="Select stage..."
            />
          </div>
          <div>
            <label className={labelClass}>Target Market</label>
            <CustomSelect
              value={form.geography}
              onChange={set('geography')}
              options={GEOGRAPHIES}
              placeholder="Select region..."
            />
          </div>
        </div>

        <div className="pt-2 animate-slide-up-fade stagger-6">
          <button
            type="submit"
            disabled={!form.description.trim() || submitting}
            className="shimmer-btn w-full py-4 rounded-xl font-semibold text-base text-white
              transition-all duration-200
              disabled:opacity-40 disabled:cursor-not-allowed disabled:animate-none
              disabled:bg-gradient-to-r disabled:from-violet-600 disabled:to-blue-600
              shadow-lg shadow-violet-900/30 hover:shadow-[0_0_35px_rgba(124,58,237,0.45)]
              hover:scale-[1.015] active:scale-[0.99]
              flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <span>Analyze My Startup</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </>
            )}
          </button>
          <p className="text-center text-slate-600 text-xs mt-3">
            Takes ~20 seconds · Powered by Gemini AI · No signup required
          </p>
        </div>
      </div>
    </form>
  );
}
