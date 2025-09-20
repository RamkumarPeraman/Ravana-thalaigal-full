'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

export default function MyActivitiesPage() {
  const [user, setUser] = useState(null)
  const [activities, setActivities] = useState([])
  const [filteredActivities, setFilteredActivities] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedMonth, setSelectedMonth] = useState('')
  const router = useRouter()

  // Sample activities data
  const sampleActivities = [
    {
      id: 1,
      type: 'donation',
      title: 'Donation to Education Program',
      description: 'Contributed ₹5,000 to support underprivileged students',
      amount: 5000,
      date: '2025-01-15T10:30:00',
      status: 'completed',
      category: 'Education',
      icon: '💝',
      color: 'green'
    },
    {
      id: 2,
      type: 'event',
      title: 'Health Camp Registration',
      description: 'Registered for health camp in Madurai district',
      date: '2025-01-10T14:20:00',
      status: 'registered',
      location: 'Madurai',
      icon: '📅',
      color: 'blue'
    },
    {
      id: 3,
      type: 'volunteer',
      title: 'Volunteer Training Completed',
      description: 'Successfully completed volunteer orientation program',
      date: '2024-12-20T09:00:00',
      status: 'completed',
      duration: '3 hours',
      icon: '🌟',
      color: 'purple'
    },
    {
      id: 4,
      type: 'donation',
      title: 'Healthcare Support Donation',
      description: 'Monthly donation for medical camps',
      amount: 2000,
      date: '2024-12-10T16:45:00',
      status: 'completed',
      category: 'Healthcare',
      icon: '💝',
      color: 'green'
    },
    {
      id: 5,
      type: 'event',
      title: 'Food Distribution Drive',
      description: 'Participated in emergency food relief program',
      date: '2024-11-25T08:00:00',
      status: 'participated',
      location: 'Chennai',
      impact: '150 families helped',
      icon: '🍽️',
      color: 'orange'
    },
    {
      id: 6,
      type: 'achievement',
      title: 'Gold Volunteer Badge Earned',
      description: 'Recognized for outstanding volunteer service',
      date: '2024-11-15T12:00:00',
      status: 'achieved',
      icon: '🏆',
      color: 'yellow'
    },
    {
      id: 7,
      type: 'donation',
      title: 'Emergency Relief Fund',
      description: 'Contributed to flood relief operations',
      amount: 1500,
      date: '2024-10-30T11:15:00',
      status: 'completed',
      category: 'Emergency Relief',
      icon: '💝',
      color: 'green'
    },
    {
      id: 8,
      type: 'event',
      title: 'Tree Plantation Event',
      description: 'Environmental conservation activity',
      date: '2024-10-15T07:30:00',
      status: 'participated',
      location: 'Salem',
      impact: '100 trees planted',
      icon: '🌳',
      color: 'green'
    }
  ]

  const activityTypes = [
    { key: 'all', label: 'All Activities', icon: '📋' },
    { key: 'donation', label: 'Donations', icon: '💝' },
    { key: 'event', label: 'Events', icon: '📅' },
    { key: 'volunteer', label: 'Volunteering', icon: '🌟' },
    { key: 'achievement', label: 'Achievements', icon: '🏆' }
  ]

  useEffect(() => {
    const userSession = localStorage.getItem('userSession')
    if (userSession) {
      const parsedUser = JSON.parse(userSession)
      setUser(parsedUser.user)
      
      // Simulate API call
      setTimeout(() => {
        setActivities(sampleActivities)
        setFilteredActivities(sampleActivities)
        setIsLoading(false)
      }, 1000)
    } else {
      router.push('/login')
    }
  }, [router])

  useEffect(() => {
    let filtered = activities

    // Filter by type
    if (activeFilter !== 'all') {
      filtered = filtered.filter(activity => activity.type === activeFilter)
    }

    // Filter by month
    if (selectedMonth) {
      filtered = filtered.filter(activity => {
        const activityMonth = new Date(activity.date).toISOString().substring(0, 7)
        return activityMonth === selectedMonth
      })
    }

    setFilteredActivities(filtered)
  }, [activities, activeFilter, selectedMonth])

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusBadge = (status, type) => {
    const statusConfig = {
      completed: { bg: 'bg-green-100', text: 'text-green-800', label: 'Completed' },
      registered: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Registered' },
      participated: { bg: 'bg-purple-100', text: 'text-purple-800', label: 'Participated' },
      achieved: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Achieved' },
      pending: { bg: 'bg-orange-100', text: 'text-orange-800', label: 'Pending' }
    }

    const config = statusConfig[status] || statusConfig.completed

    return (
      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    )
  }

  const getActivityStats = () => {
    const stats = {
      total: activities.length,
      donations: activities.filter(a => a.type === 'donation').length,
      events: activities.filter(a => a.type === 'event').length,
      volunteering: activities.filter(a => a.type === 'volunteer').length,
      achievements: activities.filter(a => a.type === 'achievement').length,
      totalDonated: activities
        .filter(a => a.type === 'donation' && a.amount)
        .reduce((sum, a) => sum + a.amount, 0)
    }
    return stats
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const stats = getActivityStats()

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Activities</h1>
            <p className="text-gray-600">Track all your interactions and contributions with Raavana Thalaigal Trust</p>
          </div>

          {/* Activity Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-blue-600">{stats.total}</div>
                <div className="text-sm text-gray-600">Total Activities</div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-green-600">{stats.donations}</div>
                <div className="text-sm text-gray-600">Donations</div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-orange-600">{stats.events}</div>
                <div className="text-sm text-gray-600">Events</div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-purple-600">{stats.volunteering}</div>
                <div className="text-sm text-gray-600">Volunteer Work</div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-yellow-600">{stats.achievements}</div>
                <div className="text-sm text-gray-600">Achievements</div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              {/* Activity Type Filter */}
              <div className="flex flex-wrap gap-2">
                {activityTypes.map((type) => (
                  <button
                    key={type.key}
                    onClick={() => setActiveFilter(type.key)}
                    className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeFilter === type.key
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span className="mr-2">{type.icon}</span>
                    {type.label}
                  </button>
                ))}
              </div>

              {/* Month Filter */}
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700">Filter by month:</label>
                <input
                  type="month"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {selectedMonth && (
                  <button
                    onClick={() => setSelectedMonth('')}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Activities Timeline */}
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  Activity Timeline
                  {filteredActivities.length !== activities.length && (
                    <span className="ml-2 text-sm font-normal text-gray-600">
                      ({filteredActivities.length} of {activities.length})
                    </span>
                  )}
                </h2>
                <div className="text-sm text-gray-600">
                  Total donated: <span className="font-semibold text-green-600">{formatAmount(stats.totalDonated)}</span>
                </div>
              </div>
            </div>

            <div className="p-6">
              {isLoading ? (
                <div className="space-y-6">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredActivities.length === 0 ? (
                <div className="text-center py-12">
                  <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No activities found</h3>
                  <p className="text-gray-600 mb-6">
                    {activeFilter === 'all' 
                      ? "You haven't started any activities yet." 
                      : `No ${activeFilter} activities found for the selected filters.`}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link 
                      href="/donations" 
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                      Make a Donation
                    </Link>
                    <Link 
                      href="/events" 
                      className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-2 rounded-lg transition-colors"
                    >
                      Join an Event
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredActivities.map((activity, index) => (
                    <div key={activity.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      {/* Activity Icon */}
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-xl flex-shrink-0 ${
                        activity.color === 'green' ? 'bg-green-500' :
                        activity.color === 'blue' ? 'bg-blue-500' :
                        activity.color === 'purple' ? 'bg-purple-500' :
                        activity.color === 'orange' ? 'bg-orange-500' :
                        activity.color === 'yellow' ? 'bg-yellow-500' :
                        'bg-gray-500'
                      }`}>
                        {activity.icon}
                      </div>

                      {/* Activity Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{activity.title}</h3>
                            <p className="text-gray-600 mt-1">{activity.description}</p>
                            
                            {/* Activity Details */}
                            <div className="mt-3 space-y-1 text-sm text-gray-600">
                              <div className="flex items-center">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                {formatDate(activity.date)}
                              </div>
                              
                              {activity.amount && (
                                <div className="flex items-center">
                                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2"/>
                                  </svg>
                                  <span className="font-semibold text-green-600">{formatAmount(activity.amount)}</span>
                                  {activity.category && <span className="ml-2">• {activity.category}</span>}
                                </div>
                              )}
                              
                              {activity.location && (
                                <div className="flex items-center">
                                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                  </svg>
                                  {activity.location}
                                </div>
                              )}
                              
                              {activity.impact && (
                                <div className="flex items-center">
                                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                                  </svg>
                                  <span className="text-green-600 font-medium">{activity.impact}</span>
                                </div>
                              )}
                              
                              {activity.duration && (
                                <div className="flex items-center">
                                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                  </svg>
                                  {activity.duration}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Status Badge */}
                          <div className="flex-shrink-0 ml-4">
                            {getStatusBadge(activity.status, activity.type)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-lg p-6 sm:p-8 mt-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Keep Making a Difference! 🌟</h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Your activities are creating real impact in communities across Tamil Nadu. 
              Continue your journey of making positive change.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/donations" 
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                💝 Make Another Donation
              </Link>
              <Link 
                href="/events" 
                className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                📅 Join Next Event
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
