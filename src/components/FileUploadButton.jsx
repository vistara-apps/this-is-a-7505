import React, { useRef } from 'react'
import { Upload, Check, AlertCircle } from 'lucide-react'
import { cn } from '../utils/cn'

export default function FileUploadButton({ 
  onFileUpload, 
  variant = 'default' 
}) {
  const fileInputRef = useRef(null)

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      // Validate FASTA format
      if (!file.name.toLowerCase().includes('.fasta') && 
          !file.name.toLowerCase().includes('.fa') &&
          !file.name.toLowerCase().includes('.fas')) {
        alert('Please upload a FASTA file (.fasta, .fa, or .fas)')
        return
      }
      
      onFileUpload(file)
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const getIcon = () => {
    switch (variant) {
      case 'success':
        return <Check className="h-5 w-5" />
      case 'error':
        return <AlertCircle className="h-5 w-5" />
      default:
        return <Upload className="h-5 w-5" />
    }
  }

  const getText = () => {
    switch (variant) {
      case 'success':
        return 'File Uploaded Successfully'
      case 'error':
        return 'Upload Failed - Try Again'
      case 'loading':
        return 'Uploading...'
      default:
        return 'Upload FASTA File'
    }
  }

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept=".fasta,.fa,.fas"
        onChange={handleFileChange}
        className="hidden"
      />
      
      <button
        onClick={handleClick}
        disabled={variant === 'loading'}
        className={cn(
          "w-full flex items-center justify-center space-x-2 py-4 px-6 border-2 border-dashed rounded-lg transition-all duration-base ease-custom",
          variant === 'default' && "border-gray-300 text-gray-600 hover:border-primary hover:text-primary hover:bg-blue-50",
          variant === 'success' && "border-green-300 text-green-600 bg-green-50",
          variant === 'error' && "border-red-300 text-red-600 bg-red-50",
          variant === 'loading' && "border-gray-300 text-gray-400 cursor-not-allowed"
        )}
      >
        {getIcon()}
        <span className="font-medium">{getText()}</span>
      </button>
      
      <p className="text-xs text-gray-500 mt-2 text-center">
        Supports .fasta, .fa, and .fas files
      </p>
    </div>
  )
}