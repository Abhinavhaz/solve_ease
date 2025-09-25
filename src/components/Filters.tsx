'use client'

import { memo, useState, useEffect } from 'react'

interface FiltersProps {
  selectedService: string
  priceRange: { min: number; max: number }
  searchQuery: string
  onServiceChange: (service: string) => void
  onPriceRangeChange: (range: { min: number; max: number }) => void
  onSearchChange: (query: string) => void
  onResetFilters: () => void
  services: string[]
}

const Filters = memo(({
  selectedService,
  priceRange,
  searchQuery,
  onServiceChange,
  onPriceRangeChange,
  onSearchChange,
  onResetFilters,
  services
}: FiltersProps) => {
  const [localMinPrice, setLocalMinPrice] = useState(priceRange.min.toString())
  const [localMaxPrice, setLocalMaxPrice] = useState(priceRange.max.toString())

  useEffect(() => {
    setLocalMinPrice(priceRange.min.toString())
    setLocalMaxPrice(priceRange.max.toString())
  }, [priceRange])

  const handlePriceChange = () => {
    const min = parseInt(localMinPrice) || 0
    const max = parseInt(localMaxPrice) || 1000
    onPriceRangeChange({ min, max })
  }

  const hasActiveFilters = selectedService !== 'all' || priceRange.min > 0 || priceRange.max < 1000 || searchQuery.length > 0

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Search */}
        <div className="flex-1">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
            Search Workers
          </label>
          <div className="relative">
            <input
              id="search"
              type="text"
              placeholder="Search by name or service..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Service Filter */}
        <div className="lg:w-64">
          <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
            Service Type
          </label>
          <select
            id="service"
            value={selectedService}
            onChange={(e) => onServiceChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
          >
            <option value="all">All Services</option>
            {services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div className="lg:w-80">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price Range (₹/day)
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              placeholder="Min"
              value={localMinPrice}
              onChange={(e) => setLocalMinPrice(e.target.value)}
              onBlur={handlePriceChange}
              className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            />
            <span className="text-gray-500">to</span>
            <input
              type="number"
              placeholder="Max"
              value={localMaxPrice}
              onChange={(e) => setLocalMaxPrice(e.target.value)}
              onBlur={handlePriceChange}
              className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            />
            <button
              onClick={handlePriceChange}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
            >
              Apply
            </button>
          </div>
        </div>

        {/* Reset Filters */}
        {hasActiveFilters && (
          <div className="flex items-end">
            <button
              onClick={onResetFilters}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm font-medium"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
})

Filters.displayName = 'Filters'

export default Filters
