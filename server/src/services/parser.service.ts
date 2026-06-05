import pdf from 'pdf-parse';
import mammoth from 'mammoth';

export class ParserService {
  /**
   * Parse PDF file from buffer
   */
  static async parsePDF(buffer: Buffer): Promise<string> {
    try {
      const parsedData = await pdf(buffer);
      return parsedData.text || '';
    } catch (error) {
      console.error('Error parsing PDF file:', error);
      throw new Error('Failed to extract text from PDF document.');
    }
  }

  /**
   * Parse DOCX file from buffer
   */
  static async parseDOCX(buffer: Buffer): Promise<string> {
    try {
      const parsedData = await mammoth.extractRawText({ buffer });
      return parsedData.value || '';
    } catch (error) {
      console.error('Error parsing DOCX file:', error);
      throw new Error('Failed to extract text from Word document.');
    }
  }

  /**
   * General parse selector based on file extension / mime type
   */
  static async parseFile(buffer: Buffer, originalname: string): Promise<string> {
    const ext = originalname.split('.').pop()?.toLowerCase();
    
    if (ext === 'pdf') {
      return this.parsePDF(buffer);
    } else if (ext === 'docx' || ext === 'doc') {
      return this.parseDOCX(buffer);
    } else {
      throw new Error('Unsupported file format. Please upload a PDF or DOCX file.');
    }
  }
}

export default ParserService;
