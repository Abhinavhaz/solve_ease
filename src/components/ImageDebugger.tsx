'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const ImageDebugger = () => {
  const [testResults, setTestResults] = useState<{[key: string]: string}>({})
  
  const testImages = [
    'https://randomuser.me/api/portraits/men/12.jpg',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    '/placeholder-worker.svg'
  ]

  useEffect(() => {
    testImages.forEach(src => {
      const img = new window.Image()
      img.onload = () => {
        setTestResults(prev => ({ ...prev, [src]: 'loaded' }))
      }
      img.onerror = () => {
        setTestResults(prev => ({ ...prev, [src]: 'failed' }))
      }
      img.src = src
    })
  }, [])

  if (process.env.NODE_ENV === 'production') {
    return null // Don't show in production
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg p-4 shadow-lg max-w-sm z-50">
      <h3 className="font-bold text-sm mb-2">Image Debug Info</h3>
      {testImages.map(src => (
        <div key={src} className="text-xs mb-2">
          <div className="font-mono text-gray-600 truncate">{src.split('/').pop()}</div>
          <div className={`font-bold ${testResults[src] === 'loaded' ? 'text-green-600' : testResults[src] === 'failed' ? 'text-red-600' : 'text-yellow-600'}`}>
            {testResults[src] || 'testing...'}
          </div>
          {testResults[src] === 'loaded' && (
            <div className="mt-1">
              <Image src={src} alt="test" width={40} height={40} className="rounded" />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default ImageDebugger
