'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

export default function ProfilePage() {
  const [user, setUser] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({})
  
  // Image upload states
  const [profileImage, setProfileImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [isImageLoading, setIsImageLoading] = useState(false)
  const [showImageModal, setShowImageModal] = useState(false)
  const fileInputRef = useRef(null)
  const router = useRouter()

  useEffect(() => {
    const userSession = localStorage.getItem('userSession')
    if (userSession) {
      const parsedUser = JSON.parse(userSession)
      setUser(parsedUser.user)
      setFormData({
        firstName: parsedUser.user.firstName || '',
        lastName: parsedUser.user.lastName || '',
        email: parsedUser.user.email || '',
        phone: parsedUser.user.phone || '',
        street: parsedUser.user.street || '',
        city: parsedUser.user.city || '',
        state: parsedUser.user.state || 'Tamil Nadu',
        pincode: parsedUser.user.pincode || '',
        occupation: parsedUser.user.occupation || '',
        organization: parsedUser.user.organization || ''
      })
      setProfileImage(parsedUser.user.profileImage)
    } else {
      router.push('/login')
    }
  }, [router])

  const showMessage = (text, type = 'success') => {
    if (type === 'success') {
      setMessage(text)
      setError('')
    } else {
      setError(text)
      setMessage('')
    }
    
    setTimeout(() => {
      setMessage('')
      setError('')
    }, 5000)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageSelect = (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      showMessage('Please select a valid image file.', 'error')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showMessage('Image size should be less than 5MB.', 'error')
      return
    }

    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setImagePreview(e.target.result)
      setShowImageModal(true)
    }
    reader.readAsDataURL(file)
  }

  const handleImageUpload = async () => {
    if (!imagePreview) return

    setIsImageLoading(true)
    try {
      // Convert image to blob
      const response = await fetch(imagePreview)
      const blob = await response.blob()
      
      const formData = new FormData()
      formData.append('image', blob, 'profile.jpg')
      formData.append('userId', user.id)

      // Upload to API
      const uploadResponse = await fetch('/api/upload/profile-image', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userSession')).token}`
        },
        body: formData
      })

      const data = await uploadResponse.json()

      if (data.success) {
        setProfileImage(data.imageUrl)
        
        // Update user session
        const userSession = JSON.parse(localStorage.getItem('userSession'))
        const updatedUser = { ...userSession.user, profileImage: data.imageUrl }
        localStorage.setItem('userSession', JSON.stringify({
          ...userSession,
          user: updatedUser
        }))
        
        setUser(updatedUser)
        setShowImageModal(false)
        setImagePreview(null)
        showMessage('Profile image updated successfully!')
      } else {
        showMessage(data.message || 'Failed to upload image.', 'error')
      }
    } catch (error) {
      console.error('Image upload error:', error)
      showMessage('Failed to upload image. Please try again.', 'error')
    } finally {
      setIsImageLoading(false)
    }
  }

  const handleImageDelete = async () => {
    if (!profileImage) return

    if (!confirm('Are you sure you want to remove your profile picture?')) return

    setIsImageLoading(true)
    try {
      const response = await fetch('/api/upload/profile-image', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userSession')).token}`
        },
        body: JSON.stringify({ userId: user.id })
      })

      const data = await response.json()

      if (data.success) {
        setProfileImage(null)
        
        // Update user session
        const userSession = JSON.parse(localStorage.getItem('userSession'))
        const updatedUser = { ...userSession.user, profileImage: null }
        localStorage.setItem('userSession', JSON.stringify({
          ...userSession,
          user: updatedUser
        }))
        
        setUser(updatedUser)
        showMessage('Profile image removed successfully!')
      } else {
        showMessage(data.message || 'Failed to remove image.', 'error')
      }
    } catch (error) {
      console.error('Image delete error:', error)
      showMessage('Failed to remove image. Please try again.', 'error')
    } finally {
      setIsImageLoading(false)
    }
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userSession')).token}`
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (data.success) {
        // Update user session
        const userSession = JSON.parse(localStorage.getItem('userSession'))
        const updatedUser = { ...userSession.user, ...formData }
        localStorage.setItem('userSession', JSON.stringify({
          ...userSession,
          user: updatedUser
        }))
        
        setUser(updatedUser)
        setIsEditing(false)
        showMessage('Profile updated successfully!')
      } else {
        showMessage(data.message || 'Failed to update profile.', 'error')
      }
    } catch (error) {
      console.error('Profile update error:', error)
      showMessage('Network error. Please try again.', 'error')
    } finally {
      setIsLoading(false)
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
        <div className="max-w-4xl mx-auto">
          {/* Success/Error Messages */}
          {message && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
              {message}
            </div>
          )}
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {/* Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between">
              <div className="flex flex-col sm:flex-row items-center sm:items-start">
                {/* Profile Image */}
                <div className="relative mb-4 sm:mb-0 sm:mr-6">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center border-4 border-white shadow-lg">
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt={`${user.firstName} ${user.lastName}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-4xl font-bold text-gray-400">
                        {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                      </div>
                    )}
                  </div>
                  
                  {/* Image Upload Buttons */}
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isImageLoading}
                        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg transition-colors disabled:opacity-50"
                        title="Upload new photo"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                      </button>
                      
                      {profileImage && (
                        <button
                          onClick={handleImageDelete}
                          disabled={isImageLoading}
                          className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-lg transition-colors disabled:opacity-50"
                          title="Remove photo"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Loading Overlay */}
                  {isImageLoading && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                    </div>
                  )}

                  {/* Hidden File Input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                  />
                </div>

                <div className="text-center sm:text-left">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {user.firstName} {user.lastName}
                  </h1>
                  <p className="text-gray-600 capitalize">{user.userType?.toLowerCase()}</p>
                  {user.memberID && (
                    <p className="text-sm text-blue-600">Member ID: {user.memberID}</p>
                  )}
                  <p className="text-sm text-gray-500 mt-1">
                    Member since {new Date(user.membershipDate).getFullYear()}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsEditing(!isEditing)}
                className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>
          </div>

          {/* Rest of your existing profile form code... */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Personal Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-6">Personal Information</h2>
              
              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900">{user.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900">{user.lastName}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <p className="text-gray-900">{user.email}</p>
                  <p className="text-xs text-gray-500">Email cannot be changed</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900">{user.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  <p className="text-gray-900 capitalize">{user.gender?.toLowerCase()}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                  <p className="text-gray-900">
                    {user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : 'Not provided'}
                  </p>
                </div>

                {isEditing && (
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
                    >
                      {isLoading ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                )}
              </form>
            </div>

            {/* Address & Other Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-6">Address & Other Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  {isEditing ? (
                    <textarea
                      name="street"
                      value={formData.street}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900">{user.street}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900">{user.city}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Pincode</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900">{user.pincode}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                  <p className="text-gray-900">{user.state}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Occupation</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900">{user.occupation || 'Not provided'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Organization</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="organization"
                      value={formData.organization}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900">{user.organization || 'Not provided'}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Account Statistics */}
          <div className="bg-white rounded-lg shadow-md p-6 mt-8">
            <h2 className="text-xl font-bold mb-6">Account Statistics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {new Date(user.membershipDate).getFullYear()}
                </div>
                <div className="text-sm text-gray-600">Member Since</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{user.loginCount || 0}</div>
                <div className="text-sm text-gray-600">Total Logins</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">0</div>
                <div className="text-sm text-gray-600">Donations Made</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">0</div>
                <div className="text-sm text-gray-600">Events Joined</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Image Upload Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Update Profile Picture</h3>
            
            {imagePreview && (
              <div className="mb-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            )}
            
            <div className="flex space-x-4">
              <button
                onClick={handleImageUpload}
                disabled={isImageLoading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
              >
                {isImageLoading ? 'Uploading...' : 'Upload'}
              </button>
              <button
                onClick={() => {
                  setShowImageModal(false)
                  setImagePreview(null)
                }}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
