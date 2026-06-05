import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  FileText, 
  Search, 
  BarChart3, 
  Sliders, 
  Award, 
  Briefcase,
  Play,
  ArrowUpRight,
  TrendingUp,
  Loader2
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import UploadZone from '../components/UploadZone';
import StatCard from '../components/StatCard';
import ChartCard from '../components/ChartCard';
import LoadingScreen from '../components/LoadingScreen';
import { mockRecentAnalyses } from '../data/mockData';
import { api } from '../utils/api';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tab = searchParams.get('tab') || 'overview';
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [fileName, setFileName] = useState('');
  const [analysesList, setAnalysesList] = useState<any[]>([]);
  const [isLoadingList, setIsLoadingList] = useState(true);

  // States to sync upload API completion and uploader loading animation
  const [uploadResult, setUploadResult] = useState<any>(null);
  const [animationCompleted, setAnimationCompleted] = useState(false);

  // Stats averages
  const [stats, setStats] = useState({
    avgAts: 81.5,
    techMatch: 84.2,
    structure: 79.0,
    industry: 89.1
  });

  // Fetch recent scans from database
  const fetchScans = async () => {
    setIsLoadingList(true);
    try {
      const data = await api.getAnalyses();
      if (data && data.length > 0) {
        // Format the database rows to fit recent analyses list
        const formatted = data.map((item: any) => ({
          id: item.id,
          fileName: item.file_name,
          candidateName: item.candidate_name,
          targetRole: item.target_role,
          uploadedAt: new Date(item.uploaded_at).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }),
          atsScore: item.ats_score,
          status: 'completed' as const
        }));
        setAnalysesList(formatted);
        
        // Calculate dynamic averages based on real DB values
        const totalAts = data.reduce((acc, curr) => acc + curr.ats_score, 0);
        const avg = Math.round(totalAts / data.length);
        setStats({
          avgAts: avg,
          techMatch: Math.min(100, avg + 3),
          structure: Math.min(100, Math.round(avg * 0.96)),
          industry: Math.min(100, Math.round(avg * 1.08))
        });
      } else {
        // Fallback to mock data if db is empty
        setAnalysesList(mockRecentAnalyses);
      }
    } catch (err) {
      console.warn('⚠️ Express API server not reachable or Supabase configuration is missing. Falling back to frontend mock data.');
      setAnalysesList(mockRecentAnalyses);
    } finally {
      setIsLoadingList(false);
    }
  };

  useEffect(() => {
    fetchScans();
  }, []);

  // Dashboard trend chart mock data (ATS Scores over time)
  const scoreTrendData = [
    { name: 'May 1', score: 62 },
    { name: 'May 8', score: 65 },
    { name: 'May 15', score: 68 },
    { name: 'May 22', score: 75 },
    { name: 'May 29', score: 72 },
    { name: 'Jun 2', score: 84 },
    { name: 'Jun 4', score: 92 }
  ];

  const handleUploadStart = async (file: File) => {
    setFileName(file.name);
    setIsAnalyzing(true);
    setAnimationCompleted(false);
    setUploadResult(null);

    try {
      // Trigger actual Express upload API
      const result = await api.uploadAndAnalyze(file);
      setUploadResult(result);
    } catch (err: any) {
      console.error(err);
      setIsAnalyzing(false);
      alert('Analysis failed: ' + err.message);
    }
  };

  const handleAnimationComplete = () => {
    setAnimationCompleted(true);
  };

  // Sync animation completion and API uploads
  useEffect(() => {
    if (animationCompleted && uploadResult) {
      setIsAnalyzing(false);
      navigate(`/analysis/${uploadResult.id}`);
    }
  }, [animationCompleted, uploadResult, navigate]);

  // Filter analyses based on search query
  const filteredAnalyses = analysesList.filter(
    (item) =>
      item.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.targetRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.fileName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-dark-bg text-brand-text flex flex-col">
      <Navbar />

      {isAnalyzing && (
        <LoadingScreen fileName={fileName} onComplete={handleAnimationComplete} />
      )}

      <div className="flex flex-1 pt-16 sm:pt-20">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Dashboard Panel */}
        <main className="flex-1 md:ml-64 p-4 sm:p-6 lg:p-8 space-y-8 max-w-6xl">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Recruitment Dashboard</h1>
              <p className="text-xs text-gray-400">Manage parsed resumes, explore target metrics, and improve candidate qualifications.</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500 font-mono bg-[#111827] border border-white/5 py-1.5 px-3 rounded-xl">
              <TrendingUp className="w-3.5 h-3.5 text-brand-accent animate-pulse" />
              Recruiter Hub: Active
            </div>
          </div>

          {tab === 'overview' ? (
            <>
              {/* Top Resume Upload Panel */}
              <div className="glass p-6 sm:p-8 rounded-3xl border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl pointer-events-none"></div>
                <div className="space-y-4 mb-6 text-center">
                  <h2 className="text-lg sm:text-xl font-bold">New Resume Scan</h2>
                  <p className="text-xs text-gray-400 max-w-md mx-auto">Upload a doc or pdf to map candidate skill gaps, grade parsing structures, and receive revisions.</p>
                </div>
                <UploadZone onUploadStart={handleUploadStart} />
              </div>

              {/* Statistics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <StatCard
                  title="Average ATS Score"
                  value={`${stats.avgAts}%`}
                  icon={Award}
                  iconColor="text-brand-primary"
                  bgColor="bg-brand-primary"
                  progressValue={stats.avgAts}
                />
                <StatCard
                  title="Technical Skill Match"
                  value={`${stats.techMatch}%`}
                  icon={BarChart3}
                  iconColor="text-brand-accent"
                  bgColor="bg-brand-accent"
                  progressValue={stats.techMatch}
                />
                <StatCard
                  title="Structure Strength"
                  value={`${stats.structure}%`}
                  icon={Sliders}
                  iconColor="text-brand-secondary"
                  bgColor="bg-brand-secondary"
                  progressValue={stats.structure}
                />
                <StatCard
                  title="Industry Match"
                  value={`${stats.industry}%`}
                  icon={Briefcase}
                  iconColor="text-brand-success"
                  bgColor="bg-brand-success"
                  progressValue={stats.industry}
                />
              </div>

              {/* Chart Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Trend Chart */}
                <div className="lg:col-span-2">
                  <ChartCard
                    title="Overall ATS Score Progression"
                    type="area"
                    data={scoreTrendData}
                    height={260}
                  />
                </div>

                {/* Quick Actions Card */}
                <div className="glass-card p-6 rounded-2xl border border-white/5 flex flex-col justify-between">
                  <div className="space-y-4">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Quick Actions</h3>
                    
                    <div className="space-y-3">
                      <button
                        onClick={() => navigate('/analysis/ana_2')}
                        className="w-full p-3 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-brand-primary/30 rounded-xl transition-all duration-300 flex items-center justify-between text-xs text-brand-text text-left group"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="p-1.5 bg-brand-primary/10 rounded-lg text-brand-primary"><Play className="w-3.5 h-3.5" /></div>
                          <div>
                            <p className="font-semibold">Review Data Scientist</p>
                            <span className="text-[10px] text-gray-500">View Jane Smith (92%)</span>
                          </div>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </button>

                      <button
                        onClick={() => navigate('/analysis/ana_3')}
                        className="w-full p-3 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-brand-primary/30 rounded-xl transition-all duration-300 flex items-center justify-between text-xs text-brand-text text-left group"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="p-1.5 bg-brand-secondary/10 rounded-lg text-brand-secondary"><Play className="w-3.5 h-3.5" /></div>
                          <div>
                            <p className="font-semibold">Review Product Manager</p>
                            <span className="text-[10px] text-gray-500">View Alex Rivera (68%)</span>
                          </div>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5 text-[10px] text-gray-500 font-mono">
                    Tips: Add measurable statistics to resume work histories to instantly boost structures by 10-15 points.
                  </div>
                </div>
              </div>
            </>
          ) : null}

          {/* Recent Analyses Table Card */}
          {(tab === 'overview' || tab === 'analyses') && (
            <div className="glass p-6 rounded-3xl border border-white/5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold">Recent Scans</h2>
                  <p className="text-xs text-gray-400">Database of all successfully parsed and scored candidate profiles.</p>
                </div>

                {/* Search Bar */}
                <div className="relative max-w-xs w-full sm:w-72">
                  <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search candidate or role..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#111827] border border-white/5 focus:border-brand-primary/50 text-xs text-brand-text py-2.5 pl-9 pr-4 rounded-xl focus:outline-none placeholder-gray-500 transition-colors"
                  />
                </div>
              </div>

              {/* Table wrapper */}
              <div className="overflow-x-auto">
                {isLoadingList ? (
                  <div className="flex flex-col items-center justify-center py-10 gap-3 text-xs text-gray-400">
                    <Loader2 className="w-6 h-6 animate-spin text-brand-primary" />
                    <span>Loading analyses from database...</span>
                  </div>
                ) : (
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-white/5 text-gray-500 font-mono uppercase tracking-wider text-[10px]">
                        <th className="py-3 px-4">Candidate & File</th>
                        <th className="py-3 px-4">Target Role</th>
                        <th className="py-3 px-4">Date Uploaded</th>
                        <th className="py-3 px-4 text-center">ATS Score</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAnalyses.length > 0 ? (
                        filteredAnalyses.map((item) => (
                          <tr
                            key={item.id}
                            className="border-b border-white/5 hover:bg-white/[0.01] transition-colors"
                          >
                            <td className="py-4 px-4">
                              <div className="font-semibold text-brand-text flex items-center gap-2">
                                <FileText className="w-4 h-4 text-brand-primary shrink-0" />
                                <div>
                                  <p>{item.candidateName}</p>
                                  <span className="text-[10px] text-gray-500 font-mono block truncate max-w-xs">{item.fileName}</span>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-4 text-gray-400 font-medium">{item.targetRole}</td>
                            <td className="py-4 px-4 text-gray-500 font-mono">{item.uploadedAt}</td>
                            <td className="py-4 px-4">
                              <div className="flex justify-center">
                                <span className={`px-2.5 py-1 rounded-lg text-xs font-bold font-mono tracking-wider ${
                                  item.atsScore >= 85
                                    ? 'bg-brand-success/10 text-brand-success border border-brand-success/20'
                                    : item.atsScore >= 70
                                    ? 'bg-brand-accent/10 text-brand-accent border border-brand-accent/20'
                                    : 'bg-amber-400/10 text-amber-400 border border-amber-400/20'
                                }`}>
                                  {item.atsScore}/100
                                </span>
                              </div>
                            </td>
                            <td className="py-4 px-4 text-right">
                              <button
                                onClick={() => navigate(`/analysis/${item.id}`)}
                                className="px-3.5 py-1.5 bg-white/5 hover:bg-brand-primary/10 border border-white/5 hover:border-brand-primary/30 text-xs font-semibold rounded-lg text-brand-text hover:text-brand-text transition-all cursor-pointer"
                              >
                                View Report
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="py-10 text-center text-gray-500 font-medium">
                            No analyses found matching your query.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
export default Dashboard;
