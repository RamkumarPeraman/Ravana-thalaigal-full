'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Navigation() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isSideCanvasOpen, setIsSideCanvasOpen] = useState(false)
    const [user, setUser] = useState(null)

    // Check for user session on component mount
    useEffect(() => {
        const checkUserSession = () => {
            if (typeof window !== 'undefined') {
                const userSession = localStorage.getItem('userSession')
                if (userSession) {
                    try {
                        const parsedUser = JSON.parse(userSession)
                        console.log("ewqqw",parsedUser)
                        setUser(parsedUser)
                    } catch (error) {
                        console.error('Error parsing user session:', error)
                        localStorage.removeItem('userSession')
                    }
                }
            }
        }

        checkUserSession()

        // Listen for storage changes (when user logs in/out in another tab)
        window.addEventListener('storage', checkUserSession)

        return () => {
            window.removeEventListener('storage', checkUserSession)
        }
    }, [])

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false)
    }

    const toggleSideCanvas = () => {
        setIsSideCanvasOpen(!isSideCanvasOpen)
        if (isMobileMenuOpen) {
            setIsMobileMenuOpen(false)
        }
    }

    const closeSideCanvas = () => {
        setIsSideCanvasOpen(false)
    }

    const handleLogout = () => {
        localStorage.removeItem('userSession')
        setUser(null)
        closeSideCanvas()
        window.location.reload() // Refresh to update all components
    }

    const getUserInitials = (user) => {
        if (!user) return 'U'   
        if (user.firstName) {
            return `${user.user.firstName.charAt(0)}${user.user.lastName ? user.user.lastName.charAt(0) : ''}`.toUpperCase()
        }
        if (user.email) {
            return user.user.email.charAt(0).toUpperCase()
        }
        return 'U'
    }


    const getUserTypeColor = (userType) => {
        switch (userType) {
            case 'admin': return 'bg-red-500'
            case 'volunteer': return 'bg-green-500'
            case 'member': return 'bg-blue-500'
            default: return 'bg-gray-500'
        }
    }

    // Handle clicks outside the side canvas to close it
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            closeSideCanvas()
        }
    }

    return (
        <>
            <header className="bg-blue-700 text-white shadow-lg sticky top-0 z-50">
                <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <Link href="/" className="text-lg sm:text-xl lg:text-2xl font-bold truncate">
                            Raavana Thalaigal Trust
                        </Link>

                        <div className="flex items-center space-x-4">
                            {/* Desktop Navigation */}
                            <div className="hidden lg:flex space-x-8">
                                <Link href="/" className="hover:underline hover:text-blue-200 transition-colors">Home</Link>
                                <Link href="/about" className="hover:underline hover:text-blue-200 transition-colors">About</Link>
                                <Link href="/events" className="hover:underline hover:text-blue-200 transition-colors">Events</Link>
                                <Link href="/donations" className="hover:underline hover:text-blue-200 transition-colors">Donations</Link>
                                <Link href="/services" className="hover:underline hover:text-blue-200 transition-colors">Services</Link>
                                <Link href="/volunteer" className="hover:underline hover:text-blue-200 transition-colors">Volunteer</Link>
                                <Link href="/contact" className="hover:underline hover:text-blue-200 transition-colors">Contact</Link>
                                <Link href="/members" className="hover:underline hover:text-blue-200 transition-colors">Members</Link>
                            </div>

                            {/* Account Avatar */}
                            {/* Account Avatar */}
                            <button
                                onClick={toggleSideCanvas}
                                className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 relative overflow-hidden"
                            >
                                {user ? (
                                    <div className="w-full h-full rounded-full flex items-center justify-center relative overflow-hidden">
                                        {user.profileImage ? (
                                            <img
                                                src={user.profileImage}
                                                alt={user.name || `${user.firstName} ${user.lastName}` || user.email}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className={`w-full h-full rounded-full flex items-center justify-center text-white font-semibold text-sm sm:text-base ${getUserTypeColor(user.user.userType)}`}>
                                                {getUserInitials(user)}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                )}

                                {user && (
                                    <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-blue-700 rounded-full"></div>
                                )}
                            </button>



                            {/* Mobile Menu Button */}
                            <button
                                className="lg:hidden flex flex-col space-y-1 w-6 h-6 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded p-1"
                                onClick={toggleMobileMenu}
                                aria-label="Toggle mobile menu"
                            >
                                <div className={`w-4 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
                                <div className={`w-4 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></div>
                                <div className={`w-4 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Navigation Menu */}
                    <div className={`lg:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                        <div className="pt-4 pb-2 space-y-1">
                            <Link
                                href="/"
                                className="block py-3 px-2 hover:bg-blue-600 rounded text-sm sm:text-base transition-colors"
                                onClick={closeMobileMenu}
                            >
                                Home
                            </Link>
                            <Link
                                href="/about"
                                className="block py-3 px-2 hover:bg-blue-600 rounded text-sm sm:text-base transition-colors"
                                onClick={closeMobileMenu}
                            >
                                About
                            </Link>
                            <Link
                                href="/events"
                                className="block py-3 px-2 hover:bg-blue-600 rounded text-sm sm:text-base transition-colors"
                                onClick={closeMobileMenu}
                            >
                                Events
                            </Link>
                            <Link
                                href="/donations"
                                className="block py-3 px-2 hover:bg-blue-600 rounded text-sm sm:text-base transition-colors"
                                onClick={closeMobileMenu}
                            >
                                Donations
                            </Link>
                            <Link
                                href="/services"
                                className="block py-3 px-2 hover:bg-blue-600 rounded text-sm sm:text-base transition-colors"
                                onClick={closeMobileMenu}
                            >
                                Services
                            </Link>
                            <Link
                                href="/volunteer"
                                className="block py-3 px-2 hover:bg-blue-600 rounded text-sm sm:text-base transition-colors"
                                onClick={closeMobileMenu}
                            >
                                Volunteer
                            </Link>
                            <Link
                                href="/contact"
                                className="block py-3 px-2 hover:bg-blue-600 rounded text-sm sm:text-base transition-colors"
                                onClick={closeMobileMenu}
                            >
                                Contact
                            </Link>
                            <Link
                                href="/members"
                                className="block py-3 px-2 hover:bg-blue-600 rounded text-sm sm:text-base transition-colors"
                                onClick={closeMobileMenu}
                            >
                                Members
                            </Link>
                        </div>
                    </div>
                </nav>

                {/* Side Canvas - NO BLACK OVERLAY */}
                {isSideCanvasOpen && (
                    <div className="fixed inset-0 z-40 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            {/* Transparent overlay that closes on click */}
                            <div
                                className="absolute inset-0"
                                onClick={handleOverlayClick}
                            ></div>

                            {/* Side Canvas - positioned with higher z-index */}
                            <section className="absolute right-0 top-0 max-w-sm w-full h-full bg-white shadow-2xl z-50">
                                <div className="flex flex-col h-full">
                                    {/* Header */}
                                    <div className="bg-blue-700 text-white p-4 sm:p-6">
                                        <div className="flex items-center justify-between">
                                            <h2 className="text-lg sm:text-xl font-semibold">
                                                {user ? 'My Account' : 'Account'}
                                            </h2>
                                            <button
                                                onClick={closeSideCanvas}
                                                className="p-2 hover:bg-blue-600 rounded-full transition-colors"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>


                                        {/* User Info */}
                                        {user ? (
                                            <div className="mt-4 flex items-center space-x-3">
                                                <div className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden relative">
                                                    {user.user.profileImage ? (
                                                        <img
                                                            src={user.user.profileImage}
                                                            alt={user.user.firstName || `${user.user.firstName} ${user.user.lastName}` || user.email}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className={`w-full h-full rounded-full flex items-center justify-center text-white font-semibold text-lg ${getUserTypeColor(user.userType)}`}>
                                                            {getUserInitials(user.user.firstName)}
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-medium">{user.name || `${user.user.firstName} ${user.user.lastName}` || (user.user.email ? user.email.split('@')[0] : 'User')}</p>
                                                    <p className="text-sm text-blue-200 capitalize">{user.user.userType?.toLowerCase() || 'member'}</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="mt-4 flex items-center space-x-3">
                                                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                                                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p className="font-medium">Guest User</p>
                                                    <p className="text-sm text-blue-200">Not logged in</p>
                                                </div>
                                            </div>
                                        )}


                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 overflow-y-auto">
                                        {user ? (
                                            /* Logged In User Menu */
                                            <div className="p-4 sm:p-6">
                                                <nav className="space-y-2">
                                                    <Link
                                                        href="/dashboard"
                                                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors"
                                                        onClick={closeSideCanvas}
                                                    >
                                                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5v6l-1-1m0 0l-1 1m1-1V5" />
                                                        </svg>
                                                        Dashboard
                                                    </Link>


                                                    <Link
                                                        href="/profile"
                                                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors"
                                                        onClick={closeSideCanvas}
                                                    >
                                                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                        </svg>
                                                        My Profile
                                                    </Link>

                                                    <Link
                                                        href="/my-donations"
                                                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors"
                                                        onClick={closeSideCanvas}
                                                    >
                                                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        My Donations
                                                    </Link>

                                                    <Link
                                                        href="/my-activities"
                                                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors"
                                                        onClick={closeSideCanvas}
                                                    >
                                                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                                        </svg>
                                                        My Activities
                                                    </Link>

                                                    <Link
                                                        href="/settings"
                                                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors"
                                                        onClick={closeSideCanvas}
                                                    >
                                                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                        Settings
                                                    </Link>

                                                    <hr className="my-4 border-gray-200" />

                                                    <button
                                                        onClick={handleLogout}
                                                        className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    >
                                                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                        </svg>
                                                        Logout
                                                    </button>
                                                </nav>
                                            </div>
                                        ) : (
                                            /* Guest User Menu */
                                            <div className="p-4 sm:p-6">
                                                <div className="text-center mb-6">
                                                    <h3 className="text-lg font-medium text-gray-900 mb-2">Welcome to Raavana Thalaigal Trust</h3>
                                                    <p className="text-sm text-gray-600">Login to access your account and participate in our programs</p>
                                                </div>

                                                <div className="space-y-3">
                                                    <Link
                                                        href="/login"
                                                        className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 px-4 rounded-lg font-semibold transition-colors"
                                                        onClick={closeSideCanvas}
                                                    >
                                                        Login
                                                    </Link>

                                                    <Link
                                                        href="/register"
                                                        className="block w-full border border-blue-600 text-blue-600 hover:bg-blue-50 text-center py-3 px-4 rounded-lg font-semibold transition-colors"
                                                        onClick={closeSideCanvas}
                                                    >
                                                        Register
                                                    </Link>
                                                </div>

                                                <hr className="my-6 border-gray-200" />

                                                <div className="space-y-2">
                                                    <h4 className="text-sm font-medium text-gray-700 mb-3">Quick Links</h4>

                                                    <Link
                                                        href="/donations"
                                                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors"
                                                        onClick={closeSideCanvas}
                                                    >
                                                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        Make a Donation
                                                    </Link>

                                                    <Link
                                                        href="/volunteer"
                                                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors"
                                                        onClick={closeSideCanvas}
                                                    >
                                                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                        </svg>
                                                        Become a Volunteer
                                                    </Link>

                                                    <Link
                                                        href="/events"
                                                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors"
                                                        onClick={closeSideCanvas}
                                                    >
                                                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m-3 8a3 3 0 100-6 3 3 0 000 6z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        View Events
                                                    </Link>

                                                    <Link
                                                        href="/services"
                                                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors"
                                                        onClick={closeSideCanvas}
                                                    >
                                                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                        </svg>
                                                        Request Services
                                                    </Link>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Footer */}
                                    <div className="p-4 sm:p-6 border-t border-gray-200">
                                        <div className="text-center">
                                            <p className="text-xs text-gray-500">
                                                &copy; 2025 Raavana Thalaigal Trust
                                            </p>
                                            <p className="text-xs text-gray-400 mt-1">
                                                Reg. No. 31/2025
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                )}
            </header>
        </>
    )
}
