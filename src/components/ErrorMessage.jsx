import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export function ErrorMessage({ 
  message, 
  details, 
  onRetry, 
  variant = 'default' 
}) {
  const variants = {
    default: {
      container: 'bg-red-900/20 border-red-500',
      icon: 'text-red-400',
      text: 'text-red-400',
      button: 'bg-red-500/20 hover:bg-red-500/30 text-red-300'
    },
    warning: {
      container: 'bg-yellow-900/20 border-yellow-500',
      icon: 'text-yellow-400',
      text: 'text-yellow-400',
      button: 'bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300'
    },
    info: {
      container: 'bg-blue-900/20 border-blue-500',
      icon: 'text-blue-400',
      text: 'text-blue-400',
      button: 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-300'
    }
  };
  
  const styles = variants[variant] || variants.default;

  return (
    <div 
      className={`mt-4 p-4 border rounded-lg flex items-start space-x-3 ${styles.container}`}
      role="alert"
    >
      <AlertCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${styles.icon}`} aria-hidden="true" />
      
      <div className="flex-1">
        <p className={`font-medium ${styles.text}`}>{message}</p>
        
        {details && (
          <p className={`text-sm mt-1 ${styles.text} opacity-80`}>{details}</p>
        )}
        
        {onRetry && (
          <button 
            onClick={onRetry}
            className={`mt-3 inline-flex items-center space-x-1 text-xs px-3 py-1.5 rounded-md transition-colors ${styles.button}`}
          >
            <RefreshCw className="w-3.5 h-3.5 mr-1" />
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}

