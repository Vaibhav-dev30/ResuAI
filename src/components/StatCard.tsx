import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconColor: string;
  bgColor: string;
  progressValue?: number;
  trend?: string;
  trendType?: 'positive' | 'negative' | 'neutral';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  iconColor,
  bgColor,
  progressValue,
  trend,
  trendType = 'positive'
}) => {
  return (
    <div className="glass-card p-5 sm:p-6 rounded-2xl relative overflow-hidden flex flex-col justify-between">
      {/* Decorative Glow */}
      <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-10 ${bgColor}`}></div>

      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{title}</p>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-text font-mono">
            {value}
          </h3>
        </div>
        
        <div className={`p-2.5 rounded-xl border border-white/5 bg-white/5 ${iconColor}`}>
          <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
      </div>

      {progressValue !== undefined && (
        <div className="mt-4 space-y-1.5">
          <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full bg-gradient-to-r ${
                title.includes('ATS') 
                  ? 'from-brand-primary to-brand-secondary' 
                  : title.includes('Skill')
                  ? 'from-brand-accent to-brand-primary'
                  : 'from-brand-success to-brand-accent'
              }`}
              style={{ width: `${progressValue}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[10px] text-gray-500 font-mono">
            <span>Progress</span>
            <span>{progressValue}%</span>
          </div>
        </div>
      )}

      {trend && (
        <div className="mt-4 flex items-center gap-1.5 text-xs">
          <span className={`font-semibold ${
            trendType === 'positive' 
              ? 'text-brand-success' 
              : trendType === 'negative' 
              ? 'text-red-400' 
              : 'text-gray-400'
          }`}>
            {trend}
          </span>
          <span className="text-gray-500 font-medium">vs average candidates</span>
        </div>
      )}
    </div>
  );
};
export default StatCard;
