'use client'
import { useState } from 'react'
import Link from 'next/link'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [emailSent, setEmailSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setMessage('')

    if (!email) {
      setError('Please enter your email address')
      setIsLoading(false)
      return
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address')
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      })

      const data = await response.json()

      if (data.success) {
        setEmailSent(true)
        setMessage('Password reset instructions have been sent to your email address.')
      } else {
        setError(data.message || 'Failed to send reset email. Please try again.')
      }
    } catch (error) {
      console.error('Forgot password error:', error)
      setError('Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              {emailSent ? 'Check Your Email' : 'Forgot Password?'}
            </h1>
            <p className="text-gray-600">
              {emailSent 
                ? "We've sent password reset instructions to your email address"
                : "No worries! Enter your email address and we'll send you reset instructions"
              }
            </p>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
            {!emailSent ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Enter your email address"
                    required
                    autoComplete="email"
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      {error}
                    </div>
                  </div>
                )}

                {/* Success Message */}
                {message && (
                  <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg text-sm">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                      </svg>
                      {message}
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending Reset Link...
                    </>
                  ) : (
                    'Send Reset Link'
                  )}
                </button>

                {/* Help Text */}
                <div className="text-center text-sm text-gray-600">
                  <p>Remember your password?{' '}
                    <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                      Back to Login
                    </Link>
                  </p>
                </div>
              </form>
            ) : (
              /* Email Sent Success State */
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Sent Successfully!</h3>
                  <p className="text-gray-600 mb-4">
                    We've sent password reset instructions to:
                  </p>
                  <p className="font-medium text-gray-900 bg-gray-50 px-4 py-2 rounded-lg">
                    {email}
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
                  <h4 className="font-medium text-blue-800 mb-2">What's next?</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Check your email inbox (and spam folder)</li>
                    <li>• Click the reset link in the email</li>
                    <li>• Create a new password</li>
                    <li>• Log in with your new password</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={() => {
                      setEmailSent(false)
                      setEmail('')
                      setMessage('')
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
                  >
                    Send Another Email
                  </button>

                  <Link 
                    href="/login"
                    className="block w-full text-center border border-blue-600 text-blue-600 hover:bg-blue-50 py-3 px-4 rounded-lg font-semibold transition-colors"
                  >
                    Back to Login
                  </Link>
                </div>

                <div className="text-xs text-gray-500">
                  Didn't receive the email? Check your spam folder or try again in a few minutes.
                </div>
              </div>
            )}
          </div>

          {/* Additional Help */}
          <div className="mt-8 text-center">
            <div className="bg-gray-100 rounded-lg p-6">
              <h3 className="font-medium text-gray-900 mb-2">Need Help?</h3>
              <p className="text-sm text-gray-600 mb-4">
                If you're still having trouble accessing your account, please contact our support team.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link 
                  href="/contact"
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  📧 Contact Support
                </Link>
                <a 
                  href="tel:+919876543210"
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  📞 Call Us: +91 98765 43210
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
