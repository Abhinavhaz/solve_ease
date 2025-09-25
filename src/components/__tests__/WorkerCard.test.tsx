import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import WorkerCard from '../WorkerCard'
import { WorkerType } from '@/types/workers'

// Mock GSAP animations
jest.mock('@/utils/animations', () => ({
  animateCardEntrance: jest.fn()
}))

// Mock Next.js Image component
jest.mock('next/image', () => {
  return function MockImage({ src, alt, ...props }: any) {
    return <img src={src} alt={alt} {...props} />
  }
})

const mockWorker: WorkerType = {
  id: 1,
  name: 'John Doe',
  service: 'Plumber',
  pricePerDay: 500,
  image: 'https://example.com/image.jpg'
}

describe('WorkerCard', () => {
  it('renders worker information correctly', () => {
    render(<WorkerCard worker={mockWorker} />)
    
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Plumber')).toBeInTheDocument()
    expect(screen.getByText('₹590')).toBeInTheDocument() // 500 * 1.18
    expect(screen.getByText('per day')).toBeInTheDocument()
  })

  it('displays the correct image with alt text', () => {
    render(<WorkerCard worker={mockWorker} />)
    
    const image = screen.getByAltText('John Doe - Plumber')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg')
  })

  it('shows hire button', () => {
    render(<WorkerCard worker={mockWorker} />)
    
    expect(screen.getByText('Hire Now')).toBeInTheDocument()
  })

  it('displays availability status', () => {
    render(<WorkerCard worker={mockWorker} />)
    
    expect(screen.getByText('Available')).toBeInTheDocument()
  })

  it('shows rating stars and review count', () => {
    render(<WorkerCard worker={mockWorker} />)

    expect(screen.getByText('4.2 (24 reviews)')).toBeInTheDocument()

    // Check for star rating container
    const starRating = screen.getByRole('img', { name: /4.2 out of 5 stars/ })
    expect(starRating).toBeInTheDocument()
  })

  it('calculates price with tax correctly', () => {
    const workerWithDifferentPrice: WorkerType = {
      ...mockWorker,
      pricePerDay: 1000
    }
    
    render(<WorkerCard worker={workerWithDifferentPrice} />)
    
    // 1000 * 1.18 = 1180
    expect(screen.getByText('₹1,180')).toBeInTheDocument()
  })

  it('applies priority prop correctly', () => {
    const { rerender } = render(<WorkerCard worker={mockWorker} priority={true} />)
    
    // Test that component renders without errors with priority
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    
    rerender(<WorkerCard worker={mockWorker} priority={false} />)
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })

  it('handles animation delay prop', () => {
    render(<WorkerCard worker={mockWorker} animationDelay={0.5} />)
    
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })
})
