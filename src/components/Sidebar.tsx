import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  LogOut, 
  ShieldCheck, 
  Sparkles,
  ArrowLeft
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 glass h-screen fixed left-0 top-0 hidden md:flex flex-col z-30 border-r border-white/5 pt-20">
      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1.5">
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
              isActive
                ? 'text-brand-text bg-brand-primary/10 border-l-2 border-brand-primary'
                : 'text-gray-400 hover:text-brand-text hover:bg-white/5'
            }`
          }
        >
          <LayoutDashboard className="w-5 h-5 text-brand-primary" />
          Analytics Dashboard
        </NavLink>

        <NavLink
          to="/dashboard?tab=analyses"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
              isActive
                ? 'text-brand-text bg-brand-primary/10 border-l-2 border-brand-primary'
                : 'text-gray-400 hover:text-brand-text hover:bg-white/5'
            }`
          }
        >
          <FileText className="w-5 h-5 text-brand-secondary" />
          Recent Analyses
        </NavLink>

        <div className="h-px bg-white/5 my-4"></div>

        <Link
          to="/"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-brand-text hover:bg-white/5 transition-all duration-200"
        >
          <ArrowLeft className="w-5 h-5 text-brand-accent" />
          Back to Landing
        </Link>
      </nav>

      {/* Recruiter Profile / Footer info */}
      <div className="p-4 border-t border-white/5">
        <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl">
          <div className="w-8 h-8 rounded-full bg-brand-secondary/30 flex items-center justify-center border border-brand-secondary/50 font-bold text-xs text-brand-text">
            HR
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-brand-text truncate">HR Recruiter</p>
            <span className="text-[10px] text-gray-500 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-brand-success" /> Pro Member
            </span>
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-between text-xs text-gray-500 px-2">
          <span className="flex items-center gap-1 text-[10px] text-brand-accent font-semibold animate-pulse">
            <Sparkles className="w-3 h-3" /> ResuAI v1.2
          </span>
          <button className="hover:text-brand-text transition-colors flex items-center gap-1 cursor-pointer">
            <LogOut className="w-3 h-3" /> Exit
          </button>
        </div>
      </div>
    </aside>
  );
};
export default Sidebar;
