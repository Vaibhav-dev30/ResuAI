import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

interface UploadZoneProps {
  onUploadStart: (file: File) => void;
}

export const UploadZone: React.FC<UploadZoneProps> = ({ onUploadStart }) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type) && !file.name.endsWith('.pdf') && !file.name.endsWith('.docx') && !file.name.endsWith('.doc')) {
      setError('Invalid file format. Please upload a PDF or Word document (.doc, .docx).');
      return false;
    }

    if (file.size > maxSize) {
      setError('File is too large. Maximum size allowed is 10MB.');
      return false;
    }

    setError(null);
    return true;
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        onUploadStart(file);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        onUploadStart(file);
      }
    }
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={onButtonClick}
        className={`w-full min-h-[280px] p-8 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-300 relative group overflow-hidden ${
          isDragActive
            ? 'border-brand-primary bg-brand-primary/10 glow-primary scale-[1.01]'
            : 'border-white/10 hover:border-brand-primary/50 hover:bg-white/5 bg-[#111827]/30'
        }`}
      >
        {/* Decorative background lights */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-brand-primary/5 rounded-full blur-3xl group-hover:bg-brand-primary/10 transition-all duration-500"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-brand-accent/5 rounded-full blur-3xl group-hover:bg-brand-accent/10 transition-all duration-500"></div>

        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
        />

        <div className={`p-4 rounded-full border transition-all duration-300 ${
          isDragActive 
            ? 'bg-brand-primary/20 border-brand-primary text-brand-text' 
            : 'bg-white/5 border-white/10 text-gray-400 group-hover:bg-brand-primary/15 group-hover:border-brand-primary/30 group-hover:text-brand-primary'
        }`}>
          <UploadCloud className="w-8 h-8 animate-bounce" />
        </div>

        <div className="text-center space-y-1">
          <h3 className="text-base font-semibold text-brand-text">
            Drag & drop your resume
          </h3>
          <p className="text-xs text-gray-500">
            or <span className="text-brand-primary font-medium hover:underline">browse file</span> from device
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2 text-[10px] text-gray-500 font-mono pt-2">
          <span className="flex items-center gap-1"><FileText className="w-3.5 h-3.5" /> PDF, DOCX (Max 10MB)</span>
          <span className="hidden sm:inline text-gray-700">|</span>
          <span className="flex items-center gap-1 text-brand-success"><CheckCircle2 className="w-3.5 h-3.5" /> ATS Parser Optimized</span>
        </div>

        {error && (
          <div className="mt-4 flex items-center gap-2 text-xs text-red-400 bg-red-950/20 border border-red-900/30 px-4 py-2.5 rounded-lg animate-in slide-in-from-top-2 duration-200">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};
export default UploadZone;
