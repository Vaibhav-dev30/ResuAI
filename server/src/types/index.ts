export interface Skill {
  name: string;
  category: 'technical' | 'soft' | 'tool';
  matchPercent: number;
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
  score: number;
}
