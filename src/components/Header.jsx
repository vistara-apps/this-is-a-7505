import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Dna } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-surface shadow-sm border-b border-gray-100">
      <div className="container mx-auto max-w-4xl px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Dna className="h-8 w-8 text-accent" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">GeneGlow</h1>
              <p className="text-sm text-gray-600">Unlock Your DNA's Fun Secrets</p>
            </div>
          </div>
          
          <ConnectButton />
        </div>
      </div>
    </header>
  )
}