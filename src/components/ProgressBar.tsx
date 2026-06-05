import React from 'react';

interface ProgressBarProps {
  value: number;
  label?: string;
  subLabel?: string;
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  label,
  subLabel,
  color = 'primary'
}) => {
  const getColorStyle = (themeColor: string) => {
    switch (themeColor) {
      case 'primary':
        return 'from-brand-primary to-brand-secondary';
      case 'secondary':
        return 'from-brand-secondary to-indigo-500';
      case 'accent':
        return 'from-brand-accent to-brand-primary';
      case 'success':
        return 'from-brand-success to-emerald-400';
      case 'warning':
        return 'from-amber-500 to-yellow-400';
      case 'danger':
        return 'from-red-500 to-rose-400';
      default:
        return 'from-brand-primary to-brand-secondary';
    }
  };

  return (
    <div className="w-full space-y-2">
      {(label || subLabel) && (
        <div className="flex justify-between items-center text-xs">
          {label && <span className="font-semibold text-brand-text truncate max-w-[70%]">{label}</span>}
          {subLabel && <span className="text-gray-500 font-mono shrink-0">{subLabel}</span>}
        </div>
      )}
      <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${getColorStyle(color)} transition-all duration-1000 ease-out`}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
    </div>
  );
};
export default ProgressBar;
