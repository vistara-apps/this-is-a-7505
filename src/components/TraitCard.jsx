import React from 'react'
import { TrendingUp, TrendingDown, Minus, Sparkles } from 'lucide-react'
import { cn } from '../utils/cn'

export default function TraitCard({ prediction, variant = 'default' }) {
  if (variant === 'loading') {
    return (
      <div className="card animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
        <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
      </div>
    )
  }

  if (variant === 'empty') {
    return (
      <div className="card text-center text-gray-500">
        <Sparkles className="h-8 w-8 mx-auto mb-2 opacity-50" />
        <p>No predictions yet</p>
      </div>
    )
  }

  const getConfidenceIcon = (score) => {
    if (score >= 0.7) return <TrendingUp className="h-4 w-4 text-green-600" />
    if (score >= 0.4) return <Minus className="h-4 w-4 text-yellow-600" />
    return <TrendingDown className="h-4 w-4 text-red-600" />
  }

  const getConfidenceColor = (score) => {
    if (score >= 0.7) return 'text-green-600'
    if (score >= 0.4) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getConfidenceText = (score) => {
    if (score >= 0.7) return 'High Confidence'
    if (score >= 0.4) return 'Moderate Confidence'
    return 'Low Confidence'
  }

  return (
    <div className="card space-y-4">
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          {prediction.traitName}
        </h3>
        <div className="flex items-center space-x-1">
          {getConfidenceIcon(prediction.confidenceScore)}
          <span className={cn(
            "text-sm font-medium",
            getConfidenceColor(prediction.confidenceScore)
          )}>
            {getConfidenceText(prediction.confidenceScore)}
          </span>
        </div>
      </div>
      
      <p className="text-gray-700 leading-relaxed">
        {prediction.prediction}
      </p>
      
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>Confidence: {Math.round(prediction.confidenceScore * 100)}%</span>
        <span>{new Date(prediction.generatedAt).toLocaleDateString()}</span>
      </div>
    </div>
  )
}