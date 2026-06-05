-- SQL Schema for ResuAI Database (PostgreSQL / Supabase)

-- Drop existing tables if they exist
DROP TABLE IF EXISTS industry_matches CASCADE;
DROP TABLE IF EXISTS suggestions CASCADE;
DROP TABLE IF EXISTS missing_skills CASCADE;
DROP TABLE IF EXISTS skills CASCADE;
DROP TABLE IF EXISTS analyses CASCADE;

-- 1. Analyses Table
CREATE TABLE analyses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    file_name TEXT NOT NULL,
    file_size TEXT,
    uploaded_at TIMESTAMPTZ DEFAULT now(),
    candidate_name TEXT NOT NULL,
    candidate_email TEXT,
    candidate_phone TEXT,
    target_role TEXT NOT NULL,
    ats_score INTEGER NOT NULL,
    skill_match_score INTEGER NOT NULL,
    resume_strength_score INTEGER NOT NULL,
    industry_match_score INTEGER NOT NULL,
    summary TEXT,
    strengths TEXT[] DEFAULT '{}',
    weaknesses TEXT[] DEFAULT '{}',
    user_id UUID -- References auth.users(id) in Supabase. Can be null for guest uploads.
);

-- 2. Skills Table
CREATE TABLE skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    analysis_id UUID NOT NULL REFERENCES analyses(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('technical', 'soft', 'tool')),
    match_percent INTEGER NOT NULL CHECK (match_percent >= 0 AND match_percent <= 100),
    rating TEXT NOT NULL CHECK (rating IN ('expert', 'proficient', 'beginner'))
);

-- 3. Missing Skills Table
CREATE TABLE missing_skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    analysis_id UUID NOT NULL REFERENCES analyses(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    importance TEXT NOT NULL CHECK (importance IN ('high', 'medium', 'low')),
    alternative_suggest TEXT
);

-- 4. Suggestions Table
CREATE TABLE suggestions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    analysis_id UUID NOT NULL REFERENCES analyses(id) ON DELETE CASCADE,
    category TEXT NOT NULL CHECK (category IN ('impact', 'formatting', 'keywords', 'experience')),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    priority TEXT NOT NULL CHECK (priority IN ('high', 'medium', 'low')),
    before_text TEXT,
    after_text TEXT
);

-- 5. Industry Matches Table
CREATE TABLE industry_matches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    analysis_id UUID NOT NULL REFERENCES analyses(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100)
);

-- Enable Row Level Security (RLS) on tables for security
ALTER TABLE analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE missing_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE suggestions ENABLE ROW LEVEL SECURITY;
ALTER TABLE industry_matches ENABLE ROW LEVEL SECURITY;

-- Create basic policies for development (allow all reads and writes)
CREATE POLICY "Allow public read access to analyses" ON analyses FOR SELECT USING (true);
CREATE POLICY "Allow public insert to analyses" ON analyses FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read access to skills" ON skills FOR SELECT USING (true);
CREATE POLICY "Allow public insert to skills" ON skills FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read access to missing_skills" ON missing_skills FOR SELECT USING (true);
CREATE POLICY "Allow public insert to missing_skills" ON missing_skills FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read access to suggestions" ON suggestions FOR SELECT USING (true);
CREATE POLICY "Allow public insert to suggestions" ON suggestions FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read access to industry_matches" ON industry_matches FOR SELECT USING (true);
CREATE POLICY "Allow public insert to industry_matches" ON industry_matches FOR INSERT WITH CHECK (true);
