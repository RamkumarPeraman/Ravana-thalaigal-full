import Link from 'next/link'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Page Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">Contact Us</h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We'd love to hear from you. Get in touch with us for any queries, suggestions, or to learn more about our work.
          </p>
        </div>

        {/* Contact Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 mb-12 sm:mb-16 lg:mb-20">
          {/* Contact Information Cards */}
          <div className="space-y-6 sm:space-y-8">
            {/* Office Address */}
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Office Address</h3>
                  <div className="text-sm sm:text-base text-gray-600 space-y-1">
                    <p>Raavana Thalaigal Trust</p>
                    <p>123 Main Street, Gandhi Nagar</p>
                    <p>Chennai - 600020</p>
                    <p>Tamil Nadu, India</p>
                  </div>
                  <div className="mt-3 sm:mt-4">
                    <a 
                      href="https://maps.google.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 text-sm sm:text-base font-medium"
                    >
                      View on Google Maps →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Phone Numbers */}
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Phone Numbers</h3>
                  <div className="space-y-2 text-sm sm:text-base">
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <span className="font-medium text-gray-700 sm:w-24">Main Office:</span>
                      <a href="tel:+914412345678" className="text-blue-600 hover:text-blue-700">+91 44 1234 5678</a>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <span className="font-medium text-gray-700 sm:w-24">Emergency:</span>
                      <a href="tel:+919876543210" className="text-red-600 hover:text-red-700">+91 98765 43210</a>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <span className="font-medium text-gray-700 sm:w-24">Donations:</span>
                      <a href="tel:+919000012345" className="text-green-600 hover:text-green-700">+91 90000 12345</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Email Addresses */}
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Email Addresses</h3>
                  <div className="space-y-2 text-sm sm:text-base">
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <span className="font-medium text-gray-700 sm:w-20">General:</span>
                      <a href="mailto:info@ravanathalaigal.org" className="text-blue-600 hover:text-blue-700 break-all">info@ravanathalaigal.org</a>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <span className="font-medium text-gray-700 sm:w-20">Donations:</span>
                      <a href="mailto:donations@ravanathalaigal.org" className="text-blue-600 hover:text-blue-700 break-all">donations@ravanathalaigal.org</a>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <span className="font-medium text-gray-700 sm:w-20">Volunteers:</span>
                      <a href="mailto:volunteers@ravanathalaigal.org" className="text-blue-600 hover:text-blue-700 break-all">volunteers@ravanathalaigal.org</a>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <span className="font-medium text-gray-700 sm:w-20">Media:</span>
                      <a href="mailto:media@ravanathalaigal.org" className="text-blue-600 hover:text-blue-700 break-all">media@ravanathalaigal.org</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Office Hours */}
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Office Hours</h3>
                  <div className="space-y-1 sm:space-y-2 text-sm sm:text-base">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Monday - Friday:</span>
                      <span className="text-gray-600">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Saturday:</span>
                      <span className="text-gray-600">9:00 AM - 2:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Sunday:</span>
                      <span className="text-gray-600">Closed</span>
                    </div>
                    <p className="text-xs sm:text-sm text-orange-600 mt-2 font-medium">
                      *Emergency services available 24/7
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Follow Us</h3>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                <a 
                  href="#" 
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                  <span className="hidden sm:inline">Twitter</span>
                </a>
                <a 
                  href="#" 
                  className="flex items-center space-x-2 bg-blue-800 hover:bg-blue-900 text-white px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span className="hidden sm:inline">Facebook</span>
                </a>
                <a 
                  href="#" 
                  className="flex items-center space-x-2 bg-pink-600 hover:bg-pink-700 text-white px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.146-1.378l.584-2.329c.214-.927.859-3.714.859-3.714-.199-.394-.859-.859-.859-2.194 0-2.058 1.539-3.597 3.456-3.597 1.633 0 2.420 1.226 2.420 2.693 0 1.639-1.043 4.095-1.582 6.37-.331 1.394.7 2.532 2.073 2.532 2.49 0 4.403-2.624 4.403-6.41 0-3.35-2.413-5.693-5.864-5.693-3.996 0-6.349 2.991-6.349 6.087 0 1.205.465 2.502 1.048 3.201.115.141.131.263.099.406-.108.443-.347 1.410-.394 1.607-.061.254-.196.309-.452.187-1.677-.779-2.724-3.228-2.724-5.19 0-4.232 3.077-8.117 8.87-8.117 4.653 0 8.270 3.318 8.270 7.756 0 4.624-2.917 8.342-6.969 8.342-1.361 0-2.642-.707-3.077-1.549l-.834 3.179c-.302 1.169-1.119 2.635-1.666 3.526 1.257.386 2.591.588 3.974.588 6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                  <span className="hidden sm:inline">Instagram</span>
                </a>
                <a 
                  href="#" 
                  className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  <span className="hidden sm:inline">YouTube</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 lg:p-10">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6">Send us a Message</h2>
            <form className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">First Name *</label>
                  <input 
                    type="text" 
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Last Name *</label>
                  <input 
                    type="text" 
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Email Address *</label>
                  <input 
                    type="email" 
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="Enter your email address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <input 
                    type="tel"
                    className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Subject *</label>
                <select 
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="donation">Donation Related</option>
                  <option value="volunteer">Volunteer Opportunity</option>
                  <option value="service">Service Request</option>
                  <option value="partnership">Partnership Opportunity</option>
                  <option value="media">Media Inquiry</option>
                  <option value="complaint">Complaint/Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Organization/Company (Optional)</label>
                <input 
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  placeholder="Enter your organization or company name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message *</label>
                <textarea 
                  required
                  rows="4"
                  className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base resize-vertical"
                  placeholder="Please describe your inquiry in detail..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">How did you hear about us?</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base">
                  <option value="">Select an option</option>
                  <option value="social_media">Social Media</option>
                  <option value="website">Website</option>
                  <option value="friend">Friend/Family</option>
                  <option value="event">Community Event</option>
                  <option value="news">News/Media</option>
                  <option value="volunteer">Current Volunteer</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="flex items-start">
                <input 
                  type="checkbox" 
                  id="newsletter" 
                  className="mt-1 mr-2 sm:mr-3"
                />
                <label htmlFor="newsletter" className="text-xs sm:text-sm text-gray-600">
                  I would like to receive updates about Raavana Thalaigal Trust activities and events
                </label>
              </div>

              <div className="flex items-start">
                <input 
                  type="checkbox" 
                  id="terms" 
                  required
                  className="mt-1 mr-2 sm:mr-3"
                />
                <label htmlFor="terms" className="text-xs sm:text-sm text-gray-600">
                  I agree to the terms and conditions and privacy policy *
                </label>
              </div>

              <button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 sm:py-4 rounded-lg font-semibold transition-colors text-sm sm:text-base"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <section className="mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-6 sm:mb-8 text-center">Find Us</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-64 sm:h-80 lg:h-96 bg-gray-200 flex items-center justify-center relative">
              <div className="text-center text-gray-500 p-4">
                <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <p className="text-base sm:text-lg font-medium mb-2">Interactive Map</p>
                <p className="text-sm sm:text-base text-gray-600 mb-4">123 Main Street, Gandhi Nagar, Chennai - 600020</p>
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-colors text-sm sm:text-base"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Contact */}
        <section className="mb-12 sm:mb-16">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 sm:p-8 lg:p-12 text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
              </svg>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-red-800 mb-2 sm:mb-4">Emergency Contact</h2>
            <p className="text-sm sm:text-base lg:text-lg text-red-700 mb-4 sm:mb-6 max-w-2xl mx-auto">
              For urgent help or emergency situations, contact us immediately
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md mx-auto">
              <a 
                href="tel:+919876543210" 
                className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-4 sm:px-6 py-3 rounded-lg font-semibold transition-colors text-sm sm:text-base text-center"
              >
                📞 Call: +91 98765 43210
              </a>
              <a 
                href="mailto:emergency@ravanathalaigal.org" 
                className="w-full sm:w-auto border border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-4 sm:px-6 py-3 rounded-lg font-semibold transition-colors text-sm sm:text-base text-center"
              >
                ✉️ Emergency Email
              </a>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-6 sm:mb-8 text-center">Frequently Asked Questions</h2>
          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold mb-2">How can I donate to Raavana Thalaigal Trust?</h3>
              <p className="text-sm sm:text-base text-gray-600">
                You can donate through our website's donation page, bank transfer, or visit our office during business hours. 
                We accept both one-time and monthly recurring donations.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold mb-2">How can I volunteer with your organization?</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Visit our volunteer page to see available opportunities and fill out the application form. 
                We have various departments where you can contribute based on your skills and interests.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold mb-2">How do I request services from your NGO?</h3>
              <p className="text-sm sm:text-base text-gray-600">
                You can request services through our services page or contact us directly. 
                We review all requests and respond based on our capacity and the urgency of the need.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold mb-2">Are donations to your trust tax-deductible?</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Yes, donations to Raavana Thalaigal Trust are eligible for tax deduction under Section 80G of the Income Tax Act. 
                We provide tax-exemption certificates for all donations.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
