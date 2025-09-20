'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Navigation from './components/Navigation'
import Footer from './components/Footer'

export default function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [impactCounter, setImpactCounter] = useState({
    donations: 0,
    beneficiaries: 0,
    events: 0,
    volunteers: 1
  })

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Beneficiary, Education Program",
      content: "Raavana Thalaigal Trust helped me complete my engineering degree. Today, I work at a top IT company and support other students through the same program.",
      image: "/api/placeholder/80/80",
      rating: 5
    },
    {
      name: "Dr. Rajesh Kumar",
      role: "Partner, Apollo Hospitals",
      content: "Their health camps in rural areas have made a significant impact. We're proud to partner with such a dedicated organization.",
      image: "/api/placeholder/80/80",
      rating: 5
    },
    {
      name: "Meera Lakshmi",
      role: "Women Empowerment Graduate",
      content: "The skill development program changed my life. I now run my own tailoring business and employ 5 other women from my village.",
      image: "/api/placeholder/80/80",
      rating: 5
    },
    {
      name: "Karthik Krishnan",
      role: "Volunteer since 2024",
      content: "Being part of Raavana Thalaigal Trust is incredibly fulfilling. Every weekend, we make a real difference in people's lives.",
      image: "/api/placeholder/80/80",
      rating: 5
    }
  ]

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  // Animate impact counters
  useEffect(() => {
    const targets = {
      donations: 750000,
      beneficiaries: 15000,
      events: 250,
      volunteers: 500
    }

    const duration = 2000 // 2 seconds
    const steps = 60
    const stepDuration = duration / steps

    let step = 0
    const interval = setInterval(() => {
      step++
      const progress = Math.min(step / steps, 1)
      
      setImpactCounter({
        donations: Math.floor(targets.donations * progress),
        beneficiaries: Math.floor(targets.beneficiaries * progress),
        events: Math.floor(targets.events * progress),
        volunteers: Math.floor(targets.volunteers * progress)
      })

      if (progress >= 1) {
        clearInterval(interval)
      }
    }, stepDuration)

    return () => clearInterval(interval)
  }, [])

  const formatNumber = (num) => {
    if (num >= 100000) {
      return `${(num / 100000).toFixed(1)}L`
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`
    }
    return num.toString()
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main>
        {/* Hero Section with Video Background Effect */}
        <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
            <div className="absolute top-0 right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
          </div>

          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Hero Content */}
              <div className="text-center lg:text-left">
                <div className="inline-block bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  🌟 Reg. No. 31/2025 - Trusted NGO
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  Empowering <span className="text-yellow-400">Communities</span> Across Tamil Nadu
                </h1>
                <p className="text-lg sm:text-xl mb-8 opacity-90 leading-relaxed max-w-2xl">
                  Join us in creating lasting change through education, healthcare, women empowerment, and emergency relief. Together, we can build a better tomorrow.
                </p>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start mb-8">
                  <Link 
                    href="/donations" 
                    className="group bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-lg text-lg font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-center"
                  >
                    💝 Donate Now
                    <span className="ml-2 group-hover:translate-x-1 inline-block transition-transform">→</span>
                  </Link>
                  <Link 
                    href="/volunteer" 
                    className="group border-2 border-white hover:bg-white hover:text-blue-700 px-8 py-4 rounded-lg text-lg font-bold transition-all duration-300 text-center"
                  >
                    🤝 Become a Volunteer
                    <span className="ml-2 group-hover:translate-x-1 inline-block transition-transform">→</span>
                  </Link>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm opacity-80">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    80G Tax Exemption
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    100% Transparency
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    Direct Impact
                  </div>
                </div>
              </div>

              {/* Hero Image/Video Placeholder */}
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src="/api/placeholder/600/400" 
                    alt="Community Impact"
                    className="w-full h-auto transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="bg-white/90 hover:bg-white text-blue-600 rounded-full p-4 transform hover:scale-110 transition-all duration-300 shadow-lg">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Floating Stats */}
                <div className="absolute -bottom-6 left-6 right-6">
                  <div className="bg-white rounded-xl shadow-xl p-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-blue-600">{formatNumber(impactCounter.beneficiaries)}+</div>
                        <div className="text-sm text-gray-600">Lives Impacted</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-600">₹{formatNumber(impactCounter.donations)}+</div>
                        <div className="text-sm text-gray-600">Funds Raised</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <svg className="w-6 h-6 text-white opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
            </svg>
          </div>
        </section>

        {/* Impact Statistics */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Impact in Numbers</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">Every number represents lives touched, dreams fulfilled, and communities transformed</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              <div className="bg-white rounded-2xl p-6 sm:p-8 text-center shadow-lg hover:shadow-xl transition-shadow group">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">₹{formatNumber(impactCounter.donations)}+</div>
                <div className="text-gray-600">Total Donations</div>
              </div>

              <div className="bg-white rounded-2xl p-6 sm:p-8 text-center shadow-lg hover:shadow-xl transition-shadow group">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                  </svg>
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-green-600 mb-2">{formatNumber(impactCounter.beneficiaries)}+</div>
                <div className="text-gray-600">Lives Impacted</div>
              </div>

              <div className="bg-white rounded-2xl p-6 sm:p-8 text-center shadow-lg hover:shadow-xl transition-shadow group">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m-3 8a3 3 0 100-6 3 3 0 000 6z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-orange-600 mb-2">{impactCounter.events}+</div>
                <div className="text-gray-600">Events Completed</div>
              </div>

              <div className="bg-white rounded-2xl p-6 sm:p-8 text-center shadow-lg hover:shadow-xl transition-shadow group">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                  </svg>
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-purple-600 mb-2">{impactCounter.volunteers}+</div>
                <div className="text-gray-600">Active Volunteers</div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Programs */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Programs</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">Comprehensive initiatives designed to address the most pressing needs of Tamil Nadu communities</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Education Program */}
              <div className="group bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4 text-blue-800">Education Support</h3>
                <p className="text-gray-700 mb-6">Scholarships, learning centers, and educational materials for underprivileged students across Tamil Nadu.</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-blue-600">5,000+ Students Supported</span>
                  <span className="text-2xl font-bold text-blue-800">95%</span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{width: '95%'}}></div>
                </div>
                <Link href="/services" className="inline-flex items-center mt-4 text-blue-600 font-semibold hover:text-blue-700">
                  Learn More
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </Link>
              </div>

              {/* Healthcare Program */}
              <div className="group bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4 text-green-800">Healthcare Services</h3>
                <p className="text-gray-700 mb-6">Free medical camps, health screenings, and medicine distribution in rural and underserved areas.</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-green-600">8,000+ People Treated</span>
                  <span className="text-2xl font-bold text-green-800">88%</span>
                </div>
                <div className="w-full bg-green-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{width: '88%'}}></div>
                </div>
                <Link href="/services" className="inline-flex items-center mt-4 text-green-600 font-semibold hover:text-green-700">
                  Learn More
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </Link>
              </div>

              {/* Women Empowerment */}
              <div className="group bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4 text-pink-800">Women Empowerment</h3>
                <p className="text-gray-700 mb-6">Skill development, financial literacy, and entrepreneurship programs for women's economic independence.</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-pink-600">2,000+ Women Empowered</span>
                  <span className="text-2xl font-bold text-pink-800">92%</span>
                </div>
                <div className="w-full bg-pink-200 rounded-full h-2">
                  <div className="bg-pink-600 h-2 rounded-full" style={{width: '92%'}}></div>
                </div>
                <Link href="/services" className="inline-flex items-center mt-4 text-pink-600 font-semibold hover:text-pink-700">
                  Learn More
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories Carousel */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Stories of Hope</h2>
              <p className="text-lg opacity-90 max-w-2xl mx-auto">Real stories from the lives we've touched and the communities we've transformed</p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 sm:p-12">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <img 
                    src={testimonials[currentTestimonial].image} 
                    alt={testimonials[currentTestimonial].name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-white/20"
                  />
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex justify-center md:justify-start mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      ))}
                    </div>
                    <blockquote className="text-xl sm:text-2xl font-medium mb-6 italic">
                      "{testimonials[currentTestimonial].content}"
                    </blockquote>
                    <div>
                      <div className="font-bold text-lg">{testimonials[currentTestimonial].name}</div>
                      <div className="opacity-75">{testimonials[currentTestimonial].role}</div>
                    </div>
                  </div>
                </div>

                {/* Testimonial Dots */}
                <div className="flex justify-center mt-8 space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentTestimonial ? 'bg-white' : 'bg-white/40'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Events Preview */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-12">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">Recent Impact</h2>
                <p className="text-lg text-gray-600">Latest events and activities making a difference</p>
              </div>
              <Link 
                href="/events" 
                className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center"
              >
                View All Events
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <img src="/api/placeholder/400/250" alt="Food Distribution" className="w-full h-48 object-cover"/>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Completed</span>
                    <span className="text-gray-500 text-sm">Sep 15, 2025</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Emergency Food Relief</h3>
                  <p className="text-gray-600 mb-4">Distributed food packets to 500+ flood-affected families in Madurai district.</p>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-600 font-semibold">₹2,50,000 Impact</span>
                    <span className="text-green-600 font-semibold">500+ Families</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <img src="/api/placeholder/400/250" alt="Health Camp" className="w-full h-48 object-cover"/>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Completed</span>
                    <span className="text-gray-500 text-sm">Sep 10, 2025</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Free Health Camp</h3>
                  <p className="text-gray-600 mb-4">Comprehensive health screening and treatment for rural communities.</p>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-600 font-semibold">₹1,50,000 Impact</span>
                    <span className="text-green-600 font-semibold">300+ Patients</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <img src="/api/placeholder/400/250" alt="Education Support" className="w-full h-48 object-cover"/>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">Ongoing</span>
                    <span className="text-gray-500 text-sm">Sep 1, 2025</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Scholarship Distribution</h3>
                  <p className="text-gray-600 mb-4">Annual scholarship ceremony for 50 meritorious students.</p>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-600 font-semibold">₹5,00,000 Impact</span>
                    <span className="text-green-600 font-semibold">50+ Students</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter and CTA */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-green-600 to-green-700 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">Join Our Mission Today</h2>
              <p className="text-xl mb-8 opacity-90">
                Every contribution, big or small, creates ripples of positive change across Tamil Nadu. Together, we can build a brighter future for all.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="text-3xl mb-3">💝</div>
                  <h3 className="font-bold mb-2">Donate</h3>
                  <p className="text-sm opacity-80">Support our programs with financial contributions</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="text-3xl mb-3">🤝</div>
                  <h3 className="font-bold mb-2">Volunteer</h3>
                  <p className="text-sm opacity-80">Dedicate your time and skills to our cause</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="text-3xl mb-3">📢</div>
                  <h3 className="font-bold mb-2">Spread</h3>
                  <p className="text-sm opacity-80">Share our mission with your network</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link 
                  href="/donations" 
                  className="bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-lg text-lg font-bold transition-all transform hover:scale-105 text-center"
                >
                  🎯 Make an Impact Now
                </Link>
                <Link 
                  href="/contact" 
                  className="border-2 border-white hover:bg-white hover:text-green-700 px-8 py-4 rounded-lg text-lg font-bold transition-all text-center"
                >
                  💬 Get in Touch
                </Link>
              </div>

              {/* Newsletter Signup */}
              <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8">
                <h3 className="text-xl font-bold mb-4">Stay Updated with Our Impact</h3>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-300"
                  />
                  <button className="bg-green-800 hover:bg-green-900 px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap">
                    Subscribe
                  </button>
                </div>
                <p className="text-xs opacity-70 mt-3">Get monthly updates on our programs and impact stories</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
