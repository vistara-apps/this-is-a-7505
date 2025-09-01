import React from 'react'
import FileUploadButton from './FileUploadButton'
import PaymentButton from './PaymentButton'
import { CheckCircle } from 'lucide-react'

export default function FileUploadSection({ 
  onFileUpload, 
  uploadedFile, 
  onPaymentSuccess, 
  isAnalyzing 
}) {
  return (
    <section className="card max-w-2xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Get Your First Prediction</h2>
        <p className="text-gray-600">Upload your FASTA file and discover your genetic traits</p>
      </div>
      
      <div className="space-y-4">
        <FileUploadButton 
          onFileUpload={onFileUpload}
          variant={uploadedFile ? 'success' : 'default'}
        />
        
        {uploadedFile && (
          <div className="flex items-center space-x-2 text-sm text-green-600">
            <CheckCircle className="h-4 w-4" />
            <span>File uploaded: {uploadedFile.name}</span>
          </div>
        )}
        
        {uploadedFile && (
          <div className="border-t pt-4">
            <div className="bg-gray-50 rounded-md p-4 mb-4">
              <h3 className="font-medium text-gray-900 mb-2">Prediction Details</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Analysis of genetic markers (SNPs)</li>
                <li>• AI-powered trait predictions</li>
                <li>• Fun insights about your genetics</li>
                <li>• Instant results after payment</li>
              </ul>
            </div>
            
            <PaymentButton 
              onPaymentSuccess={onPaymentSuccess}
              isAnalyzing={isAnalyzing}
              amount="$0.001"
            />
          </div>
        )}
      </div>
    </section>
  )
}