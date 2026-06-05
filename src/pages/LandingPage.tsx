import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  Cpu, 
  FileSearch, 
  ListTodo, 
  TrendingUp, 
  Zap,
  Star
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FeatureCard from '../components/FeatureCard';
import { mockTestimonials } from '../data/mockData';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Instant ATS Scoring',
      description: 'Analyze your resume against top industry scanners. Receive a real-time compatibility score and formatting report.',
      icon: Cpu,
      iconColor: 'text-brand-primary',
      glowColor: 'bg-brand-primary'
    },
    {
      title: 'Keyword Density Analyzer',
      description: 'Scan job listings and cross-match crucial technical keywords to rank higher in recruiter searches.',
      icon: FileSearch,
      iconColor: 'text-brand-accent',
      glowColor: 'bg-brand-accent'
    },
    {
      title: 'Skill Gap Matrix',
      description: 'Identify missing core skills and get immediate advice on alternative experiences or learning paths.',
      icon: ListTodo,
      iconColor: 'text-brand-secondary',
      glowColor: 'bg-brand-secondary'
    },
    {
      title: 'Smart AI Revisions',
      description: 'Get bullet-point rewrites powered by generative intelligence, focusing on quantitative metrics and action verbs.',
      icon: TrendingUp,
      iconColor: 'text-brand-success',
      glowColor: 'bg-brand-success'
    }
  ];

  return (
    <div className="min-h-screen bg-dark-bg text-brand-text flex flex-col relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-[30%] right-1/4 w-[400px] h-[400px] bg-brand-secondary/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] left-10 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none"></div>

      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6 max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 text-brand-accent rounded-full text-xs font-mono font-medium tracking-wide">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-brand-accent" />
            Next-Gen Resume Intelligence
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-none text-brand-text">
            Outsmart the ATS with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent">
              AI-Powered
            </span>{' '}
            Optimization.
          </h1>

          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Upload your resume, pinpoint skill gaps, and get instant rewrite recommendations to bypass recruitment filters and secure interviews.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-brand-text bg-gradient-to-r from-brand-primary to-brand-secondary rounded-xl shadow-lg hover:shadow-brand-primary/20 hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
            >
              Analyze Your Resume
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => {
                const element = document.querySelector('#features');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-gray-300 hover:text-brand-text bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all duration-300 cursor-pointer"
            >
              Learn More
            </button>
          </div>
        </motion.div>

        {/* Mock App Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 sm:mt-20 w-full max-w-4xl relative"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/20 via-brand-secondary/10 to-transparent blur-2xl -z-10 rounded-3xl opacity-50"></div>
          <div className="glass rounded-2xl border border-white/15 p-2 overflow-hidden shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-white/5 px-4 py-2 text-[10px] text-gray-600 font-mono">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/50"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500/50"></span>
                <span className="w-3 h-3 rounded-full bg-green-500/50"></span>
              </div>
              <span>app.resuai.io/dashboard</span>
              <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-brand-accent" /> Active</span>
            </div>
            
            {/* Inner dummy screen */}
            <div className="grid grid-cols-12 gap-4 bg-[#080B12] p-4 text-left rounded-b-xl min-h-[300px]">
              <div className="col-span-4 bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-white/10 rounded-md"></div>
                  <div className="h-8 w-16 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-lg"></div>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden mt-6">
                  <div className="h-full w-[84%] bg-brand-primary"></div>
                </div>
              </div>
              <div className="col-span-8 bg-white/5 border border-white/5 rounded-xl p-4 space-y-3">
                <div className="h-4 w-32 bg-white/10 rounded-md"></div>
                <div className="space-y-2">
                  <div className="h-3 w-full bg-white/5 rounded"></div>
                  <div className="h-3 w-[90%] bg-white/5 rounded"></div>
                  <div className="h-3 w-[80%] bg-white/5 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Engineered to bypass ATS algorithms
          </h2>
          <p className="text-sm text-gray-400">
            ResuAI uses industry-standard keyword analysis patterns to format, index, and grade your resume metrics accurately.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <FeatureCard
              key={idx}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              iconColor={feature.iconColor}
              glowColor={feature.glowColor}
            />
          ))}
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">How it works</h2>
          <p className="text-sm text-gray-400">
            Get audit checks completed in seconds with our deep intelligence extraction pipeline.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="space-y-4 text-center glass p-8 rounded-2xl border border-white/5 relative">
            <span className="text-5xl font-mono font-extrabold text-white/5 absolute -top-4 left-4">01</span>
            <div className="p-3 bg-brand-primary/10 text-brand-primary rounded-xl w-fit mx-auto border border-brand-primary/20">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold">1. Upload Resume</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Drag & drop your PDF or DOCX file. Our engine parses the structural layout instantly.
            </p>
          </div>

          <div className="space-y-4 text-center glass p-8 rounded-2xl border border-white/5 relative">
            <span className="text-5xl font-mono font-extrabold text-white/5 absolute -top-4 left-4">02</span>
            <div className="p-3 bg-brand-accent/10 text-brand-accent rounded-xl w-fit mx-auto border border-brand-accent/20">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold">2. AI Diagnostics</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Our analyzer cross-matches keyword density, formatting, and highlights technical skill deficiencies.
            </p>
          </div>

          <div className="space-y-4 text-center glass p-8 rounded-2xl border border-white/5 relative">
            <span className="text-5xl font-mono font-extrabold text-white/5 absolute -top-4 left-4">03</span>
            <div className="p-3 bg-brand-secondary/10 text-brand-secondary rounded-xl w-fit mx-auto border border-brand-secondary/20">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold">3. Rebuild & Optimize</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Use suggested quantitative bullet rewrites to boost score benchmarks by up to 45%.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Approved by experts</h2>
          <p className="text-sm text-gray-400">
            Read comments from tech recruiters and engineers who bypass candidate screens.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockTestimonials.map((t) => (
            <div key={t.id} className="glass-card p-6 sm:p-8 rounded-2xl border border-white/5 flex flex-col justify-between space-y-6">
              <div className="flex gap-1">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-gray-300 leading-relaxed italic">
                "{t.comment}"
              </p>
              <div className="flex items-center gap-3 pt-2">
                <img src={t.avatarUrl} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-white/10" />
                <div>
                  <h4 className="text-xs font-bold text-brand-text">{t.name}</h4>
                  <p className="text-[10px] text-gray-500">{t.role} at {t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};
export default LandingPage;
