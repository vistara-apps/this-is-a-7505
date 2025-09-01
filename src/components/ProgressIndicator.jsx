import React from 'react';

export function ProgressIndicator({ 
  currentStep, 
  totalSteps, 
  labels = [],
  variant = 'default'
}) {
  const variants = {
    default: {
      active: 'bg-purple-500',
      inactive: 'bg-gray-700',
      text: 'text-purple-400'
    },
    success: {
      active: 'bg-green-500',
      inactive: 'bg-gray-700',
      text: 'text-green-400'
    },
    warning: {
      active: 'bg-yellow-500',
      inactive: 'bg-gray-700',
      text: 'text-yellow-400'
    }
  };
  
  const styles = variants[variant] || variants.default;
  const progress = Math.min(Math.max((currentStep / totalSteps) * 100, 0), 100);
  
  return (
    <div className="w-full">
      <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
        <div 
          className={`absolute left-0 top-0 h-full ${styles.active} transition-all duration-500 ease-out`}
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
        />
      </div>
      
      {labels.length > 0 && (
        <div className="flex justify-between mt-2">
          {labels.map((label, index) => {
            const isActive = index < currentStep;
            const isCurrent = index === currentStep - 1;
            
            return (
              <div 
                key={index} 
                className={`text-xs ${isActive || isCurrent ? styles.text : 'text-gray-500'} transition-colors duration-300`}
              >
                {label}
              </div>
            );
          })}
        </div>
      )}
      
      {!labels.length && (
        <div className="text-center mt-2">
          <span className={`text-xs ${styles.text}`}>
            Step {currentStep} of {totalSteps}
          </span>
        </div>
      )}
    </div>
  );
}

