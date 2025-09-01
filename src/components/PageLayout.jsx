import React from 'react'
import { Header } from './Header'

export function PageLayout({ children, variant = 'default' }) {
  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />
      <main className="container mx-auto max-w-4xl px-6 py-8">
        {children}
      </main>
    </div>
  )
}
