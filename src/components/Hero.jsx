import React from 'react'
import { Sparkles, Upload, Zap } from 'lucide-react'

export default function Hero() {
  return (
    <section className="text-center space-y-8">
      <div className="space-y-4">
        <h1 className="text-display text-gray-900">
          Discover What Your <span className="text-accent">DNA</span> Says About You
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Upload your FASTA genetic sequence and get fun, AI-powered predictions about your unique traits. 
          From baldness to belly fat tendencies - unlock your genetic secrets!
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
        <div className="card text-center space-y-3">
          <Upload className="h-8 w-8 text-primary mx-auto" />
          <h3 className="font-semibold text-gray-900">Upload FASTA</h3>
          <p className="text-sm text-gray-600">Simply upload your genetic sequence file</p>
        </div>
        
        <div className="card text-center space-y-3">
          <Zap className="h-8 w-8 text-primary mx-auto" />
          <h3 className="font-semibold text-gray-900">AI Analysis</h3>
          <p className="text-sm text-gray-600">Our AI scans for genetic markers and patterns</p>
        </div>
        
        <div className="card text-center space-y-3">
          <Sparkles className="h-8 w-8 text-primary mx-auto" />
          <h3 className="font-semibold text-gray-900">Fun Predictions</h3>
          <p className="text-sm text-gray-600">Get entertaining insights about your traits</p>
        </div>
      </div>
    </section>
  )
}