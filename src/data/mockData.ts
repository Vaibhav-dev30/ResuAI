import type { ResumeAnalysis, RecentAnalysisSummary, TestimonialItem } from '../types';

export const mockTestimonials: TestimonialItem[] = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    role: 'Lead Tech Recruiter',
    company: 'InnovateTech',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    rating: 5,
    comment: 'This ATS analyzer has cut down our initial screening time by 60%. The skill gap analysis is exceptionally accurate and helps us identify top-tier talent instantly.'
  },
  {
    id: '2',
    name: 'Marcus Chen',
    role: 'Senior Software Engineer',
    company: 'Google',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    rating: 5,
    comment: 'I scanned my resume and realized I was missing key terminology for system design. After updating it based on the recommendations, my interview callback rate doubled!'
  },
  {
    id: '3',
    name: 'Elena Rostova',
    role: 'HR Director',
    company: 'Stripe',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    rating: 5,
    comment: 'The UI is incredibly slick, and the depth of analysis is mind-blowing. It doesn\'t just match keywords; it actually understands the context of the achievements.'
  }
];

export const mockRecentAnalyses: RecentAnalysisSummary[] = [
  {
    id: 'ana_1',
    fileName: 'John_Doe_Frontend_Developer_2026.pdf',
    candidateName: 'John Doe',
    targetRole: 'Senior React Engineer',
    uploadedAt: 'June 4, 2026, 14:32',
    atsScore: 84,
    status: 'completed'
  },
  {
    id: 'ana_2',
    fileName: 'Jane_Smith_Data_Science_v2.pdf',
    candidateName: 'Jane Smith',
    targetRole: 'Machine Learning Engineer',
    uploadedAt: 'June 3, 2026, 09:15',
    atsScore: 92,
    status: 'completed'
  },
  {
    id: 'ana_3',
    fileName: 'Alex_PM_Resume_Draft.pdf',
    candidateName: 'Alex Rivera',
    targetRole: 'Technical Product Manager',
    uploadedAt: 'June 2, 2026, 17:45',
    atsScore: 68,
    status: 'completed'
  },
  {
    id: 'ana_4',
    fileName: 'David_Kim_Backend_Dev.docx',
    candidateName: 'David Kim',
    targetRole: 'Lead Java Developer',
    uploadedAt: 'May 30, 2026, 11:20',
    atsScore: 75,
    status: 'completed'
  }
];

export const mockAnalyses: Record<string, ResumeAnalysis> = {
  'ana_1': {
    id: 'ana_1',
    fileName: 'John_Doe_Frontend_Developer_2026.pdf',
    fileSize: '184 KB',
    uploadedAt: 'June 4, 2026, 14:32',
    candidateName: 'John Doe',
    candidateEmail: 'john.doe@example.com',
    candidatePhone: '+1 (555) 019-2834',
    targetRole: 'Senior React Engineer',
    atsScore: 84,
    skillMatchScore: 88,
    resumeStrengthScore: 82,
    industryMatchScore: 90,
    summary: 'A highly experienced Frontend Engineer with solid skills in React, TypeScript, and modern web architectures. Strong track record of improving web performance and mentoring team members. The resume is well-formatted and easy to parse, though it would benefit from incorporating more quantitative impact metrics and adding missing architecture-level tools.',
    strengths: [
      'Excellent coverage of core React ecosystem (Redux, React Query, Router).',
      'Strong TypeScript implementation and type-safety practices.',
      'Clear, reverse-chronological layout which is optimized for ATS parsers.',
      'Documented experience leading UI migrations and improving load times.'
    ],
    weaknesses: [
      'Several achievement bullet points lack measurable results (e.g. percentages, dollar amounts).',
      'Under-representation of cloud infrastructure and CI/CD tools.',
      'Weak emphasis on testing methodologies (Jest/Cypress mentioned but not elaborated).'
    ],
    technicalSkills: [
      { name: 'React.js', category: 'technical', matchPercent: 95, rating: 'expert' },
      { name: 'TypeScript', category: 'technical', matchPercent: 92, rating: 'expert' },
      { name: 'Redux Toolkit', category: 'technical', matchPercent: 88, rating: 'proficient' },
      { name: 'Next.js', category: 'technical', matchPercent: 85, rating: 'proficient' },
      { name: 'Tailwind CSS', category: 'technical', matchPercent: 90, rating: 'expert' },
      { name: 'HTML5 & CSS3', category: 'technical', matchPercent: 95, rating: 'expert' },
      { name: 'GraphQL/Apollo', category: 'technical', matchPercent: 70, rating: 'proficient' },
      { name: 'Git & GitHub', category: 'tool', matchPercent: 90, rating: 'expert' },
      { name: 'Webpack/Vite', category: 'tool', matchPercent: 80, rating: 'proficient' },
      { name: 'Jest', category: 'tool', matchPercent: 65, rating: 'beginner' }
    ],
    softSkills: [
      { name: 'Mentoring & Leadership', category: 'soft', matchPercent: 85, rating: 'proficient' },
      { name: 'Agile/Scrum Collaborations', category: 'soft', matchPercent: 90, rating: 'expert' },
      { name: 'Cross-functional Communication', category: 'soft', matchPercent: 80, rating: 'proficient' }
    ],
    missingSkills: [
      { name: 'CI/CD (GitHub Actions/CircleCI)', importance: 'high', alternativeSuggest: 'Add a bullet point showing how you automated builds to reduce deploy failures.' },
      { name: 'Cypress (E2E Testing)', importance: 'medium', alternativeSuggest: 'Mention E2E testing tools used alongside Jest in your recent role.' },
      { name: 'Docker', importance: 'low', alternativeSuggest: 'Briefly state if you containerized your local frontend environment.' }
    ],
    suggestions: [
      {
        id: 'sug_1_1',
        category: 'impact',
        title: 'Quantify Achievement Metrics',
        description: 'Your bullet points contain good descriptions but lack numbers. Recruiter studies show resumes with quantitative data have a 40% higher callback rate.',
        priority: 'high',
        beforeText: 'Improved page load speed of the core e-commerce product.',
        afterText: 'Optimized Web Vitals and bundled sizes, reducing page load speed by 34% and increasing check-out conversion rate by 4.2%.'
      },
      {
        id: 'sug_1_2',
        category: 'keywords',
        title: 'Enhance Testing and Quality Keywords',
        description: 'The job description places heavy emphasis on "quality assurance" and "automated testing". Include Jest and E2E keywords directly in your job description sections, not just the skills grid.',
        priority: 'medium'
      },
      {
        id: 'sug_1_3',
        category: 'formatting',
        title: 'Avoid Multiple-Column Skill Lists',
        description: 'Your skills are listed in a dense side-by-side table. Some legacy ATS tools might parse these out-of-order, merging unrelated headers. Use comma-separated list blocks under distinct headers.',
        priority: 'low'
      }
    ],
    industryMatches: [
      { name: 'Software Development', score: 95 },
      { name: 'E-commerce Platforms', score: 85 },
      { name: 'Financial Tech (FinTech)', score: 72 }
    ]
  },
  'ana_2': {
    id: 'ana_2',
    fileName: 'Jane_Smith_Data_Science_v2.pdf',
    fileSize: '242 KB',
    uploadedAt: 'June 3, 2026, 09:15',
    candidateName: 'Jane Smith',
    candidateEmail: 'jane.smith@example.com',
    targetRole: 'Machine Learning Engineer',
    atsScore: 92,
    skillMatchScore: 95,
    resumeStrengthScore: 90,
    industryMatchScore: 92,
    summary: 'An outstanding Machine Learning Engineer resume demonstrating deep mathematical knowledge, strong programming skills in Python/C++, and real-world deployment of deep learning models. High-impact metrics are well integrated throughout the professional experience section.',
    strengths: [
      'Impressive integration of business outcomes (e.g. "$1.2M savings", "reduced inference latency by 45%").',
      'Strong balance of foundational data science (Pandas, Numpy) and production ML (Kubernetes, AWS, MLflow).',
      'Perfect header layout matching standard resume formats.'
    ],
    weaknesses: [
      'Slightly wordy summaries. Condensing paragraphs to bullet points will increase scan-readability.',
      'Slight lack of MLOps orchestration keywords like Prefect or Airflow.'
    ],
    technicalSkills: [
      { name: 'Python', category: 'technical', matchPercent: 98, rating: 'expert' },
      { name: 'PyTorch / TensorFlow', category: 'technical', matchPercent: 94, rating: 'expert' },
      { name: 'SQL & PostgreSQL', category: 'technical', matchPercent: 85, rating: 'proficient' },
      { name: 'Kubernetes & Docker', category: 'technical', matchPercent: 80, rating: 'proficient' },
      { name: 'AWS (S3, EC2, SageMaker)', category: 'technical', matchPercent: 88, rating: 'expert' },
      { name: 'MLflow', category: 'tool', matchPercent: 85, rating: 'proficient' },
      { name: 'C++', category: 'technical', matchPercent: 75, rating: 'proficient' }
    ],
    softSkills: [
      { name: 'Analytical Thinking', category: 'soft', matchPercent: 95, rating: 'expert' },
      { name: 'Research Presentation', category: 'soft', matchPercent: 90, rating: 'expert' }
    ],
    missingSkills: [
      { name: 'Apache Airflow', importance: 'high', alternativeSuggest: 'Mention experience with any pipeline orchestration or data scheduling tools.' },
      { name: 'dbt (Data Build Tool)', importance: 'low', alternativeSuggest: 'Highlight raw SQL data transformations if dbt is not directly available.' }
    ],
    suggestions: [
      {
        id: 'sug_2_1',
        category: 'formatting',
        title: 'Condense Professional Summary',
        description: 'Your introductory paragraph is 6 lines long. Reduce this to 3 punchy sentences focusing on years of experience, core expertise, and a key standout achievement.',
        priority: 'medium',
        beforeText: 'Dedicated, detail-oriented Machine Learning Engineer with 5+ years of experience analyzing complex datasets, engineering models, and deploying production solutions that solve business problems. Expert in Python, Deep Learning, and cloud systems. Proven leader who works with stakeholders to implement algorithms.',
        afterText: 'Lead Machine Learning Engineer with 5+ years of experience designing and deploying scalable deep learning models. Proven record of reducing system latency by 45% and driving $1.2M in annual savings.'
      },
      {
        id: 'sug_2_2',
        category: 'keywords',
        title: 'Add Pipeline Orchestration Keywords',
        description: 'The job posting lists ETL pipelines as a core responsibility. Add keywords like "Orchestration", "Airflow", or "DAG" if you have handled cron-jobs or pipeline schedules.',
        priority: 'high'
      }
    ],
    industryMatches: [
      { name: 'Artificial Intelligence & ML', score: 98 },
      { name: 'Cloud Infrastructure', score: 88 },
      { name: 'Enterprise SaaS', score: 80 }
    ]
  },
  'ana_3': {
    id: 'ana_3',
    fileName: 'Alex_PM_Resume_Draft.pdf',
    fileSize: '150 KB',
    uploadedAt: 'June 2, 2026, 17:45',
    candidateName: 'Alex Rivera',
    candidateEmail: 'alex.rivera@example.com',
    targetRole: 'Technical Product Manager',
    atsScore: 68,
    skillMatchScore: 70,
    resumeStrengthScore: 65,
    industryMatchScore: 70,
    summary: 'A Product Manager with good foundation, but the resume has critical formatting and keyword gaps. The target role requires high technical literacy, but keywords representing modern software cycles, system design, and product analytics are missing. The layout contains text boxes which may fail to parse in older ATS platforms.',
    strengths: [
      'Clear list of product launches and product-market fit milestones.',
      'Strong communication and stakeholder management bullet points.'
    ],
    weaknesses: [
      'Uses complex nested tables and side-bars which get garbled in text-only ATS parsers.',
      'Missing core PM analytics keywords like Amplitude, Mixpanel, SQL, or A/B Testing.',
      'Job titles in resume do not explicitly match target technical seniority.'
    ],
    technicalSkills: [
      { name: 'Product Strategy', category: 'technical', matchPercent: 85, rating: 'proficient' },
      { name: 'Agile & Scrum', category: 'technical', matchPercent: 90, rating: 'expert' },
      { name: 'Jira / Confluence', category: 'tool', matchPercent: 80, rating: 'proficient' },
      { name: 'Figma', category: 'tool', matchPercent: 70, rating: 'proficient' }
    ],
    softSkills: [
      { name: 'Stakeholder Alignment', category: 'soft', matchPercent: 85, rating: 'proficient' },
      { name: 'User Empathy', category: 'soft', matchPercent: 90, rating: 'expert' },
      { name: 'Public Speaking', category: 'soft', matchPercent: 80, rating: 'proficient' }
    ],
    missingSkills: [
      { name: 'Product Analytics (Mixpanel/Amplitude)', importance: 'high', alternativeSuggest: 'Mention how you tracked user behaviors and metric drops.' },
      { name: 'A/B Testing Methodologies', importance: 'high', alternativeSuggest: 'State how you validated product ideas or features quantitatively.' },
      { name: 'SQL', importance: 'medium', alternativeSuggest: 'Add experience querying relational databases for direct reporting.' }
    ],
    suggestions: [
      {
        id: 'sug_3_1',
        category: 'formatting',
        title: 'Remove Text Boxes and Nested Sidebars',
        description: 'Your resume utilizes a popular online template containing a left-hand column sidebar. ATS parsers read left-to-right, meaning they will merge your contact details, skills, and work experience horizontally, making the resulting plain text illegible. Use a clean, single-column document flow.',
        priority: 'high'
      },
      {
        id: 'sug_3_2',
        category: 'keywords',
        title: 'Include Technical PM Keywords',
        description: 'You are targeting "Technical" PM roles. You must mention technical processes like "API integration", "System Architecture collaboration", "data models", or "technical debt resolution".',
        priority: 'high',
        beforeText: 'Managed frontend developer team to ship a web-based client portal.',
        afterText: 'Collaborated with engineering leads to design API contracts and database schema migrations, delivering a client portal that reduced manual support tickets by 45%.'
      },
      {
        id: 'sug_3_3',
        category: 'experience',
        title: 'Emphasize Metric Ownership',
        description: 'Add specific product metrics you owned (e.g. Monthly Active Users, Net Promoter Score, Retention, Customer Acquisition Cost).',
        priority: 'medium'
      }
    ],
    industryMatches: [
      { name: 'Product Management', score: 85 },
      { name: 'Cloud SaaS Applications', score: 62 },
      { name: 'Digital Design & UX', score: 55 }
    ]
  }
};
