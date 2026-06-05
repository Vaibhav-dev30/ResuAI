import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  FileText, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Cpu, 
  Terminal,
  ThumbsUp,
  ThumbsDown,
  Mail,
  Phone,
  Loader2
} from 'lucide-react';
import Navbar from '../components/Navbar';
import ATSScoreCard from '../components/ATSScoreCard';
import SuggestionCard from '../components/SuggestionCard';
import ChartCard from '../components/ChartCard';
import ProgressBar from '../components/ProgressBar';
import { mockAnalyses } from '../data/mockData';
import { api } from '../utils/api';

export const Analysis: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'parsed' | 'raw'>('parsed');
  const [analysis, setAnalysis] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Suggestions & Highlight States
  const [activeSuggestionId, setActiveSuggestionId] = useState<string | null>(null);
  const [resolvedSuggestions, setResolvedSuggestions] = useState<Record<string, boolean>>({});

  // JD Matcher States
  const [jdText, setJdText] = useState('');
  const [jdMatchScore, setJdMatchScore] = useState<number | null>(null);
  const [jdMatchedKeywords, setJdMatchedKeywords] = useState<string[]>([]);
  const [jdMissingKeywords, setJdMissingKeywords] = useState<string[]>([]);
  const [isJDAnalyzing, setIsJDAnalyzing] = useState(false);

  useEffect(() => {
    const fetchAnalysis = async () => {
      if (!id) return;
      setIsLoading(true);
      try {
        const data = await api.getAnalysisById(id);
        setAnalysis(data);
      } catch (err) {
        console.warn('⚠️ Detailed analysis API failed or not reachable. Falling back to mock local data.');
        setAnalysis(mockAnalyses[id] || mockAnalyses['ana_1']);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAnalysis();
  }, [id]);

  if (isLoading || !analysis) {
    return (
      <div className="min-h-screen bg-dark-bg text-brand-text flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-10 h-10 animate-spin text-brand-primary" />
          <p className="text-sm text-gray-400 font-mono">Loading resume analysis report...</p>
        </div>
      </div>
    );
  }

  // Calculate dynamic display ATS score based on resolved sandbox improvements
  const resolvedCount = Object.values(resolvedSuggestions).filter(Boolean).length;
  const displayATSScore = Math.min(100, analysis.atsScore + resolvedCount * 5);

  const handleResolveSuggestion = (suggestionId: string, isResolved: boolean) => {
    setResolvedSuggestions(prev => ({
      ...prev,
      [suggestionId]: isResolved
    }));
  };

  const handleJDMatch = () => {
    if (!jdText.trim()) return;
    setIsJDAnalyzing(true);
    
    setTimeout(() => {
      const textLower = jdText.toLowerCase();
      // Compile skills from candidate report
      const candidateSkills = [
        ...analysis.technicalSkills.map((s: any) => s.name.toLowerCase()),
        ...analysis.softSkills.map((s: any) => s.name.toLowerCase())
      ];
      
      // Keywords to check in the JD
      const allKeywords = [
        'react', 'typescript', 'javascript', 'next.js', 'docker', 'kubernetes', 'aws', 
        'jest', 'cypress', 'sql', 'python', 'pytorch', 'mlflow', 'confluence', 'jira', 
        'mixpanel', 'amplitude', 'agile', 'scrum', 'ci/cd', 'github actions'
      ];
      
      const foundInJD = allKeywords.filter(kw => textLower.includes(kw));
      const matched = foundInJD.filter(kw => candidateSkills.some(cs => cs.includes(kw) || kw.includes(cs)));
      const missing = foundInJD.filter(kw => !candidateSkills.some(cs => cs.includes(kw) || kw.includes(cs)));
      
      let baseScore = 50;
      if (foundInJD.length > 0) {
        baseScore = Math.round((matched.length / foundInJD.length) * 100);
      }
      
      setJdMatchedKeywords(matched.map(k => k.charAt(0).toUpperCase() + k.slice(1)));
      setJdMissingKeywords(missing.map(k => k.charAt(0).toUpperCase() + k.slice(1)));
      setJdMatchScore(baseScore);
      setIsJDAnalyzing(false);
    }, 1200); // 1.2s simulation delay
  };

  // Radar data mapped depending on candidate profile
  const getRadarData = (candidateId: string) => {
    switch (candidateId) {
      case 'ana_2': // Jane Smith (Data Science)
        return [
          { subject: 'Math & Stats', A: 98, B: 90 },
          { subject: 'Deep Learning', A: 94, B: 85 },
          { subject: 'SQL / DBs', A: 85, B: 90 },
          { subject: 'MLOps & CI/CD', A: 80, B: 90 },
          { subject: 'AWS SageMaker', A: 88, B: 75 },
          { subject: 'Data Pipelines', A: 60, B: 85 }
        ];
      case 'ana_3': // Alex Rivera (Product Manager)
        return [
          { subject: 'Product Strategy', A: 85, B: 90 },
          { subject: 'Agile & Scrum', A: 90, B: 85 },
          { subject: 'UX Design/Figma', A: 70, B: 75 },
          { subject: 'Product Analytics', A: 40, B: 85 },
          { subject: 'Technical Depth', A: 50, B: 80 },
          { subject: 'Stakeholders', A: 85, B: 80 }
        ];
      case 'ana_1': // John Doe (Frontend Engineer)
      default:
        return [
          { subject: 'React.js / Next', A: 95, B: 90 },
          { subject: 'TypeScript', A: 92, B: 85 },
          { subject: 'State (Redux)', A: 88, B: 80 },
          { subject: 'Testing (Jest)', A: 65, B: 85 },
          { subject: 'Tooling (Webpack)', A: 80, B: 75 },
          { subject: 'CI/CD Pipelines', A: 30, B: 80 }
        ];
    }
  };

  const getMissingImportanceColor = (imp: string) => {
    switch (imp) {
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

  return (
    <div className="min-h-screen bg-dark-bg text-brand-text flex flex-col mesh-gradient-bg">
      <Navbar />

      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 space-y-6 relative z-10">
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-brand-text transition-colors w-fit cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
          
          <div className="flex items-center gap-2 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs py-1.5 px-3 rounded-full font-semibold">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            AI Audit Complete
          </div>
        </div>

        {/* Profile Card Header */}
        <div className="glass glow-border p-6 rounded-3xl flex flex-col md:flex-row justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-secondary/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-wider uppercase text-brand-accent">Active Profile Report</span>
              <h2 className="text-2xl font-extrabold tracking-tight">{analysis.candidateName}</h2>
              <p className="text-xs text-gray-400 font-medium">Targeting: <span className="text-brand-text font-semibold">{analysis.targetRole}</span></p>
            </div>
            
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500 font-mono">
              <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-gray-400" /> {analysis.candidateEmail || 'n/a'}</span>
              {analysis.candidatePhone && (
                <>
                  <span className="hidden sm:inline">|</span>
                  <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-gray-400" /> {analysis.candidatePhone}</span>
                </>
              )}
              <span className="hidden sm:inline">|</span>
              <span className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5 text-gray-400" /> {analysis.fileName} ({analysis.fileSize})</span>
            </div>
          </div>

          <div className="flex md:flex-col justify-end gap-3 shrink-0 items-center md:items-end">
            <span className="text-[10px] text-gray-500 font-mono">Analyzed on {analysis.uploadedAt}</span>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2 text-xs font-semibold bg-gradient-to-r from-brand-primary to-brand-secondary text-brand-text rounded-xl shadow-md transform active:scale-95 transition-all cursor-pointer"
            >
              Upload New Resume
            </button>
          </div>
        </div>

        {/* Grid Layout (Preview vs diagnostics) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Panel: Simulated Resume Preview */}
          <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-24">
            <div className="glass rounded-3xl border border-white/5 overflow-hidden flex flex-col h-[700px]">
              {/* Header tabs */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#0E1320] border-b border-white/5 text-xs">
                <span className="font-semibold text-brand-text flex items-center gap-2">
                  <FileText className="w-4 h-4 text-brand-primary" />
                  Resume Document View
                </span>
                
                <div className="flex bg-[#111827] p-1 rounded-lg border border-white/5">
                  <button
                    onClick={() => setActiveTab('parsed')}
                    className={`px-3 py-1 rounded-md text-[10px] font-semibold transition-all cursor-pointer ${
                      activeTab === 'parsed' ? 'bg-brand-primary text-brand-text shadow-sm' : 'text-gray-400 hover:text-brand-text'
                    }`}
                  >
                    Parsed Content
                  </button>
                  <button
                    onClick={() => setActiveTab('raw')}
                    className={`px-3 py-1 rounded-md text-[10px] font-semibold transition-all cursor-pointer ${
                      activeTab === 'raw' ? 'bg-brand-primary text-brand-text shadow-sm' : 'text-gray-400 hover:text-brand-text'
                    }`}
                  >
                    Raw text
                  </button>
                </div>
              </div>

              {/* Resume Body */}
              <div className="flex-1 p-6 overflow-y-auto no-scrollbar font-sans text-xs bg-white text-gray-800 space-y-6 leading-relaxed">
                {activeTab === 'parsed' ? (
                  <>
                    {/* Header */}
                    <div className="text-center border-b border-gray-200 pb-4 space-y-1">
                      <h1 className="text-xl font-bold tracking-tight text-gray-900">{analysis.candidateName}</h1>
                      <p className="text-[10px] text-gray-500 font-medium">
                        {analysis.candidateEmail || 'email@example.com'} | {analysis.candidatePhone || '+1 (555) 000-0000'} | San Francisco, CA
                      </p>
                    </div>

                    {/* Summary */}
                    <div className="space-y-1.5">
                      <h3 className="text-[10px] font-bold text-brand-primary uppercase tracking-widest border-b border-gray-100 pb-1">Professional Summary</h3>
                      <p className="text-gray-600 text-[11px] leading-relaxed">
                        {analysis.summary.split('. ').slice(0, 3).join('. ') + '.'}
                      </p>
                    </div>

                    {/* Experience */}
                    <div className="space-y-4">
                      <h3 className="text-[10px] font-bold text-brand-primary uppercase tracking-widest border-b border-gray-100 pb-1">Experience</h3>
                      
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <div className="flex justify-between font-bold text-gray-900 text-[11px]">
                            <span>Senior Systems Engineer</span>
                            <span>2023 - Present</span>
                          </div>
                          <p className="text-[10px] text-gray-500 font-semibold italic">Tech Solutions Inc. - SF, CA</p>
                          <ul className="list-disc pl-4 space-y-2 text-gray-600 text-[10px]">
                            <li className={`transition-all duration-300 rounded p-1.5 ${
                              activeSuggestionId === 'sug_rev_1'
                                ? 'bg-brand-primary/10 border-l-2 border-brand-primary text-gray-950 font-medium'
                                : ''
                            }`}>
                              {resolvedSuggestions['sug_rev_1'] 
                                ? 'Automated deployment pipelines and expanded Jest unit tests, reducing deployment failures by 28% and increasing code coverage from 60% to 85%.'
                                : 'Developed scalable system modules and automated deployment pipelines, improving deploy efficiency.'
                              }
                            </li>
                            <li className={`transition-all duration-300 rounded p-1.5 ${
                              activeSuggestionId === 'sug_rev_2'
                                ? 'bg-brand-primary/10 border-l-2 border-brand-primary text-gray-950 font-medium'
                                : ''
                            }`}>
                              {resolvedSuggestions['sug_rev_2'] 
                                ? 'Mentored junior engineers and conducted code architecture audits using Docker and Cypress testing frameworks.'
                                : 'Mentored junior engineers and conducted code architecture audits to guarantee product performance.'
                              }
                            </li>
                            <li className={`transition-all duration-300 rounded p-1.5 ${
                              activeSuggestionId === 'sug_rev_3'
                                ? 'bg-brand-primary/10 border-l-2 border-brand-primary text-gray-950 font-medium'
                                : ''
                            }`}>
                              Integrated dashboard analytics to track service behaviors and latency bottlenecks.
                            </li>
                          </ul>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between font-bold text-gray-900 text-[11px]">
                            <span>Software Developer</span>
                            <span>2021 - 2023</span>
                          </div>
                          <p className="text-[10px] text-gray-500 font-semibold italic">Digital Systems Corp.</p>
                          <ul className="list-disc pl-4 space-y-1 text-gray-600 text-[10px]">
                            <li>Collaborated with teams to implement responsive client-side layout features.</li>
                            <li>Assisted in automated test coverage using unit testing frameworks.</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Education */}
                    <div className="space-y-1.5">
                      <h3 className="text-[10px] font-bold text-brand-primary uppercase tracking-widest border-b border-gray-100 pb-1">Education</h3>
                      <div className="flex justify-between font-semibold text-gray-800 text-[10px]">
                        <span>B.S. in Computer Science</span>
                        <span>Graduated 2021</span>
                      </div>
                      <p className="text-[9px] text-gray-500 italic">State University, College of Engineering</p>
                    </div>
                  </>
                ) : (
                  <div className="font-mono text-[10px] text-gray-600 whitespace-pre-line leading-relaxed">
                    {`[PARSED TEXT EXTRACTION DUMP]
                    
                    NAME: ${analysis.candidateName}
                    EMAIL: ${analysis.candidateEmail || 'n/a'}
                    PHONE: ${analysis.candidatePhone || 'n/a'}
                    ROLE BENCHMARK: ${analysis.targetRole}
                    
                    SUMMARY:
                    ${analysis.summary}
                    
                    EXPERIENCE BULLETS:
                    - Improved systems execution velocity
                    - Conducted code architecture audits
                    - Mentored 4 junior engineers
                    - Integrated testing suites for Jest
                    - Automated Docker scripts and CI/CD tools
                    
                    EDUCATION:
                    B.S. Computer Science - State University`}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Panel: AI Analytics Diagnostics */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top overview (Circular score card + Stats + Radar chart) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ATSScoreCard score={displayATSScore} />
              
              <ChartCard
                title="Capability Matrix vs Benchmark"
                type="radar"
                data={getRadarData(analysis.id)}
                height={180}
              />
            </div>

            {/* Score Breakdown Bars */}
            <div className="glass p-6 rounded-2xl border border-white/5 space-y-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Scoring Breakdown</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ProgressBar
                  value={analysis.skillMatchScore}
                  label="Skill Density Match"
                  subLabel={`${analysis.skillMatchScore}%`}
                  color="accent"
                />
                <ProgressBar
                  value={analysis.resumeStrengthScore}
                  label="Formatting & Layout"
                  subLabel={`${analysis.resumeStrengthScore}%`}
                  color="primary"
                />
                <ProgressBar
                  value={analysis.industryMatchScore}
                  label="Industry Fit Match"
                  subLabel={`${analysis.industryMatchScore}%`}
                  color="success"
                />
              </div>
            </div>

            {/* Job Description Matcher Section */}
            <div className="glass glow-border p-6 rounded-2xl border border-white/5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-brand-text flex items-center gap-2">
                  <Sparkles className="w-4.5 h-4.5 text-brand-accent" />
                  Job Description Heatmap Matcher
                </h3>
                {jdMatchScore !== null && (
                  <span className={`text-xs font-bold font-mono px-2.5 py-1 rounded-lg border ${
                    jdMatchScore >= 80 
                      ? 'bg-brand-success/10 border-brand-success/20 text-brand-success' 
                      : jdMatchScore >= 60 
                      ? 'bg-brand-accent/10 border-brand-accent/20 text-brand-accent'
                      : 'bg-red-500/10 border-red-500/20 text-red-400'
                  }`}>
                    Match: {jdMatchScore}%
                  </span>
                )}
              </div>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                Paste the job description of the target vacancy below to execute a real-time keyword overlap scan.
              </p>
              
              <div className="space-y-3">
                <textarea
                  value={jdText}
                  onChange={(e) => setJdText(e.target.value)}
                  placeholder="Paste job posting details here... (e.g. Requires React, TypeScript, Docker, Cypress, CI/CD)"
                  rows={3}
                  className="w-full text-xs p-3 bg-dark-bg/60 border border-white/10 rounded-xl text-brand-text focus:outline-none focus:border-brand-primary/50 font-sans resize-none"
                />

                <div className="flex justify-end">
                  <button
                    onClick={handleJDMatch}
                    disabled={isJDAnalyzing || !jdText.trim()}
                    className="px-4 py-2 text-xs font-semibold bg-brand-primary hover:bg-brand-primary/80 disabled:bg-white/5 disabled:text-gray-500 text-brand-text rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                  >
                    {isJDAnalyzing ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" /> Analyzing Overlap...
                      </>
                    ) : (
                      'Analyze Match Heatmap'
                    )}
                  </button>
                </div>
              </div>

              {/* Heatmap Visual Matrix */}
              {jdMatchScore !== null && (
                <div className="pt-4 border-t border-white/5 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono text-brand-success uppercase tracking-wider block font-bold">Matched Keywords ({jdMatchedKeywords.length})</span>
                      <div className="flex flex-wrap gap-1.5">
                        {jdMatchedKeywords.length > 0 ? (
                          jdMatchedKeywords.map((kw, i) => (
                            <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-brand-success/10 border border-brand-success/20 text-brand-success font-medium">
                              {kw}
                            </span>
                          ))
                        ) : (
                          <span className="text-[10px] text-gray-500">None detected.</span>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[10px] font-mono text-red-400 uppercase tracking-wider block font-bold">Missing JD Gaps ({jdMissingKeywords.length})</span>
                      <div className="flex flex-wrap gap-1.5">
                        {jdMissingKeywords.length > 0 ? (
                          jdMissingKeywords.map((kw, i) => (
                            <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-red-500/10 border border-red-500/20 text-red-400 font-medium">
                              {kw}
                            </span>
                          ))
                        ) : (
                          <span className="text-[10px] text-brand-success">0 Gaps! Perfect match.</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Grid heatmap display */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block">JD Overlap Coverage Matrix</span>
                    <div className="grid grid-cols-10 gap-1.5">
                      {Array.from({ length: 20 }).map((_, i) => {
                        let cellBg = 'bg-white/5';
                        if (jdMatchScore !== null) {
                          const limit = Math.round((jdMatchScore / 100) * 20);
                          cellBg = i < limit ? 'bg-brand-success/20 border-brand-success/30' : 'bg-red-950/20 border-red-900/30';
                        }
                        return (
                          <div 
                            key={i} 
                            className={`h-6 rounded-md border flex items-center justify-center text-[9px] font-mono text-gray-500 transition-all duration-500 ${cellBg}`}
                          >
                            #{i + 1}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Strengths & Weaknesses Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass p-5 rounded-2xl border border-white/5 space-y-4">
                <div className="flex items-center gap-2 text-brand-success">
                  <ThumbsUp className="w-5 h-5" />
                  <h4 className="text-xs font-bold uppercase tracking-wider">Identified Strengths</h4>
                </div>
                <ul className="space-y-2 text-xs">
                  {analysis.strengths.map((str: string, idx: number) => (
                    <li key={idx} className="flex gap-2 text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-brand-success shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass p-5 rounded-2xl border border-white/5 space-y-4">
                <div className="flex items-center gap-2 text-red-400">
                  <ThumbsDown className="w-5 h-5" />
                  <h4 className="text-xs font-bold uppercase tracking-wider">Critique Gaps</h4>
                </div>
                <ul className="space-y-2 text-xs">
                  {analysis.weaknesses.map((weak: string, idx: number) => (
                    <li key={idx} className="flex gap-2 text-gray-300">
                      <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{weak}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Skills & Missing Skills Grid */}
            <div className="glass p-6 rounded-2xl border border-white/5 space-y-6">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Keywords & Skill Density</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-semibold text-brand-text mb-2.5 flex items-center gap-1.5">
                    <Terminal className="w-4 h-4 text-brand-accent" /> Matched Skills ({analysis.technicalSkills.length})
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {analysis.technicalSkills.map((skill: any, idx: number) => (
                      <span 
                        key={idx} 
                        className={`text-xs px-3 py-1.5 rounded-xl border font-medium flex items-center gap-2 ${
                          skill.rating === 'expert'
                            ? 'bg-brand-success/5 border-brand-success/15 text-brand-success'
                            : 'bg-brand-primary/5 border-brand-primary/15 text-brand-primary'
                        }`}
                      >
                        {skill.name}
                        <span className="text-[10px] text-gray-500 font-mono">({skill.matchPercent}%)</span>
                      </span>
                    ))}
                    {analysis.softSkills.map((skill: any, idx: number) => (
                      <span 
                        key={idx} 
                        className="text-xs px-3 py-1.5 rounded-xl border border-white/5 bg-white/5 text-gray-300 font-medium"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-white/5"></div>

                <div>
                  <h4 className="text-xs font-semibold text-brand-text mb-3 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-red-400" /> Missing Core Skills ({analysis.missingSkills.length})
                  </h4>
                  <div className="space-y-2.5">
                    {analysis.missingSkills.map((skill: any, idx: number) => (
                      <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-white/[0.01] border border-white/5 rounded-xl">
                        <div className="space-y-1">
                          <span className="text-xs font-semibold text-brand-text block">{skill.name}</span>
                          <p className="text-[11px] text-gray-400 leading-normal">{skill.alternativeSuggest}</p>
                        </div>
                        <span className={`text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border w-fit ${getMissingImportanceColor(skill.importance)}`}>
                          {skill.importance} Importance
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Suggestions & Revisions */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-brand-primary animate-pulse" />
                <h3 className="text-base font-bold">AI Improvement Suggestions</h3>
              </div>

              <div className="space-y-4">
                {analysis.suggestions.map((suggestion: any) => (
                  <SuggestionCard 
                    key={suggestion.id} 
                    suggestion={suggestion} 
                    isActive={activeSuggestionId === suggestion.id}
                    onSelect={() => setActiveSuggestionId(suggestion.id)}
                    onResolve={handleResolveSuggestion}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
export default Analysis;
