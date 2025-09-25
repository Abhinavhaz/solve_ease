import { useState, useEffect, useCallback, useRef } from 'react'

interface ApiState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

interface UseApiOptions {
  cacheTime?: number // Cache duration in milliseconds
  enabled?: boolean // Whether to auto-fetch
}

// Simple in-memory cache
const cache = new Map<string, { data: unknown; timestamp: number }>()

export function useApi<T>(
  url: string,
  options: UseApiOptions = {}
): ApiState<T> & { refetch: () => Promise<void> } {
  const { cacheTime = 5 * 60 * 1000, enabled = true } = options // 5 minutes default cache
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null
  })
  
  const abortControllerRef = useRef<AbortController | null>(null)

  const fetchData = useCallback(async () => {
    // Check cache first
    const cached = cache.get(url)
    if (cached && Date.now() - cached.timestamp < cacheTime) {
      setState({
        data: cached.data as T,
        loading: false,
        error: null
      })
      return
    }

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    abortControllerRef.current = new AbortController()
    
    setState(prev => ({ ...prev, loading: true, error: null }))

    try {
      const response = await fetch(url, {
        signal: abortControllerRef.current.signal
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const result = await response.json()
      
      if (result.success) {
        // Cache the result
        cache.set(url, {
          data: result,
          timestamp: Date.now()
        })
        
        setState({
          data: result as T,
          loading: false,
          error: null
        })
      } else {
        setState({
          data: null,
          loading: false,
          error: result.error || 'API request failed'
        })
      }
    } catch (error: unknown) {
      if ((error as Error).name !== 'AbortError') {
        setState({
          data: null,
          loading: false,
          error: (error as Error).message || 'Network error'
        })
      }
    }
  }, [url, cacheTime])

  useEffect(() => {
    if (enabled) {
      fetchData()
    }

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [fetchData, enabled])

  return {
    ...state,
    refetch: fetchData
  }
}
