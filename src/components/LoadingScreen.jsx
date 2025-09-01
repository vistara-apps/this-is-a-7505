import React from 'react';
import { Dna } from 'lucide-react';

export function LoadingScreen() {
  const steps = [
    'Validating FASTA sequence...',
    'Scanning for SNP patterns...',
    'Analyzing genetic markers...',
    'Generating AI predictions...'
  ];

  return (
    <div className="card p-8 text-center">
      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
        <Dna className="w-8 h-8 text-white animate-spin" />
      </div>
      
      <h3 className="text-xl font-semibold mb-6">Analyzing Your DNA</h3>
      
      <div className="space-y-4 max-w-md mx-auto">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            </div>
            <span className="text-gray-300">{step}</span>
          </div>
        ))}
      </div>
      
      <p className="text-gray-400 text-sm mt-8">
        This may take a few moments as we decode your genetic secrets...
      </p>
    </div>
  );
}