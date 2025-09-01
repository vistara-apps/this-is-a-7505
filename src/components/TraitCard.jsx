import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export function TraitCard({ trait }) {
  const getConfidenceColor = (score) => {
    if (score >= 0.8) return 'text-green-400 bg-green-400/20';
    if (score >= 0.6) return 'text-yellow-400 bg-yellow-400/20';
    return 'text-red-400 bg-red-400/20';
  };

  const getConfidenceIcon = (score) => {
    if (score >= 0.7) return <TrendingUp className="w-4 h-4" />;
    if (score >= 0.4) return <Minus className="w-4 h-4" />;
    return <TrendingDown className="w-4 h-4" />;
  };

  const getGradient = (traitName) => {
    const gradients = [
      'from-purple-500 to-pink-500',
      'from-blue-500 to-cyan-500',
      'from-green-500 to-emerald-500',
      'from-orange-500 to-red-500',
      'from-indigo-500 to-purple-500'
    ];
    const index = traitName.length % gradients.length;
    return gradients[index];
  };

  return (
    <div className="card p-6 animate-slide-up hover:scale-105 transition-transform">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">{trait.traitName}</h3>
        <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${getConfidenceColor(trait.confidenceScore)}`}>
          {getConfidenceIcon(trait.confidenceScore)}
          <span>{Math.round(trait.confidenceScore * 100)}%</span>
        </div>
      </div>
      
      <div className={`w-full h-1 bg-gradient-to-r ${getGradient(trait.traitName)} rounded-full mb-4`}>
        <div 
          className="h-full bg-white rounded-full transition-all duration-500"
          style={{ width: `${trait.confidenceScore * 100}%` }}
        />
      </div>
      
      <p className="text-gray-300 leading-relaxed">
        {trait.prediction}
      </p>
      
      <div className="mt-4 pt-4 border-t border-gray-700">
        <p className="text-xs text-gray-500">
          Based on genetic markers analysis • Generated {trait.generatedAt || 'just now'}
        </p>
      </div>
    </div>
  );
}