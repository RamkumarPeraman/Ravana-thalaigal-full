'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        dateOfBirth: '',
        gender: '',
        address: '',
        city: '',
        state: 'Tamil Nadu',
        pincode: '',
        occupation: '',
        organization: '',
        userType: 'member', // member, volunteer
        interests: [],
        howDidYouHear: '',
        emergencyContactName: '',
        emergencyContactPhone: '',
        agreeTerms: false,
        agreePrivacy: false,
        subscribeNewsletter: true
    })

    const [currentStep, setCurrentStep] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const router = useRouter()

    const totalSteps = 3

    // Interest options
    const interestOptions = [
        'Education Support',
        'Healthcare Services',
        'Women Empowerment',
        'Emergency Relief',
        'Environmental Conservation',
        'Community Development',
        'Food & Nutrition',
        'Skill Development',
        'Child Welfare',
        'Elder Care'
    ]

    // How did you hear options
    const hearAboutOptions = [
        'Social Media',
        'Google Search',
        'Friend/Family',
        'Community Event',
        'News/Media',
        'Volunteer',
        'Website',
        'Other NGOs',
        'Government Program',
        'Other'
    ]

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target

        if (name === 'interests') {
            if (checked) {
                setFormData(prev => ({
                    ...prev,
                    interests: [...prev.interests, value]
                }))
            } else {
                setFormData(prev => ({
                    ...prev,
                    interests: prev.interests.filter(interest => interest !== value)
                }))
            }
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }))
        }

        // Clear specific error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }
    }

    const validateStep = (step) => {
        const newErrors = {}

        if (step === 1) {
            if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
            if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
            if (!formData.email.trim()) newErrors.email = 'Email is required'
            else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
            if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
            else if (!/^[0-9]{10}$/.test(formData.phone.replace(/[^\d]/g, ''))) {
                newErrors.phone = 'Phone number must be 10 digits'
            }
            if (!formData.password) newErrors.password = 'Password is required'
            else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters'
            if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm password'
            else if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match'
            }
        }

        if (step === 2) {
            if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required'
            if (!formData.gender) newErrors.gender = 'Gender is required'
            if (!formData.address.trim()) newErrors.address = 'Address is required'
            if (!formData.city.trim()) newErrors.city = 'City is required'
            if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required'
            else if (!/^[0-9]{6}$/.test(formData.pincode)) newErrors.pincode = 'Pincode must be 6 digits'
        }

        if (step === 3) {
            if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to the terms and conditions'
            if (!formData.agreePrivacy) newErrors.agreePrivacy = 'You must agree to the privacy policy'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleNext = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => Math.min(prev + 1, totalSteps))
        }
    }

    const handlePrevious = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1))
    }

    // const handleSubmit = async (e) => {
    //     e.preventDefault()

    //     if (!validateStep(currentStep)) {
    //         return
    //     }

    //     setIsLoading(true)

    //     // Simulate API call (replace with actual registration logic)
    //     setTimeout(() => {
    //         console.log('Registration data:', formData)

    //         // Create user session (in real app, this would be handled by backend)
    //         const userSession = {
    //             email: formData.email,
    //             userType: formData.userType,
    //             loginTime: new Date().toISOString(),
    //             name: `${formData.firstName} ${formData.lastName}`
    //         }

    //         localStorage.setItem('userSession', JSON.stringify(userSession))

    //         setIsLoading(false)

    //         // Redirect based on user type
    //         if (formData.userType === 'volunteer') {
    //             router.push('/volunteer-dashboard')
    //         } else {
    //             router.push('/members')
    //         }
    //     }, 2000)
    // }
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateStep(currentStep)) {
            return
        }

        setIsLoading(true)

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    password: formData.password,
                    phone: formData.phone,
                    dateOfBirth: formData.dateOfBirth,
                    gender: formData.gender,
                    address: {
                        street: formData.address,
                        city: formData.city,
                        state: formData.state,
                        pincode: formData.pincode
                    },
                    occupation: formData.occupation,
                    organization: formData.organization,
                    userType: formData.userType,
                    interests: formData.interests,
                    howDidYouHear: formData.howDidYouHear,
                    emergencyContact: {
                        name: formData.emergencyContactName,
                        phone: formData.emergencyContactPhone
                    },
                    subscribeNewsletter: formData.subscribeNewsletter
                })
            })

            const data = await response.json()

            if (data.success) {
                // Store user session
                localStorage.setItem('userSession', JSON.stringify({
                    user: data.user,
                    token: data.token,
                    loginTime: new Date().toISOString(),
                    loginMethod: 'email'
                }))

                // Redirect based on user type
                if (data.user.userType === 'VOLUNTEER') {
                    router.push('/volunteer-dashboard')
                } else {
                    router.push('/members')
                }
            } else {
                setErrors({ general: data.message || 'Registration failed' })
            }
        } catch (error) {
            console.error('Registration error:', error)
            setErrors({ general: 'Network error. Please try again.' })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navigation />

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                <div className="max-w-2xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Join Our Community</h1>
                        <p className="text-gray-600">Create your account to start making a difference</p>
                    </div>

                    {/* Progress Indicator */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between">
                            {[1, 2, 3].map((step) => (
                                <div key={step} className="flex items-center">
                                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm font-medium ${currentStep >= step
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-300 text-gray-600'
                                        }`}>
                                        {currentStep > step ? (
                                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                        ) : (
                                            step
                                        )}
                                    </div>
                                    {step < 3 && (
                                        <div className={`flex-1 h-1 mx-2 sm:mx-4 ${currentStep > step ? 'bg-blue-600' : 'bg-gray-300'
                                            }`}></div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-2 text-xs sm:text-sm text-gray-600">
                            <span>Basic Info</span>
                            <span>Personal Details</span>
                            <span>Preferences</span>
                        </div>
                    </div>

                    {/* Registration Form */}
                    <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
                        <form onSubmit={handleSubmit}>
                            {/* Step 1: Basic Information */}
                            {currentStep === 1 && (
                                <div className="space-y-6">
                                    <h2 className="text-xl font-semibold mb-4">Basic Information</h2>

                                    {/* User Type Selection */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">I want to join as:</label>
                                        <div className="grid grid-cols-2 gap-4">
                                            <button
                                                type="button"
                                                onClick={() => setFormData(prev => ({ ...prev, userType: 'member' }))}
                                                className={`p-4 rounded-lg border-2 text-left transition-colors ${formData.userType === 'member'
                                                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                                                    : 'border-gray-300 hover:border-gray-400'
                                                    }`}
                                            >
                                                <div className="font-medium">Member</div>
                                                <div className="text-sm text-gray-600">Support through donations and participation</div>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setFormData(prev => ({ ...prev, userType: 'volunteer' }))}
                                                className={`p-4 rounded-lg border-2 text-left transition-colors ${formData.userType === 'volunteer'
                                                    ? 'border-green-600 bg-green-50 text-green-700'
                                                    : 'border-gray-300 hover:border-gray-400'
                                                    }`}
                                            >
                                                <div className="font-medium">Volunteer</div>
                                                <div className="text-sm text-gray-600">Active participation in programs and activities</div>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Name Fields */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                                                First Name *
                                            </label>
                                            <input
                                                type="text"
                                                id="firstName"
                                                name="firstName"
                                                required
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.firstName ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                                placeholder="Enter your first name"
                                            />
                                            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                                                Last Name *
                                            </label>
                                            <input
                                                type="text"
                                                id="lastName"
                                                name="lastName"
                                                required
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.lastName ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                                placeholder="Enter your last name"
                                            />
                                            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                                        </div>
                                    </div>

                                    {/* Email and Phone */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                required
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.email ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                                placeholder="Enter your email address"
                                            />
                                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                                Phone Number *
                                            </label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                required
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.phone ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                                placeholder="Enter your phone number"
                                            />
                                            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                                        </div>
                                    </div>

                                    {/* Password Fields */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                                Password *
                                            </label>
                                            <input
                                                type="password"
                                                id="password"
                                                name="password"
                                                required
                                                value={formData.password}
                                                onChange={handleInputChange}
                                                className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.password ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                                placeholder="Create a password"
                                            />
                                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                                Confirm Password *
                                            </label>
                                            <input
                                                type="password"
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                required
                                                value={formData.confirmPassword}
                                                onChange={handleInputChange}
                                                className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                                placeholder="Confirm your password"
                                            />
                                            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Personal Details */}
                            {currentStep === 2 && (
                                <div className="space-y-6">
                                    <h2 className="text-xl font-semibold mb-4">Personal Details</h2>

                                    {/* Date of Birth and Gender */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-2">
                                                Date of Birth *
                                            </label>
                                            <input
                                                type="date"
                                                id="dateOfBirth"
                                                name="dateOfBirth"
                                                required
                                                value={formData.dateOfBirth}
                                                onChange={handleInputChange}
                                                className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                            />
                                            {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                                                Gender *
                                            </label>
                                            <select
                                                id="gender"
                                                name="gender"
                                                required
                                                value={formData.gender}
                                                onChange={handleInputChange}
                                                className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.gender ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                            >
                                                <option value="">Select gender</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="other">Other</option>
                                                <option value="prefer-not-to-say">Prefer not to say</option>
                                            </select>
                                            {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
                                        </div>
                                    </div>

                                    {/* Address */}
                                    <div>
                                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                                            Address *
                                        </label>
                                        <textarea
                                            id="address"
                                            name="address"
                                            required
                                            rows="3"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.address ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            placeholder="Enter your complete address"
                                        />
                                        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                                    </div>

                                    {/* City, State, Pincode */}
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div>
                                            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                                                City *
                                            </label>
                                            <input
                                                type="text"
                                                id="city"
                                                name="city"
                                                required
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.city ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                                placeholder="Enter your city"
                                            />
                                            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                                                State *
                                            </label>
                                            <select
                                                id="state"
                                                name="state"
                                                required
                                                value={formData.state}
                                                onChange={handleInputChange}
                                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            >
                                                <option value="Tamil Nadu">Tamil Nadu</option>
                                                <option value="Karnataka">Karnataka</option>
                                                <option value="Kerala">Kerala</option>
                                                <option value="Andhra Pradesh">Andhra Pradesh</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-2">
                                                Pincode *
                                            </label>
                                            <input
                                                type="text"
                                                id="pincode"
                                                name="pincode"
                                                required
                                                value={formData.pincode}
                                                onChange={handleInputChange}
                                                className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.pincode ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                                placeholder="Enter pincode"
                                            />
                                            {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>}
                                        </div>
                                    </div>

                                    {/* Occupation and Organization */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="occupation" className="block text-sm font-medium text-gray-700 mb-2">
                                                Occupation
                                            </label>
                                            <input
                                                type="text"
                                                id="occupation"
                                                name="occupation"
                                                value={formData.occupation}
                                                onChange={handleInputChange}
                                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Enter your occupation"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-2">
                                                Organization/Company
                                            </label>
                                            <input
                                                type="text"
                                                id="organization"
                                                name="organization"
                                                value={formData.organization}
                                                onChange={handleInputChange}
                                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Enter your organization"
                                            />
                                        </div>
                                    </div>

                                    {/* Emergency Contact */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="emergencyContactName" className="block text-sm font-medium text-gray-700 mb-2">
                                                Emergency Contact Name
                                            </label>
                                            <input
                                                type="text"
                                                id="emergencyContactName"
                                                name="emergencyContactName"
                                                value={formData.emergencyContactName}
                                                onChange={handleInputChange}
                                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Enter emergency contact name"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="emergencyContactPhone" className="block text-sm font-medium text-gray-700 mb-2">
                                                Emergency Contact Phone
                                            </label>
                                            <input
                                                type="tel"
                                                id="emergencyContactPhone"
                                                name="emergencyContactPhone"
                                                value={formData.emergencyContactPhone}
                                                onChange={handleInputChange}
                                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Enter emergency contact phone"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Preferences */}
                            {currentStep === 3 && (
                                <div className="space-y-6">
                                    <h2 className="text-xl font-semibold mb-4">Preferences & Interests</h2>

                                    {/* Areas of Interest */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">
                                            Areas of Interest (Select all that apply)
                                        </label>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                            {interestOptions.map((interest) => (
                                                <label key={interest} className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        name="interests"
                                                        value={interest}
                                                        checked={formData.interests.includes(interest)}
                                                        onChange={handleInputChange}
                                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                    />
                                                    <span className="ml-2 text-sm text-gray-700">{interest}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* How did you hear about us */}
                                    <div>
                                        <label htmlFor="howDidYouHear" className="block text-sm font-medium text-gray-700 mb-2">
                                            How did you hear about us?
                                        </label>
                                        <select
                                            id="howDidYouHear"
                                            name="howDidYouHear"
                                            value={formData.howDidYouHear}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        >
                                            <option value="">Select an option</option>
                                            {hearAboutOptions.map((option) => (
                                                <option key={option} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Newsletter Subscription */}
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="subscribeNewsletter"
                                            name="subscribeNewsletter"
                                            checked={formData.subscribeNewsletter}
                                            onChange={handleInputChange}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="subscribeNewsletter" className="ml-2 text-sm text-gray-700">
                                            Subscribe to our newsletter for updates about events and activities
                                        </label>
                                    </div>

                                    {/* Terms and Privacy */}
                                    <div className="space-y-3">
                                        <div className="flex items-start">
                                            <input
                                                type="checkbox"
                                                id="agreeTerms"
                                                name="agreeTerms"
                                                checked={formData.agreeTerms}
                                                onChange={handleInputChange}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-0.5"
                                            />
                                            <label htmlFor="agreeTerms" className="ml-2 text-sm text-gray-700">
                                                I agree to the{' '}
                                                <Link href="/terms" className="text-blue-600 hover:text-blue-700 underline">
                                                    Terms and Conditions
                                                </Link>{' '}
                                                *
                                            </label>
                                        </div>
                                        {errors.agreeTerms && <p className="text-red-500 text-sm">{errors.agreeTerms}</p>}

                                        <div className="flex items-start">
                                            <input
                                                type="checkbox"
                                                id="agreePrivacy"
                                                name="agreePrivacy"
                                                checked={formData.agreePrivacy}
                                                onChange={handleInputChange}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-0.5"
                                            />
                                            <label htmlFor="agreePrivacy" className="ml-2 text-sm text-gray-700">
                                                I agree to the{' '}
                                                <Link href="/privacy" className="text-blue-600 hover:text-blue-700 underline">
                                                    Privacy Policy
                                                </Link>{' '}
                                                *
                                            </label>
                                        </div>
                                        {errors.agreePrivacy && <p className="text-red-500 text-sm">{errors.agreePrivacy}</p>}
                                    </div>
                                </div>
                            )}

                            {/* Navigation Buttons */}
                            <div className="flex justify-between pt-6 mt-8 border-t border-gray-200">
                                <button
                                    type="button"
                                    onClick={handlePrevious}
                                    disabled={currentStep === 1}
                                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    Previous
                                </button>

                                {currentStep < totalSteps ? (
                                    <button
                                        type="button"
                                        onClick={handleNext}
                                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                                    >
                                        Next Step
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                                    >
                                        {isLoading ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Creating Account...
                                            </>
                                        ) : (
                                            'Create Account'
                                        )}
                                    </button>
                                )}
                            </div>
                        </form>

                        {/* Already have account */}
                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Already have an account?{' '}
                                <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                                    Sign in here
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
