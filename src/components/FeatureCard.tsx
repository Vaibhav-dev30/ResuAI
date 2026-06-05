import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor: string;
  glowColor: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon: Icon,
  iconColor,
  glowColor
}) => {
  return (
    <div className="glass-card p-6 sm:p-8 rounded-2xl relative overflow-hidden group">
      {/* Glow effect on hover */}
      <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none ${glowColor}`}></div>

      <div className={`p-3 rounded-xl border border-white/5 bg-white/5 w-fit mb-6 transition-all duration-300 group-hover:scale-110 ${iconColor}`}>
        <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
      </div>

      <h3 className="text-lg font-bold text-brand-text mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-brand-text group-hover:to-brand-accent transition-all duration-300">
        {title}
      </h3>
      <p className="text-sm text-gray-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
};
export default FeatureCard;
