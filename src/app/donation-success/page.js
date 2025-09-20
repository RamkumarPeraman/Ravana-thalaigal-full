'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { downloadReceipt, getReceiptBlob } from '../../lib/receiptGenerator'
import { 
  shareViaEmail, 
  shareViaWhatsApp, 
  shareViaSMS,
  shareOnFacebook,
  shareOnTwitter,
  shareOnLinkedIn,
  copyReceiptDetails
} from '../../lib/shareUtils'

export default function DonationSuccessPage() {
  const [donationDetails, setDonationDetails] = useState(null)
  const [donorInfo, setDonorInfo] = useState(null)
  const [isDownloading, setIsDownloading] = useState(false)
  const [isSharing, setIsSharing] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)
  const searchParams = useSearchParams()

  useEffect(() => {
    const amount = searchParams.get('amount')
    const cause = searchParams.get('cause')
    
    if (amount && cause) {
      const donation = {
        amount: parseFloat(amount),
        cause: cause,
        transactionId: `RTT${Date.now()}`,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        type: 'one-time',
        paymentMethod: 'Online Payment'
      }
      setDonationDetails(donation)

      // Get donor info from localStorage or use default
      const userSession = localStorage.getItem('userSession')
      if (userSession) {
        const parsedUser = JSON.parse(userSession)
        setDonorInfo({
          name: `${parsedUser.user.firstName} ${parsedUser.user.lastName}`,
          email: parsedUser.user.email,
          phone: parsedUser.user.phone || '',
          pan: '',
          address: parsedUser.user.street || ''
        })
      } else {
        setDonorInfo({
          name: 'Anonymous Donor',
          email: 'donor@example.com',
          phone: '+91 98765 43210',
          pan: '',
          address: ''
        })
      }
    }
  }, [searchParams])

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const getCauseTitle = (cause) => {
    const causes = {
      education: 'Education for All',
      healthcare: 'Healthcare & Medical Aid',
      food: 'Food & Nutrition',
      disaster: 'Disaster Relief',
      environment: 'Environmental Conservation',
      elderly: 'Elderly Care'
    }
    return causes[cause] || 'General Fund'
  }

  const handleDownloadReceipt = async () => {
    if (!donationDetails || !donorInfo) return
    
    setIsDownloading(true)
    try {
      const success = await downloadReceipt(donationDetails, donorInfo)
      if (!success) {
        alert('Failed to download receipt. Please try again.')
      }
    } catch (error) {
      console.error('Download error:', error)
      alert('Failed to download receipt. Please try again.')
    } finally {
      setIsDownloading(false)
    }
  }

  const handleEmailShare = () => {
    if (!donationDetails || !donorInfo) return
    shareViaEmail(donationDetails, donorInfo)
  }

  const handleWhatsAppShare = () => {
    if (!donationDetails || !donorInfo) return
    shareViaWhatsApp(donationDetails, donorInfo)
  }

  const handleSMSShare = () => {
    if (!donationDetails || !donorInfo) return
    shareViaSMS(donationDetails, donorInfo)
  }

  const handleCopyDetails = () => {
    if (!donationDetails || !donorInfo) return
    
    const success = copyReceiptDetails(donationDetails, donorInfo)
    if (success) {
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } else {
      alert('Failed to copy details. Please try again.')
    }
  }

  const handleSocialShare = (platform) => {
    if (!donationDetails) return
    
    switch (platform) {
      case 'facebook':
        shareOnFacebook(donationDetails)
        break
      case 'twitter':
        shareOnTwitter(donationDetails)
        break
      case 'linkedin':
        shareOnLinkedIn(donationDetails)
        break
    }
  }

  if (!donationDetails || !donorInfo) {
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
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Thank You for Your Generosity! 🎉</h1>
            <p className="text-lg text-gray-600">
              Your donation has been successfully processed. You're making a real difference in someone's life.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Donation Details */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Donation Details</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-semibold text-green-600 text-lg">
                      {formatCurrency(donationDetails.amount)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cause:</span>
                    <span className="font-medium">{getCauseTitle(donationDetails.cause)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Transaction ID:</span>
                    <span className="font-mono text-sm">{donationDetails.transactionId}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date & Time:</span>
                    <span>{donationDetails.date} at {donationDetails.time}</span>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Tax Deduction (80G):</span>
                      <span className="font-semibold text-blue-600">
                        {formatCurrency(donationDetails.amount * 0.5)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      50% of your donation is eligible for tax deduction under Section 80G
                    </p>
                  </div>
                </div>
              </div>

              {/* Receipt Actions */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Download & Share Receipt</h2>
                
                {/* Download Receipt */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Download Receipt</h3>
                  <button
                    onClick={handleDownloadReceipt}
                    disabled={isDownloading}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {isDownloading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generating PDF...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                        </svg>
                        Download PDF Receipt
                      </>
                    )}
                  </button>
                </div>

                {/* Share via Communication */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Share Receipt</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <button
                      onClick={handleEmailShare}
                      className="flex items-center justify-center px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                      </svg>
                      Email
                    </button>

                    <button
                      onClick={handleWhatsAppShare}
                      className="flex items-center justify-center px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                    >
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                      </svg>
                      WhatsApp
                    </button>

                    <button
                      onClick={handleSMSShare}
                      className="flex items-center justify-center px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                      </svg>
                      SMS
                    </button>

                    <button
                      onClick={handleCopyDetails}
                      className={`flex items-center justify-center px-4 py-3 rounded-lg font-medium transition-colors ${
                        copySuccess 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-600 hover:bg-gray-700 text-white'
                      }`}
                    >
                      {copySuccess ? (
                        <>
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                          </svg>
                          Copied!
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                          </svg>
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Social Media Sharing */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Share Your Good Deed</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Help us reach more people by sharing your donation on social media
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => handleSocialShare('facebook')}
                      className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      Facebook
                    </button>

                    <button
                      onClick={() => handleSocialShare('twitter')}
                      className="flex items-center px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                      Twitter
                    </button>

                    <button
                      onClick={() => handleSocialShare('linkedin')}
                      className="flex items-center px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      LinkedIn
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* What's Next */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-800 mb-3">What happens next?</h3>
                <ul className="space-y-2 text-sm text-blue-700">
                  <li className="flex items-start">
                    <svg className="w-4 h-4 mt-0.5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    Tax receipt will be emailed within 24 hours
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 mt-0.5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    Regular updates on donation impact
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 mt-0.5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    Funds allocated within 48 hours
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Link
                  href="/my-donations"
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 px-6 rounded-lg font-semibold transition-colors"
                >
                  View My Donations
                </Link>
                <Link
                  href="/donations"
                  className="block w-full border border-blue-600 text-blue-600 hover:bg-blue-50 text-center py-3 px-6 rounded-lg font-semibold transition-colors"
                >
                  Donate Again
                </Link>
                <Link
                  href="/dashboard"
                  className="block w-full border border-gray-300 text-gray-700 hover:bg-gray-50 text-center py-3 px-6 rounded-lg font-semibold transition-colors"
                >
                  Go to Dashboard
                </Link>
              </div>

              {/* Contact Support */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Need Help?</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Contact our support team for any queries
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-700">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                    contact@ravanathalaigaltrust.org
                  </div>
                  <div className="flex items-center text-gray-700">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                    +91 98765 43210
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
