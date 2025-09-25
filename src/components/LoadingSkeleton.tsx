'use client'

import { memo } from 'react'

interface LoadingSkeletonProps {
  count?: number
}

const LoadingSkeleton = memo(({ count = 12 }: LoadingSkeletonProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm animate-pulse"
        >
          {/* Image skeleton */}
          <div className="w-full h-48 bg-gray-300"></div>
          
          {/* Content skeleton */}
          <div className="p-6">
            {/* Name and status */}
            <div className="flex items-start justify-between mb-2">
              <div className="h-6 bg-gray-300 rounded w-3/4"></div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <div className="h-3 bg-gray-300 rounded w-16"></div>
              </div>
            </div>
            
            {/* Service */}
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
            
            {/* Price and button */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex flex-col space-y-1">
                <div className="h-8 bg-gray-300 rounded w-20"></div>
                <div className="h-3 bg-gray-300 rounded w-12"></div>
              </div>
              <div className="h-8 bg-gray-300 rounded w-20"></div>
            </div>
            
            {/* Rating */}
            <div className="pt-3 border-t border-gray-100">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-4 h-4 bg-gray-300 rounded"></div>
                  ))}
                </div>
                <div className="h-3 bg-gray-300 rounded w-20"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
})

LoadingSkeleton.displayName = 'LoadingSkeleton'

export default LoadingSkeleton
