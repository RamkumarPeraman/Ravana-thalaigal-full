'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

export default function DonationsPage() {
  const [user, setUser] = useState(null)
  const [selectedCause, setSelectedCause] = useState('education')
  const [donationAmount, setDonationAmount] = useState('')
  const [customAmount, setCustomAmount] = useState('')
  const [donationType, setDonationType] = useState('one-time')
  const [paymentMethod, setPaymentMethod] = useState('razorpay')
  const [donorInfo, setDonorInfo] = useState({
    name: '',
    email: '',
    phone: '',
    pan: '',
    address: ''
  })
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [showDonationForm, setShowDonationForm] = useState(false)
  const router = useRouter()

  // Predefined donation amounts
  const quickAmounts = [500, 1000, 2500, 5000, 10000, 25000]

  // Donation causes with detailed information
  const causes = {
    education: {
      title: 'Education for All',
      description: 'Providing quality education and learning resources to underprivileged children across Tamil Nadu.',
      icon: '🎓',
      color: 'bg-blue-500',
      impact: {
        500: 'Provides school supplies for 5 children for a month',
        1000: 'Sponsors tuition fees for 2 children for a month',
        2500: 'Funds educational materials for an entire classroom',
        5000: 'Supports 10 children\'s education for a full month',
        10000: 'Establishes a computer lab in a rural school'
      },
      raised: 2850000,
      goal: 5000000,
      beneficiaries: 1200
    },
    healthcare: {
      title: 'Healthcare & Medical Aid',
      description: 'Organizing medical camps and providing healthcare services to remote villages.',
      icon: '🏥',
      color: 'bg-red-500',
      impact: {
        500: 'Provides basic medicines for 10 patients',
        1000: 'Funds health check-ups for 15 people',
        2500: 'Sponsors medical equipment for a health camp',
        5000: 'Covers surgery costs for one patient',
        10000: 'Organizes a complete medical camp for 200 people'
      },
      raised: 1650000,
      goal: 3000000,
      beneficiaries: 850
    },
    food: {
      title: 'Food & Nutrition',
      description: 'Fighting hunger by providing nutritious meals to children and families in need.',
      icon: '🍽️',
      color: 'bg-green-500',
      impact: {
        500: 'Provides 50 nutritious meals',
        1000: 'Feeds 20 children for a week',
        2500: 'Supplies monthly groceries for 5 families',
        5000: 'Feeds 100 children for a full week',
        10000: 'Establishes a community kitchen for a month'
      },
      raised: 1200000,
      goal: 2500000,
      beneficiaries: 2500
    },
    disaster: {
      title: 'Disaster Relief',
      description: 'Providing immediate relief and rehabilitation during natural disasters and emergencies.',
      icon: '🆘',
      color: 'bg-orange-500',
      impact: {
        500: 'Emergency relief kit for 1 family',
        1000: 'Temporary shelter materials for 1 family',
        2500: 'Clean water supply for 50 families for a week',
        5000: 'Complete relief package for 5 families',
        10000: 'Emergency medical aid for 100 people'
      },
      raised: 850000,
      goal: 2000000,
      beneficiaries: 600
    },
    environment: {
      title: 'Environmental Conservation',
      description: 'Protecting our environment through tree plantation, waste management, and awareness programs.',
      icon: '🌱',
      color: 'bg-teal-500',
      impact: {
        500: 'Plants 25 saplings',
        1000: 'Organizes environmental awareness for 100 people',
        2500: 'Funds waste management for 1 community',
        5000: 'Establishes a small community garden',
        10000: 'Plants 500 trees and maintains for 1 year'
      },
      raised: 750000,
      goal: 1500000,
      beneficiaries: 300
    },
    elderly: {
      title: 'Elderly Care',
      description: 'Supporting senior citizens with healthcare, companionship, and essential services.',
      icon: '👴',
      color: 'bg-purple-500',
      impact: {
        500: 'Provides medical care for 2 elderly for a week',
        1000: 'Monthly groceries for 1 elderly person',
        2500: 'Physiotherapy sessions for 5 elderly',
        5000: 'Medical check-up camp for 20 elderly',
        10000: 'Comprehensive care for 10 elderly for a month'
      },
      raised: 650000,
      goal: 1200000,
      beneficiaries: 180
    }
  }

  useEffect(() => {
    const userSession = localStorage.getItem('userSession')
    if (userSession) {
      const parsedUser = JSON.parse(userSession)
      setUser(parsedUser.user)
      setDonorInfo({
        name: `${parsedUser.user.firstName} ${parsedUser.user.lastName}`,
        email: parsedUser.user.email,
        phone: parsedUser.user.phone || '',
        pan: '',
        address: parsedUser.user.street || ''
      })
    }
  }, [])

  const handleAmountSelect = (amount) => {
    setDonationAmount(amount.toString())
    setCustomAmount('')
  }

  const handleCustomAmountChange = (e) => {
    const value = e.target.value
    if (value && !isNaN(value)) {
      setCustomAmount(value)
      setDonationAmount(value)
    } else if (value === '') {
      setCustomAmount('')
      setDonationAmount('')
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setDonorInfo(prev => ({ ...prev, [name]: value }))
  }

  const handleDonationSubmit = async (e) => {
    e.preventDefault()
    
    if (!donationAmount || parseFloat(donationAmount) < 100) {
      alert('Minimum donation amount is ₹100')
      return
    }

    if (!user && (!donorInfo.name || !donorInfo.email || !donorInfo.phone)) {
      alert('Please fill in all required fields')
      return
    }

    setIsProcessing(true)

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))

      // TODO: Integrate actual payment gateway (Razorpay, Stripe, etc.)
      
      const donationData = {
        amount: parseFloat(donationAmount),
        cause: selectedCause,
        type: donationType,
        donor: user ? user : donorInfo,
        paymentMethod,
        isAnonymous,
        timestamp: new Date().toISOString()
      }

      // Save donation (simulate API call)
      console.log('Donation submitted:', donationData)
      
      // Redirect to success page or show success message
      router.push(`/donation-success?amount=${donationAmount}&cause=${selectedCause}`)

    } catch (error) {
      console.error('Donation error:', error)
      alert('Payment failed. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const getProgressPercentage = (raised, goal) => {
    return Math.min((raised / goal) * 100, 100)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-lg shadow-lg p-8 sm:p-12 mb-12 text-white text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Make a Difference Today
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Your donation can transform lives and create lasting change in communities across Tamil Nadu. 
            Every contribution, no matter the size, brings hope to those who need it most.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowDonationForm(true)}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors"
            >
              🎯 Donate Now
            </button>
            <Link
              href="#causes"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              📊 View Impact
            </Link>
          </div>
        </div>

        {/* Impact Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">₹89L+</div>
            <div className="text-gray-600">Total Raised</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">5,630</div>
            <div className="text-gray-600">Lives Impacted</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">3,200+</div>
            <div className="text-gray-600">Generous Donors</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">245</div>
            <div className="text-gray-600">Active Projects</div>
          </div>
        </div>

        {/* Our Causes Section */}
        <section id="causes" className="mb-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Causes</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose the cause that resonates with your heart. Every donation makes a meaningful impact 
              in the lives of those we serve.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(causes).map(([key, cause]) => (
              <div
                key={key}
                className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer ${
                  selectedCause === key ? 'ring-4 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedCause(key)}
              >
                <div className={`${cause.color} p-6 text-white`}>
                  <div className="flex items-center mb-4">
                    <span className="text-4xl mr-4">{cause.icon}</span>
                    <h3 className="text-xl font-bold">{cause.title}</h3>
                  </div>
                  <p className="text-white/90">{cause.description}</p>
                </div>

                <div className="p-6">
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Raised: {formatCurrency(cause.raised)}</span>
                      <span>Goal: {formatCurrency(cause.goal)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`${cause.color} h-3 rounded-full transition-all duration-300`}
                        style={{ width: `${getProgressPercentage(cause.raised, cause.goal)}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {getProgressPercentage(cause.raised, cause.goal).toFixed(1)}% Complete
                    </div>
                  </div>

                  {/* Statistics */}
                  <div className="flex justify-between text-sm text-gray-600 mb-4">
                    <div>
                      <span className="font-semibold text-gray-900">{cause.beneficiaries}</span>
                      <div>Beneficiaries</div>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900">
                        {Math.floor(cause.raised / cause.beneficiaries)}
                      </span>
                      <div>Avg. per person</div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedCause(key)
                      setShowDonationForm(true)
                    }}
                    className={`w-full ${cause.color} text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity`}
                  >
                    Donate to {cause.title}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Donation Form Modal */}
        {showDonationForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Complete Your Donation</h2>
                <button
                  onClick={() => setShowDonationForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>

              <form onSubmit={handleDonationSubmit} className="space-y-6">
                {/* Selected Cause */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{causes[selectedCause].icon}</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">{causes[selectedCause].title}</h3>
                      <p className="text-sm text-gray-600">{causes[selectedCause].description}</p>
                    </div>
                  </div>
                </div>

                {/* Donation Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Donation Type</label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="one-time"
                        checked={donationType === 'one-time'}
                        onChange={(e) => setDonationType(e.target.value)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700">One-time</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="monthly"
                        checked={donationType === 'monthly'}
                        onChange={(e) => setDonationType(e.target.value)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700">Monthly</span>
                    </label>
                  </div>
                </div>

                {/* Donation Amount */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Donation Amount {donationType === 'monthly' && '(per month)'}
                  </label>
                  
                  {/* Quick Amount Buttons */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {quickAmounts.map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => handleAmountSelect(amount)}
                        className={`py-3 px-4 border rounded-lg font-medium transition-colors ${
                          donationAmount === amount.toString()
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-300 hover:border-blue-300'
                        }`}
                      >
                        ₹{amount.toLocaleString()}
                      </button>
                    ))}
                  </div>

                  {/* Custom Amount */}
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-500">₹</span>
                    <input
                      type="number"
                      placeholder="Enter custom amount"
                      value={customAmount}
                      onChange={handleCustomAmountChange}
                      min="100"
                      className="w-full pl-8 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Impact Display */}
                  {donationAmount && causes[selectedCause].impact[donationAmount] && (
                    <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center text-green-700">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                        </svg>
                        <span className="text-sm font-medium">
                          Your Impact: {causes[selectedCause].impact[donationAmount]}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Donor Information */}
                {!user && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">Donor Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="name"
                        placeholder="Full Name *"
                        value={donorInfo.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address *"
                        value={donorInfo.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number *"
                        value={donorInfo.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        name="pan"
                        placeholder="PAN Number (for tax receipt)"
                        value={donorInfo.pan}
                        onChange={handleInputChange}
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <textarea
                      name="address"
                      placeholder="Address (for tax receipt)"
                      value={donorInfo.address}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                )}

                {/* Payment Method */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Payment Method</label>
                  <div className="space-y-3">
                    <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        value="razorpay"
                        checked={paymentMethod === 'razorpay'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <div className="ml-3 flex items-center">
                        <span className="font-medium text-gray-900">Razorpay</span>
                        <span className="ml-2 text-sm text-gray-500">(Cards, UPI, Wallets, Net Banking)</span>
                      </div>
                    </label>
                    <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        value="bank"
                        checked={paymentMethod === 'bank'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <div className="ml-3">
                        <span className="font-medium text-gray-900">Bank Transfer</span>
                        <div className="text-sm text-gray-500">Direct bank transfer to our account</div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Privacy Options */}
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded"
                    />
                    <span className="ml-2 text-gray-700">Make this donation anonymous</span>
                  </label>
                </div>

                {/* Tax Benefit Info */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <div>
                      <h4 className="font-medium text-blue-800">Tax Benefits</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        Your donation is eligible for 50% tax deduction under Section 80G of the Income Tax Act. 
                        You'll receive a tax receipt via email after successful payment.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowDonationForm(false)}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!donationAmount || parseFloat(donationAmount) < 100 || isProcessing}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isProcessing ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        🎯 Donate {donationAmount ? formatCurrency(parseFloat(donationAmount)) : ''}
                        {donationType === 'monthly' && '/month'}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* How It Works Section */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">How Your Donation Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Choose Your Cause</h3>
              <p className="text-gray-600 text-sm">Select the cause that matters most to you from our active campaigns.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💳</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Secure Payment</h3>
              <p className="text-gray-600 text-sm">Make a secure donation through multiple payment options including UPI, cards, and wallets.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Track Impact</h3>
              <p className="text-gray-600 text-sm">Receive regular updates on how your donation is making a difference in real lives.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📄</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Tax Receipt</h3>
              <p className="text-gray-600 text-sm">Get instant tax receipt and claim 50% deduction under Section 80G.</p>
            </div>
          </div>
        </section>

        {/* Recent Donations */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Recent Donations</h2>
          
          <div className="space-y-4">
            {[
              { name: 'Priya S.', amount: 5000, cause: 'Education', time: '2 hours ago', location: 'Chennai' },
              { name: 'Anonymous', amount: 10000, cause: 'Healthcare', time: '5 hours ago', location: 'Coimbatore' },
              { name: 'Rajesh K.', amount: 2500, cause: 'Food Relief', time: '8 hours ago', location: 'Madurai' },
              { name: 'Meera R.', amount: 1000, cause: 'Education', time: '12 hours ago', location: 'Salem' },
              { name: 'Anonymous', amount: 25000, cause: 'Disaster Relief', time: '1 day ago', location: 'Trichy' }
            ].map((donation, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                    {donation.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{donation.name}</div>
                    <div className="text-sm text-gray-600">{donation.location} • {donation.time}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-green-600">{formatCurrency(donation.amount)}</div>
                  <div className="text-sm text-gray-600">{donation.cause}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-8 sm:p-12 text-white text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-lg text-green-100 mb-8 max-w-2xl mx-auto">
            Join thousands of donors who are creating positive change across Tamil Nadu. 
            Every donation brings us closer to a better tomorrow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowDonationForm(true)}
              className="bg-white text-green-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-50 transition-colors"
            >
              💝 Start Donating
            </button>
            <Link
              href="/volunteer"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-green-600 transition-colors"
            >
              🤝 Become a Volunteer
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
