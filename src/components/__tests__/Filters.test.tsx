import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Filters from '../Filters'

const mockOnServiceChange = jest.fn()
const mockOnPriceRangeChange = jest.fn()
const mockOnSearchChange = jest.fn()
const mockOnResetFilters = jest.fn()

const defaultProps = {
  selectedService: 'all',
  priceRange: { min: 0, max: 1000 },
  searchQuery: '',
  onServiceChange: mockOnServiceChange,
  onPriceRangeChange: mockOnPriceRangeChange,
  onSearchChange: mockOnSearchChange,
  onResetFilters: mockOnResetFilters,
  services: ['Plumber', 'Electrician', 'Carpenter']
}

describe('Filters', () => {
  beforeEach(() => {
    mockOnServiceChange.mockClear()
    mockOnPriceRangeChange.mockClear()
    mockOnSearchChange.mockClear()
    mockOnResetFilters.mockClear()
  })

  it('renders all filter elements', () => {
    render(<Filters {...defaultProps} />)
    
    expect(screen.getByLabelText('Search Workers')).toBeInTheDocument()
    expect(screen.getByLabelText('Service Type')).toBeInTheDocument()
    expect(screen.getByText('Price Range (₹/day)')).toBeInTheDocument()
  })

  it('displays search input with placeholder', () => {
    render(<Filters {...defaultProps} />)
    
    const searchInput = screen.getByPlaceholderText('Search by name or service...')
    expect(searchInput).toBeInTheDocument()
  })

  it('displays service options in dropdown', () => {
    render(<Filters {...defaultProps} />)
    
    const serviceSelect = screen.getByLabelText('Service Type')
    expect(serviceSelect).toBeInTheDocument()
    
    expect(screen.getByText('All Services')).toBeInTheDocument()
    expect(screen.getByText('Plumber')).toBeInTheDocument()
    expect(screen.getByText('Electrician')).toBeInTheDocument()
    expect(screen.getByText('Carpenter')).toBeInTheDocument()
  })

  it('calls onSearchChange when search input changes', () => {
    render(<Filters {...defaultProps} />)
    
    const searchInput = screen.getByPlaceholderText('Search by name or service...')
    fireEvent.change(searchInput, { target: { value: 'john' } })
    
    expect(mockOnSearchChange).toHaveBeenCalledWith('john')
  })

  it('calls onServiceChange when service is selected', () => {
    render(<Filters {...defaultProps} />)
    
    const serviceSelect = screen.getByLabelText('Service Type')
    fireEvent.change(serviceSelect, { target: { value: 'Plumber' } })
    
    expect(mockOnServiceChange).toHaveBeenCalledWith('Plumber')
  })

  it('displays current search query', () => {
    render(<Filters {...defaultProps} searchQuery="test query" />)
    
    const searchInput = screen.getByDisplayValue('test query')
    expect(searchInput).toBeInTheDocument()
  })

  it('displays current selected service', () => {
    render(<Filters {...defaultProps} selectedService="Plumber" />)
    
    const serviceSelect = screen.getByDisplayValue('Plumber')
    expect(serviceSelect).toBeInTheDocument()
  })

  it('displays price range inputs', () => {
    render(<Filters {...defaultProps} />)
    
    const minPriceInput = screen.getByPlaceholderText('Min')
    const maxPriceInput = screen.getByPlaceholderText('Max')
    
    expect(minPriceInput).toBeInTheDocument()
    expect(maxPriceInput).toBeInTheDocument()
  })

  it('calls onPriceRangeChange when Apply button is clicked', () => {
    render(<Filters {...defaultProps} />)
    
    const minPriceInput = screen.getByPlaceholderText('Min')
    const maxPriceInput = screen.getByPlaceholderText('Max')
    const applyButton = screen.getByText('Apply')
    
    fireEvent.change(minPriceInput, { target: { value: '100' } })
    fireEvent.change(maxPriceInput, { target: { value: '500' } })
    fireEvent.click(applyButton)
    
    expect(mockOnPriceRangeChange).toHaveBeenCalledWith({ min: 100, max: 500 })
  })

  it('shows reset button when filters are active', () => {
    render(<Filters {...defaultProps} selectedService="Plumber" />)
    
    expect(screen.getByText('Reset Filters')).toBeInTheDocument()
  })

  it('does not show reset button when no filters are active', () => {
    render(<Filters {...defaultProps} />)
    
    expect(screen.queryByText('Reset Filters')).not.toBeInTheDocument()
  })

  it('calls onResetFilters when reset button is clicked', () => {
    render(<Filters {...defaultProps} selectedService="Plumber" />)
    
    const resetButton = screen.getByText('Reset Filters')
    fireEvent.click(resetButton)
    
    expect(mockOnResetFilters).toHaveBeenCalled()
  })

  it('shows reset button when price range is modified', () => {
    render(<Filters {...defaultProps} priceRange={{ min: 100, max: 800 }} />)
    
    expect(screen.getByText('Reset Filters')).toBeInTheDocument()
  })

  it('shows reset button when search query exists', () => {
    render(<Filters {...defaultProps} searchQuery="test" />)
    
    expect(screen.getByText('Reset Filters')).toBeInTheDocument()
  })
})
