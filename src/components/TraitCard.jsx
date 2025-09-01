import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Minus, Share2, Info } from 'lucide-react';

export function TraitCard({ trait }) {
  const [isHovered, setIsHovered] = useState(false);

  const getConfidenceColor = (score) => {
    if (score >= 0.8) return 'text-green-400 bg-green-400/20';
    if (score >= 0.6) return 'text-yellow-400 bg-yellow-400/20';
    return 'text-red-400 bg-red-400/20';
  };

  const getConfidenceIcon = (score) => {
    if (score >= 0.7) return <TrendingUp className="w-4 h-4" aria-hidden="true" />;
    if (score >= 0.4) return <Minus className="w-4 h-4" aria-hidden="true" />;
    return <TrendingDown className="w-4 h-4" aria-hidden="true" />;
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

  const handleShare = (e) => {
    e.stopPropagation();
    
    // Create shareable text
    const shareText = `My GeneGlow DNA analysis shows: ${trait.traitName} - ${trait.prediction}`;
    
    // Use Web Share API if available
    if (navigator.share) {
      navigator.share({
        title: 'My GeneGlow DNA Trait',
        text: shareText,
        url: window.location.href,
      }).catch(err => {
        console.error('Error sharing:', err);
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(shareText)
        .then(() => {
          alert('Trait copied to clipboard!');
        })
        .catch(err => {
          console.error('Failed to copy:', err);
        });
    }
  };

  return (
    <div 
      className="card p-5 md:p-6 animate-slide-up hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      tabIndex="0"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white group flex items-center">
            {trait.traitName}
            <div className="relative ml-2 group">
              <Info className="w-4 h-4 text-gray-400 hover:text-gray-300 cursor-help" aria-hidden="true" />
              <span className="sr-only">Information about {trait.traitName}</span>
              <div className="absolute left-0 -top-2 transform -translate-y-full w-48 p-2 bg-gray-800 rounded-md text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                This trait is based on analysis of genetic markers in your DNA sequence.
              </div>
            </div>
          </h3>
        </div>
        <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${getConfidenceColor(trait.confidenceScore)}`}>
          {getConfidenceIcon(trait.confidenceScore)}
          <span>{Math.round(trait.confidenceScore * 100)}%</span>
        </div>
      </div>
      
      <div className="relative">
        <div className={`w-full h-2 bg-gray-700 rounded-full mb-4 overflow-hidden`}>
          <div 
            className={`h-full bg-gradient-to-r ${getGradient(trait.traitName)} rounded-full transition-all duration-1000 ease-out`}
            style={{ width: `${trait.confidenceScore * 100}%` }}
          />
        </div>
      </div>
      
      <p className="text-gray-300 leading-relaxed text-sm md:text-base">
        {trait.prediction}
      </p>
      
      <div className="mt-4 pt-4 border-t border-gray-700 flex justify-between items-center">
        <p className="text-xs text-gray-500">
          Based on genetic markers • {trait.generatedAt || 'just now'}
        </p>
        
        <button 
          onClick={handleShare}
          className={`p-1.5 rounded-full transition-all ${isHovered ? 'text-purple-400 bg-purple-400/10' : 'text-gray-500'}`}
          aria-label="Share this trait"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
