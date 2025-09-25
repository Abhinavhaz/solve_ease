'use client'

import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { WorkerType } from '@/types/workers'
import { useWorkersStore } from '@/store/workersStore'
import WorkerCard from '@/components/WorkerCard'
import Pagination from '@/components/Pagination'
import Filters from '@/components/Filters'
import LoadingSkeleton from '@/components/LoadingSkeleton'
import ErrorMessage from '@/components/ErrorMessage'
import { animatePageTransition } from '@/utils/animations'

export default function WorkersPage() {
  const pageRef = useRef<HTMLElement>(null)
  const {
    workers,
    loading,
    error,
    currentPage,
    totalPages,
    totalWorkers,
    workersPerPage,
    selectedService,
    priceRange,
    searchQuery,
    setWorkers,
    setLoading,
    setError,
    setCurrentPage,
    setPagination,
    setSelectedService,
    setPriceRange,
    setSearchQuery,
    resetFilters
  } = useWorkersStore()

  const [services, setServices] = useState<string[]>([])

  // Page entrance animation
  useEffect(() => {
    if (pageRef.current) {
      animatePageTransition(pageRef.current)
    }
  }, [])

  // Fetch services for filter dropdown
  const fetchServices = useCallback(async () => {
    try {
      const response = await fetch('/api/services')
      const data = await response.json()
      if (data.success) {
        setServices(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch services:', error)
    }
  }, [])



  // Initial data fetch
  useEffect(() => {
    fetchServices()
  }, [fetchServices])

  // Fetch workers when dependencies change
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        const params = new URLSearchParams({
          page: currentPage.toString(),
          limit: workersPerPage.toString(),
          ...(selectedService !== 'all' && { service: selectedService }),
          ...(priceRange.min > 0 && { minPrice: priceRange.min.toString() }),
          ...(priceRange.max < 1000 && { maxPrice: priceRange.max.toString() }),
          ...(searchQuery && { search: searchQuery })
        })

        const response = await fetch(`/api/workers?${params}`)
        const data = await response.json()

        if (data.success) {
          setWorkers(data.data)
          setPagination(data.pagination)
        } else {
          setError(data.error || 'Failed to fetch workers')
        }
      } catch (error) {
        console.error('Failed to fetch workers:', error)
        setError('Failed to connect to server. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    const timeoutId = setTimeout(() => {
      fetchData()
    }, searchQuery || selectedService !== 'all' || priceRange.min > 0 || priceRange.max < 1000 ? 300 : 0)

    return () => clearTimeout(timeoutId)
  }, [currentPage, searchQuery, selectedService, priceRange.min, priceRange.max, workersPerPage])

  // Reset to page 1 when filters change (but not on initial load)
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1)
    }
  }, [searchQuery, selectedService, priceRange.min, priceRange.max])

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [setCurrentPage])

  const handleResetFilters = useCallback(() => {
    resetFilters()
  }, [resetFilters])

  // Memoized components for performance
  const memoizedFilters = useMemo(() => (
    <Filters
      selectedService={selectedService}
      priceRange={priceRange}
      searchQuery={searchQuery}
      onServiceChange={setSelectedService}
      onPriceRangeChange={setPriceRange}
      onSearchChange={setSearchQuery}
      onResetFilters={handleResetFilters}
      services={services}
    />
  ), [selectedService, priceRange, searchQuery, services, setSelectedService, setPriceRange, setSearchQuery, handleResetFilters])

  return (
    <main
      id="main-content"
      ref={pageRef}
      className="container mx-auto px-4 py-8 min-h-screen bg-gray-50 opacity-0"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Find Skilled Workers
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Connect with experienced professionals for all your service needs.
          From plumbers to electricians, find the right person for the job.
        </p>
      </div>

      {/* Filters */}
      {memoizedFilters}

      {/* Content */}
      {error ? (
        <ErrorMessage message={error} onRetry={() => window.location.reload()} />
      ) : loading ? (
        <LoadingSkeleton count={workersPerPage} />
      ) : workers.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-gray-500 text-lg mb-4">No workers found matching your criteria</div>
          <button
            onClick={handleResetFilters}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <>
          {/* Workers Grid */}
          <div key={`page-${currentPage}-workers-${workers.length}-${workers[0]?.id || 'empty'}`} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {workers.map((worker: WorkerType, index: number) => (
              <WorkerCard
                key={worker.id}
                worker={worker}
                priority={index < 8} // Prioritize first 8 images for loading
                animationDelay={index * 0.1} // Stagger animation
              />
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            totalItems={totalWorkers}
            itemsPerPage={workersPerPage}
          />
        </>
      )}
    </main>
  )
}
