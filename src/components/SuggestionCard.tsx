import React, { useState } from 'react';
import type { Suggestion } from '../types';
import { AlertCircle, CheckCircle, Info, Edit3, Check, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SuggestionCardProps {
  suggestion: Suggestion;
  isActive?: boolean;
  onSelect?: () => void;
  onResolve?: (id: string, isResolved: boolean, text: string) => void;
}

export const SuggestionCard: React.FC<SuggestionCardProps> = ({ 
  suggestion, 
  isActive = false, 
  onSelect,
  onResolve 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(suggestion.beforeText || '');
  const [isResolved, setIsResolved] = useState(false);
  const [feedback, setFeedback] = useState('');

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

  const handleVerify = () => {
    let passes = false;
    let message = '';

    if (suggestion.category === 'impact' || suggestion.id === 'sug_rev_1') {
      // Must contain numbers or percentages
      const hasNumber = /\d+/.test(editedText);
      if (hasNumber) {
        passes = true;
        message = '✨ Excellent! You quantified the impact. ATS score updated (+5 pts)';
      } else {
        message = '⚠️ Try adding numerical metrics (e.g., "reduced latency by 30%" or "mentored 5 engineers").';
      }
    } else if (suggestion.category === 'keywords' || suggestion.id === 'sug_rev_2') {
      // Must contain a missing keyword
      const keywordRegex = /(cypress|docker|airflow|mixpanel|amplitude|kubernetes|testing|ci\/cd|github actions)/i;
      const match = editedText.match(keywordRegex);
      if (match) {
        passes = true;
        message = `✨ Fantastic! Integrated keyword "${match[0]}" successfully. ATS score updated (+5 pts)`;
      } else {
        message = '⚠️ Gaps remain. Include relevant missing keywords (e.g., Cypress, Docker, Airflow, CI/CD).';
      }
    } else {
      // Default length rule
      if (editedText.length > 20) {
        passes = true;
        message = '✨ Revision looks complete and clean. ATS score updated (+5 pts)';
      } else {
        message = '⚠️ Keep editing. Add more details to resolve this critique.';
      }
    }

    setIsResolved(passes);
    setFeedback(message);

    if (onResolve) {
      onResolve(suggestion.id, passes, editedText);
    }
  };

  const handleRevert = () => {
    setEditedText(suggestion.beforeText || '');
    setIsResolved(false);
    setFeedback('');
    if (onResolve) {
      onResolve(suggestion.id, false, suggestion.beforeText || '');
    }
  };

  return (
    <motion.div
      onClick={onSelect}
      className={`glass-card p-5 sm:p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
        isActive 
          ? 'border-brand-primary/60 bg-brand-primary/5 shadow-[0_0_20px_rgba(99,102,241,0.15)] scale-[1.01]' 
          : 'border-white/5 hover:border-white/10'
      }`}
      layout
    >
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

        <div className="flex items-center gap-2">
          {isResolved && (
            <span className="text-[9px] font-bold tracking-wider uppercase bg-brand-success/15 text-brand-success border border-brand-success/20 px-2 py-0.5 rounded-full flex items-center gap-1 animate-pulse">
              <Check className="w-2.5 h-2.5" /> Resolved
            </span>
          )}
          <span className={`text-[10px] font-mono tracking-wider uppercase px-2.5 py-0.5 rounded-full border ${getPriorityStyle(suggestion.priority)}`}>
            {suggestion.priority} Priority
          </span>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-1 mt-4">
        <h4 className="text-base font-bold text-brand-text flex items-center justify-between gap-2">
          {suggestion.title}
          {suggestion.beforeText && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(!isEditing);
              }}
              className="text-xs flex items-center gap-1 text-gray-400 hover:text-brand-primary border border-white/5 hover:border-brand-primary/30 bg-white/5 px-2.5 py-1 rounded-lg transition-all"
            >
              <Edit3 className="w-3.5 h-3.5" />
              {isEditing ? 'Close Sandbox' : 'Try Editing'}
            </button>
          )}
        </h4>
        <p className="text-xs text-gray-400 leading-relaxed">{suggestion.description}</p>
      </div>

      {/* Sandbox Editor Panel */}
      <AnimatePresence>
        {isEditing && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="pt-4 space-y-3 overflow-hidden"
            onClick={(e) => e.stopPropagation()} // Prevent card selection when editing
          >
            <div className="space-y-1">
              <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block">Interactive AI Sandbox</label>
              <textarea
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                rows={2}
                className="w-full text-xs p-3 bg-dark-bg/60 border border-white/10 rounded-xl text-brand-text focus:outline-none focus:border-brand-primary/50 font-sans resize-none"
                placeholder="Rewrite your bullet point here..."
              />
            </div>

            {feedback && (
              <p className={`text-[11px] font-medium leading-relaxed ${isResolved ? 'text-brand-success' : 'text-amber-400'}`}>
                {feedback}
              </p>
            )}

            <div className="flex gap-2 justify-end">
              <button
                onClick={handleRevert}
                className="px-3 py-1.5 text-[10px] font-semibold bg-white/5 hover:bg-white/10 border border-white/5 text-gray-300 rounded-lg flex items-center gap-1.5 transition-all"
              >
                <RefreshCw className="w-3 h-3" /> Revert
              </button>
              <button
                onClick={handleVerify}
                className="px-3.5 py-1.5 text-[10px] font-semibold bg-brand-primary hover:bg-brand-primary/80 text-brand-text rounded-lg flex items-center gap-1.5 transition-all shadow-md"
              >
                <Check className="w-3 h-3" /> Run ATS Check
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Before / After Diff (Normal View) */}
      {!isEditing && suggestion.beforeText && suggestion.afterText && (
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
    </motion.div>
  );
};
export default SuggestionCard;
