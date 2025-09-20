'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { downloadReceipt } from '../../lib/receiptGenerator'
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
  const [copySuccess, setCopySuccess] = useState(false)

  useEffect(() => {
    // Get donation details from localStorage or fallback
    const donationData = localStorage.getItem('latestDonation')
    if (donationData) {
      const donation = JSON.parse(donationData)
      setDonationDetails(donation)
    } else {
      // fallback donation data
      setDonationDetails({
        amount: 1000,
        cause: 'general',
        transactionId: `RTT${Date.now()}`,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        type: 'one-time',
        paymentMethod: 'Online Payment'
      })
    }

    // Get donor info from localStorage or fallback
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
  }, [])

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
      elderly: 'Elderly Care',
      general: 'General Fund'
    }
    return causes[cause] || 'General Fund'
  }

  const handleDownloadReceipt = async () => {
    if (!donationDetails || !donorInfo) return
    
    setIsDownloading(true)
    try {
      const success = await downloadReceipt(donationDetails, donorInfo)
      if (!success) alert('Failed to download receipt. Please try again.')
    } catch (error) {
      console.error('Download error:', error)
      alert('Failed to download receipt. Please try again.')
    } finally {
      setIsDownloading(false)
    }
  }

  const handleEmailShare = () => shareViaEmail(donationDetails, donorInfo)
  const handleWhatsAppShare = () => shareViaWhatsApp(donationDetails, donorInfo)
  const handleSMSShare = () => shareViaSMS(donationDetails, donorInfo)
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
      case 'facebook': shareOnFacebook(donationDetails); break
      case 'twitter': shareOnTwitter(donationDetails); break
      case 'linkedin': shareOnLinkedIn(donationDetails); break
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
        {/* ... Rest of your JSX stays the same ... */}
        {/* Donation details, receipt actions, social sharing, sidebar */}
      </main>
      <Footer />
    </div>
  )
}
