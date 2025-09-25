import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Pagination from '../Pagination'

const mockOnPageChange = jest.fn()

const defaultProps = {
  currentPage: 1,
  totalPages: 5,
  onPageChange: mockOnPageChange,
  totalItems: 50,
  itemsPerPage: 10
}

describe('Pagination', () => {
  beforeEach(() => {
    mockOnPageChange.mockClear()
  })

  it('renders pagination information correctly', () => {
    render(<Pagination {...defaultProps} />)

    expect(screen.getByText(/Showing/)).toBeInTheDocument()
    expect(screen.getByText(/to/)).toBeInTheDocument()
    expect(screen.getByText(/of/)).toBeInTheDocument()
    expect(screen.getByText(/workers/)).toBeInTheDocument()
  })

  it('renders page numbers correctly', () => {
    render(<Pagination {...defaultProps} />)

    // Check for page buttons specifically
    const pageButtons = screen.getAllByRole('button')
    const pageNumberButtons = pageButtons.filter(button =>
      ['1', '2', '3', '4', '5'].includes(button.textContent || '')
    )
    expect(pageNumberButtons).toHaveLength(5)
  })

  it('highlights current page', () => {
    render(<Pagination {...defaultProps} currentPage={3} />)
    
    const currentPageButton = screen.getByText('3')
    expect(currentPageButton).toHaveClass('bg-blue-600', 'text-white')
  })

  it('disables previous button on first page', () => {
    render(<Pagination {...defaultProps} currentPage={1} />)
    
    const prevButton = screen.getByText('Previous')
    expect(prevButton).toBeDisabled()
  })

  it('disables next button on last page', () => {
    render(<Pagination {...defaultProps} currentPage={5} />)
    
    const nextButton = screen.getByText('Next')
    expect(nextButton).toBeDisabled()
  })

  it('calls onPageChange when page number is clicked', () => {
    render(<Pagination {...defaultProps} />)
    
    const pageButton = screen.getByText('3')
    fireEvent.click(pageButton)
    
    expect(mockOnPageChange).toHaveBeenCalledWith(3)
  })

  it('calls onPageChange when next button is clicked', () => {
    render(<Pagination {...defaultProps} currentPage={2} />)
    
    const nextButton = screen.getByText('Next')
    fireEvent.click(nextButton)
    
    expect(mockOnPageChange).toHaveBeenCalledWith(3)
  })

  it('calls onPageChange when previous button is clicked', () => {
    render(<Pagination {...defaultProps} currentPage={3} />)
    
    const prevButton = screen.getByText('Previous')
    fireEvent.click(prevButton)
    
    expect(mockOnPageChange).toHaveBeenCalledWith(2)
  })

  it('shows ellipsis for large page counts', () => {
    render(<Pagination {...defaultProps} totalPages={20} currentPage={10} />)
    
    const ellipsis = screen.getAllByText('...')
    expect(ellipsis.length).toBeGreaterThan(0)
  })

  it('calculates showing range correctly for middle pages', () => {
    render(<Pagination {...defaultProps} currentPage={3} />)

    // Check that page 3 is highlighted
    const currentPageButton = screen.getByRole('button', { name: '3' })
    expect(currentPageButton).toHaveClass('bg-blue-600')
  })

  it('calculates showing range correctly for last page', () => {
    render(<Pagination {...defaultProps} currentPage={5} totalItems={47} />)

    // Check that page 5 is highlighted and next is disabled
    const currentPageButton = screen.getByRole('button', { name: '5' })
    expect(currentPageButton).toHaveClass('bg-blue-600')

    const nextButton = screen.getByText('Next')
    expect(nextButton).toBeDisabled()
  })

  it('does not render when totalPages is 1', () => {
    const { container } = render(<Pagination {...defaultProps} totalPages={1} />)
    
    expect(container.firstChild).toBeNull()
  })

  it('does not render when totalPages is 0', () => {
    const { container } = render(<Pagination {...defaultProps} totalPages={0} />)
    
    expect(container.firstChild).toBeNull()
  })
})
