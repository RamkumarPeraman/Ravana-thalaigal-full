'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

export default function VolunteerDashboard() {
  const [user, setUser] = useState(null)
  const [stats, setStats] = useState({
    eventsVolunteered: 5,
    hoursContributed: 24,
    peopleHelped: 150,
    upcomingEvents: 2
  })
  const [assignments, setAssignments] = useState([])
  const [opportunities, setOpportunities] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const sampleAssignments = [
    { 
      id: 1, 
      title: 'Health Camp - Madurai', 
      role: 'Registration Helper',
      date: '2025-01-25', 
      time: '9:00 AM - 4:00 PM',
      status: 'Confirmed'
    },
    { 
      id: 2, 
      title: 'Education Drive - Chennai', 
      role: 'Teaching Assistant',
      date: '2025-02-10', 
      time: '10:00 AM - 2:00 PM',
      status: 'Pending'
    }
  ]

  const sampleOpportunities = [
    { 
      id: 1, 
      title: 'Food Distribution Drive', 
      location: 'Coimbatore',
      date: '2025-02-15',
      volunteers_needed: 10,
      volunteers_registered: 6
    },
    { 
      id: 2, 
      title: 'Tree Plantation Event', 
      location: 'Salem',
      date: '2025-03-01',
      volunteers_needed: 20,
      volunteers_registered: 12
    }
  ]

  useEffect(() => {
    const userSession = localStorage.getItem('userSession')
    if (userSession) {
      const parsedUser = JSON.parse(userSession)
      setUser(parsedUser.user)
      
      if (parsedUser.user.userType !== 'VOLUNTEER') {
        router.push('/members')
        return
      }
      
      setTimeout(() => {
        setAssignments(sampleAssignments)
        setOpportunities(sampleOpportunities)
        setIsLoading(false)
      }, 1000)
    } else {
      router.push('/login')
    }
  }, [router])

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg shadow-lg p-6 sm:p-8 mb-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                  Welcome, {user.firstName}! 🌟
                </h1>
                <p className="text-green-100 text-lg">
                  Thank you for volunteering your time to make a difference
                </p>
                <p className="text-green-200 text-sm mt-2">
                  Volunteer since {new Date(user.membershipDate).getFullYear()}
                </p>
              </div>
              <div className="hidden sm:block">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-2xl font-bold">
                  {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                </div>
              </div>
            </div>
          </div>

          {/* Volunteer Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m-3 8a3 3 0 100-6 3 3 0 000 6z"/>
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Events Volunteered</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.eventsVolunteered}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Hours Contributed</p>
                  <p className="text-2xl font-bold text-orange-600">{stats.hoursContributed}h</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">People Helped</p>
                  <p className="text-2xl font-bold text-green-600">{stats.peopleHelped}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Upcoming Events</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.upcomingEvents}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* My Assignments */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">My Volunteer Assignments</h2>
                <Link 
                  href="/my-activities" 
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View All →
                </Link>
              </div>

              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="animate-pulse p-4 border rounded-lg">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {assignments.map((assignment) => (
                    <div key={assignment.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{assignment.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          assignment.status === 'Confirmed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {assignment.status}
                        </span>
                      </div>
                      <p className="text-sm text-blue-600 font-medium mb-2">{assignment.role}</p>
                      <p className="text-sm text-gray-600 mb-1">
                        📅 {new Date(assignment.date).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-600">
                        ⏰ {assignment.time}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Available Opportunities */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Available Opportunities</h2>
                <Link 
                  href="/events" 
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View All →
                </Link>
              </div>

              <div className="space-y-4">
                {opportunities.map((opportunity) => (
                  <div key={opportunity.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    <h3 className="font-semibold text-gray-900 mb-2">{opportunity.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">📍 {opportunity.location}</p>
                    <p className="text-sm text-gray-600 mb-3">
                      📅 {new Date(opportunity.date).toLocaleDateString()}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <span className="text-green-600 font-semibold">
                          {opportunity.volunteers_registered}
                        </span>
                        <span className="text-gray-600">
                          /{opportunity.volunteers_needed} volunteers
                        </span>
                      </div>
                      <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-sm rounded-lg transition-colors">
                        Apply
                      </button>
                    </div>
                    {/* Progress bar */}
                    <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ 
                          width: `${(opportunity.volunteers_registered / opportunity.volunteers_needed) * 100}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recognition Section */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-6 mt-8">
            <h2 className="text-xl font-bold mb-4">Your Impact & Recognition</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-yellow-700">Gold Volunteer</h3>
                <p className="text-sm text-gray-600">20+ hours contributed</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-green-700">Community Hero</h3>
                <p className="text-sm text-gray-600">Helped 100+ people</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100-4m0 4v2m0-6V4"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-blue-700">Reliable Volunteer</h3>
                <p className="text-sm text-gray-600">5+ events completed</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
