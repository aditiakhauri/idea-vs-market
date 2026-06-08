import { useEffect, useState } from 'react';

const VERDICT_CONFIG = {
  'Highly Promising':  { color: '#10b981', glow: 'rgba(16,185,129,0.25)'  },
  'Promising':         { color: '#34d399', glow: 'rgba(52,211,153,0.2)'   },
  'Moderate Potential':{ color: '#f59e0b', glow: 'rgba(245,158,11,0.25)'  },
  'Risky Venture':     { color: '#f97316', glow: 'rgba(249,115,22,0.25)'  },
  'Not Recommended':   { color: '#ef4444', glow: 'rgba(239,68,68,0.25)'   },
};

function getColor(r) {
  if (r >= 8)   return '#10b981';
  if (r >= 6.5) return '#34d399';
  if (r >= 5)   return '#f59e0b';
  if (r >= 3)   return '#f97316';
  return '#ef4444';
}

export default function RatingGauge({ rating, verdict }) {
  const [animated, setAnimated]       = useState(false);
  const [displayed, setDisplayed]     = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 150);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!animated) return;
    let val = 0;
    const target = rating;
    const timer = setInterval(() => {
      val += target / (1400 / 16);
      if (val >= target) { setDisplayed(target); clearInterval(timer); }
      else setDisplayed(val);
    }, 16);
    return () => clearInterval(timer);
  }, [animated, rating]);

  const size   = 180;
  const sw     = 11;
  const radius = (size - sw) / 2;
  const circ   = 2 * Math.PI * radius;
  const offset = circ * (1 - (animated ? rating / 10 : 0));
  const color  = getColor(rating);
  const vc     = VERDICT_CONFIG[verdict] || VERDICT_CONFIG['Moderate Potential'];

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative" style={{ width: size + 48, height: size + 48 }}>
        {/* Pulse rings */}
        {animated && <>
          <div className="absolute rounded-full pulse-ring"
            style={{ inset: 16, border: `1px solid ${color}44` }} />
          <div className="absolute rounded-full pulse-ring-delay"
            style={{ inset: 6, border: `1px solid ${color}22` }} />
        </>}

        <div className="absolute" style={{ inset: 24 }}>
          <svg width={size} height={size} className="-rotate-90">
            {/* Track */}
            <circle cx={size/2} cy={size/2} r={radius}
              fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={sw} />
            {/* Arc */}
            <circle cx={size/2} cy={size/2} r={radius}
              fill="none" stroke={color} strokeWidth={sw}
              strokeLinecap="round"
              strokeDasharray={circ} strokeDashoffset={offset}
              className="gauge-circle"
              style={{ filter: `drop-shadow(0 0 10px ${color}88)` }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display font-extrabold text-5xl tabular-nums tracking-tight"
              style={{ color }}>
              {displayed.toFixed(1)}
            </span>
            <span className="text-text-3 text-[11px] mt-1 uppercase tracking-widest">out of 10</span>
          </div>
        </div>
      </div>

      <div className="px-5 py-2 rounded-full text-[13px] font-display font-bold border"
        style={{
          color, borderColor: `${color}33`,
          background: `${color}0f`,
          boxShadow: `0 0 20px ${vc.glow}`,
        }}>
        {verdict}
      </div>
    </div>
  );
}
