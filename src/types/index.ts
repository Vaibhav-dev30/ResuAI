export interface Skill {
  name: string;
  category: 'technical' | 'soft' | 'tool';
  matchPercent: number; // 0 - 100
  rating: 'expert' | 'proficient' | 'beginner';
}

export interface MissingSkill {
  name: string;
  importance: 'high' | 'medium' | 'low';
  alternativeSuggest: string;
}

export interface Suggestion {
  id: string;
  category: 'impact' | 'formatting' | 'keywords' | 'experience';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  beforeText?: string;
  afterText?: string;
}

export interface IndustryMatch {
  name: string;
  score: number; // 0 - 100
}

export interface ResumeAnalysis {
  id: string;
  fileName: string;
  fileSize: string;
  uploadedAt: string;
  candidateName: string;
  candidateEmail?: string;
  candidatePhone?: string;
  targetRole: string;
  atsScore: number;
  skillMatchScore: number;
  resumeStrengthScore: number;
  industryMatchScore: number;
  
  technicalSkills: Skill[];
  softSkills: Skill[];
  missingSkills: MissingSkill[];
  suggestions: Suggestion[];
  industryMatches: IndustryMatch[];
  
  summary: string;
  strengths: string[];
  weaknesses: string[];
}

export interface RecentAnalysisSummary {
  id: string;
  fileName: string;
  candidateName: string;
  targetRole: string;
  uploadedAt: string;
  atsScore: number;
  status: 'completed' | 'processing' | 'failed';
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  iconName: string; // To map to Lucide icon dynamically
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  avatarUrl: string;
  rating: number;
  comment: string;
}
