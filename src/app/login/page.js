'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

export default function LoginPage() {
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
        remember: false
    })
    const [userType, setUserType] = useState('member') // member, volunteer, admin
    const [isLoading, setIsLoading] = useState(false)
    const [isGoogleLoading, setIsGoogleLoading] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()

    // Demo credentials
    const demoCredentials = {
        member: { email: 'member@ravanathalaigal.org', password: 'member123' },
        volunteer: { email: 'volunteer@ravanathalaigal.org', password: 'volunteer123' },
        admin: { email: 'admin@ravanathalaigal.org', password: 'admin123' }
    }

    // Load Google Sign-In script
    useEffect(() => {
        const loadGoogleScript = () => {
            if (typeof window !== 'undefined' && !window.google) {
                const script = document.createElement('script')
                script.src = 'https://accounts.google.com/gsi/client'
                script.async = true
                script.defer = true
                script.onload = initializeGoogleSignIn
                document.head.appendChild(script)
            } else if (window.google) {
                initializeGoogleSignIn()
            }
        }

        const initializeGoogleSignIn = () => {
            if (window.google?.accounts?.id) {
                window.google.accounts.id.initialize({
                    client_id: '123456789-abcdefghijklmnop.apps.googleusercontent.com', // Replace with your actual client ID
                    callback: handleGoogleSignIn,
                    auto_select: false,
                    cancel_on_tap_outside: true
                })
            }
        }

        loadGoogleScript()
    }, [])

    const handleGoogleSignIn = async (response) => {
        setIsGoogleLoading(true)
        setError('')

        try {
            // Decode JWT token to get user info (in production, verify this on server)
            const userInfo = JSON.parse(atob(response.credential.split('.')[1]))

            // Simulate API call to check if user exists
            setTimeout(() => {
                // Create user session
                const userSession = {
                    email: userInfo.email,
                    name: userInfo.name,
                    picture: userInfo.picture,
                    userType: 'member', // Default to member, can be changed later
                    loginTime: new Date().toISOString(),
                    loginMethod: 'google'
                }

                localStorage.setItem('userSession', JSON.stringify(userSession))

                setIsGoogleLoading(false)

                // Check if this is a new user (in production, this would be determined by backend)
                const isNewUser = Math.random() > 0.5 // Simulate 50% chance of new user

                if (isNewUser) {
                    // Redirect to complete profile page for new users
                    router.push('/complete-profile')
                } else {
                    // Redirect existing users to dashboard
                    router.push('/members')
                }
            }, 1500)
        } catch (error) {
            console.error('Google Sign-In Error:', error)
            setError('Failed to sign in with Google. Please try again.')
            setIsGoogleLoading(false)
        }
    }

    const handleGoogleButtonClick = () => {
        if (window.google?.accounts?.id) {
            window.google.accounts.id.prompt()
        } else {
            setError('Google Sign-In is not available. Please try again later.')
        }
    }

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        setLoginData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
        setError('') // Clear error when user types
    }

    // const handleSubmit = async (e) => {
    //     e.preventDefault()
    //     setIsLoading(true)
    //     setError('')

    //     // Simple validation
    //     if (!loginData.email || !loginData.password) {
    //         setError('Please fill in all required fields')
    //         setIsLoading(false)
    //         return
    //     }

    //     // Demo authentication
    //     const credentials = demoCredentials[userType]
    //     if (loginData.email === credentials.email && loginData.password === credentials.password) {
    //         // Store user session (in real app, use proper authentication)
    //         localStorage.setItem('userSession', JSON.stringify({
    //             email: loginData.email,
    //             userType: userType,
    //             loginTime: new Date().toISOString(),
    //             loginMethod: 'email'
    //         }))

    //         setTimeout(() => {
    //             setIsLoading(false)
    //             // Redirect based on user type
    //             if (userType === 'admin') {
    //                 router.push('/admin')
    //             } else if (userType === 'volunteer') {
    //                 router.push('/volunteer-dashboard')
    //             } else {
    //                 router.push('/members')
    //             }
    //         }, 1500)
    //     } else {
    //         setTimeout(() => {
    //             setError('Invalid email or password. Please try again.')
    //             setIsLoading(false)
    //         }, 1500)
    //     }
    // }


    const handleSubmit = async (e) => {
  e.preventDefault()
  setIsLoading(true)
  setError('')

  if (!loginData.email || !loginData.password) {
    setError('Please fill in all required fields')
    setIsLoading(false)
    return
  }

  try {
    console.log('Attempting login with:', loginData.email); // Debug

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: loginData.email,
        password: loginData.password
      })
    })

    const data = await response.json()
    console.log('Login response:', data); // Debug

    if (data.success) {
      // Store user session
      localStorage.setItem('userSession', JSON.stringify({
        user: data.user,
        token: data.token,
        loginTime: new Date().toISOString(),
        loginMethod: 'email'
      }))

      console.log('Login successful, redirecting...'); // Debug

      // Redirect based on user type
      if (data.user.userType === 'ADMIN') {
        router.push('/admin')
      } else if (data.user.userType === 'VOLUNTEER') {
        router.push('/volunteer-dashboard')
      } else {
        router.push('/members')
      }
    } else {
      setError(data.message || 'Login failed')
    }
  } catch (error) {
    console.error('Login error:', error)
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
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
                        <p className="text-gray-600">Sign in to access your account</p>
                    </div>

                    {/* Login Form */}
                    <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
                        {/* Google Sign-In Button */}
                        <button
                            type="button"
                            onClick={handleGoogleButtonClick}
                            disabled={isGoogleLoading}
                            className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-6"
                        >
                            {isGoogleLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Signing in with Google...
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                    Continue with Google
                                </>
                            )}
                        </button>

                        {/* Divider */}
                        <div className="relative mb-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or continue with email</span>
                            </div>
                        </div>

                        {/* User Type Selection */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-3">Login as:</label>
                            <div className="grid grid-cols-3 gap-2">
                                <button
                                    type="button"
                                    onClick={() => setUserType('member')}
                                    className={`px-3 py-2 text-sm rounded-lg font-medium transition-colors ${userType === 'member'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    Member
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setUserType('volunteer')}
                                    className={`px-3 py-2 text-sm rounded-lg font-medium transition-colors ${userType === 'volunteer'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    Volunteer
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setUserType('admin')}
                                    className={`px-3 py-2 text-sm rounded-lg font-medium transition-colors ${userType === 'admin'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    Admin
                                </button>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    value={loginData.email}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                    placeholder="Enter your email address"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                    Password *
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    required
                                    value={loginData.password}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                    placeholder="Enter your password"
                                />
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="remember"
                                        checked={loginData.remember}
                                        onChange={handleInputChange}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                                </label>
                                <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700">
                                    Forgot password?
                                </Link>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                                    {error}
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
                                        Signing In...
                                    </>
                                ) : (
                                    'Sign In'
                                )}
                            </button>
                        </form>

                        {/* Demo Credentials */}
                        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                            <h3 className="text-sm font-medium text-gray-700 mb-2">Demo Credentials:</h3>
                            <div className="text-xs text-gray-600 space-y-1">
                                <div><strong>Member:</strong> member@ravanathalaigal.org / member123</div>
                                <div><strong>Volunteer:</strong> volunteer@ravanathalaigal.org / volunteer123</div>
                                <div><strong>Admin:</strong> admin@ravanathalaigal.org / admin123</div>
                            </div>
                        </div>

                        {/* Register Link */}
                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Don't have an account?{' '}
                                <Link href="/register" className="text-blue-600 hover:text-blue-700 font-medium">
                                    Register here
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
