import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Cpu, Menu, X, ArrowRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isLanding = location.pathname === '/';

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'How it Works', href: '#how-it-works' },
    { name: 'Testimonials', href: '#testimonials' },
  ];

  const handleScroll = (href: string) => {
    setIsOpen(false);
    if (!isLanding) {
      navigate('/' + href);
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="p-2 bg-brand-primary/10 rounded-lg group-hover:bg-brand-primary/20 transition-all border border-brand-primary/30">
              <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-brand-primary animate-pulse" />
            </div>
            <span className="text-lg sm:text-xl font-bold tracking-tight text-brand-text bg-gradient-to-r from-brand-text to-brand-accent bg-clip-text">
              Resu<span className="text-brand-primary font-extrabold">AI</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          {isLanding ? (
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleScroll(link.href)}
                  className="text-sm font-medium text-gray-400 hover:text-brand-text transition-colors cursor-pointer"
                >
                  {link.name}
                </button>
              ))}
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-sm font-medium text-gray-400 hover:text-brand-text transition-colors">
                Landing Page
              </Link>
            </div>
          )}

          {/* Action Button */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/dashboard"
              className="px-5 py-2.5 text-sm font-semibold text-brand-text bg-gradient-to-r from-brand-primary to-brand-secondary rounded-lg hover:opacity-95 transition-all shadow-md flex items-center gap-2 group transform active:scale-95"
            >
              Go to Dashboard
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none cursor-pointer"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass border-b border-white/5 animate-in fade-in duration-200">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {isLanding && navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleScroll(link.href)}
                className="block w-full text-left px-3 py-2.5 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
              >
                {link.name}
              </button>
            ))}
            {!isLanding && (
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2.5 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
              >
                Landing Page
              </Link>
            )}
            <div className="pt-4 px-3">
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="w-full justify-center px-4 py-3 text-center text-sm font-semibold text-brand-text bg-gradient-to-r from-brand-primary to-brand-secondary rounded-lg shadow-md flex items-center gap-2"
              >
                Go to Dashboard
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
