import { create } from 'zustand'
import { WorkerType } from '@/types/workers'

interface WorkersState {
  workers: WorkerType[]
  filteredWorkers: WorkerType[]
  loading: boolean
  error: string | null
  
  // Pagination
  currentPage: number
  totalPages: number
  totalWorkers: number
  workersPerPage: number
  
  // Filters
  selectedService: string
  priceRange: { min: number; max: number }
  searchQuery: string
  
  // Actions
  setWorkers: (workers: WorkerType[]) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setCurrentPage: (page: number) => void
  setPagination: (pagination: { currentPage: number; totalPages: number; totalWorkers: number; workersPerPage: number }) => void
  setSelectedService: (service: string) => void
  setPriceRange: (range: { min: number; max: number }) => void
  setSearchQuery: (query: string) => void
  resetFilters: () => void
}

export const useWorkersStore = create<WorkersState>((set) => ({
  workers: [],
  filteredWorkers: [],
  loading: false,
  error: null,
  
  // Pagination
  currentPage: 1,
  totalPages: 1,
  totalWorkers: 0,
  workersPerPage: 12,
  
  // Filters
  selectedService: 'all',
  priceRange: { min: 0, max: 1000 },
  searchQuery: '',
  
  // Actions
  setWorkers: (workers) => set({ workers, filteredWorkers: workers }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setCurrentPage: (currentPage) => set({ currentPage }),
  setPagination: (pagination) => set({
    currentPage: pagination.currentPage,
    totalPages: pagination.totalPages,
    totalWorkers: pagination.totalWorkers,
    workersPerPage: pagination.workersPerPage
  }),
  setSelectedService: (selectedService) => set({ selectedService }),
  setPriceRange: (priceRange) => set({ priceRange }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  resetFilters: () => set({
    selectedService: 'all',
    priceRange: { min: 0, max: 1000 },
    searchQuery: '',
    currentPage: 1
  })
}))
