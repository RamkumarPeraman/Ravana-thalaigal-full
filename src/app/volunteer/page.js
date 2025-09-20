'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

export default function VolunteerPage() {
  const [user, setUser] = useState(null)
  const [showApplicationForm, setShowApplicationForm] = useState(false)
  const [selectedOpportunity, setSelectedOpportunity] = useState(null)
  const [applicationData, setApplicationData] = useState({
    volunteerType: 'event',
    skills: [],
    availability: [],
    experience: '',
    motivation: '',
    emergencyContact: '',
    hasTransportation: false,
    canTravel: false,
    preferredLocation: '',
    languages: [],
    previousVolunteering: '',
    references: '',
    commitment: 'flexible'
  })
  const [activeTab, setActiveTab] = useState('opportunities')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  // Volunteer opportunities with detailed information
  const volunteerOpportunities = {
    education: {
      title: 'Education Support',
      icon: '🎓',
      color: 'bg-blue-500',
      description: 'Help provide quality education to underprivileged children',
      longDescription: 'Join our education team to make a lasting impact on children\'s lives. We need passionate volunteers to assist with teaching, curriculum development, educational resource creation, and mentoring programs.',
      roles: [
        {
          title: 'Teaching Assistant',
          commitment: '4-6 hours/week',
          requirements: 'Basic education, patience, good communication',
          description: 'Assist teachers in classrooms, help with homework, and provide individual attention to students.'
        },
        {
          title: 'Computer Literacy Trainer',
          commitment: '3-5 hours/week',
          requirements: 'Computer skills, patience, teaching ability',
          description: 'Teach basic computer skills to children and adults in rural communities.'
        },
        {
          title: 'Academic Mentor',
          commitment: '2-4 hours/week',
          requirements: 'Subject expertise, mentoring experience preferred',
          description: 'Provide one-on-one mentoring and academic guidance to students.'
        },
        {
          title: 'Library Coordinator',
          commitment: '3-6 hours/week',
          requirements: 'Organizational skills, love for books',
          description: 'Manage community libraries, organize reading programs, and maintain book collections.'
        }
      ],
      impact: '1,200+ students supported',
      volunteers: 45,
      locations: ['Chennai', 'Madurai', 'Coimbatore', 'Salem']
    },
    healthcare: {
      title: 'Healthcare Support',
      icon: '🏥',
      color: 'bg-red-500',
      description: 'Support healthcare initiatives in underserved communities',
      longDescription: 'Be part of our healthcare mission to bring medical services to remote areas. We organize medical camps, health awareness programs, and preventive care initiatives.',
      roles: [
        {
          title: 'Medical Camp Volunteer',
          commitment: '8-10 hours/event',
          requirements: 'Basic first aid knowledge preferred, physical fitness',
          description: 'Assist doctors and nurses during medical camps, help with patient registration and crowd management.'
        },
        {
          title: 'Health Awareness Coordinator',
          commitment: '4-8 hours/week',
          requirements: 'Good communication, health knowledge',
          description: 'Conduct health awareness sessions in communities about hygiene, nutrition, and preventive care.'
        },
        {
          title: 'Mobile Clinic Assistant',
          commitment: '6-8 hours/week',
          requirements: 'Medical background preferred, flexibility',
          description: 'Support mobile healthcare units visiting remote villages.'
        },
        {
          title: 'Mental Health Support',
          commitment: '3-5 hours/week',
          requirements: 'Psychology background, counseling skills',
          description: 'Provide mental health support and counseling to community members.'
        }
      ],
      impact: '850+ patients served monthly',
      volunteers: 32,
      locations: ['Rural Tamil Nadu', 'Tribal Areas', 'Urban Slums']
    },
    environment: {
      title: 'Environmental Conservation',
      icon: '🌱',
      color: 'bg-green-500',
      description: 'Protect and restore our environment for future generations',
      longDescription: 'Join our green movement to combat climate change and protect biodiversity. Participate in tree plantation drives, waste management programs, and environmental education.',
      roles: [
        {
          title: 'Tree Plantation Coordinator',
          commitment: '6-8 hours/event',
          requirements: 'Physical fitness, outdoor work enthusiasm',
          description: 'Organize and lead tree plantation drives in various locations.'
        },
        {
          title: 'Waste Management Volunteer',
          commitment: '4-6 hours/week',
          requirements: 'Community engagement skills, environmental awareness',
          description: 'Implement waste segregation programs and educate communities about sustainable practices.'
        },
        {
          title: 'Environmental Educator',
          commitment: '3-5 hours/week',
          requirements: 'Teaching skills, environmental knowledge',
          description: 'Conduct environmental awareness programs in schools and communities.'
        },
        {
          title: 'Water Conservation Specialist',
          commitment: '5-7 hours/week',
          requirements: 'Technical knowledge, project management',
          description: 'Implement rainwater harvesting and water conservation projects.'
        }
      ],
      impact: '25,000+ trees planted',
      volunteers: 28,
      locations: ['Chennai', 'Kanchipuram', 'Tiruvallur']
    },
    elderly: {
      title: 'Elderly Care',
      icon: '👴',
      color: 'bg-purple-500',
      description: 'Provide companionship and support to senior citizens',
      longDescription: 'Bring joy and support to elderly community members through companionship programs, health monitoring, and social activities.',
      roles: [
        {
          title: 'Companion Volunteer',
          commitment: '2-4 hours/week',
          requirements: 'Patience, empathy, good listening skills',
          description: 'Spend time with elderly individuals, engage in conversations, and provide emotional support.'
        },
        {
          title: 'Health Monitor',
          commitment: '3-5 hours/week',
          requirements: 'Basic health knowledge, responsibility',
          description: 'Help monitor health indicators and remind seniors about medications and appointments.'
        },
        {
          title: 'Activity Coordinator',
          commitment: '4-6 hours/week',
          requirements: 'Creativity, organizational skills',
          description: 'Organize recreational activities, games, and social events for elderly groups.'
        },
        {
          title: 'Technology Teacher',
          commitment: '2-3 hours/week',
          requirements: 'Tech savviness, patience',
          description: 'Teach senior citizens how to use smartphones, video calling, and digital services.'
        }
      ],
      impact: '180+ seniors supported',
      volunteers: 15,
      locations: ['Senior Centers', 'Old Age Homes', 'Home Visits']
    },
    emergency: {
      title: 'Emergency Response',
      icon: '🆘',
      color: 'bg-orange-500',
      description: 'Provide immediate relief during disasters and emergencies',
      longDescription: 'Be part of our rapid response team that provides immediate relief during natural disasters, emergencies, and crisis situations.',
      roles: [
        {
          title: 'Relief Coordinator',
          commitment: 'On-call basis',
          requirements: 'Crisis management skills, leadership',
          description: 'Coordinate relief efforts during emergencies and manage volunteer teams.'
        },
        {
          title: 'Supply Chain Volunteer',
          commitment: 'Flexible hours during emergencies',
          requirements: 'Organizational skills, physical strength',
          description: 'Manage and distribute relief supplies to affected communities.'
        },
        {
          title: 'Communication Specialist',
          commitment: 'On-call basis',
          requirements: 'Communication skills, social media knowledge',
          description: 'Handle emergency communications and coordinate with media and authorities.'
        },
        {
          title: 'Field Assessment Volunteer',
          commitment: 'Variable hours',
          requirements: 'Analytical skills, willingness to travel',
          description: 'Assess damage and needs in disaster-affected areas.'
        }
      ],
      impact: '600+ families helped during emergencies',
      volunteers: 20,
      locations: ['Disaster-prone areas', 'Emergency zones']
    },
    administrative: {
      title: 'Administrative Support',
      icon: '📋',
      color: 'bg-indigo-500',
      description: 'Support our operations behind the scenes',
      longDescription: 'Help us run our operations smoothly through administrative support, event coordination, fundraising, and organizational development.',
      roles: [
        {
          title: 'Event Coordinator',
          commitment: '5-10 hours/week',
          requirements: 'Event planning experience, organizational skills',
          description: 'Plan and coordinate fundraising events, awareness campaigns, and community gatherings.'
        },
        {
          title: 'Social Media Manager',
          commitment: '3-5 hours/week',
          requirements: 'Social media expertise, content creation',
          description: 'Manage our social media presence and create engaging content.'
        },
        {
          title: 'Grant Writer',
          commitment: '4-8 hours/week',
          requirements: 'Writing skills, research ability',
          description: 'Research and write grant proposals to secure funding for our programs.'
        },
        {
          title: 'Volunteer Coordinator',
          commitment: '6-8 hours/week',
          requirements: 'People management, communication skills',
          description: 'Recruit, train, and coordinate volunteers across different programs.'
        }
      ],
      impact: '200+ volunteers coordinated',
      volunteers: 12,
      locations: ['Office-based', 'Remote work possible']
    }
  }

  // Volunteer testimonials
  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Education Volunteer',
      duration: '2 years',
      image: null,
      testimonial: 'Volunteering with Raavana Thalaigal Trust has been the most rewarding experience of my life. Seeing the children\'s faces light up when they learn something new is priceless. I\'ve grown as much as I\'ve helped others grow.',
      location: 'Chennai'
    },
    {
      name: 'Rajesh Kumar',
      role: 'Healthcare Volunteer',
      duration: '18 months',
      image: null,
      testimonial: 'Being part of the medical camps has opened my eyes to the healthcare challenges in rural areas. Every weekend spent helping patients gives me immense satisfaction and purpose.',
      location: 'Madurai'
    },
    {
      name: 'Meera Nair',
      role: 'Environmental Volunteer',
      duration: '3 years',
      image: null,
      testimonial: 'Through the tree plantation drives, I\'ve learned so much about environmental conservation. It\'s amazing to see how a small group of dedicated volunteers can make such a big impact on climate change.',
      location: 'Coimbatore'
    },
    {
      name: 'Arun Krishnan',
      role: 'Elderly Care Volunteer',
      duration: '1 year',
      image: null,
      testimonial: 'The wisdom and stories I\'ve learned from the elderly have enriched my life tremendously. Providing companionship to seniors has taught me patience, empathy, and the value of human connection.',
      location: 'Salem'
    }
  ]

  // Skills options
  const skillsOptions = [
    'Teaching/Training', 'Medical/Healthcare', 'Counseling', 'Event Planning', 
    'Project Management', 'Social Media', 'Writing/Content Creation', 'Photography',
    'Graphic Design', 'Web Development', 'Fundraising', 'Public Speaking',
    'Languages', 'Cooking', 'Driving', 'First Aid', 'Computer Skills', 'Music/Arts'
  ]

  // Availability options
  const availabilityOptions = [
    'Weekday Mornings', 'Weekday Evenings', 'Weekend Mornings', 'Weekend Evenings',
    'Weekends Full Day', 'Flexible Hours', 'Emergency On-call'
  ]

  // Language options
  const languageOptions = [
    'Tamil', 'English', 'Hindi', 'Telugu', 'Kannada', 'Malayalam', 'Urdu'
  ]

  useEffect(() => {
    const userSession = localStorage.getItem('userSession')
    if (userSession) {
      const parsedUser = JSON.parse(userSession)
      setUser(parsedUser.user)
      
      // Pre-fill some form data if user is logged in
      setApplicationData(prev => ({
        ...prev,
        name: `${parsedUser.user.firstName} ${parsedUser.user.lastName}`,
        email: parsedUser.user.email,
        phone: parsedUser.user.phone || '',
        address: parsedUser.user.street || ''
      }))
    }
  }, [])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    if (type === 'checkbox') {
      setApplicationData(prev => ({ ...prev, [name]: checked }))
    } else {
      setApplicationData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleMultiSelectChange = (field, value) => {
    setApplicationData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }))
  }

  const handleApplicationSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))

      // TODO: Send application to backend
      console.log('Volunteer application submitted:', applicationData)

      alert('Thank you for your interest in volunteering! We will contact you within 48 hours.')
      setShowApplicationForm(false)
      
      // Reset form
      setApplicationData({
        volunteerType: 'event',
        skills: [],
        availability: [],
        experience: '',
        motivation: '',
        emergencyContact: '',
        hasTransportation: false,
        canTravel: false,
        preferredLocation: '',
        languages: [],
        previousVolunteering: '',
        references: '',
        commitment: 'flexible'
      })

    } catch (error) {
      console.error('Application error:', error)
      alert('Failed to submit application. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg shadow-lg p-8 sm:p-12 mb-12 text-white text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Join Our Volunteer Family
          </h1>
          <p className="text-lg sm:text-xl text-green-100 mb-8 max-w-3xl mx-auto">
            Make a meaningful difference in your community. Whether you have 2 hours or 20 hours a week, 
            your contribution can transform lives and create lasting change across Tamil Nadu.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowApplicationForm(true)}
              className="bg-white text-green-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-50 transition-colors"
            >
              🤝 Become a Volunteer
            </button>
            <Link
              href="#opportunities"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-green-600 transition-colors"
            >
              🎯 View Opportunities
            </Link>
          </div>
        </div>

        {/* Impact Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
            <div className="text-3xl font-bold text-green-600 mb-2">152</div>
            <div className="text-gray-600">Active Volunteers</div>
            <div className="text-xs text-gray-500 mt-1">Across 6 programs</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
            <div className="text-3xl font-bold text-blue-600 mb-2">2,800+</div>
            <div className="text-gray-600">Volunteer Hours</div>
            <div className="text-xs text-gray-500 mt-1">This month</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
            <div className="text-3xl font-bold text-purple-600 mb-2">5,600</div>
            <div className="text-gray-600">Lives Impacted</div>
            <div className="text-xs text-gray-500 mt-1">By our volunteers</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
            <div className="text-3xl font-bold text-orange-600 mb-2">96%</div>
            <div className="text-gray-600">Satisfaction Rate</div>
            <div className="text-xs text-gray-500 mt-1">Volunteer feedback</div>
          </div>
        </div>

        {/* Main Content Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-12">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'opportunities', label: 'Opportunities', icon: '🎯' },
                { id: 'testimonials', label: 'Testimonials', icon: '💬' },
                { id: 'training', label: 'Training', icon: '📚' },
                { id: 'faq', label: 'FAQ', icon: '❓' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Opportunities Tab */}
            {activeTab === 'opportunities' && (
              <section id="opportunities">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Volunteer Opportunities</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {Object.entries(volunteerOpportunities).map(([key, opportunity]) => (
                    <div key={key} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start mb-4">
                        <div className={`${opportunity.color} rounded-lg p-3 mr-4`}>
                          <span className="text-2xl">{opportunity.icon}</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{opportunity.title}</h3>
                          <p className="text-gray-600">{opportunity.description}</p>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4">{opportunity.longDescription}</p>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                        <div className="text-center">
                          <div className="font-semibold text-gray-900">{opportunity.volunteers}</div>
                          <div className="text-xs text-gray-600">Volunteers</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-gray-900">{opportunity.roles.length}</div>
                          <div className="text-xs text-gray-600">Roles</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-gray-900">{opportunity.locations.length}</div>
                          <div className="text-xs text-gray-600">Locations</div>
                        </div>
                      </div>

                      {/* Impact */}
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                        <div className="flex items-center text-green-700">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                          </svg>
                          <span className="text-sm font-medium">Impact: {opportunity.impact}</span>
                        </div>
                      </div>

                      {/* Available Roles */}
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Available Roles:</h4>
                        <div className="space-y-2">
                          {opportunity.roles.slice(0, 2).map((role, index) => (
                            <div key={index} className="text-sm">
                              <span className="font-medium text-blue-600">{role.title}</span>
                              <span className="text-gray-600"> - {role.commitment}</span>
                            </div>
                          ))}
                          {opportunity.roles.length > 2 && (
                            <div className="text-sm text-gray-500">
                              +{opportunity.roles.length - 2} more roles available
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Locations */}
                      <div className="mb-4">
                        <div className="flex items-center mb-2">
                          <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                          </svg>
                          <span className="text-sm font-medium text-gray-700">Locations:</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {opportunity.locations.map((location, index) => (
                            <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                              {location}
                            </span>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedOpportunity(key)
                          setApplicationData(prev => ({ ...prev, volunteerType: key }))
                          setShowApplicationForm(true)
                        }}
                        className={`w-full ${opportunity.color} text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity`}
                      >
                        Apply for {opportunity.title}
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Testimonials Tab */}
            {activeTab === 'testimonials' && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-8">What Our Volunteers Say</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                          <p className="text-sm text-blue-600">{testimonial.role}</p>
                          <p className="text-xs text-gray-500">{testimonial.duration} • {testimonial.location}</p>
                        </div>
                      </div>
                      
                      <blockquote className="text-gray-700 italic">
                        "{testimonial.testimonial}"
                      </blockquote>
                      
                      <div className="flex text-yellow-400 mt-4">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                          </svg>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Call to Action */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8 text-center">
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">Ready to Make a Difference?</h3>
                  <p className="text-blue-700 mb-4">Join our amazing community of volunteers and create your own success story.</p>
                  <button
                    onClick={() => setShowApplicationForm(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Start Your Volunteer Journey
                  </button>
                </div>
              </section>
            )}

            {/* Training Tab */}
            {activeTab === 'training' && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Volunteer Training & Development</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <div className="space-y-8">
                      {/* Orientation Program */}
                      <div className="border border-gray-200 rounded-lg p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">📚 Orientation Program</h3>
                        <p className="text-gray-700 mb-4">
                          All new volunteers complete a comprehensive orientation program to understand our mission, 
                          values, and working methods.
                        </p>
                        <div className="bg-blue-50 rounded-lg p-4">
                          <h4 className="font-semibold text-blue-800 mb-2">Program Includes:</h4>
                          <ul className="text-blue-700 text-sm space-y-1">
                            <li>• Organization history and mission</li>
                            <li>• Community needs assessment</li>
                            <li>• Volunteer roles and responsibilities</li>
                            <li>• Safety protocols and guidelines</li>
                            <li>• Communication and reporting procedures</li>
                          </ul>
                        </div>
                      </div>

                      {/* Skill Development */}
                      <div className="border border-gray-200 rounded-lg p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">🎯 Skill Development Workshops</h3>
                        <p className="text-gray-700 mb-4">
                          Regular workshops to enhance your skills and maximize your impact as a volunteer.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[
                            { title: 'Leadership Development', duration: '2 days', frequency: 'Quarterly' },
                            { title: 'Community Engagement', duration: '1 day', frequency: 'Monthly' },
                            { title: 'First Aid & Safety', duration: '1 day', frequency: 'Bi-annually' },
                            { title: 'Project Management', duration: '2 days', frequency: 'Quarterly' },
                            { title: 'Cultural Sensitivity', duration: 'Half day', frequency: 'Annually' },
                            { title: 'Digital Literacy', duration: '1 day', frequency: 'Monthly' }
                          ].map((workshop, index) => (
                            <div key={index} className="bg-gray-50 rounded-lg p-4">
                              <h4 className="font-semibold text-gray-900">{workshop.title}</h4>
                              <div className="text-sm text-gray-600 mt-1">
                                <span>{workshop.duration}</span> • <span>{workshop.frequency}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Mentorship Program */}
                      <div className="border border-gray-200 rounded-lg p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">🤝 Mentorship Program</h3>
                        <p className="text-gray-700 mb-4">
                          New volunteers are paired with experienced mentors for guidance and support during 
                          their first 6 months.
                        </p>
                        
                        <div className="bg-green-50 rounded-lg p-4">
                          <h4 className="font-semibold text-green-800 mb-2">Benefits:</h4>
                          <ul className="text-green-700 text-sm space-y-1">
                            <li>• One-on-one guidance from experienced volunteers</li>
                            <li>• Regular check-ins and feedback sessions</li>
                            <li>• Personalized development plans</li>
                            <li>• Access to exclusive resources and networks</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    {/* Training Schedule */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-8">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">📅 Upcoming Training</h3>
                      
                      <div className="space-y-4">
                        {[
                          { title: 'New Volunteer Orientation', date: 'Jan 28, 2025', time: '10:00 AM', type: 'Orientation' },
                          { title: 'Leadership Workshop', date: 'Feb 5, 2025', time: '9:00 AM', type: 'Workshop' },
                          { title: 'First Aid Training', date: 'Feb 12, 2025', time: '2:00 PM', type: 'Safety' },
                          { title: 'Community Engagement', date: 'Feb 20, 2025', time: '11:00 AM', type: 'Workshop' }
                        ].map((training, index) => (
                          <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                            <h4 className="font-semibold text-gray-900 text-sm">{training.title}</h4>
                            <p className="text-xs text-gray-600">{training.date} • {training.time}</p>
                            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mt-1">
                              {training.type}
                            </span>
                          </div>
                        ))}
                      </div>
                      
                      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium mt-4 transition-colors">
                        Register for Training
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* FAQ Tab */}
            {activeTab === 'faq' && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
                
                <div className="space-y-6">
                  {[
                    {
                      question: 'How much time commitment is required?',
                      answer: 'Time commitment varies by role and your availability. We have opportunities ranging from 2 hours per week to full-time positions. During application, you can specify your preferred time commitment, and we\'ll match you with suitable opportunities.'
                    },
                    {
                      question: 'Do I need any special qualifications or experience?',
                      answer: 'While some specialized roles may require specific skills (like medical or teaching background), most of our volunteer positions are open to anyone with enthusiasm and commitment. We provide comprehensive training for all volunteers.'
                    },
                    {
                      question: 'Are there any age restrictions for volunteers?',
                      answer: 'Volunteers must be at least 16 years old. Minors (16-18) require parental consent and may have restrictions on certain activities. We welcome volunteers of all ages and backgrounds.'
                    },
                    {
                      question: 'Will I receive any certification for my volunteer work?',
                      answer: 'Yes! All volunteers receive certificates of appreciation and detailed volunteer service records. We also provide letters of recommendation for employment, education, or immigration purposes.'
                    },
                    {
                      question: 'Can I volunteer remotely or only on-site?',
                      answer: 'We offer both remote and on-site volunteer opportunities. Remote roles include social media management, content creation, grant writing, and virtual tutoring. On-site roles include direct community service, event coordination, and field activities.'
                    },
                    {
                      question: 'Are volunteers provided with any benefits?',
                      answer: 'While volunteering is unpaid, we provide transportation reimbursement for field activities, meals during events, volunteer appreciation events, training opportunities, and networking with like-minded individuals.'
                    },
                    {
                      question: 'How are volunteers matched with opportunities?',
                      answer: 'Our volunteer coordinator reviews your application, skills, interests, and availability to match you with suitable opportunities. We also consider your location preference and any specific causes you\'re passionate about.'
                    },
                    {
                      question: 'What happens if I can\'t continue volunteering?',
                      answer: 'We understand that circumstances change. Simply inform your coordinator in advance. There\'s no penalty for leaving, and you\'re welcome to return when your situation allows. We maintain good relationships with all our volunteers.'
                    },
                    {
                      question: 'Is there ongoing support for volunteers?',
                      answer: 'Absolutely! We provide continuous support through regular check-ins, mentorship programs, training workshops, volunteer appreciation events, and a dedicated support hotline for any concerns or questions.'
                    },
                    {
                      question: 'Can I choose which specific projects to work on?',
                      answer: 'Yes, to some extent. While we try to match volunteers with their preferred projects, sometimes we need flexibility based on current needs and priorities. We always discuss assignments with volunteers before confirming.'
                    }
                  ].map((faq, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-6">
                      <h3 className="font-semibold text-gray-900 mb-3">{faq.question}</h3>
                      <p className="text-gray-700">{faq.answer}</p>
                    </div>
                  ))}
                </div>

                {/* Still have questions? */}
                <div className="bg-gray-50 rounded-lg p-6 mt-8 text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Still have questions?</h3>
                  <p className="text-gray-600 mb-4">We're here to help! Contact our volunteer coordinator.</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a 
                      href="mailto:volunteers@ravanathalaigaltrust.org"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                    >
                      📧 Email Us
                    </a>
                    <a 
                      href="tel:+919876543210"
                      className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-2 rounded-lg font-medium transition-colors"
                    >
                      📞 Call Us
                    </a>
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>

        {/* Volunteer Application Form Modal */}
        {showApplicationForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-screen overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Volunteer Application</h2>
                <button
                  onClick={() => setShowApplicationForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>

              <form onSubmit={handleApplicationSubmit} className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name *"
                      value={applicationData.name || ''}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address *"
                      value={applicationData.email || ''}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number *"
                      value={applicationData.phone || ''}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="number"
                      name="age"
                      placeholder="Age *"
                      value={applicationData.age || ''}
                      onChange={handleInputChange}
                      required
                      min="16"
                      max="100"
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <textarea
                    name="address"
                    placeholder="Address *"
                    value={applicationData.address || ''}
                    onChange={handleInputChange}
                    required
                    rows="3"
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-4"
                  />
                </div>

                {/* Volunteer Preferences */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Volunteer Preferences</h3>
                  
                  {/* Volunteer Type */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Which area interests you most? *
                    </label>
                    <select
                      name="volunteerType"
                      value={applicationData.volunteerType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select an area</option>
                      {Object.entries(volunteerOpportunities).map(([key, opportunity]) => (
                        <option key={key} value={key}>{opportunity.title}</option>
                      ))}
                    </select>
                  </div>

                  {/* Skills */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Skills & Expertise (Select all that apply)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {skillsOptions.map((skill) => (
                        <label key={skill} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={applicationData.skills.includes(skill)}
                            onChange={() => handleMultiSelectChange('skills', skill)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2"
                          />
                          <span className="text-sm text-gray-700">{skill}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      When are you available? (Select all that apply)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {availabilityOptions.map((time) => (
                        <label key={time} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={applicationData.availability.includes(time)}
                            onChange={() => handleMultiSelectChange('availability', time)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2"
                          />
                          <span className="text-sm text-gray-700">{time}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Languages you can communicate in
                    </label>
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                      {languageOptions.map((language) => (
                        <label key={language} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={applicationData.languages.includes(language)}
                            onChange={() => handleMultiSelectChange('languages', language)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2"
                          />
                          <span className="text-sm text-gray-700">{language}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Commitment Level */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Time Commitment Preference *
                    </label>
                    <select
                      name="commitment"
                      value={applicationData.commitment}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="flexible">Flexible (as available)</option>
                      <option value="part-time">Part-time (5-10 hours/week)</option>
                      <option value="regular">Regular (10-20 hours/week)</option>
                      <option value="intensive">Intensive (20+ hours/week)</option>
                    </select>
                  </div>

                  {/* Location Preference */}
                  <input
                    type="text"
                    name="preferredLocation"
                    placeholder="Preferred Location/District"
                    value={applicationData.preferredLocation}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Experience & Motivation */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Experience & Motivation</h3>
                  
                  <div className="space-y-4">
                    <textarea
                      name="experience"
                      placeholder="Relevant experience or qualifications"
                      value={applicationData.experience}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />

                    <textarea
                      name="motivation"
                      placeholder="Why do you want to volunteer with us? *"
                      value={applicationData.motivation}
                      onChange={handleInputChange}
                      required
                      rows="3"
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />

                    <textarea
                      name="previousVolunteering"
                      placeholder="Previous volunteering experience (if any)"
                      value={applicationData.previousVolunteering}
                      onChange={handleInputChange}
                      rows="2"
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Additional Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
                  
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="emergencyContact"
                      placeholder="Emergency Contact (Name & Phone) *"
                      value={applicationData.emergencyContact}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />

                    <textarea
                      name="references"
                      placeholder="References (Name, Relationship, Phone - Optional)"
                      value={applicationData.references}
                      onChange={handleInputChange}
                      rows="2"
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />

                    <div className="flex items-center space-x-6">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="hasTransportation"
                          checked={applicationData.hasTransportation}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2"
                        />
                        <span className="text-sm text-gray-700">I have my own transportation</span>
                      </label>

                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="canTravel"
                          checked={applicationData.canTravel}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2"
                        />
                        <span className="text-sm text-gray-700">Willing to travel within Tamil Nadu</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Agreements */}
                <div className="border-t pt-6">
                  <div className="space-y-3">
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        required
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-3 mt-0.5"
                      />
                      <span className="text-sm text-gray-700">
                        I agree to undergo background verification and provide necessary documents
                      </span>
                    </label>

                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        required
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-3 mt-0.5"
                      />
                      <span className="text-sm text-gray-700">
                        I commit to completing the volunteer orientation program
                      </span>
                    </label>

                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        required
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-3 mt-0.5"
                      />
                      <span className="text-sm text-gray-700">
                        I agree to the terms and conditions of volunteering with Raavana Thalaigal Trust
                      </span>
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowApplicationForm(false)}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting Application...
                      </>
                    ) : (
                      '🤝 Submit Application'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Call to Action Section */}
        <div className="bg-gradient-to-r from-purple-600 to-green-600 rounded-lg p-8 sm:p-12 text-white text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Your Journey of Impact Starts Here
          </h2>
          <p className="text-lg text-purple-100 mb-8 max-w-2xl mx-auto">
            Join our community of changemakers and discover the joy of giving back. 
            Together, we can build a better tomorrow for Tamil Nadu.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowApplicationForm(true)}
              className="bg-white text-purple-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-purple-50 transition-colors"
            >
              🌟 Apply to Volunteer
            </button>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-purple-600 transition-colors"
            >
              💬 Ask Questions
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
