'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

export default function DashboardPage() {
  const [user, setUser] = useState(null)
  const [stats, setStats] = useState({
    totalDonations: 750000,
    totalMembers: 1250,
    activeVolunteers: 85,
    completedEvents: 42
  })
  const [userStats, setUserStats] = useState({
    donations: 7500,
    donationCount: 3,
    events: 2,
    impact: 85
  })
  const [recentActivity, setRecentActivity] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Sample activity data
  const sampleActivity = [
    { id: 1, type: 'donation', message: 'You donated ₹5,000 for Education', date: '2025-01-15', icon: '💝' },
    { id: 2, type: 'event', message: 'Registered for Health Camp - Madurai', date: '2025-01-10', icon: '📅' },
    { id: 3, type: 'volunteer', message: 'Completed volunteer training', date: '2024-12-20', icon: '🌟' },
    { id: 4, type: 'donation', message: 'You donated ₹2,000 for Healthcare', date: '2024-12-10', icon: '💝' },
    { id: 5, type: 'achievement', message: 'Earned Gold Volunteer badge', date: '2024-11-15', icon: '🏆' }
  ]

  useEffect(() => {
    const userSession = localStorage.getItem('userSession')
    if (userSession) {
      const parsedUser = JSON.parse(userSession)
      setUser(parsedUser.user)
      
      // Simulate API calls
      setTimeout(() => {
        setRecentActivity(sampleActivity)
        setIsLoading(false)
      }, 1000)
    } else {
      router.push('/login')
    }
  }, [router])

  const formatAmount = (amount) => {
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`
    }
    if (amount >= 1000) {
      return `₹${(amount / 1000).toFixed(1)}K`
    }
    return `₹${amount}`
  }

  const getDashboardLinks = (userType) => {
    const commonLinks = [
      { href: '/profile', label: 'My Profile', icon: '👤' },
      { href: '/my-donations', label: 'My Donations', icon: '💝' },
      { href: '/my-activities', label: 'My Activities', icon: '📋' },
      { href: '/settings', label: 'Settings', icon: '⚙️' }
    ]

    switch (userType) {
      case 'ADMIN':
        return [
          { href: '/admin', label: 'Admin Dashboard', icon: '🔧' },
          ...commonLinks,
          { href: '/admin/users', label: 'Manage Users', icon: '👥' },
          { href: '/admin/events', label: 'Manage Events', icon: '📅' },
          { href: '/admin/reports', label: 'Reports', icon: '📊' }
        ]
      case 'VOLUNTEER':
        return [
          { href: '/volunteer-dashboard', label: 'Volunteer Dashboard', icon: '🌟' },
          ...commonLinks,
          { href: '/volunteer/assignments', label: 'My Assignments', icon: '📝' },
          { href: '/volunteer/opportunities', label: 'Opportunities', icon: '🔍' }
        ]
      default:
        return [
          { href: '/members', label: 'Member Dashboard', icon: '🏠' },
          ...commonLinks
        ]
    }
  }

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
          <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-lg shadow-lg p-6 sm:p-8 mb-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                  Welcome to your Dashboard, {user.firstName}! 👋
                </h1>
                <p className="text-blue-100 text-lg">
                  Your central hub for all activities with Raavana Thalaigal Trust
                </p>
                <div className="flex items-center mt-3 space-x-4">
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium capitalize">
                    {user.userType?.toLowerCase()}
                  </span>
                  {user.memberID && (
                    <span className="text-blue-200 text-sm">
                      ID: {user.memberID}
                    </span>
                  )}
                </div>
              </div>
              <div className="hidden sm:block">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold backdrop-blur-sm">
                  {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Organization Stats */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Raised</p>
                  <p className="text-2xl font-bold text-green-600">{formatAmount(stats.totalDonations)}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Members</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.totalMembers.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m-3 8a3 3 0 100-6 3 3 0 000 6z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Events Completed</p>
                  <p className="text-2xl font-bold text-orange-600">{stats.completedEvents}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Volunteers</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.activeVolunteers}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Quick Actions */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Link 
                    href="/donations"
                    className="flex items-center p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors group"
                  >
                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                      <span className="text-white text-xl">💝</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Make Donation</h3>
                      <p className="text-sm text-gray-600">Support our causes</p>
                    </div>
                  </Link>

                  <Link 
                    href="/events"
                    className="flex items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
                  >
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                      <span className="text-white text-xl">📅</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Join Events</h3>
                      <p className="text-sm text-gray-600">Participate in activities</p>
                    </div>
                  </Link>

                  <Link 
                    href="/volunteer"
                    className="flex items-center p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors group"
                  >
                    <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                      <span className="text-white text-xl">🌟</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Volunteer</h3>
                      <p className="text-sm text-gray-600">Join our team</p>
                    </div>
                  </Link>

                  <Link 
                    href="/profile"
                    className="flex items-center p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors group"
                  >
                    <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                      <span className="text-white text-xl">👤</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">My Profile</h3>
                      <p className="text-sm text-gray-600">Update your info</p>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Recent Activity</h2>
                  <Link 
                    href="/my-activities" 
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    View All →
                  </Link>
                </div>

                {isLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="animate-pulse flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                        <div className="flex-1">
                          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
                          {activity.icon}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                          <p className="text-xs text-gray-600">{new Date(activity.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Personal Stats */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold mb-4">Your Contributions</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Donated</span>
                    <span className="font-semibold text-green-600">{formatAmount(userStats.donations)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Donations Made</span>
                    <span className="font-semibold text-blue-600">{userStats.donationCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Events Joined</span>
                    <span className="font-semibold text-orange-600">{userStats.events}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Impact Score</span>
                    <span className="font-semibold text-purple-600">{userStats.impact}%</span>
                  </div>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold mb-4">Dashboard Links</h3>
                <div className="space-y-2">
                  {getDashboardLinks(user.userType).map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors"
                    >
                      <span className="mr-3">{link.icon}</span>
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Impact Summary */}
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Your Impact</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Lives Touched</span>
                    <span className="font-bold text-green-600">25</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Communities Helped</span>
                    <span className="font-bold text-blue-600">3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Projects Supported</span>
                    <span className="font-bold text-orange-600">7</span>
                  </div>
                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-xs text-gray-600 text-center">
                      Thank you for making a difference! 🙏
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 sm:p-8 mt-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Make More Impact?</h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Your contributions are creating real change in communities across Tamil Nadu. 
              Join us in our next initiative to help even more people.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/donations" 
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Make a Donation
              </Link>
              <Link 
                href="/events" 
                className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Join Next Event
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
