import Link from 'next/link'

export default function ServicesPage() {
  const services = [
    {
      id: 1,
      name: 'Plumbing Services',
      description: 'Professional plumbing solutions for homes and businesses',
      icon: '🔧',
      features: ['Pipe Installation', 'Leak Repairs', 'Drain Cleaning', 'Emergency Services']
    },
    {
      id: 2,
      name: 'Electrical Services',
      description: 'Licensed electricians for all your electrical needs',
      icon: '⚡',
      features: ['Wiring Installation', 'Circuit Repairs', 'Panel Upgrades', 'Safety Inspections']
    },
    {
      id: 3,
      name: 'Carpentry Services',
      description: 'Custom woodwork and furniture solutions',
      icon: '🔨',
      features: ['Custom Furniture', 'Cabinet Installation', 'Flooring', 'Repairs & Maintenance']
    },
    {
      id: 4,
      name: 'Cleaning Services',
      description: 'Professional cleaning for homes and offices',
      icon: '🧹',
      features: ['Deep Cleaning', 'Regular Maintenance', 'Move-in/out Cleaning', 'Sanitization']
    },
    {
      id: 5,
      name: 'Painting Services',
      description: 'Interior and exterior painting by experts',
      icon: '🎨',
      features: ['Interior Painting', 'Exterior Painting', 'Color Consultation', 'Surface Preparation']
    },
    {
      id: 6,
      name: 'Gardening Services',
      description: 'Landscaping and garden maintenance',
      icon: '🌱',
      features: ['Lawn Care', 'Plant Installation', 'Garden Design', 'Seasonal Maintenance']
    }
  ]

  return (
    <main id="main-content" className="container mx-auto px-4 py-8 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          SolveEase connects you with skilled professionals across various service categories. 
          Find the right expert for your needs with our comprehensive service offerings.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="text-4xl mb-4">{service.icon}</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.name}</h3>
            <p className="text-gray-600 mb-4">{service.description}</p>
            
            <ul className="space-y-2 mb-6">
              {service.features.map((feature, index) => (
                <li key={index} className="flex items-center text-sm text-gray-700">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  {feature}
                </li>
              ))}
            </ul>
            
            <Link
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200"
            >
              Find Workers
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 rounded-xl text-white p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Need a Custom Service?</h2>
        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
          Can't find what you're looking for? Contact us and we'll help you find the right professional for your specific needs.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200"
        >
          Contact Us
        </Link>
      </div>
    </main>
  )
}
