import React, { useEffect, useState } from 'react';

interface ATSScoreCardProps {
  score: number;
}

export const ATSScoreCard: React.FC<ATSScoreCardProps> = ({ score }) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score);
    }, 200);
    return () => clearTimeout(timer);
  }, [score]);

  // SVG parameters
  const radius = 60;
  const strokeWidth = 10;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  const getScoreRating = (val: number) => {
    if (val >= 85) return { text: 'Excellent', color: 'text-brand-success', stroke: 'stroke-brand-success' };
    if (val >= 70) return { text: 'Good', color: 'text-brand-accent', stroke: 'stroke-brand-accent' };
    if (val >= 50) return { text: 'Needs Improvement', color: 'text-amber-400', stroke: 'stroke-amber-400' };
    return { text: 'Critical Gaps', color: 'text-red-400', stroke: 'stroke-red-400' };
  };

  const rating = getScoreRating(score);

  return (
    <div className="glass-card p-6 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center">
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-6">ATS Score Evaluation</h3>
      
      <div className="relative flex items-center justify-center">
        {/* Circular SVG */}
        <svg
          height={radius * 2}
          width={radius * 2}
          className="transform -rotate-90 select-none drop-shadow-[0_0_15px_rgba(99,102,241,0.15)]"
        >
          {/* Background circle */}
          <circle
            stroke="rgba(255,255,255,0.03)"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          {/* Progress circle */}
          <circle
            className={`transition-all duration-1000 ease-out`}
            stroke={score >= 85 ? '#10B981' : score >= 70 ? '#06B6D4' : score >= 50 ? '#F59E0B' : '#EF4444'}
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>
        {/* Score text overlay */}
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-4xl font-extrabold text-brand-text font-mono tracking-tighter">
            {animatedScore}
          </span>
          <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">/100</span>
        </div>
      </div>

      <div className="mt-6 space-y-1">
        <span className={`text-base font-bold tracking-tight ${rating.color}`}>
          {rating.text}
        </span>
        <p className="text-xs text-gray-500 max-w-[200px] leading-relaxed mx-auto">
          {score >= 85 
            ? 'Your resume is highly optimized for recruitment systems.' 
            : score >= 70
            ? 'Solid structure with small opportunities to add keywords.'
            : 'Parser may struggle to map your experience. Adjust layout.'}
        </p>
      </div>
    </div>
  );
};
export default ATSScoreCard;
