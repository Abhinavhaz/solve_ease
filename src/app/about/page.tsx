import Link from 'next/link'

export default function AboutPage() {
  const stats = [
    { label: 'Skilled Workers', value: '500+' },
    { label: 'Services Completed', value: '10,000+' },
    { label: 'Happy Customers', value: '5,000+' },
    { label: 'Cities Covered', value: '50+' }
  ]

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: '👩‍💼',
      description: 'Passionate about connecting skilled workers with those who need their services.'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: '👨‍💻',
      description: 'Leading our technology initiatives to create the best user experience.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Operations',
      image: '👩‍🔧',
      description: 'Ensuring quality service delivery and worker satisfaction.'
    }
  ]

  return (
    <main id="main-content" className="container mx-auto px-4 py-8 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">About SolveEase</h1>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          SolveEase is your trusted platform for connecting with skilled professionals across various service categories. 
          We believe that finding reliable, quality service providers should be simple, transparent, and stress-free.
        </p>
      </div>

      {/* Mission Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              To revolutionize how people find and hire skilled workers by creating a platform that prioritizes 
              quality, reliability, and transparency. We're building a community where both service providers 
              and customers can thrive.
            </p>
            <p className="text-gray-600">
              Every worker on our platform is carefully vetted to ensure they meet our high standards for 
              skill, professionalism, and customer service.
            </p>
          </div>
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-blue-900 mb-4">Why Choose SolveEase?</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-blue-800">Verified and skilled professionals</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-blue-800">Transparent pricing and reviews</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-blue-800">24/7 customer support</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-blue-800">Secure payment processing</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
            <div className="text-gray-600 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Team Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
              <div className="text-6xl mb-4">{member.image}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
              <p className="text-blue-600 font-medium mb-3">{member.role}</p>
              <p className="text-gray-600 text-sm">{member.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-900 rounded-xl text-white p-8 mb-12">
        <h2 className="text-3xl font-bold text-center mb-8">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-3">Quality First</h3>
            <p className="text-gray-300">We never compromise on the quality of service providers on our platform.</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="text-xl font-semibold mb-3">Trust & Transparency</h3>
            <p className="text-gray-300">Building lasting relationships through honest communication and fair practices.</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold mb-3">Innovation</h3>
            <p className="text-gray-300">Continuously improving our platform to serve you better.</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 rounded-xl text-white p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
          Join thousands of satisfied customers who have found their perfect service provider through SolveEase.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200"
          >
            Find Workers
          </Link>
          <Link
            href="/contact"
            className="inline-block border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors duration-200"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  )
}
