// API client for communicating with ResuAI Backend

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export interface RecentAnalysisRow {
  id: string;
  file_name: string;
  candidate_name: string;
  target_role: string;
  uploaded_at: string;
  ats_score: number;
}

export const api = {
  /**
   * Fetch list of all parsed analyses
   */
  async getAnalyses(): Promise<RecentAnalysisRow[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/analyses`);
      if (!response.ok) {
        throw new Error('Failed to retrieve recent analyses.');
      }
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  /**
   * Fetch detailed analysis report by ID
   */
  async getAnalysisById(id: string): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/analyses/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch detailed resume analysis.');
      }
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  /**
   * Upload and analyze a resume file
   */
  async uploadAndAnalyze(file: File): Promise<any> {
    try {
      const formData = new FormData();
      formData.append('resume', file);

      const response = await fetch(`${API_BASE_URL}/analyze`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to analyze resume document.');
      }

      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
};

export default api;
