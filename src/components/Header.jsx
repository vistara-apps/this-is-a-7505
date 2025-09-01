import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Dna } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-gray-800 bg-dark-surface/80 backdrop-blur-md">
      <div className="container flex items-center justify-between py-3 md:py-4">
        <div className="flex items-center space-x-2 md:space-x-3">
          <div className="p-1.5 md:p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
            <Dna className="w-5 h-5 md:w-6 md:h-6 text-white" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              GeneGlow
            </h1>
            <p className="text-xs text-gray-400 hidden sm:block">DNA Traits Predictor</p>
          </div>
        </div>
        
        <div className="scale-90 md:scale-100 origin-right">
          <ConnectButton />
        </div>
      </div>
    </header>
  );
}
