import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Dna } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b border-gray-800 bg-dark-surface/50 backdrop-blur-sm">
      <div className="container flex items-center justify-between py-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
            <Dna className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              GeneGlow
            </h1>
            <p className="text-xs text-gray-400">DNA Traits Predictor</p>
          </div>
        </div>
        
        <ConnectButton />
      </div>
    </header>
  );
}