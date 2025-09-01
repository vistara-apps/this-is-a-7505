import React from 'react'
import TraitCard from './TraitCard'

export default function TraitResults({ predictions }) {
  if (!predictions || predictions.length === 0) {
    return null
  }

  return (
    <section className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Your Genetic Traits</h2>
        <p className="text-gray-600">Here's what your DNA reveals about you!</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {predictions.map((prediction, index) => (
          <TraitCard
            key={index}
            prediction={prediction}
            variant="default"
          />
        ))}
      </div>
      
      <div className="card text-center space-y-4 bg-gradient-to-r from-accent/10 to-primary/10">
        <h3 className="text-lg font-semibold text-gray-900">Want More Predictions?</h3>
        <p className="text-gray-600">
          Upload another sequence or get bulk predictions at discounted rates.
        </p>
        <button className="btn-primary">
          Get More Predictions
        </button>
      </div>
    </section>
  )
}