'use client'

import { memo, useRef, useEffect } from 'react'
import { WorkerType } from '@/types/workers'
import FallbackImage from './FallbackImage'
import { animateCardEntrance } from '@/utils/animations'

interface WorkerCardProps {
  worker: WorkerType
  priority?: boolean
  animationDelay?: number
}

const WorkerCard = memo(({ worker, priority = false, animationDelay = 0 }: WorkerCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const finalPrice = Math.round(worker.pricePerDay * 1.18)

  useEffect(() => {
    if (cardRef.current) {
      animateCardEntrance(cardRef.current, animationDelay)
    }
  }, [animationDelay])

  return (
    <article
      ref={cardRef}
      className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group opacity-0 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2"
      role="article"
      aria-labelledby={`worker-name-${worker.id}`}
      aria-describedby={`worker-details-${worker.id}`}
    >
      <FallbackImage
        src={worker.image}
        alt={`${worker.name} - ${worker.service}`}
        priority={priority}
        className="w-full h-48 group-hover:scale-105 transition-transform duration-300"
        fallbackSrc="/placeholder-worker.svg"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      <div className="p-6" id={`worker-details-${worker.id}`}>
        <div className="flex items-start justify-between mb-2">
          <h2
            id={`worker-name-${worker.id}`}
            className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200"
          >
            {worker.name}
          </h2>
          <div className="flex items-center space-x-1" role="status" aria-label="Worker availability">
            <div className="w-2 h-2 bg-green-500 rounded-full" aria-hidden="true"></div>
            <span className="text-xs text-green-600 font-medium">Available</span>
          </div>
        </div>
        
        <p className="text-blue-600 font-medium mb-4 text-sm uppercase tracking-wide">
          {worker.service}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <p className="text-2xl font-bold text-green-600" aria-label={`Price: ${finalPrice} rupees per day`}>
              ₹{finalPrice.toLocaleString()}
            </p>
            <span className="text-sm text-gray-500">per day</span>
          </div>

          <button
            className="bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-sm"
            aria-label={`Hire ${worker.name} for ${worker.service} services`}
          >
            Hire Now
          </button>
        </div>
        
        {/* Rating */}
        <div className="flex items-center mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-1" role="img" aria-label="4.2 out of 5 stars">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2" aria-label="24 reviews">4.2 (24 reviews)</span>
        </div>
      </div>
    </article>
  )
})

WorkerCard.displayName = 'WorkerCard'

export default WorkerCard
