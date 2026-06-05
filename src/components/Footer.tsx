import React from 'react';
import { Cpu, Github, Twitter, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/5 bg-[#080B12] text-gray-400 py-12 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-brand-primary/10 rounded-md border border-brand-primary/20">
              <Cpu className="w-4 h-4 text-brand-primary" />
            </div>
            <span className="text-base font-bold text-brand-text">
              Resu<span className="text-brand-primary">AI</span>
            </span>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed max-w-xs">
            Unlock your career potential with advanced neural-network powered resume scanning and keyword matching suggestions.
          </p>
          <div className="flex gap-4 pt-2">
            <a href="#" className="hover:text-brand-text transition-colors"><Twitter className="w-4 h-4" /></a>
            <a href="#" className="hover:text-brand-text transition-colors"><Linkedin className="w-4 h-4" /></a>
            <a href="#" className="hover:text-brand-text transition-colors"><Github className="w-4 h-4" /></a>
          </div>
        </div>

        {/* Links Column 1 */}
        <div>
          <h4 className="text-sm font-semibold text-brand-text mb-4">Product</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#" className="hover:text-brand-text transition-colors">ATS Scan</a></li>
            <li><a href="#" className="hover:text-brand-text transition-colors">Skill Matcher</a></li>
            <li><a href="#" className="hover:text-brand-text transition-colors">AI Optimizer</a></li>
            <li><a href="#" className="hover:text-brand-text transition-colors">Pricing Plans</a></li>
          </ul>
        </div>

        {/* Links Column 2 */}
        <div>
          <h4 className="text-sm font-semibold text-brand-text mb-4">Resources</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#" className="hover:text-brand-text transition-colors">Career Blog</a></li>
            <li><a href="#" className="hover:text-brand-text transition-colors">Resume Tips</a></li>
            <li><a href="#" className="hover:text-brand-text transition-colors">API Docs</a></li>
            <li><a href="#" className="hover:text-brand-text transition-colors">User Guides</a></li>
          </ul>
        </div>

        {/* System Status */}
        <div className="flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-semibold text-brand-text mb-4">Company</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-brand-text transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-brand-text transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-brand-text transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          <div className="mt-6 md:mt-0 flex items-center gap-2 bg-[#111827] border border-white/5 py-1.5 px-3 rounded-full w-fit">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-success opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-success"></span>
            </span>
            <span className="text-[10px] font-mono tracking-wider uppercase text-gray-400">
              System Status: <span className="text-brand-success font-semibold">Online</span>
            </span>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto border-t border-white/5 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-600">
        <p>&copy; {new Date().getFullYear()} ResuAI Inc. All rights reserved.</p>
        <p>Built for next-gen recruitment engineering.</p>
      </div>
    </footer>
  );
};
export default Footer;
