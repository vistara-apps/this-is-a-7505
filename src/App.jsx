import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FileUploader } from './components/FileUploader';
import { TraitCard } from './components/TraitCard';
import { TraitCardSkeleton } from './components/TraitCardSkeleton';
import { LoadingScreen } from './components/LoadingScreen';
import { PaymentStatus } from './components/PaymentStatus';
import { ErrorMessage } from './components/ErrorMessage';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ProgressIndicator } from './components/ProgressIndicator';
import { useFastaAnalysis } from './hooks/useFastaAnalysis';
import { usePaymentContext } from './hooks/usePaymentContext';
import { ArrowLeft, RefreshCw } from 'lucide-react';

function App() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [paid, setPaid] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'
  const [paymentError, setPaymentError] = useState('');
  const [analysisStep, setAnalysisStep] = useState(0);
  
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
    setPaymentStatus('idle');
    setPaymentError('');
    setAnalysisStep(1); // Step 1: File uploaded
  };

  const handlePayment = async () => {
    try {
      setPaymentStatus('loading');
      setPaymentError('');
      
      await createSession();
      
      setPaymentStatus('success');
      setPaid(true);
      setAnalysisStep(2); // Step 2: Payment completed
      
      if (uploadedFile) {
        setTimeout(async () => {
          await analyzeFasta(uploadedFile);
          setShowResults(true);
          setAnalysisStep(3); // Step 3: Analysis completed
        }, 1000);
      }
    } catch (error) {
      console.error('Payment failed:', error);
      setPaymentStatus('error');
      setPaymentError(error.message || 'Payment failed. Please try again.');
    }
  };

  const handleGetPrediction = async () => {
    if (!uploadedFile) return;
    
    if (!paid) {
      await handlePayment();
    } else {
      setAnalysisStep(2);
      await analyzeFasta(uploadedFile);
      setShowResults(true);
      setAnalysisStep(3);
    }
  };

  const handleReset = () => {
    setUploadedFile(null);
    setShowResults(false);
    setPaid(false);
    setPaymentStatus('idle');
    setPaymentError('');
    setAnalysisStep(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-bg via-gray-900 to-purple-900">
      <ErrorBoundary>
        <Header />
        
        <main className="container py-6 md:py-8">
          {!uploadedFile ? (
            <>
              <Hero />
              <div className="mt-8 md:mt-12">
                <FileUploader onFileUpload={handleFileUpload} />
              </div>
            </>
          ) : (
            <div className="space-y-6 md:space-y-8">
              <div className="flex items-center justify-between mb-2">
                <button 
                  onClick={handleReset}
                  className="inline-flex items-center text-sm text-gray-400 hover:text-gray-300 transition-colors"
                  aria-label="Go back to upload screen"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">Back</span>
                </button>
                
                <div className="w-3/4 sm:w-2/3 md:w-1/2 mx-auto">
                  <ProgressIndicator 
                    currentStep={analysisStep} 
                    totalSteps={3}
                    labels={['Upload', 'Payment', 'Analysis']}
                  />
                </div>
                
                <div className="w-4 h-4"></div> {/* Spacer for alignment */}
              </div>
              
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-3 md:mb-4">
                  Ready to Analyze Your DNA
                </h2>
                <p className="text-gray-400 mb-4 md:mb-6">
                  File uploaded: <span className="text-gray-300 font-medium">{uploadedFile.name}</span>
                </p>
                
                {!showResults && !isAnalyzing && (
                  <button
                    onClick={handleGetPrediction}
                    disabled={isAnalyzing || paymentStatus === 'loading'}
                    className="btn-primary relative overflow-hidden group"
                    aria-label="Get DNA trait prediction for $0.50"
                  >
                    <span className="relative z-10">
                      {isAnalyzing ? 'Analyzing...' : 'Get Prediction - $0.50'}
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </button>
                )}
              </div>

              <PaymentStatus 
                status={paymentStatus} 
                error={paymentError}
                onRetry={handlePayment}
              />

              {isAnalyzing && <LoadingScreen />}
              
              {isAnalyzing && !showResults && (
                <div className="grid gap-4 md:gap-6 md:grid-cols-2 mt-8">
                  {[...Array(4)].map((_, index) => (
                    <TraitCardSkeleton key={index} />
                  ))}
                </div>
              )}
              
              {showResults && traitPredictions.length > 0 && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="text-xl md:text-2xl font-bold text-center mb-6 md:mb-8">
                    Your DNA Trait Predictions
                  </h3>
                  <div className="grid gap-4 md:gap-6 md:grid-cols-2">
                    {traitPredictions.map((trait, index) => (
                      <TraitCard key={index} trait={trait} />
                    ))}
                  </div>
                  
                  <div className="text-center pt-6 md:pt-8">
                    <button
                      onClick={handleReset}
                      className="btn-secondary inline-flex items-center"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Analyze Another Sequence
                    </button>
                  </div>
                </div>
              )}

              {analysisError && (
                <ErrorMessage 
                  message="Analysis Failed" 
                  details={analysisError}
                  onRetry={() => handleGetPrediction()}
                />
              )}
            </div>
          )}
        </main>
      </ErrorBoundary>
    </div>
  );
}

export default App;
