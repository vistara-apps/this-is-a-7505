import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FileUploader } from './components/FileUploader';
import { TraitCard } from './components/TraitCard';
import { LoadingScreen } from './components/LoadingScreen';
import { useFastaAnalysis } from './hooks/useFastaAnalysis';
import { usePaymentContext } from './hooks/usePaymentContext';

function App() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [paid, setPaid] = useState(false);
  const [showResults, setShowResults] = useState(false);
  
  const { 
    isAnalyzing, 
    traitPredictions, 
    error: analysisError, 
    analyzeFasta 
  } = useFastaAnalysis();
  
  const { createSession } = usePaymentContext();

  const handleFileUpload = (file) => {
    setUploadedFile(file);
    setShowResults(false);
    setPaid(false);
  };

  const handlePayment = async () => {
    try {
      await createSession();
      setPaid(true);
      if (uploadedFile) {
        await analyzeFasta(uploadedFile);
        setShowResults(true);
      }
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  const handleGetPrediction = async () => {
    if (!uploadedFile) return;
    
    if (!paid) {
      await handlePayment();
    } else {
      await analyzeFasta(uploadedFile);
      setShowResults(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-bg via-gray-900 to-purple-900">
      <Header />
      
      <main className="container py-8">
        {!uploadedFile ? (
          <>
            <Hero />
            <div className="mt-12">
              <FileUploader onFileUpload={handleFileUpload} />
            </div>
          </>
        ) : (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                Ready to Analyze Your DNA
              </h2>
              <p className="text-gray-400 mb-6">
                File uploaded: {uploadedFile.name}
              </p>
              
              {!showResults && (
                <button
                  onClick={handleGetPrediction}
                  disabled={isAnalyzing}
                  className="btn-primary"
                >
                  {isAnalyzing ? 'Analyzing...' : 'Get Prediction - $0.50'}
                </button>
              )}
            </div>

            {isAnalyzing && <LoadingScreen />}
            
            {showResults && traitPredictions.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-center mb-8">
                  Your DNA Trait Predictions
                </h3>
                <div className="grid gap-6 md:grid-cols-2">
                  {traitPredictions.map((trait, index) => (
                    <TraitCard key={index} trait={trait} />
                  ))}
                </div>
                
                <div className="text-center pt-8">
                  <button
                    onClick={() => {
                      setUploadedFile(null);
                      setShowResults(false);
                      setPaid(false);
                    }}
                    className="btn-secondary"
                  >
                    Analyze Another Sequence
                  </button>
                </div>
              </div>
            )}

            {analysisError && (
              <div className="card p-6 border-red-500 bg-red-900/20">
                <p className="text-red-400">{analysisError}</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;