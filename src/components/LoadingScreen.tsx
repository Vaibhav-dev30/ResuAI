import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle2, Cpu, Key, BarChart3, LineChart, FileQuestion } from 'lucide-react';

interface LoadingScreenProps {
  fileName: string;
  onComplete: () => void;
}

interface Step {
  id: number;
  label: string;
  icon: React.ComponentType<any>;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ fileName, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps: Step[] = [
    { id: 0, label: 'Reading Resume and Document Structure', icon: FileQuestion },
    { id: 1, label: 'Extracting Technical & Soft Skills', icon: Key },
    { id: 2, label: 'Running ATS Layout Compatibility Tests', icon: Cpu },
    { id: 3, label: 'Evaluating Keyword Match Density', icon: BarChart3 },
    { id: 4, label: 'Generating AI Optimization Suggestions', icon: LineChart }
  ];

  useEffect(() => {
    // Increase progress percentage smoothly
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 40); // 100 * 40 = 4000ms total

    // Progress through processing steps
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        }
        clearInterval(stepInterval);
        return prev;
      });
    }, 800); // 5 steps * 800ms = 4000ms

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
    };
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const timeout = setTimeout(() => {
        onComplete();
      }, 500); // Small pause at 100%
      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-[#0B0F19] flex flex-col items-center justify-center p-6 select-none">
      {/* Decorative gradient blur background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] bg-brand-accent/5 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="w-full max-w-xl glass p-8 sm:p-12 rounded-3xl border border-white/5 relative z-10 glow-primary">
        
        {/* Top Header */}
        <div className="text-center space-y-2 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary rounded-full text-xs font-semibold tracking-wider uppercase">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            AI Parsing Active
          </div>
          <h2 className="text-2xl font-bold text-brand-text">Analyzing Profile</h2>
          <p className="text-xs text-gray-400 truncate max-w-sm mx-auto font-mono">{fileName}</p>
        </div>

        {/* Progress Circular/Pill display */}
        <div className="flex flex-col items-center justify-center mb-10">
          <span className="text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent font-mono">
            {progress}%
          </span>
          <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono mt-1">Analyzing Profile</span>
        </div>

        {/* Action Steps */}
        <div className="space-y-4">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isCompleted = idx < currentStep;
            const isActive = idx === currentStep;

            return (
              <div 
                key={step.id} 
                className={`flex items-center gap-4 p-3.5 rounded-xl border transition-all duration-300 ${
                  isActive 
                    ? 'bg-brand-primary/5 border-brand-primary/30 text-brand-text translate-x-1' 
                    : isCompleted
                    ? 'bg-brand-success/5 border-brand-success/15 text-gray-400'
                    : 'bg-white/[0.01] border-transparent text-gray-600'
                }`}
              >
                <div className={`p-2 rounded-lg border transition-all duration-300 ${
                  isActive
                    ? 'bg-brand-primary/20 border-brand-primary text-brand-primary'
                    : isCompleted
                    ? 'bg-brand-success/10 border-brand-success text-brand-success'
                    : 'bg-white/5 border-white/10 text-gray-600'
                }`}>
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <Icon className={`w-4 h-4 ${isActive ? 'animate-pulse' : ''}`} />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className={`text-xs sm:text-sm font-semibold truncate ${
                    isActive ? 'text-brand-text' : isCompleted ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {step.label}
                  </p>
                </div>

                {isActive && (
                  <span className="text-[9px] font-mono font-semibold tracking-wider text-brand-primary uppercase animate-pulse">
                    Parsing...
                  </span>
                )}
                {isCompleted && (
                  <span className="text-[9px] font-mono font-semibold tracking-wider text-brand-success uppercase">
                    Done
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Global Progress Bar */}
        <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mt-8">
          <motion.div 
            className="h-full bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent"
            style={{ width: `${progress}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: 'easeInOut' }}
          />
        </div>
      </div>
    </div>
  );
};
export default LoadingScreen;
