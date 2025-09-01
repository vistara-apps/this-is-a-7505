import React from 'react';

export function TraitCardSkeleton() {
  return (
    <div className="card p-5 md:p-6 animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="h-6 bg-gray-700 rounded w-1/2"></div>
        <div className="h-6 w-16 bg-gray-700 rounded-full"></div>
      </div>
      
      <div className="w-full h-2 bg-gray-700 rounded-full mb-6"></div>
      
      <div className="space-y-3">
        <div className="h-4 bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-700 rounded w-5/6"></div>
        <div className="h-4 bg-gray-700 rounded w-4/6"></div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-700 flex justify-between items-center">
        <div className="h-3 bg-gray-700 rounded w-1/3"></div>
        <div className="h-6 w-6 bg-gray-700 rounded-full"></div>
      </div>
    </div>
  );
}

