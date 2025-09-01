import React from 'react';
import { CheckCircle2, XCircle, Loader2, CreditCard } from 'lucide-react';

export function PaymentStatus({ status, error, onRetry }) {
  if (status === 'idle') return null;

  return (
    <div className="mt-6 animate-fade-in">
      {status === 'loading' && (
        <div className="card p-4 border border-yellow-500/30 bg-yellow-500/10">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <Loader2 className="w-5 h-5 text-yellow-400 animate-spin" aria-hidden="true" />
            </div>
            <div>
              <p className="text-yellow-300 font-medium">Processing Payment</p>
              <p className="text-yellow-300/70 text-sm">Please confirm the transaction in your wallet...</p>
            </div>
          </div>
        </div>
      )}

      {status === 'success' && (
        <div className="card p-4 border border-green-500/30 bg-green-500/10">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <CheckCircle2 className="w-5 h-5 text-green-400" aria-hidden="true" />
            </div>
            <div>
              <p className="text-green-300 font-medium">Payment Successful</p>
              <p className="text-green-300/70 text-sm">Your DNA analysis is now processing...</p>
            </div>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="card p-4 border border-red-500/30 bg-red-500/10">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-0.5">
              <XCircle className="w-5 h-5 text-red-400" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <p className="text-red-300 font-medium">Payment Failed</p>
              <p className="text-red-300/70 text-sm mb-3">
                {error || 'There was an issue processing your payment. Please try again.'}
              </p>
              <button 
                onClick={onRetry}
                className="inline-flex items-center space-x-1 text-xs bg-red-500/20 hover:bg-red-500/30 text-red-300 px-3 py-1.5 rounded-md transition-colors"
              >
                <CreditCard className="w-3.5 h-3.5 mr-1" />
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

