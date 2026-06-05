import { useState } from 'react';

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
    name: '',
    oneLiner: '',
    description: '',
    industry: '',
    targetAudience: '',
    stage: '',
    geography: '',
    uvp: '',
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
    'w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent/30 transition-colors';
  const labelClass = 'block text-sm font-medium text-slate-300 mb-2';

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
      <div className="card p-6 sm:p-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
            <select className={inputClass} value={form.industry} onChange={set('industry')}>
              <option value="">Select industry...</option>
              {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
            </select>
          </div>
        </div>

        <div>
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

        <div>
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
          <p className="text-slate-600 text-xs mt-1.5">{form.description.length} chars — more detail = better analysis</p>
        </div>

        <div>
          <label className={labelClass}>Unique Value Proposition</label>
          <input
            type="text"
            className={inputClass}
            placeholder="What makes you 10x better than existing alternatives?"
            value={form.uvp}
            onChange={set('uvp')}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
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
            <select className={inputClass} value={form.stage} onChange={set('stage')}>
              <option value="">Select stage...</option>
              {STAGES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Target Market</label>
            <select className={inputClass} value={form.geography} onChange={set('geography')}>
              <option value="">Select region...</option>
              {GEOGRAPHIES.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={!form.description.trim() || submitting}
            className="w-full py-4 rounded-xl font-semibold text-base transition-all duration-200
              bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500
              disabled:opacity-40 disabled:cursor-not-allowed
              shadow-lg shadow-violet-900/30 hover:shadow-violet-800/40
              flex items-center justify-center gap-2"
          >
            <span>Analyze My Startup</span>
            <span>→</span>
          </button>
          <p className="text-center text-slate-600 text-xs mt-3">
            Takes ~20 seconds · Powered by Claude AI · No signup required
          </p>
        </div>
      </div>
    </form>
  );
}
