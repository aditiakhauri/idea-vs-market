import { useState } from 'react';
import CustomSelect from './CustomSelect.jsx';

const INDUSTRIES = [
  'SaaS / Software', 'AI / ML', 'Fintech', 'Healthtech', 'Edtech', 'E-commerce',
  'Marketplace', 'Consumer App', 'B2B Enterprise', 'Deep Tech / Hardware',
  'Web3 / Crypto', 'Climate Tech / GreenTech', 'FoodTech', 'PropTech',
  'Gaming', 'Media / Content', 'Logistics / Supply Chain', 'HR Tech', 'LegalTech', 'Other',
];
const STAGES = ['Just an idea', 'Research phase', 'Building MVP', 'MVP launched', 'Early revenue', 'Growth stage'];
const GEOGRAPHIES = [
  'Global', 'United States', 'Europe', 'India', 'Southeast Asia',
  'Latin America', 'Africa', 'Middle East', 'UK', 'Australia/NZ', 'Other',
];

function FieldLabel({ children, hint, required }) {
  return (
    <label className="block mb-2">
      <span className="text-[13px] font-semibold text-text-1/80 font-display">{children}</span>
      {required && <span className="text-violet-400 ml-0.5">*</span>}
      {hint && <span className="text-text-3 font-sans font-normal text-[12px] ml-1.5">{hint}</span>}
    </label>
  );
}

function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="label-text">{children}</span>
      <div className="section-rule" />
    </div>
  );
}

const inputClass =
  'w-full bg-surface border border-[rgba(255,255,255,0.07)] rounded-xl px-4 py-3 text-sm text-text-1 ' +
  'placeholder-text-3 transition-all duration-200 hover:border-[rgba(255,255,255,0.12)] font-sans';

export default function StartupForm({ onSubmit }) {
  const [form, setForm] = useState({
    name: '', oneLiner: '', description: '',
    industry: '', targetAudience: '', stage: '',
    geography: '', uvp: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const set = field => e => setForm(f => ({ ...f, [field]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.description.trim()) return;
    setSubmitting(true);
    await onSubmit(form);
    setSubmitting(false);
  }

  const len = form.description.length;
  const charColor = len === 0 ? 'text-text-3'
    : len < 80   ? 'text-orange-400/70'
    : len < 250  ? 'text-yellow-400/70'
    : 'text-emerald-400/70';

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
      <div className="glass-card p-7 sm:p-10 space-y-8">

        {/* Section 1 — basics */}
        <div className="space-y-5">
          <SectionLabel>Basic info</SectionLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <FieldLabel hint="optional">Startup name</FieldLabel>
              <input className={inputClass} placeholder="e.g. Airbnb for Boats"
                value={form.name} onChange={set('name')} />
            </div>
            <div>
              <FieldLabel>Industry</FieldLabel>
              <CustomSelect value={form.industry} onChange={set('industry')}
                options={INDUSTRIES} placeholder="Select industry…" />
            </div>
          </div>
          <div>
            <FieldLabel hint="one sentence">One-liner</FieldLabel>
            <input className={inputClass}
              placeholder="e.g. We help freelancers track invoices and taxes automatically"
              value={form.oneLiner} onChange={set('oneLiner')} />
          </div>
        </div>

        {/* Section 2 — idea */}
        <div className="space-y-5">
          <SectionLabel>Your startup idea</SectionLabel>
          <div>
            <FieldLabel required hint="— the more detail, the better the analysis">Full description</FieldLabel>
            <textarea
              className={`${inputClass} resize-none leading-relaxed`}
              rows={6}
              placeholder="Explain the problem you're solving, how your product works, who it's for, your business model, and what makes it different from existing solutions…"
              value={form.description} onChange={set('description')} required
            />
            <div className="flex justify-between mt-1.5">
              <span className={`text-[11px] transition-colors duration-300 ${charColor}`}>
                {len} chars{len >= 250 ? ' · Great detail!' : len >= 80 ? ' · Keep going…' : ''}
              </span>
              {len > 0 && len < 80 && (
                <span className="text-[11px] text-text-3">Aim for 100+ chars</span>
              )}
            </div>
          </div>
          <div>
            <FieldLabel hint="what makes you 10× better?">Unique value proposition</FieldLabel>
            <input className={inputClass}
              placeholder="e.g. Zero-latency sync + offline-first — unlike Notion which requires internet"
              value={form.uvp} onChange={set('uvp')} />
          </div>
        </div>

        {/* Section 3 — market */}
        <div className="space-y-5">
          <SectionLabel>Market details</SectionLabel>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <FieldLabel hint="who buys this?">Target audience</FieldLabel>
              <input className={inputClass} placeholder="e.g. SMB owners, Gen Z students"
                value={form.targetAudience} onChange={set('targetAudience')} />
            </div>
            <div>
              <FieldLabel>Current stage</FieldLabel>
              <CustomSelect value={form.stage} onChange={set('stage')}
                options={STAGES} placeholder="Select stage…" />
            </div>
            <div>
              <FieldLabel>Target market</FieldLabel>
              <CustomSelect value={form.geography} onChange={set('geography')}
                options={GEOGRAPHIES} placeholder="Select region…" />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-1">
          <button
            type="submit"
            disabled={!form.description.trim() || submitting}
            className="shimmer-btn w-full py-4 rounded-2xl font-display font-bold text-[15px] text-white
              transition-all duration-200
              disabled:opacity-35 disabled:cursor-not-allowed
              shadow-xl shadow-violet-900/30
              hover:shadow-[0_0_40px_rgba(124,58,237,0.4)] hover:scale-[1.012]
              active:scale-[0.99]
              flex items-center justify-center gap-3"
          >
            {submitting ? (
              <>
                <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                Analyzing your idea…
              </>
            ) : (
              <>
                <span>Analyze My Startup</span>
                <span className="opacity-70">→</span>
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
