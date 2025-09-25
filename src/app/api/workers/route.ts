import { NextRequest, NextResponse } from 'next/server'
import workersData from '../../../../workers.json'

export async function GET(request: NextRequest) {
  try {
    // Simulate API delay for realistic loading experience
    await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 200))

    const { searchParams } = new URL(request.url)

    // Pagination parameters
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')

    // Filter parameters
    const service = searchParams.get('service')
    const minPrice = searchParams.get('minPrice') ? parseInt(searchParams.get('minPrice')!) : null
    const maxPrice = searchParams.get('maxPrice') ? parseInt(searchParams.get('maxPrice')!) : null
    const search = searchParams.get('search')

    // Filter workers
    let filteredWorkers = workersData.filter(worker =>
      worker.pricePerDay > 0 && worker.id !== null
    )

    // Apply service filter
    if (service && service !== 'all') {
      filteredWorkers = filteredWorkers.filter(worker =>
        worker.service.toLowerCase() === service.toLowerCase()
      )
    }

    // Apply price range filter
    if (minPrice !== null) {
      filteredWorkers = filteredWorkers.filter(worker => worker.pricePerDay >= minPrice)
    }
    if (maxPrice !== null) {
      filteredWorkers = filteredWorkers.filter(worker => worker.pricePerDay <= maxPrice)
    }

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase()
      filteredWorkers = filteredWorkers.filter(worker =>
        worker.name.toLowerCase().includes(searchLower) ||
        worker.service.toLowerCase().includes(searchLower)
      )
    }

    // Sort workers alphabetically by name
    filteredWorkers.sort((a, b) => a.name.localeCompare(b.name))

    // Calculate pagination
    const totalWorkers = filteredWorkers.length
    const totalPages = Math.ceil(totalWorkers / limit)
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedWorkers = filteredWorkers.slice(startIndex, endIndex)

    return NextResponse.json({
      success: true,
      data: paginatedWorkers,
      pagination: {
        currentPage: page,
        totalPages,
        totalWorkers,
        workersPerPage: limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      },
      filters: {
        service,
        minPrice,
        maxPrice,
        search
      },
      timestamp: new Date().toISOString()
    }, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=60'
      }
    })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch workers data',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

