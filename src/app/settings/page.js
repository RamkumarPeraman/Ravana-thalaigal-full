'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

export default function SettingsPage() {
  const [user, setUser] = useState(null)
  const [activeTab, setActiveTab] = useState('profile')
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()

  // Profile Settings
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    occupation: '',
    organization: '',
    emergencyContactName: '',
    emergencyContactPhone: ''
  })

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    donationReceipts: true,
    eventReminders: true,
    newsletterSubscription: true,
    monthlyReports: true,
    volunteerUpdates: false,
    emergencyAlerts: true
  })

  // Privacy Settings
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'members', // public, members, private
    showDonations: false,
    showEvents: true,
    allowMessages: true,
    showInLeaderboard: true,
    dataSharing: false
  })

  // Security Settings
  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  // Account Settings
  const [accountSettings, setAccountSettings] = useState({
    language: 'english',
    timezone: 'Asia/Kolkata',
    currency: 'INR',
    dateFormat: 'DD/MM/YYYY'
  })

  const tabs = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'privacy', label: 'Privacy', icon: '🔒' },
    { id: 'security', label: 'Security', icon: '🛡️' },
    { id: 'account', label: 'Account', icon: '⚙️' },
    { id: 'danger', label: 'Danger Zone', icon: '⚠️' }
  ]

  useEffect(() => {
    const userSession = localStorage.getItem('userSession')
    if (userSession) {
      const parsedUser = JSON.parse(userSession)
      setUser(parsedUser.user)
      
      // Populate form data
      setProfileData({
        firstName: parsedUser.user.firstName || '',
        lastName: parsedUser.user.lastName || '',
        phone: parsedUser.user.phone || '',
        occupation: parsedUser.user.occupation || '',
        organization: parsedUser.user.organization || '',
        emergencyContactName: parsedUser.user.emergencyContactName || '',
        emergencyContactPhone: parsedUser.user.emergencyContactPhone || ''
      })
    } else {
      router.push('/login')
    }
  }, [router])

  const showMessage = (message, type = 'success') => {
    if (type === 'success') {
      setSuccessMessage(message)
      setErrorMessage('')
    } else {
      setErrorMessage(message)
      setSuccessMessage('')
    }
    
    setTimeout(() => {
      setSuccessMessage('')
      setErrorMessage('')
    }, 5000)
  }

  const handleProfileUpdate = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // TODO: API call to update profile
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      
      // Update local storage
      const userSession = JSON.parse(localStorage.getItem('userSession'))
      const updatedUser = { ...userSession.user, ...profileData }
      localStorage.setItem('userSession', JSON.stringify({
        ...userSession,
        user: updatedUser
      }))
      
      setUser(updatedUser)
      showMessage('Profile updated successfully!')
    } catch (error) {
      showMessage('Failed to update profile. Please try again.', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleNotificationUpdate = async () => {
    setIsLoading(true)
    try {
      // TODO: API call to update notification settings
      await new Promise(resolve => setTimeout(resolve, 1000))
      showMessage('Notification preferences updated!')
    } catch (error) {
      showMessage('Failed to update notification settings.', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePrivacyUpdate = async () => {
    setIsLoading(true)
    try {
      // TODO: API call to update privacy settings
      await new Promise(resolve => setTimeout(resolve, 1000))
      showMessage('Privacy settings updated!')
    } catch (error) {
      showMessage('Failed to update privacy settings.', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordChange = async (e) => {
    e.preventDefault()
    
    if (securityData.newPassword !== securityData.confirmPassword) {
      showMessage('New passwords do not match.', 'error')
      return
    }

    if (securityData.newPassword.length < 6) {
      showMessage('New password must be at least 6 characters long.', 'error')
      return
    }

    setIsLoading(true)
    try {
      // TODO: API call to change password
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSecurityData({ currentPassword: '', newPassword: '', confirmPassword: '' })
      showMessage('Password changed successfully!')
    } catch (error) {
      showMessage('Failed to change password. Please try again.', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAccountUpdate = async () => {
    setIsLoading(true)
    try {
      // TODO: API call to update account settings
      await new Promise(resolve => setTimeout(resolve, 1000))
      showMessage('Account settings updated!')
    } catch (error) {
      showMessage('Failed to update account settings.', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAccountDeactivation = () => {
    if (window.confirm('Are you sure you want to deactivate your account? This action cannot be undone.')) {
      // TODO: Implement account deactivation
      alert('Account deactivation feature will be implemented soon.')
    }
  }

  const handleDataExport = () => {
    // TODO: Implement data export
    alert('Data export feature will be implemented soon.')
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
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
            <p className="text-gray-600">Manage your account preferences and settings</p>
          </div>

          {/* Success/Error Messages */}
          {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
              {successMessage}
            </div>
          )}
          
          {errorMessage && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {errorMessage}
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Tabs */}
            <div className="w-full lg:w-64 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-md p-4">
                <nav className="space-y-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span className="mr-3">{tab.icon}</span>
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <div className="bg-white rounded-lg shadow-md">
                {/* Profile Settings */}
                {activeTab === 'profile' && (
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>
                    <form onSubmit={handleProfileUpdate} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            First Name
                          </label>
                          <input
                            type="text"
                            value={profileData.firstName}
                            onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Last Name
                          </label>
                          <input
                            type="text"
                            value={profileData.lastName}
                            onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Occupation
                          </label>
                          <input
                            type="text"
                            value={profileData.occupation}
                            onChange={(e) => setProfileData({...profileData, occupation: e.target.value})}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Organization
                          </label>
                          <input
                            type="text"
                            value={profileData.organization}
                            onChange={(e) => setProfileData({...profileData, organization: e.target.value})}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div className="border-t pt-6">
                        <h3 className="text-lg font-medium mb-4">Emergency Contact</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Contact Name
                            </label>
                            <input
                              type="text"
                              value={profileData.emergencyContactName}
                              onChange={(e) => setProfileData({...profileData, emergencyContactName: e.target.value})}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Contact Phone
                            </label>
                            <input
                              type="tel"
                              value={profileData.emergencyContactPhone}
                              onChange={(e) => setProfileData({...profileData, emergencyContactPhone: e.target.value})}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                        >
                          {isLoading ? 'Updating...' : 'Update Profile'}
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Notification Settings */}
                {activeTab === 'notifications' && (
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-6">Notification Preferences</h2>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-4">Communication Preferences</h3>
                        <div className="space-y-4">
                          {Object.entries({
                            emailNotifications: 'Email Notifications',
                            smsNotifications: 'SMS Notifications',
                            donationReceipts: 'Donation Receipts',
                            eventReminders: 'Event Reminders'
                          }).map(([key, label]) => (
                            <label key={key} className="flex items-center">
                              <input
                                type="checkbox"
                                checked={notificationSettings[key]}
                                onChange={(e) => setNotificationSettings({
                                  ...notificationSettings,
                                  [key]: e.target.checked
                                })}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              />
                              <span className="ml-3 text-gray-700">{label}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="border-t pt-6">
                        <h3 className="text-lg font-medium mb-4">Content Preferences</h3>
                        <div className="space-y-4">
                          {Object.entries({
                            newsletterSubscription: 'Monthly Newsletter',
                            monthlyReports: 'Monthly Impact Reports',
                            volunteerUpdates: 'Volunteer Opportunity Updates',
                            emergencyAlerts: 'Emergency Relief Alerts'
                          }).map(([key, label]) => (
                            <label key={key} className="flex items-center">
                              <input
                                type="checkbox"
                                checked={notificationSettings[key]}
                                onChange={(e) => setNotificationSettings({
                                  ...notificationSettings,
                                  [key]: e.target.checked
                                })}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              />
                              <span className="ml-3 text-gray-700">{label}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <button
                          onClick={handleNotificationUpdate}
                          disabled={isLoading}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                        >
                          {isLoading ? 'Updating...' : 'Update Preferences'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Privacy Settings */}
                {activeTab === 'privacy' && (
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-6">Privacy Settings</h2>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Profile Visibility
                        </label>
                        <select
                          value={privacySettings.profileVisibility}
                          onChange={(e) => setPrivacySettings({...privacySettings, profileVisibility: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="public">Public - Anyone can see my profile</option>
                          <option value="members">Members Only - Only registered members can see</option>
                          <option value="private">Private - Only I can see my profile</option>
                        </select>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Activity Visibility</h3>
                        {Object.entries({
                          showDonations: 'Show my donations in public lists',
                          showEvents: 'Show my event participation',
                          allowMessages: 'Allow other members to message me',
                          showInLeaderboard: 'Include me in volunteer leaderboards'
                        }).map(([key, label]) => (
                          <label key={key} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={privacySettings[key]}
                              onChange={(e) => setPrivacySettings({
                                ...privacySettings,
                                [key]: e.target.checked
                              })}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <span className="ml-3 text-gray-700">{label}</span>
                          </label>
                        ))}
                      </div>

                      <div className="border-t pt-6">
                        <h3 className="text-lg font-medium mb-4">Data & Analytics</h3>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={privacySettings.dataSharing}
                            onChange={(e) => setPrivacySettings({
                              ...privacySettings,
                              dataSharing: e.target.checked
                            })}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <span className="ml-3 text-gray-700">
                            Allow anonymized data sharing for research and improvement
                          </span>
                        </label>
                      </div>

                      <div className="flex justify-end">
                        <button
                          onClick={handlePrivacyUpdate}
                          disabled={isLoading}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                        >
                          {isLoading ? 'Updating...' : 'Update Privacy Settings'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Security Settings */}
                {activeTab === 'security' && (
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-6">Security Settings</h2>
                    <form onSubmit={handlePasswordChange} className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-4">Change Password</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Current Password
                            </label>
                            <input
                              type="password"
                              value={securityData.currentPassword}
                              onChange={(e) => setSecurityData({...securityData, currentPassword: e.target.value})}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              New Password
                            </label>
                            <input
                              type="password"
                              value={securityData.newPassword}
                              onChange={(e) => setSecurityData({...securityData, newPassword: e.target.value})}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              required
                              minLength={6}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Confirm New Password
                            </label>
                            <input
                              type="password"
                              value={securityData.confirmPassword}
                              onChange={(e) => setSecurityData({...securityData, confirmPassword: e.target.value})}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                        >
                          {isLoading ? 'Changing...' : 'Change Password'}
                        </button>
                      </div>
                    </form>

                    <div className="border-t pt-6 mt-8">
                      <h3 className="text-lg font-medium mb-4">Account Security</h3>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start">
                          <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                          <div>
                            <h4 className="font-medium text-blue-800">Security Tips</h4>
                            <ul className="mt-2 text-sm text-blue-700 space-y-1">
                              <li>• Use a strong, unique password</li>
                              <li>• Never share your login credentials</li>
                              <li>• Log out from shared devices</li>
                              <li>• Review your account activity regularly</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Account Settings */}
                {activeTab === 'account' && (
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Language
                        </label>
                        <select
                          value={accountSettings.language}
                          onChange={(e) => setAccountSettings({...accountSettings, language: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="english">English</option>
                          <option value="tamil">தமிழ் (Tamil)</option>
                          <option value="hindi">हिंदी (Hindi)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Timezone
                        </label>
                        <select
                          value={accountSettings.timezone}
                          onChange={(e) => setAccountSettings({...accountSettings, timezone: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="Asia/Kolkata">India Standard Time (IST)</option>
                          <option value="Asia/Dubai">Gulf Standard Time (GST)</option>
                          <option value="America/New_York">Eastern Time (EST)</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Currency
                          </label>
                          <select
                            value={accountSettings.currency}
                            onChange={(e) => setAccountSettings({...accountSettings, currency: e.target.value})}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="INR">Indian Rupee (₹)</option>
                            <option value="USD">US Dollar ($)</option>
                            <option value="EUR">Euro (€)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Date Format
                          </label>
                          <select
                            value={accountSettings.dateFormat}
                            onChange={(e) => setAccountSettings({...accountSettings, dateFormat: e.target.value})}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <button
                          onClick={handleAccountUpdate}
                          disabled={isLoading}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                        >
                          {isLoading ? 'Updating...' : 'Update Settings'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Danger Zone */}
                {activeTab === 'danger' && (
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-6 text-red-600">Danger Zone</h2>
                    <div className="space-y-6">
                      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                        <h3 className="text-lg font-medium text-red-800 mb-2">Export Your Data</h3>
                        <p className="text-red-700 text-sm mb-4">
                          Download a copy of all your data including donations, activities, and profile information.
                        </p>
                        <button
                          onClick={handleDataExport}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          Export My Data
                        </button>
                      </div>

                      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                        <h3 className="text-lg font-medium text-red-800 mb-2">Deactivate Account</h3>
                        <p className="text-red-700 text-sm mb-4">
                          Temporarily deactivate your account. You can reactivate it anytime by logging back in.
                        </p>
                        <button
                          onClick={handleAccountDeactivation}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          Deactivate Account
                        </button>
                      </div>

                      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                        <h3 className="text-lg font-medium text-red-800 mb-2">Delete Account</h3>
                        <p className="text-red-700 text-sm mb-4">
                          Permanently delete your account and all associated data. This action cannot be undone.
                        </p>
                        <button
                          onClick={() => alert('Account deletion feature will be implemented with proper safeguards.')}
                          className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
