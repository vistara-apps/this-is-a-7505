import React, { useState } from 'react'
import PageLayout from './components/PageLayout'
import Hero from './components/Hero'
import FileUploadSection from './components/FileUploadSection'
import TraitResults from './components/TraitResults'
import { useSequenceAnalysis } from './hooks/useSequenceAnalysis'

function App() {
  const [uploadedFile, setUploadedFile] = useState(null)
  const [predictions, setPredictions] = useState([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const { analyzeSequence } = useSequenceAnalysis()

  const handleFileUpload = (file) => {
    setUploadedFile(file)
    setPredictions([])
  }

  const handlePaymentSuccess = async () => {
    if (!uploadedFile) return
    
    setIsAnalyzing(true)
    try {
      const results = await analyzeSequence(uploadedFile)
      setPredictions(results)
    } catch (error) {
      console.error('Analysis failed:', error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <PageLayout>
      <div className="space-y-12">
        <Hero />
        
        <FileUploadSection 
          onFileUpload={handleFileUpload}
          uploadedFile={uploadedFile}
          onPaymentSuccess={handlePaymentSuccess}
          isAnalyzing={isAnalyzing}
        />
        
        {predictions.length > 0 && (
          <TraitResults predictions={predictions} />
        )}
      </div>
    </PageLayout>
  )
}

export default App