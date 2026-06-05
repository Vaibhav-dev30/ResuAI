import React from 'react';
import type { Suggestion } from '../types';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';

interface SuggestionCardProps {
  suggestion: Suggestion;
}

export const SuggestionCard: React.FC<SuggestionCardProps> = ({ suggestion }) => {
  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-400 bg-red-950/20 border-red-900/30';
      case 'medium':
        return 'text-amber-400 bg-amber-950/20 border-amber-900/30';
      case 'low':
        return 'text-blue-400 bg-blue-950/20 border-blue-900/30';
      default:
        return 'text-gray-400 bg-gray-900/20 border-gray-800/30';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'impact':
        return <CheckCircle className="w-4 h-4 text-brand-success" />;
      case 'keywords':
        return <Info className="w-4 h-4 text-brand-accent" />;
      default:
        return <AlertCircle className="w-4 h-4 text-brand-primary" />;
    }
  };

  return (
    <div className="glass-card p-5 sm:p-6 rounded-2xl border border-white/5 space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-white/5 border border-white/10">
            {getCategoryIcon(suggestion.category)}
          </div>
          <span className="text-xs font-mono tracking-wider uppercase text-gray-400">
            {suggestion.category}
          </span>
        </div>

        <span className={`text-[10px] font-mono tracking-wider uppercase px-2.5 py-0.5 rounded-full border ${getPriorityStyle(suggestion.priority)}`}>
          {suggestion.priority} Priority
        </span>
      </div>

      {/* Description */}
      <div className="space-y-1">
        <h4 className="text-base font-bold text-brand-text">{suggestion.title}</h4>
        <p className="text-xs text-gray-400 leading-relaxed">{suggestion.description}</p>
      </div>

      {/* Before / After Diff */}
      {suggestion.beforeText && suggestion.afterText && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs font-mono">
          <div className="p-3 bg-red-950/10 border border-red-950/30 rounded-xl space-y-1 relative group overflow-hidden">
            <span className="text-[9px] text-red-400 font-bold uppercase tracking-wider block">Original</span>
            <p className="text-red-300 leading-relaxed break-words">{suggestion.beforeText}</p>
          </div>
          <div className="p-3 bg-brand-success/5 border border-brand-success/15 rounded-xl space-y-1 relative group overflow-hidden">
            <span className="text-[9px] text-brand-success font-bold uppercase tracking-wider block">Suggested Revision</span>
            <p className="text-brand-success/90 leading-relaxed break-words">{suggestion.afterText}</p>
          </div>
        </div>
      )}
    </div>
  );
};
export default SuggestionCard;
