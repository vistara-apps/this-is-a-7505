import React, { useState, useRef } from 'react';
import { Upload, File, AlertCircle, CheckCircle2 } from 'lucide-react';

export function FileUploader({ onFileUpload }) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [fileName, setFileName] = useState('');
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
    setIsValidating(true);
    setFileName(file.name);
    
    const validationError = validateFastaFile(file);
    if (validationError) {
      setError(validationError);
      setIsValidating(false);
      return;
    }

    try {
      const content = await file.text();
      const contentError = validateFastaContent(content);
      
      if (contentError) {
        setError(contentError);
        setIsValidating(false);
        return;
      }

      // Short delay to show validation success state
      setTimeout(() => {
        setIsValidating(false);
        onFileUpload(file);
      }, 800);
    } catch (err) {
      setError('Error reading file. Please try again.');
      setIsValidating(false);
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

  const handleKeyDown = (e) => {
    // Handle keyboard accessibility
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        className={`
          card p-6 md:p-8 border-2 border-dashed transition-all cursor-pointer
          ${isDragging 
            ? 'border-purple-400 bg-purple-400/10' 
            : isValidating 
              ? 'border-yellow-400 bg-yellow-400/5'
              : 'border-gray-600 hover:border-purple-400 hover:bg-purple-400/5'
          }
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        onKeyDown={handleKeyDown}
        tabIndex="0"
        role="button"
        aria-label="Upload FASTA file"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".fasta,.fa,.fas,.txt"
          onChange={handleFileSelect}
          className="hidden"
          aria-hidden="true"
        />
        
        <div className="text-center">
          {isValidating ? (
            <div className="animate-pulse">
              <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
              
              <h3 className="text-lg md:text-xl font-semibold mb-2">Validating File...</h3>
              <p className="text-gray-400 mb-4">
                {fileName && `Checking "${fileName.length > 20 ? fileName.substring(0, 20) + '...' : fileName}"`}
              </p>
            </div>
          ) : (
            <>
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-purple-400" aria-hidden="true" />
              </div>
              
              <h3 className="text-lg md:text-xl font-semibold mb-2">Upload Your FASTA Sequence</h3>
              <p className="text-gray-400 mb-4">
                Drag and drop your genetic data file here, or click to browse
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-gray-500">
                <File className="w-4 h-4" aria-hidden="true" />
                <span>Supports .fasta, .fa, .fas, .txt files (max 10MB)</span>
              </div>
            </>
          )}
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-900/20 border border-red-500 rounded-lg flex items-start space-x-3" role="alert">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      <div className="mt-6 text-center text-xs text-gray-500">
        <p className="flex items-center justify-center gap-1">
          <CheckCircle2 className="w-3 h-3 text-green-400" aria-hidden="true" />
          <span>Your genetic data is processed securely and never stored on our servers.</span>
        </p>
      </div>
    </div>
  );
}
