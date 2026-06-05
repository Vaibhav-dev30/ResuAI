import { Request, Response } from 'express';
import ParserService from '../services/parser.service.js';
import ScoringService from '../services/scoring.service.js';
import supabase from '../config/supabase.js';

export class AnalysisController {
  /**
   * Handle resume upload, parsing, scoring, and saving to database
   */
  static async analyze(req: Request, res: Response): Promise<void> {
    try {
      if (!req.file) {
        res.status(400).json({ error: 'No resume file uploaded.' });
        return;
      }

      const fileBuffer = req.file.buffer;
      const originalname = req.file.originalname;
      const fileSize = `${(req.file.size / 1024).toFixed(1)} KB`;

      // 1. Parse text from document
      const extractedText = await ParserService.parseFile(fileBuffer, originalname);

      // 2. Score and extract metrics
      const scoreReport = ScoringService.analyzeResume(extractedText);

      // 3. Save to Supabase (analyses table)
      const { data: analysisData, error: analysisError } = await supabase
        .from('analyses')
        .insert([
          {
            file_name: originalname,
            file_size: fileSize,
            candidate_name: scoreReport.candidateName,
            candidate_email: scoreReport.candidateEmail || null,
            candidate_phone: scoreReport.candidatePhone || null,
            target_role: scoreReport.targetRole,
            ats_score: scoreReport.atsScore,
            skill_match_score: scoreReport.skillMatchScore,
            resume_strength_score: scoreReport.resumeStrengthScore,
            industry_match_score: scoreReport.industryMatchScore,
            summary: scoreReport.summary,
            strengths: scoreReport.strengths,
            weaknesses: scoreReport.weaknesses,
            user_id: req.body.userId || null
          }
        ])
        .select()
        .single();

      if (analysisError || !analysisData) {
        console.error('Error saving analysis to Supabase:', analysisError);
        throw new Error(`Failed to save base analysis: ${analysisError?.message}`);
      }

      const analysisId = analysisData.id;

      // 4. Save related records (skills, missing_skills, suggestions, industry_matches)
      
      // Save skills
      if (scoreReport.technicalSkills.length > 0 || scoreReport.softSkills.length > 0) {
        const skillsToInsert = [
          ...scoreReport.technicalSkills.map(s => ({ ...s, analysis_id: analysisId })),
          ...scoreReport.softSkills.map(s => ({ ...s, analysis_id: analysisId }))
        ];
        
        const { error: skillsError } = await supabase
          .from('skills')
          .insert(skillsToInsert);
          
        if (skillsError) console.error('Error inserting skills:', skillsError);
      }

      // Save missing skills
      if (scoreReport.missingSkills.length > 0) {
        const missingToInsert = scoreReport.missingSkills.map(s => ({ ...s, analysis_id: analysisId }));
        const { error: missingError } = await supabase
          .from('missing_skills')
          .insert(missingToInsert);
          
        if (missingError) console.error('Error inserting missing skills:', missingError);
      }

      // Save suggestions
      if (scoreReport.suggestions.length > 0) {
        const suggestionsToInsert = scoreReport.suggestions.map(s => ({ ...s, analysis_id: analysisId }));
        const { error: suggestionsError } = await supabase
          .from('suggestions')
          .insert(suggestionsToInsert);
          
        if (suggestionsError) console.error('Error inserting suggestions:', suggestionsError);
      }

      // Save industry matches
      if (scoreReport.industryMatches.length > 0) {
        const industryToInsert = scoreReport.industryMatches.map(s => ({ ...s, analysis_id: analysisId }));
        const { error: industryError } = await supabase
          .from('industry_matches')
          .insert(industryToInsert);
          
        if (industryError) console.error('Error inserting industry matches:', industryError);
      }

      // 5. Return complete report
      res.status(201).json({
        id: analysisId,
        message: 'Resume analysis created successfully.',
        analysis: {
          ...analysisData,
          technicalSkills: scoreReport.technicalSkills,
          softSkills: scoreReport.softSkills,
          missingSkills: scoreReport.missingSkills,
          suggestions: scoreReport.suggestions,
          industryMatches: scoreReport.industryMatches
        }
      });
    } catch (error: any) {
      console.error('Error during resume processing controller:', error);
      res.status(500).json({ error: error.message || 'Error occurred while processing resume.' });
    }
  }

  /**
   * Fetch list of all recent analyses
   */
  static async list(req: Request, res: Response): Promise<void> {
    try {
      const { data, error } = await supabase
        .from('analyses')
        .select('id, file_name, candidate_name, target_role, uploaded_at, ats_score')
        .order('uploaded_at', { ascending: false });

      if (error) {
        throw error;
      }

      res.status(200).json(data);
    } catch (error: any) {
      res.status(500).json({ error: error.message || 'Error fetching recent analyses.' });
    }
  }

  /**
   * Retrieve a detailed analysis report including joins
   */
  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const { data, error } = await supabase
        .from('analyses')
        .select(`
          *,
          skills:skills(*),
          missingSkills:missing_skills(*),
          suggestions:suggestions(*),
          industryMatches:industry_matches(*)
        `)
        .eq('id', id)
        .single();

      if (error) {
        res.status(404).json({ error: 'Resume analysis report not found.' });
        return;
      }

      // Format output categories
      const technicalSkills = data.skills?.filter((s: any) => s.category !== 'soft') || [];
      const softSkills = data.skills?.filter((s: any) => s.category === 'soft') || [];

      res.status(200).json({
        ...data,
        technicalSkills,
        softSkills
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message || 'Error fetching detailed analysis report.' });
    }
  }
}

export default AnalysisController;
