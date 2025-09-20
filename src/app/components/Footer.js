import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8">
          {/* Organization Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-lg sm:text-xl font-semibold mb-4">Raavana Thalaigal Trust</h3>
            <p className="text-gray-300 mb-2 text-sm sm:text-base">Reg. No. 31/2025</p>
            <p className="text-gray-300 mb-4 text-sm sm:text-base">Serving Tamil Nadu communities with dedication and compassion.</p>
            <div className="flex space-x-3 sm:space-x-4">
              {/* Social Media Icons */}
              <a href="#" className="text-gray-300 hover:text-white transition-colors p-1">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors p-1">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors p-1">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.146-1.378l.584-2.329c.214-.927.859-3.714.859-3.714-.199-.394-.859-.859-.859-2.194 0-2.058 1.539-3.597 3.456-3.597 1.633 0 2.420 1.226 2.420 2.693 0 1.639-1.043 4.095-1.582 6.37-.331 1.394.7 2.532 2.073 2.532 2.49 0 4.403-2.624 4.403-6.41 0-3.35-2.413-5.693-5.864-5.693-3.996 0-6.349 2.991-6.349 6.087 0 1.205.465 2.502 1.048 3.201.115.141.131.263.099.406-.108.443-.347 1.410-.394 1.607-.061.254-.196.309-.452.187-1.677-.779-2.724-3.228-2.724-5.19 0-4.232 3.077-8.117 8.87-8.117 4.653 0 8.270 3.318 8.270 7.756 0 4.624-2.917 8.342-6.969 8.342-1.361 0-2.642-.707-3.077-1.549l-.834 3.179c-.302 1.169-1.119 2.635-1.666 3.526 1.257.386 2.591.588 3.974.588 6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors p-1">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="order-2 sm:order-none">
            <h3 className="text-lg sm:text-xl font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/" className="block text-gray-300 hover:text-white transition-colors text-sm sm:text-base">Home</Link>
              <Link href="/about" className="block text-gray-300 hover:text-white transition-colors text-sm sm:text-base">About Us</Link>
              <Link href="/events" className="block text-gray-300 hover:text-white transition-colors text-sm sm:text-base">Events</Link>
              <Link href="/services" className="block text-gray-300 hover:text-white transition-colors text-sm sm:text-base">Services</Link>
              <Link href="/volunteer" className="block text-gray-300 hover:text-white transition-colors text-sm sm:text-base">Volunteer</Link>
            </div>
          </div>

          {/* Services */}
          <div className="order-3 sm:order-none">
            <h3 className="text-lg sm:text-xl font-semibold mb-4">Our Services</h3>
            <div className="space-y-2">
              <Link href="/services" className="block text-gray-300 hover:text-white transition-colors text-sm sm:text-base">Education Support</Link>
              <Link href="/services" className="block text-gray-300 hover:text-white transition-colors text-sm sm:text-base">Healthcare</Link>
              <Link href="/services" className="block text-gray-300 hover:text-white transition-colors text-sm sm:text-base">Food & Nutrition</Link>
              <Link href="/services" className="block text-gray-300 hover:text-white transition-colors text-sm sm:text-base">Emergency Relief</Link>
              <Link href="/donations" className="block text-gray-300 hover:text-white transition-colors text-sm sm:text-base">Donations</Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="order-4 sm:col-span-2 lg:col-span-1 lg:order-none">
            <h3 className="text-lg sm:text-xl font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start text-gray-300">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span className="text-xs sm:text-sm">123 Main Street, Gandhi Nagar, Chennai - 600020</span>
              </div>
              <div className="flex items-center text-gray-300">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <a href="mailto:info@ravanathalaigal.org" className="text-xs sm:text-sm hover:text-white transition-colors break-all">info@ravanathalaigal.org</a>
              </div>
              <div className="flex items-center text-gray-300">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <a href="tel:+914412345678" className="text-xs sm:text-sm hover:text-white transition-colors">+91 44 1234 5678</a>
              </div>
              <div className="mt-4">
                <Link 
                  href="/contact" 
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded text-xs sm:text-sm font-semibold transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-700 pt-6 sm:pt-8 mb-6 sm:mb-8">
          <div className="max-w-lg mx-auto text-center">
            <h3 className="text-base sm:text-lg font-semibold mb-2">Stay Updated</h3>
            <p className="text-gray-300 mb-4 text-sm sm:text-base">Subscribe to our newsletter for latest updates and events</p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-colors text-sm sm:text-base whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-gray-300 text-xs sm:text-sm text-center sm:text-left">
              &copy; 2025 Raavana Thalaigal Trust. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center sm:justify-end space-x-3 sm:space-x-4 text-xs sm:text-sm">
              <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-gray-300 hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/transparency" className="text-gray-300 hover:text-white transition-colors hidden sm:inline">Financial Transparency</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
