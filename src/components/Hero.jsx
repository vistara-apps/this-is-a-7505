import React from 'react';
import { Sparkles, Zap, Shield } from 'lucide-react';

export function Hero() {
  return (
    <div className="text-center py-12">
      <div className="inline-flex items-center px-4 py-2 bg-purple-500/20 rounded-full border border-purple-500/30 mb-8">
        <Sparkles className="w-4 h-4 text-purple-400 mr-2" />
        <span className="text-sm text-purple-300">AI-Powered DNA Analysis</span>
      </div>
      
      <h1 className="text-5xl font-bold mb-6">
        Unlock Your DNA's{' '}
        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Fun Secrets
        </span>
      </h1>
      
      <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
        Upload your FASTA genetic sequence and discover entertaining insights about your traits. 
        From baldness predisposition to belly fat tendencies - let AI decode your DNA story.
      </p>
      
      <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <div className="card p-6 text-center">
          <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Zap className="w-6 h-6 text-purple-400" />
          </div>
          <h3 className="font-semibold mb-2">Easy Upload</h3>
          <p className="text-gray-400 text-sm">
            Simply drag and drop your FASTA file for instant analysis
          </p>
        </div>
        
        <div className="card p-6 text-center">
          <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-6 h-6 text-pink-400" />
          </div>
          <h3 className="font-semibold mb-2">AI Predictions</h3>
          <p className="text-gray-400 text-sm">
            Advanced AI interprets your genetic markers for fun insights
          </p>
        </div>
        
        <div className="card p-6 text-center">
          <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Shield className="w-6 h-6 text-green-400" />
          </div>
          <h3 className="font-semibold mb-2">Secure</h3>
          <p className="text-gray-400 text-sm">
            Your genetic data is processed securely and never stored
          </p>
        </div>
      </div>
    </div>
  );
}