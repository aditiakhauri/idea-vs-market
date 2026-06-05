import { useEffect, useState } from 'react';

const VERDICT_COLORS = {
  'Highly Promising': { ring: '#10b981', glow: 'rgba(16,185,129,0.3)', label: '🟢' },
  'Promising': { ring: '#34d399', glow: 'rgba(52,211,153,0.25)', label: '🟢' },
  'Moderate Potential': { ring: '#f59e0b', glow: 'rgba(245,158,11,0.3)', label: '🟡' },
  'Risky Venture': { ring: '#f97316', glow: 'rgba(249,115,22,0.3)', label: '🟠' },
  'Not Recommended': { ring: '#ef4444', glow: 'rgba(239,68,68,0.3)', label: '🔴' },
};

function getRatingColor(rating) {
  if (rating >= 8) return '#10b981';
  if (rating >= 6.5) return '#34d399';
  if (rating >= 5) return '#f59e0b';
  if (rating >= 3) return '#f97316';
  return '#ef4444';
}

export default function RatingGauge({ rating, verdict }) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(t);
  }, []);

  const size = 180;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = rating / 10;
  const offset = circumference * (1 - (animated ? pct : 0));
  const color = getRatingColor(rating);
  const verdictInfo = VERDICT_COLORS[verdict] || VERDICT_COLORS['Moderate Potential'];

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#2a2a4a"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="gauge-circle"
            style={{ filter: `drop-shadow(0 0 8px ${color}88)` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-bold" style={{ color }}>
            {rating.toFixed(1)}
          </span>
          <span className="text-slate-500 text-xs mt-1">out of 10</span>
        </div>
      </div>

      <div
        className="mt-4 px-5 py-2 rounded-full text-sm font-semibold border"
        style={{
          color,
          borderColor: `${color}44`,
          background: `${color}11`,
          boxShadow: `0 0 20px ${verdictInfo.glow}`,
        }}
      >
        {verdictInfo.label} {verdict}
      </div>
    </div>
  );
}
