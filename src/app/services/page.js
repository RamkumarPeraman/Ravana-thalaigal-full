'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

export default function ServicesPage() {
  const [user, setUser] = useState(null)
  const [activeCategory, setActiveCategory] = useState('all')
  const [showRequestForm, setShowRequestForm] = useState(false)
  const [selectedService, setSelectedService] = useState(null)
  const [requestData, setRequestData] = useState({
    serviceType: '',
    urgency: 'normal',
    location: '',
    description: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    preferredDate: '',
    beneficiaries: '',
    budget: '',
    organizationType: 'individual'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  // Service categories and detailed services
  const serviceCategories = {
    education: {
      title: 'Education & Learning',
      icon: '🎓',
      color: 'bg-blue-500',
      description: 'Comprehensive educational support and skill development programs',
      services: [
        {
          title: 'School Support Programs',
          description: 'Complete educational support for underprivileged children including tuition, books, uniforms, and nutritious meals.',
          features: [
            'Free tuition classes for grades 1-12',
            'School supplies and uniforms',
            'Nutritious breakfast and lunch programs',
            'Transportation assistance',
            'Parent counseling and engagement'
          ],
          impact: '1,200+ students supported annually',
          duration: 'Year-round program',
          eligibility: 'Children from families with monthly income < ₹15,000',
          locations: ['Chennai', 'Madurai', 'Coimbatore', 'Salem', 'Trichy'],
          cost: 'Completely free of cost',
          howToApply: 'Visit nearest center with income certificate and child\'s school documents'
        },
        {
          title: 'Digital Literacy Training',
          description: 'Computer and digital skills training for students, adults, and senior citizens to bridge the digital divide.',
          features: [
            'Basic computer operations',
            'Internet usage and safety',
            'Digital payment systems',
            'Online job applications',
            'Social media awareness'
          ],
          impact: '800+ people trained monthly',
          duration: '3-month intensive course',
          eligibility: 'Age 8+ with basic reading skills',
          locations: ['Urban centers and rural villages'],
          cost: 'Free for beneficiaries, ₹500 for general public',
          howToApply: 'Online registration or walk-in enrollment'
        },
        {
          title: 'Adult Literacy Programs',
          description: 'Reading, writing, and numeracy programs for adults who missed formal education opportunities.',
          features: [
            'Basic reading and writing',
            'Numerical skills and calculations',
            'Functional literacy for daily life',
            'Certificate upon completion',
            'Flexible evening and weekend classes'
          ],
          impact: '500+ adults become literate annually',
          duration: '6-month program',
          eligibility: 'Adults aged 18+ with limited formal education',
          locations: ['Community centers across Tamil Nadu'],
          cost: 'Completely free',
          howToApply: 'Register at community center or through volunteers'
        },
        {
          title: 'Vocational Training',
          description: 'Skill-based training programs to enhance employability and promote entrepreneurship.',
          features: [
            'Tailoring and embroidery',
            'Computer hardware and repair',
            'Cooking and catering',
            'Mobile repair and maintenance',
            'Beauty and wellness services'
          ],
          impact: '75% job placement rate',
          duration: '3-6 months per course',
          eligibility: 'Age 16+ with basic education',
          locations: ['Training centers in major cities'],
          cost: '₹1,000-5,000 (scholarships available)',
          howToApply: 'Application form with educational certificates'
        }
      ]
    },
    healthcare: {
      title: 'Healthcare & Wellness',
      icon: '🏥',
      color: 'bg-red-500',
      description: 'Accessible healthcare services for underserved communities',
      services: [
        {
          title: 'Mobile Medical Camps',
          description: 'Regular medical camps in remote villages and urban slums providing basic healthcare services.',
          features: [
            'General health check-ups',
            'Blood pressure and diabetes screening',
            'Eye and dental examinations',
            'Free medicines and prescriptions',
            'Health education and awareness'
          ],
          impact: '2,500+ patients treated monthly',
          duration: 'Weekly camps in each location',
          eligibility: 'All community members',
          locations: ['Rural villages and urban slums'],
          cost: 'Completely free including medicines',
          howToApply: 'No appointment needed - walk-in service'
        },
        {
          title: 'Mental Health Support',
          description: 'Counseling and psychological support services for individuals and families facing emotional challenges.',
          features: [
            'Individual counseling sessions',
            'Group therapy programs',
            'Stress management workshops',
            'Family counseling',
            '24/7 helpline support'
          ],
          impact: '300+ individuals counseled monthly',
          duration: 'Ongoing support as needed',
          eligibility: 'All age groups seeking support',
          locations: ['Counseling centers and online sessions'],
          cost: 'Free for low-income families, sliding scale for others',
          howToApply: 'Call helpline or book appointment online'
        },
        {
          title: 'Maternal & Child Health',
          description: 'Comprehensive healthcare support for pregnant women, new mothers, and children under 5.',
          features: [
            'Prenatal and postnatal care',
            'Vaccination programs',
            'Nutrition support for mothers',
            'Breastfeeding guidance',
            'Child development monitoring'
          ],
          impact: '95% safe delivery rate in program areas',
          duration: 'From pregnancy through child\'s 5th year',
          eligibility: 'Pregnant women and mothers with children under 5',
          locations: ['Primary health centers and home visits'],
          cost: 'Free for BPL families, subsidized for others',
          howToApply: 'Register at nearest health center'
        },
        {
          title: 'Elderly Care Services',
          description: 'Specialized healthcare and support services for senior citizens in the community.',
          features: [
            'Regular health monitoring',
            'Physiotherapy services',
            'Medicine delivery at home',
            'Emergency medical assistance',
            'Companionship programs'
          ],
          impact: '180+ elderly served regularly',
          duration: 'Ongoing long-term care',
          eligibility: 'Senior citizens aged 60+',
          locations: ['Home-based and day care centers'],
          cost: 'Based on family income assessment',
          howToApply: 'Family member can apply with senior\'s consent'
        }
      ]
    },
    social: {
      title: 'Social Welfare',
      icon: '🤝',
      color: 'bg-green-500',
      description: 'Community development and social empowerment initiatives',
      services: [
        {
          title: 'Women Empowerment Programs',
          description: 'Comprehensive programs to empower women through education, skills training, and leadership development.',
          features: [
            'Self-help group formation',
            'Microfinance and savings programs',
            'Leadership training workshops',
            'Legal awareness programs',
            'Domestic violence support'
          ],
          impact: '450+ women empowered through SHGs',
          duration: 'Ongoing with various program cycles',
          eligibility: 'Women aged 18+ from underprivileged backgrounds',
          locations: ['Community centers across districts'],
          cost: 'Free participation, micro-loans at 2% interest',
          howToApply: 'Contact local SHG coordinator or community center'
        },
        {
          title: 'Child Protection Services',
          description: 'Safeguarding children from abuse, exploitation, and neglect while promoting their rights and welfare.',
          features: [
            'Child abuse prevention education',
            'Rescue and rehabilitation services',
            'Foster care support',
            'Legal aid for children',
            'Awareness campaigns in schools'
          ],
          impact: '150+ children protected and rehabilitated',
          duration: 'Immediate intervention and long-term support',
          eligibility: 'Children at risk or in need of protection',
          locations: ['State-wide through partner networks'],
          cost: 'Completely free service',
          howToApply: '24/7 child helpline: 1098 or report to authorities'
        },
        {
          title: 'Community Development',
          description: 'Holistic community development through infrastructure improvement and capacity building.',
          features: [
            'Water and sanitation projects',
            'Community hall construction',
            'Street lighting installation',
            'Waste management systems',
            'Community organizing training'
          ],
          impact: '25+ communities transformed',
          duration: '1-2 years per community project',
          eligibility: 'Communities with population 500-2000',
          locations: ['Rural and semi-urban areas'],
          cost: 'Community contribution of 10-20%',
          howToApply: 'Community representatives submit proposal'
        },
        {
          title: 'Legal Aid Services',
          description: 'Free legal assistance and awareness programs for disadvantaged individuals and families.',
          features: [
            'Free legal consultation',
            'Court representation',
            'Legal document preparation',
            'Rights awareness programs',
            'Mediation and dispute resolution'
          ],
          impact: '200+ cases handled annually',
          duration: 'Case-by-case basis',
          eligibility: 'Individuals who cannot afford legal services',
          locations: ['Legal aid clinics in major cities'],
          cost: 'Completely free',
          howToApply: 'Visit legal aid clinic or call helpline'
        }
      ]
    },
    environment: {
      title: 'Environmental Conservation',
      icon: '🌱',
      color: 'bg-green-600',
      description: 'Sustainable environmental protection and climate action programs',
      services: [
        {
          title: 'Tree Plantation Drives',
          description: 'Large-scale afforestation and urban greening initiatives to combat climate change.',
          features: [
            'Native species plantation',
            'Urban park development',
            'School and college greening',
            'Roadside tree plantation',
            '3-year maintenance guarantee'
          ],
          impact: '25,000+ trees planted annually',
          duration: 'Year-round with seasonal focus',
          eligibility: 'Open to all - individuals, schools, corporates',
          locations: ['Urban areas, degraded lands, institutions'],
          cost: '₹100 per sapling including maintenance',
          howToApply: 'Online booking or contact environment team'
        },
        {
          title: 'Waste Management Programs',
          description: 'Community-based waste segregation, recycling, and disposal systems to reduce environmental pollution.',
          features: [
            'Door-to-door waste collection',
            'Organic waste composting',
            'Plastic recycling initiatives',
            'E-waste collection drives',
            'Community awareness programs'
          ],
          impact: '50+ communities with zero-waste status',
          duration: 'Ongoing community programs',
          eligibility: 'Residential communities and institutions',
          locations: ['Urban and semi-urban areas'],
          cost: 'Nominal user charges for sustainability',
          howToApply: 'Community leader submits area proposal'
        },
        {
          title: 'Water Conservation Projects',
          description: 'Rainwater harvesting and groundwater recharge projects to address water scarcity.',
          features: [
            'Rainwater harvesting systems',
            'Groundwater recharge pits',
            'Water quality testing',
            'Community well restoration',
            'Water conservation education'
          ],
          impact: '2 million liters water conserved annually',
          duration: '6-month project implementation',
          eligibility: 'Water-stressed communities and institutions',
          locations: ['Drought-prone areas across Tamil Nadu'],
          cost: '50% community contribution required',
          howToApply: 'Technical assessment followed by project proposal'
        },
        {
          title: 'Solar Energy Initiatives',
          description: 'Promoting renewable energy adoption through solar power installations and awareness.',
          features: [
            'Rooftop solar installations',
            'Solar street lighting',
            'Solar water heating systems',
            'Energy audit services',
            'Renewable energy education'
          ],
          impact: '500+ households using solar energy',
          duration: 'One-time installation with 10-year support',
          eligibility: 'Households and institutions with adequate roof space',
          locations: ['State-wide installation services'],
          cost: 'Subsidized rates with financing options',
          howToApply: 'Site survey and feasibility assessment'
        }
      ]
    },
    emergency: {
      title: 'Emergency Relief',
      icon: '🆘',
      color: 'bg-orange-500',
      description: 'Rapid response and rehabilitation during disasters and emergencies',
      services: [
        {
          title: 'Disaster Response Teams',
          description: 'Immediate relief and rescue operations during natural disasters and emergencies.',
          features: [
            'Search and rescue operations',
            'Emergency food and water supply',
            'Temporary shelter arrangements',
            'Medical emergency response',
            'Coordination with government agencies'
          ],
          impact: '1,000+ families assisted during recent disasters',
          duration: 'Immediate response within 24 hours',
          eligibility: 'All disaster-affected individuals',
          locations: 'State-wide rapid response network',
          cost: 'Completely free emergency service',
          howToApply: '24/7 emergency helpline: 1077'
        },
        {
          title: 'Rehabilitation Support',
          description: 'Long-term rehabilitation assistance for families affected by disasters or emergencies.',
          features: [
            'Livelihood restoration programs',
            'Housing reconstruction support',
            'Psychological counseling',
            'Child care and education support',
            'Community infrastructure rebuilding'
          ],
          impact: '600+ families rehabilitated successfully',
          duration: '6 months to 2 years post-disaster',
          eligibility: 'Disaster-affected families with assessment',
          locations: 'Disaster-affected regions',
          cost: 'Free for verified disaster victims',
          howToApply: 'Assessment by relief team and registration'
        },
        {
          title: 'Food Security Programs',
          description: 'Emergency food assistance and nutrition support during crisis situations.',
          features: [
            'Cooked meal distribution',
            'Dry ration kits for families',
            'Special nutrition for children and elderly',
            'Community kitchen operations',
            'Mobile food units'
          ],
          impact: '50,000+ meals served during emergencies',
          duration: 'Immediate and extended support as needed',
          eligibility: 'Families facing food insecurity',
          locations: 'Crisis-affected areas and urban poor localities',
          cost: 'Free emergency food service',
          howToApply: 'Direct service - no application needed'
        },
        {
          title: 'Medical Emergency Support',
          description: 'Critical medical assistance and healthcare during health emergencies and pandemics.',
          features: [
            'Emergency medical supplies',
            'Oxygen concentrator support',
            'Ambulance services',
            'Isolation center management',
            'Health worker training'
          ],
          impact: '2,000+ patients supported during COVID-19',
          duration: 'Throughout emergency period',
          eligibility: 'Patients in critical need without resources',
          locations: 'Hospitals and community health centers',
          cost: 'Free for economically weaker sections',
          howToApply: 'Hospital referral or direct contact during emergency'
        }
      ]
    }
  }

  // Service statistics
  const serviceStats = {
    totalBeneficiaries: 15400,
    activePrograms: 18,
    partneredInstitutions: 45,
    volunteersInvolved: 152,
    communitiesServed: 85,
    successRate: 94
  }

  useEffect(() => {
    const userSession = localStorage.getItem('userSession')
    if (userSession) {
      const parsedUser = JSON.parse(userSession)
      setUser(parsedUser.user)
      
      // Pre-fill form data if user is logged in
      setRequestData(prev => ({
        ...prev,
        contactName: `${parsedUser.user.firstName} ${parsedUser.user.lastName}`,
        contactEmail: parsedUser.user.email,
        contactPhone: parsedUser.user.phone || ''
      }))
    }
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setRequestData(prev => ({ ...prev, [name]: value }))
  }

  const handleServiceRequest = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))

      // TODO: Send service request to backend
      console.log('Service request submitted:', requestData)

      alert('Your service request has been submitted successfully! We will contact you within 48 hours.')
      setShowRequestForm(false)
      
      // Reset form
      setRequestData({
        serviceType: '',
        urgency: 'normal',
        location: '',
        description: '',
        contactName: user ? `${user.firstName} ${user.lastName}` : '',
        contactEmail: user ? user.email : '',
        contactPhone: user ? user.phone || '' : '',
        preferredDate: '',
        beneficiaries: '',
        budget: '',
        organizationType: 'individual'
      })

    } catch (error) {
      console.error('Service request error:', error)
      alert('Failed to submit request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const filteredServices = activeCategory === 'all' 
    ? Object.values(serviceCategories).flatMap(category => 
        category.services.map(service => ({ ...service, category: category.title, categoryKey: Object.keys(serviceCategories).find(key => serviceCategories[key] === category) }))
      )
    : serviceCategories[activeCategory]?.services.map(service => ({ 
        ...service, 
        category: serviceCategories[activeCategory].title,
        categoryKey: activeCategory
      })) || []

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-lg shadow-lg p-8 sm:p-12 mb-12 text-white text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Our Services & Programs
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Comprehensive community services designed to address critical social challenges and empower 
            individuals and communities across Tamil Nadu.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowRequestForm(true)}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors"
            >
              🤝 Request Service
            </button>
            <Link
              href="#services"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              📋 Browse Services
            </Link>
          </div>
        </div>

        {/* Service Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
            <div className="text-3xl font-bold text-blue-600 mb-2">{serviceStats.totalBeneficiaries.toLocaleString()}+</div>
            <div className="text-gray-600 text-sm">Total Beneficiaries</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
            <div className="text-3xl font-bold text-green-600 mb-2">{serviceStats.activePrograms}</div>
            <div className="text-gray-600 text-sm">Active Programs</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
            <div className="text-3xl font-bold text-purple-600 mb-2">{serviceStats.partneredInstitutions}</div>
            <div className="text-gray-600 text-sm">Partner Institutions</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
            <div className="text-3xl font-bold text-orange-600 mb-2">{serviceStats.volunteersInvolved}</div>
            <div className="text-gray-600 text-sm">Volunteers Involved</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
            <div className="text-3xl font-bold text-red-600 mb-2">{serviceStats.communitiesServed}</div>
            <div className="text-gray-600 text-sm">Communities Served</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
            <div className="text-3xl font-bold text-indigo-600 mb-2">{serviceStats.successRate}%</div>
            <div className="text-gray-600 text-sm">Success Rate</div>
          </div>
        </div>

        {/* Service Categories */}
        <section id="services" className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Service Categories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our diverse range of services designed to create sustainable positive change 
              in education, healthcare, social welfare, environment, and emergency response.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeCategory === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-300'
              }`}
            >
              📋 All Services
            </button>
            {Object.entries(serviceCategories).map(([key, category]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeCategory === key
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-300'
                }`}
              >
                {category.icon} {category.title}
              </button>
            ))}
          </div>

          {/* Service Categories Overview */}
          {activeCategory === 'all' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {Object.entries(serviceCategories).map(([key, category]) => (
                <div
                  key={key}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setActiveCategory(key)}
                >
                  <div className={`${category.color} p-6 text-white`}>
                    <div className="flex items-center mb-4">
                      <span className="text-4xl mr-4">{category.icon}</span>
                      <h3 className="text-xl font-bold">{category.title}</h3>
                    </div>
                    <p className="text-white/90">{category.description}</p>
                  </div>
                  <div className="p-6">
                    <div className="mb-4">
                      <span className="font-semibold text-gray-900">{category.services.length} Services Available</span>
                    </div>
                    <ul className="text-sm text-gray-600 space-y-1 mb-4">
                      {category.services.slice(0, 3).map((service, index) => (
                        <li key={index}>• {service.title}</li>
                      ))}
                      {category.services.length > 3 && (
                        <li className="text-gray-500">+{category.services.length - 3} more services</li>
                      )}
                    </ul>
                    <button className={`w-full ${category.color} text-white py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity`}>
                      Explore {category.title}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Detailed Services */}
          <div className="space-y-8">
            {filteredServices.map((service, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-8">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
                    <div className="flex-1">
                      <div className="flex items-center mb-4">
                        <span className="text-3xl mr-4">
                          {serviceCategories[service.categoryKey]?.icon}
                        </span>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
                          <p className="text-blue-600 font-medium">{service.category}</p>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-6 text-lg">{service.description}</p>

                      {/* Key Features */}
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {service.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start text-gray-700">
                              <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                              </svg>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Impact Highlight */}
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                        <div className="flex items-center text-green-700">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                          </svg>
                          <span className="font-medium">Impact: {service.impact}</span>
                        </div>
                      </div>
                    </div>

                    {/* Service Details Card */}
                    <div className="lg:w-80 flex-shrink-0">
                      <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                        <div>
                          <h5 className="font-semibold text-gray-900 text-sm">Duration</h5>
                          <p className="text-gray-700 text-sm">{service.duration}</p>
                        </div>
                        
                        <div>
                          <h5 className="font-semibold text-gray-900 text-sm">Eligibility</h5>
                          <p className="text-gray-700 text-sm">{service.eligibility}</p>
                        </div>
                        
                        <div>
                          <h5 className="font-semibold text-gray-900 text-sm">Locations</h5>
                          <p className="text-gray-700 text-sm">
                            {Array.isArray(service.locations) ? service.locations.join(', ') : service.locations}
                          </p>
                        </div>
                        
                        <div>
                          <h5 className="font-semibold text-gray-900 text-sm">Cost</h5>
                          <p className="text-gray-700 text-sm">{service.cost}</p>
                        </div>
                        
                        <div>
                          <h5 className="font-semibold text-gray-900 text-sm">How to Apply</h5>
                          <p className="text-gray-700 text-sm">{service.howToApply}</p>
                        </div>

                        <button
                          onClick={() => {
                            setSelectedService(service)
                            setRequestData(prev => ({ ...prev, serviceType: service.title }))
                            setShowRequestForm(true)
                          }}
                          className={`w-full ${serviceCategories[service.categoryKey]?.color} text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity`}
                        >
                          Request This Service
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Service Request Form Modal */}
        {showRequestForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Request Service</h2>
                <button
                  onClick={() => setShowRequestForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>

              <form onSubmit={handleServiceRequest} className="space-y-6">
                {/* Service Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Details</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Service Type *
                      </label>
                      <select
                        name="serviceType"
                        value={requestData.serviceType}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select a service</option>
                        {Object.values(serviceCategories).map(category =>
                          category.services.map(service => (
                            <option key={service.title} value={service.title}>
                              {service.title} - {category.title}
                            </option>
                          ))
                        )}
                      </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Urgency Level *
                        </label>
                        <select
                          name="urgency"
                          value={requestData.urgency}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="low">Low - Can wait 2-4 weeks</option>
                          <option value="normal">Normal - Within 1-2 weeks</option>
                          <option value="high">High - Within few days</option>
                          <option value="emergency">Emergency - Immediate attention</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Organization Type *
                        </label>
                        <select
                          name="organizationType"
                          value={requestData.organizationType}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="individual">Individual/Family</option>
                          <option value="community">Community Group</option>
                          <option value="school">School/Educational Institution</option>
                          <option value="hospital">Hospital/Healthcare</option>
                          <option value="ngo">NGO/Non-profit</option>
                          <option value="corporate">Corporate/Business</option>
                          <option value="government">Government Organization</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location/Address *
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={requestData.location}
                        onChange={handleInputChange}
                        required
                        placeholder="City, District, State"
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Detailed Description *
                      </label>
                      <textarea
                        name="description"
                        value={requestData.description}
                        onChange={handleInputChange}
                        required
                        rows="4"
                        placeholder="Please provide detailed information about your service requirement, current situation, and specific needs..."
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Number of Beneficiaries
                        </label>
                        <input
                          type="number"
                          name="beneficiaries"
                          value={requestData.beneficiaries}
                          onChange={handleInputChange}
                          placeholder="Expected number of people to benefit"
                          min="1"
                          className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Preferred Start Date
                        </label>
                        <input
                          type="date"
                          name="preferredDate"
                          value={requestData.preferredDate}
                          onChange={handleInputChange}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Available Budget (Optional)
                      </label>
                      <input
                        type="text"
                        name="budget"
                        value={requestData.budget}
                        onChange={handleInputChange}
                        placeholder="Any budget you can contribute or 'No budget available'"
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="contactName"
                      placeholder="Contact Person Name *"
                      value={requestData.contactName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="email"
                      name="contactEmail"
                      placeholder="Email Address *"
                      value={requestData.contactEmail}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <input
                    type="tel"
                    name="contactPhone"
                    placeholder="Phone Number *"
                    value={requestData.contactPhone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-4"
                  />
                </div>

                {/* Important Notice */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <div>
                      <h4 className="font-medium text-blue-800">Important Notice</h4>
                      <ul className="text-sm text-blue-700 mt-1 space-y-1">
                        <li>• We will contact you within 48 hours to discuss your request</li>
                        <li>• A site visit may be required for assessment</li>
                        <li>• Services are provided based on availability and eligibility</li>
                        <li>• Emergency requests are processed immediately</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowRequestForm(false)}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting Request...
                      </>
                    ) : (
                      '📤 Submit Service Request'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* How Our Services Work */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">How Our Services Work</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📝</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">1. Submit Request</h3>
              <p className="text-gray-600 text-sm">Fill out our service request form with your specific needs and requirements.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">2. Assessment</h3>
              <p className="text-gray-600 text-sm">Our team reviews your request and conducts necessary assessments.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">3. Planning</h3>
              <p className="text-gray-600 text-sm">We develop a customized service plan and timeline for implementation.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✅</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">4. Implementation</h3>
              <p className="text-gray-600 text-sm">Our trained volunteers and staff deliver the service with regular monitoring.</p>
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Success Stories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Rural School Digital Transformation",
                service: "Digital Literacy Training",
                impact: "150 students gained computer skills",
                location: "Krishnagiri District",
                testimonial: "The digital literacy program transformed our rural school. Now our children can compete with urban students in technology skills."
              },
              {
                title: "Community Health Improvement",
                service: "Mobile Medical Camps",
                impact: "85% reduction in preventable diseases",
                location: "Thanjavur Villages",
                testimonial: "Regular health camps have dramatically improved our community's health. We now have early detection and prevention of diseases."
              },
              {
                title: "Women's Economic Empowerment",
                service: "Self-Help Group Formation",
                impact: "200 women became financially independent",
                location: "Salem District",
                testimonial: "Through SHG training, I started my own tailoring business and now support my family independently."
              }
            ].map((story, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="font-bold text-gray-900 mb-2">{story.title}</h3>
                <p className="text-blue-600 text-sm font-medium mb-2">{story.service}</p>
                <p className="text-gray-700 text-sm mb-3 italic">"{story.testimonial}"</p>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600 font-semibold">{story.impact}</span>
                    <span className="text-gray-500">{story.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-lg p-8 sm:p-12 text-white text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Need Our Services?
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            We're here to help. Submit a service request and our team will work with you to 
            address your community's needs effectively.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowRequestForm(true)}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors"
            >
              📤 Request Service Now
            </button>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              💬 Contact Us
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
