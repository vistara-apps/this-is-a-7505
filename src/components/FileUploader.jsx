import React, { useState, useRef } from 'react';
import { Upload, File, AlertCircle } from 'lucide-react';

export function FileUploader({ onFileUpload }) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const validateFastaFile = (file) => {
    // Check file extension
    const validExtensions = ['.fasta', '.fa', '.fas', '.txt'];
    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
    
    if (!validExtensions.includes(fileExtension)) {
      return 'Please upload a valid FASTA file (.fasta, .fa, .fas, or .txt)';
    }

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return 'File size must be less than 10MB';
    }

    return null;
  };

  const validateFastaContent = (content) => {
    // Basic FASTA format validation
    const lines = content.split('\n');
    let hasHeader = false;
    let hasSequence = false;

    for (const line of lines) {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith('>')) {
        hasHeader = true;
      } else if (trimmedLine && /^[ATCGRYSWKMBDHVN\-\.]+$/i.test(trimmedLine)) {
        hasSequence = true;
      }
    }

    if (!hasHeader) {
      return 'Invalid FASTA format: Missing sequence header (should start with >)';
    }
    
    if (!hasSequence) {
      return 'Invalid FASTA format: No valid DNA sequence found';
    }

    return null;
  };

  const handleFile = async (file) => {
    setError('');
    
    const validationError = validateFastaFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const content = await file.text();
      const contentError = validateFastaContent(content);
      
      if (contentError) {
        setError(contentError);
        return;
      }

      onFileUpload(file);
    } catch (err) {
      setError('Error reading file. Please try again.');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        className={`
          card p-8 border-2 border-dashed transition-all cursor-pointer
          ${isDragging 
            ? 'border-purple-400 bg-purple-400/10' 
            : 'border-gray-600 hover:border-purple-400 hover:bg-purple-400/5'
          }
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".fasta,.fa,.fas,.txt"
          onChange={handleFileSelect}
          className="hidden"
        />
        
        <div className="text-center">
          <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Upload className="w-8 h-8 text-purple-400" />
          </div>
          
          <h3 className="text-xl font-semibold mb-2">Upload Your FASTA Sequence</h3>
          <p className="text-gray-400 mb-4">
            Drag and drop your genetic data file here, or click to browse
          </p>
          
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <File className="w-4 h-4" />
            <span>Supports .fasta, .fa, .fas, .txt files (max 10MB)</span>
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-900/20 border border-red-500 rounded-lg flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      <div className="mt-6 text-center text-xs text-gray-500">
        <p>Your genetic data is processed securely and never stored on our servers.</p>
      </div>
    </div>
  );
}