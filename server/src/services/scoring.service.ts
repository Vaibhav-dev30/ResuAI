import { Skill, MissingSkill, Suggestion, IndustryMatch } from '../types/index.js';

interface ScoredResumeData {
  candidateName: string;
  candidateEmail: string;
  candidatePhone: string;
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

// Role-specific keyword dictionaries
interface RoleDefinition {
  title: string;
  technicalKeywords: string[];
  softKeywords: string[];
  toolKeywords: string[];
  requiredKeywords: { name: string; importance: 'high' | 'medium' | 'low'; suggest: string }[];
  industries: { name: string; baseScore: number }[];
}

const ROLES_DATABASE: Record<string, RoleDefinition> = {
  frontend: {
    title: 'Senior React Engineer',
    technicalKeywords: ['react', 'react.js', 'typescript', 'javascript', 'next.js', 'html', 'css', 'tailwind', 'redux', 'graphql', 'apollo'],
    softKeywords: ['mentoring', 'leadership', 'communication', 'collaboration', 'agile', 'scrum'],
    toolKeywords: ['git', 'github', 'webpack', 'vite', 'jest', 'cypress', 'docker', 'npm', 'eslint'],
    requiredKeywords: [
      { name: 'CI/CD (GitHub Actions/CircleCI)', importance: 'high', suggest: 'Add a bullet point showing how you automated builds to reduce deploy failures.' },
      { name: 'Cypress (E2E Testing)', importance: 'medium', suggest: 'Mention E2E testing tools used alongside Jest in your recent role.' },
      { name: 'Docker', importance: 'low', suggest: 'Briefly state if you containerized your local frontend environment.' }
    ],
    industries: [
      { name: 'Software Development', baseScore: 95 },
      { name: 'E-commerce Platforms', baseScore: 85 },
      { name: 'Enterprise SaaS', baseScore: 75 }
    ]
  },
  data_science: {
    title: 'Machine Learning Engineer',
    technicalKeywords: ['python', 'pytorch', 'tensorflow', 'deep learning', 'machine learning', 'sql', 'postgresql', 'pandas', 'numpy', 'scikit-learn', 'statistics'],
    softKeywords: ['analytical thinking', 'problem solving', 'research presentation', 'communication'],
    toolKeywords: ['aws', 'sagemaker', 'mlflow', 'docker', 'kubernetes', 'git', 'airflow', 'dbt'],
    requiredKeywords: [
      { name: 'Apache Airflow', importance: 'high', suggest: 'Mention experience with any pipeline orchestration or data scheduling tools.' },
      { name: 'dbt (Data Build Tool)', importance: 'low', suggest: 'Highlight raw SQL data transformations if dbt is not directly available.' },
      { name: 'Kubernetes', importance: 'medium', suggest: 'Mention container orchestration skills for deploying microservices.' }
    ],
    industries: [
      { name: 'Artificial Intelligence & ML', baseScore: 98 },
      { name: 'Cloud Infrastructure', baseScore: 88 },
      { name: 'Finance & Analytics', baseScore: 78 }
    ]
  },
  product: {
    title: 'Technical Product Manager',
    technicalKeywords: ['product strategy', 'agile', 'scrum', 'roadmaps', 'backlog management', 'user stories', 'requirements', 'system design'],
    softKeywords: ['stakeholder alignment', 'user empathy', 'public speaking', 'communication', 'negotiation', 'leadership'],
    toolKeywords: ['jira', 'confluence', 'figma', 'mixpanel', 'amplitude', 'sql', 'trello'],
    requiredKeywords: [
      { name: 'Product Analytics (Mixpanel/Amplitude)', importance: 'high', suggest: 'Mention how you tracked user behaviors and metric drops.' },
      { name: 'A/B Testing Methodologies', importance: 'high', suggest: 'State how you validated product ideas or features quantitatively.' },
      { name: 'SQL Data Extraction', importance: 'medium', suggest: 'Add experience querying relational databases for direct metric analysis.' }
    ],
    industries: [
      { name: 'Product Management', baseScore: 95 },
      { name: 'Cloud SaaS Applications', baseScore: 80 },
      { name: 'Digital Design & UX', baseScore: 65 }
    ]
  }
};

export class ScoringService {
  /**
   * Run matching and scoring logic against parsed text
   */
  static analyzeResume(text: string): ScoredResumeData {
    const textLower = text.toLowerCase();

    // 1. Extract contact information using regex
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const emailMatch = text.match(emailRegex);
    const email = emailMatch ? emailMatch[0] : '';

    const phoneRegex = /\+?[0-9]{1,4}?[-.\s]?\(?[0-9]{1,3}?\)?[-.\s]?[0-9]{1,4}[-.\s]?[0-9]{1,4}[-.\s]?[0-9]{1,9}/g;
    const phoneMatch = text.match(phoneRegex);
    const phone = phoneMatch ? phoneMatch[0] : '';

    // Extract name (fallback to first non-empty lines)
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    let name = 'Unknown Candidate';
    if (lines.length > 0) {
      // Clean typical parsed headers
      const firstLine = lines[0];
      if (firstLine.length < 40 && !firstLine.includes('@') && !firstLine.match(/[0-9]/)) {
        name = firstLine;
      } else if (lines[1] && lines[1].length < 40 && !lines[1].includes('@')) {
        name = lines[1];
      }
    }

    // 2. Classify candidate target role based on keyword triggers
    let selectedRoleKey = 'frontend'; // Default role
    let maxMatches = 0;

    Object.keys(ROLES_DATABASE).forEach((key) => {
      const role = ROLES_DATABASE[key];
      const matchCount = role.technicalKeywords.reduce((count, word) => {
        return count + (textLower.includes(word) ? 1 : 0);
      }, 0);

      if (matchCount > maxMatches) {
        maxMatches = matchCount;
        selectedRoleKey = key;
      }
    });

    const roleDef = ROLES_DATABASE[selectedRoleKey];

    // 3. Score Technical & Soft Skills Matches
    const technicalSkills: Skill[] = [];
    const softSkills: Skill[] = [];

    roleDef.technicalKeywords.forEach((kw) => {
      if (textLower.includes(kw)) {
        const matchPercent = 75 + Math.floor(Math.random() * 25);
        technicalSkills.push({
          name: kw.charAt(0).toUpperCase() + kw.slice(1),
          category: 'technical',
          matchPercent,
          rating: matchPercent >= 90 ? 'expert' : 'proficient'
        });
      }
    });

    roleDef.toolKeywords.forEach((kw) => {
      if (textLower.includes(kw)) {
        const matchPercent = 70 + Math.floor(Math.random() * 25);
        technicalSkills.push({
          name: kw.charAt(0).toUpperCase() + kw.slice(1),
          category: 'tool',
          matchPercent,
          rating: matchPercent >= 90 ? 'expert' : 'proficient'
        });
      }
    });

    roleDef.softKeywords.forEach((kw) => {
      if (textLower.includes(kw)) {
        const matchPercent = 80 + Math.floor(Math.random() * 20);
        softSkills.push({
          name: kw.charAt(0).toUpperCase() + kw.slice(1),
          category: 'soft',
          matchPercent,
          rating: 'proficient'
        });
      }
    });

    // 4. Missing Skills Extraction
    const missingSkills: MissingSkill[] = [];
    roleDef.requiredKeywords.forEach((req) => {
      const isPresent = technicalSkills.some(s => s.name.toLowerCase().includes(req.name.split(' ')[0].toLowerCase())) || textLower.includes(req.name.split(' ')[0].toLowerCase());
      if (!isPresent) {
        missingSkills.push({
          name: req.name,
          importance: req.importance,
          alternativeSuggest: req.suggest
        });
      }
    });

    // 5. Calculate Sub-Scores
    // Skill density matches (percentage of database keywords covered)
    const totalKeywords = roleDef.technicalKeywords.length + roleDef.toolKeywords.length;
    const matchedCount = technicalSkills.length;
    const skillMatchScore = Math.min(100, Math.round((matchedCount / totalKeywords) * 100) + 20); // Add default baseline

    // Layout and formatting strengths
    let resumeStrengthScore = 65;
    const strengths: string[] = [];
    const weaknesses: string[] = [];

    if (email && phone) {
      resumeStrengthScore += 10;
      strengths.push('Clean layout header containing contact information (Email and Phone).');
    } else {
      weaknesses.push('Missing contact information. Make sure to list email and phone headers.');
    }

    if (textLower.includes('education') || textLower.includes('degree')) {
      resumeStrengthScore += 10;
      strengths.push('Includes formal Education / Degree section.');
    } else {
      weaknesses.push('Missing academic credentials. Ensure you have an Education block.');
    }

    if (textLower.includes('experience') || textLower.includes('employment') || textLower.includes('work history')) {
      resumeStrengthScore += 10;
      strengths.push('Reverse-chronological Professional Experience section detected.');
    } else {
      weaknesses.push('Missing professional history. Ensure you have a clear Work Experience section.');
    }

    // Check for metrics/numbers in work history
    const numbersCount = (text.match(/\d+/g) || []).length;
    if (numbersCount > 8) {
      resumeStrengthScore += 5;
      strengths.push('Quantitative impact metrics (percentages, revenues, timelines) are integrated.');
    } else {
      weaknesses.push('Lacks quantitative metrics. Try to support achievements with numbers.');
    }

    resumeStrengthScore = Math.min(100, resumeStrengthScore);

    // Industry match score
    const industryMatchScore = Math.min(100, Math.round(skillMatchScore * 0.95 + (Math.random() * 5)));

    // Overall ATS Score (weighted)
    const atsScore = Math.round((skillMatchScore * 0.5) + (resumeStrengthScore * 0.3) + (industryMatchScore * 0.2));

    // 6. Generate Revisions / Suggestions
    const suggestions: Suggestion[] = [];
    
    if (numbersCount < 8) {
      suggestions.push({
        id: 'sug_rev_1',
        category: 'impact',
        title: 'Quantify Work Achievements',
        description: 'Provide numerical outcomes. Resumes showing metric impacts (e.g. speedups, dollar values, user base increases) generate 40% higher recruiter response rates.',
        priority: 'high',
        beforeText: 'Managed frontend deployment pipeline and ran unit tests to improve code quality.',
        afterText: 'Automated deployment pipelines and expanded Jest unit tests, reducing deployment failures by 28% and increasing code coverage from 60% to 85%.'
      });
    }

    if (missingSkills.length > 0) {
      suggestions.push({
        id: 'sug_rev_2',
        category: 'keywords',
        title: `Integrate Missing Role Keywords: ${missingSkills[0].name}`,
        description: `Your profile has a gap in technical keywords critical to ${roleDef.title}. Incorporate "${missingSkills[0].name.split(' ')[0]}" directly in your skills or experience.`,
        priority: 'high'
      });
    }

    // Check for tables/sidebars
    if (text.includes('|') || text.includes('  ')) {
      suggestions.push({
        id: 'sug_rev_3',
        category: 'formatting',
        title: 'Replace Dense Columns & Tables',
        description: 'Multi-column grids and nested tables can break structural indexing in older ATS engines. Use comma-separated list blocks under clear headings.',
        priority: 'low'
      });
    }

    const industryMatches = roleDef.industries.map((ind) => {
      const matchAdjust = Math.floor(Math.random() * 6) - 3;
      return {
        name: ind.name,
        score: Math.min(100, Math.max(0, ind.baseScore + matchAdjust))
      };
    });

    // Generate simulated summary
    const summary = `${name} is a candidate matching target benchmarks for ${roleDef.title}. Showcases strong proficiency in core capabilities: ${technicalSkills.slice(0, 3).map(s => s.name).join(', ')}. The profile is well-formed, but needs optimizations in ${missingSkills.slice(0, 2).map(s => s.name).join(', ') || 'quantifying impact metrics'} to bypass top ATS scans.`;

    return {
      candidateName: name,
      candidateEmail: email,
      candidatePhone: phone,
      targetRole: roleDef.title,
      atsScore,
      skillMatchScore,
      resumeStrengthScore,
      industryMatchScore,
      technicalSkills,
      softSkills,
      missingSkills,
      suggestions,
      industryMatches,
      summary,
      strengths,
      weaknesses
    };
  }
}

export default ScoringService;
