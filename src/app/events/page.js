'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

export default function EventsPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  // Sample carousel images (replace with actual event images)
  const carouselEvents = [
    {
      id: 1,
      image: "/api/placeholder/800/400",
      title: "Recent Food Distribution Drive",
      date: "September 15, 2025",
      location: "Madurai District"
    },
    {
      id: 2,
      image: "/api/placeholder/800/400",
      title: "Women's Empowerment Workshop",
      date: "August 20, 2025",
      location: "Salem District"
    },
    {
      id: 3,
      image: "/api/placeholder/800/400",
      title: "Tree Plantation Campaign",
      date: "July 10, 2025",
      location: "Various Locations"
    },
    {
      id: 4,
      image: "/api/placeholder/800/400",
      title: "Educational Scholarship Distribution",
      date: "June 5, 2025",
      location: "Coimbatore"
    }
  ]

  // Sample gallery events with detailed information
  const galleryEvents = [
    {
      id: 1,
      image: "/api/placeholder/300/200",
      title: "Food Distribution Drive",
      date: "September 15, 2025",
      location: "Madurai District, Tamil Nadu",
      beneficiaries: "500+ families",
      description: "Successfully distributed food packets and essential supplies to flood-affected families in Madurai district. Our volunteers worked tirelessly for 3 days to ensure no family went hungry during this difficult time.",
      details: [
        "3 days continuous operation",
        "50 volunteers participated",
        "Distributed rice, dal, oil, and vegetables",
        "Covered 15 villages in the district",
        "Coordinated with local government officials"
      ],
      gallery: ["/api/placeholder/400/300", "/api/placeholder/400/300", "/api/placeholder/400/300"]
    },
    {
      id: 2,
      image: "/api/placeholder/300/200",
      title: "Women's Empowerment Session",
      date: "August 20, 2025",
      location: "Salem District, Tamil Nadu",
      beneficiaries: "100+ women",
      description: "Conducted comprehensive financial literacy and entrepreneurship training program for rural women. The session covered basic banking, microfinance, and small business development strategies.",
      details: [
        "Financial literacy workshop",
        "Entrepreneurship guidance",
        "Microfinance information session",
        "One-on-one mentoring",
        "Follow-up support provided"
      ],
      gallery: ["/api/placeholder/400/300", "/api/placeholder/400/300", "/api/placeholder/400/300"]
    },
    {
      id: 3,
      image: "/api/placeholder/300/200",
      title: "Tree Plantation Drive",
      date: "July 10, 2025",
      location: "Multiple locations across Tamil Nadu",
      beneficiaries: "Environmental impact for entire community",
      description: "Community-wide tree plantation initiative involving local schools, colleges, and volunteer groups. Focused on native species to improve local ecosystem and combat climate change.",
      details: [
        "1000+ trees planted",
        "Native species prioritized",
        "Student participation from 20 schools",
        "Environmental awareness sessions",
        "Ongoing tree maintenance program"
      ],
      gallery: ["/api/placeholder/400/300", "/api/placeholder/400/300", "/api/placeholder/400/300"]
    },
    {
      id: 4,
      image: "/api/placeholder/300/200",
      title: "Educational Scholarship Award",
      date: "June 5, 2025",
      location: "Coimbatore, Tamil Nadu",
      beneficiaries: "50 students",
      description: "Annual scholarship distribution ceremony for meritorious students from economically weaker sections. Scholarships covered tuition fees, books, and other educational expenses.",
      details: [
        "50 scholarships awarded",
        "₹10,000 per scholarship",
        "Merit-based selection",
        "Covers full academic year",
        "Mentorship program included"
      ],
      gallery: ["/api/placeholder/400/300", "/api/placeholder/400/300", "/api/placeholder/400/300"]
    },
    {
      id: 5,
      image: "/api/placeholder/300/200",
      title: "Free Health Camp",
      date: "May 15, 2025",
      location: "Tirunelveli Rural Areas",
      beneficiaries: "300+ patients",
      description: "Comprehensive health screening camp providing free medical checkups, basic treatments, and health awareness sessions for rural communities with limited access to healthcare.",
      details: [
        "General health checkups",
        "Blood pressure and diabetes screening",
        "Eye and dental examinations",
        "Free medicines provided",
        "Health awareness sessions"
      ],
      gallery: ["/api/placeholder/400/300", "/api/placeholder/400/300", "/api/placeholder/400/300"]
    },
    {
      id: 6,
      image: "/api/placeholder/300/200",
      title: "Skill Development Workshop",
      date: "April 12, 2025",
      location: "Chennai Community Center",
      beneficiaries: "75 participants",
      description: "Three-day intensive workshop on computer skills, digital literacy, and online job opportunities for unemployed youth and women looking to enter the workforce.",
      details: [
        "Computer basics training",
        "Digital literacy program",
        "Online job search techniques",
        "Resume building workshop",
        "Job placement assistance"
      ],
      gallery: ["/api/placeholder/400/300", "/api/placeholder/400/300", "/api/placeholder/400/300"]
    }
  ]

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselEvents.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [carouselEvents.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselEvents.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselEvents.length) % carouselEvents.length)
  }

  const openPopup = (event) => {
    setSelectedEvent(event)
    setIsPopupOpen(true)
    document.body.style.overflow = 'hidden' // Prevent background scrolling
  }

  const closePopup = () => {
    setIsPopupOpen(false)
    setSelectedEvent(null)
    document.body.style.overflow = 'unset' // Restore scrolling
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main>
        {/* Hero Carousel Section */}
        <section className="relative h-64 sm:h-80 lg:h-96 bg-gray-900 overflow-hidden">
          <div className="relative h-full">
            {carouselEvents.map((event, index) => (
              <div
                key={event.id}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4">
                      {event.title}
                    </h1>
                    <p className="text-sm sm:text-base lg:text-lg opacity-90 mb-2">
                      {event.date} • {event.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Carousel Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-30 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all"
            >
              <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-30 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all"
            >
              <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
              </svg>
            </button>

            {/* Carousel Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
              {carouselEvents.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
                    index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          {/* Page Header */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">Events & Announcements</h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              Stay updated with our latest events, community programs, and important announcements
            </p>
          </div>

          {/* Upcoming Events */}
          <section className="mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-6 sm:mb-8 lg:mb-10">Upcoming Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
              {/* Event 1 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-40 sm:h-48 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-3xl sm:text-4xl font-bold">25</div>
                    <div className="text-base sm:text-lg">Oct 2025</div>
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Upcoming</span>
                    <span className="text-xs sm:text-sm text-gray-500">10:00 AM</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">Education Materials Distribution</h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4">
                    Distributing books, notebooks, and stationery to 200+ students in rural schools.
                  </p>
                  <div className="text-xs sm:text-sm text-gray-500 mb-4 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    Thanjavur District, Tamil Nadu
                  </div>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 sm:py-3 rounded-lg transition-colors text-sm sm:text-base font-semibold">
                    Register for Event
                  </button>
                </div>
              </div>

              {/* Event 2 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-40 sm:h-48 bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-3xl sm:text-4xl font-bold">02</div>
                    <div className="text-base sm:text-lg">Nov 2025</div>
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Upcoming</span>
                    <span className="text-xs sm:text-sm text-gray-500">9:00 AM</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">Free Health Camp</h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4">
                    Free medical checkups, blood pressure screening, and medicine distribution.
                  </p>
                  <div className="text-xs sm:text-sm text-gray-500 mb-4 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    Trichy Rural Areas, Tamil Nadu
                  </div>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 sm:py-3 rounded-lg transition-colors text-sm sm:text-base font-semibold">
                    Register for Event
                  </button>
                </div>
              </div>

              {/* Event 3 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow md:col-span-2 xl:col-span-1">
                <div className="h-40 sm:h-48 bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-3xl sm:text-4xl font-bold">15</div>
                    <div className="text-base sm:text-lg">Nov 2025</div>
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Upcoming</span>
                    <span className="text-xs sm:text-sm text-gray-500">6:00 PM</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">Skill Development Workshop</h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4">
                    Computer literacy and job skills training for youth and women.
                  </p>
                  <div className="text-xs sm:text-sm text-gray-500 mb-4 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    Chennai Community Center
                  </div>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 sm:py-3 rounded-lg transition-colors text-sm sm:text-base font-semibold">
                    Register for Event
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Gallery Section - Completed Events */}
          <section className="mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-6 sm:mb-8 lg:mb-10 text-center">Event Gallery</h2>
            <p className="text-base sm:text-lg text-gray-600 text-center mb-8 sm:mb-12 max-w-2xl mx-auto">
              Explore our completed events and see the impact we've made in communities across Tamil Nadu
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {galleryEvents.map((event) => (
                <div
                  key={event.id}
                  className="group cursor-pointer bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  onClick={() => openPopup(event)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-40 sm:h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <svg className="w-8 h-8 sm:w-12 sm:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                        </svg>
                      </div>
                    </div>
                    <div className="absolute top-2 left-2">
                      <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">Completed</span>
                    </div>
                  </div>
                  <div className="p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                      {event.title}
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm text-gray-500 mb-3">
                      <span>{event.date}</span>
                      <span className="mt-1 sm:mt-0">{event.beneficiaries}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-2">
                      {event.description}
                    </p>
                    <div className="flex items-center text-xs sm:text-sm text-gray-500">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
                      {event.location}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Newsletter CTA */}
          <div className="bg-blue-600 text-white rounded-lg p-6 sm:p-8 lg:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Stay Updated with Our Events</h2>
            <p className="text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto opacity-90">
              Subscribe to our newsletter to get notified about upcoming events and see the latest updates from our completed programs
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 sm:py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <button className="bg-orange-500 hover:bg-orange-600 px-6 py-2 sm:py-3 rounded-lg font-semibold transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Popup Modal */}
      {isPopupOpen && selectedEvent && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            <div 
              className="fixed inset-0 transition-opacity bg-black bg-opacity-75"
              onClick={closePopup}
            ></div>
            
            <div className="relative inline-block w-full max-w-4xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              {/* Close button */}
              <button
                onClick={closePopup}
                className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-full"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                {/* Event Image */}
                <div>
                  <img
                    src={selectedEvent.image}
                    alt={selectedEvent.title}
                    className="w-full h-48 sm:h-64 lg:h-80 object-cover rounded-lg"
                  />
                  
                  {/* Event Gallery */}
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Event Gallery</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {selectedEvent.gallery.map((img, index) => (
                        <img
                          key={index}
                          src={img}
                          alt={`${selectedEvent.title} ${index + 1}`}
                          className="w-full h-16 sm:h-20 object-cover rounded cursor-pointer hover:opacity-75 transition-opacity"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Event Details */}
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                      {selectedEvent.title}
                    </h2>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m-3 8a3 3 0 100-6 3 3 0 000 6z"/>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        {selectedEvent.date}
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                        {selectedEvent.location}
                      </div>
                    </div>
                    <div className="inline-block bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full mb-4">
                      {selectedEvent.beneficiaries}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">About This Event</h3>
                    <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                      {selectedEvent.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Event Highlights</h3>
                    <ul className="space-y-2">
                      {selectedEvent.details.map((detail, index) => (
                        <li key={index} className="flex items-start text-sm sm:text-base">
                          <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                          </svg>
                          <span className="text-gray-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                      Share This Event
                    </button>
                    <button 
                      onClick={closePopup}
                      className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
