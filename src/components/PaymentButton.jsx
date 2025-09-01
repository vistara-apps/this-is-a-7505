import React, { useState } from 'react'
import { CreditCard, Loader2 } from 'lucide-react'
import { usePaymentContext } from '../hooks/usePaymentContext'

export default function PaymentButton({ 
  onPaymentSuccess, 
  isAnalyzing, 
  amount = '$0.001',
  variant = 'default' 
}) {
  const [isProcessing, setIsProcessing] = useState(false)
  const { createSession } = usePaymentContext()

  const handlePayment = async () => {
    setIsProcessing(true)
    try {
      await createSession()
      onPaymentSuccess()
    } catch (error) {
      console.error('Payment failed:', error)
      alert('Payment failed. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const isDisabled = isProcessing || isAnalyzing || variant === 'processing'

  return (
    <div className="space-y-3">
      <div className="text-center">
        <div className="text-2xl font-bold text-gray-900">{amount}</div>
        <div className="text-sm text-gray-600">One-time payment for trait prediction</div>
      </div>
      
      <button
        onClick={handlePayment}
        disabled={isDisabled}
        className="btn-accent w-full flex items-center justify-center space-x-2"
      >
        {isProcessing ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : isAnalyzing ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <CreditCard className="h-5 w-5" />
        )}
        <span>
          {isProcessing ? 'Processing Payment...' : 
           isAnalyzing ? 'Analyzing DNA...' : 
           'Pay & Get Prediction'}
        </span>
      </button>
      
      <p className="text-xs text-gray-500 text-center">
        Secure payment powered by blockchain technology
      </p>
    </div>
  )
}