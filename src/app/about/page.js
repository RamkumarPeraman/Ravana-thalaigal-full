'use client'
import Link from 'next/link'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-green-600 rounded-lg text-white text-center py-20 px-6">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">About Raavana Thalaigal Trust</h1>
          <p className="text-xl sm:text-2xl mb-6 max-w-3xl mx-auto">
            Empowering communities across Tamil Nadu through education, healthcare, social welfare, and environmental conservation.
          </p>
          <Link
            href="/services"
            className="inline-block bg-white text-blue-600 font-semibold px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Explore Our Services
          </Link>
        </section>

        {/* Our Story */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center">Our Journey</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Founded in 2010 by a group of dedicated volunteers, Raavana Thalaigal Trust began with a single vision:
              to provide equitable opportunities and support to underserved communities in Tamil Nadu.
            </p>
            <p>
              Over the past 15 years, we’ve grown into a state-wide organization, implementing programs in education, healthcare,
              social empowerment, and environmental conservation. Our grassroots approach ensures every initiative is community-driven
              and sustainable.
            </p>
            <p>
              From a humble beginning of 5 volunteers, we now have over 150 active volunteers and have impacted over 15,000 lives
              across 85 communities.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-700">
              To empower individuals and communities by providing access to education, healthcare, social welfare, and opportunities
              for environmental stewardship, fostering long-term self-reliance and dignity.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
            <p className="text-gray-700">
              A Tamil Nadu where every person, regardless of background, has the resources, skills, and support to lead a healthy,
              educated, and fulfilling life.
            </p>
          </div>
        </section>

        {/* Core Values */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🤝', title: 'Compassion', desc: 'We act with empathy, respect, and kindness toward every individual.' },
              { icon: '🌱', title: 'Sustainability', desc: 'We create lasting change through community-led, eco-friendly initiatives.' },
              { icon: '💡', title: 'Innovation', desc: 'We embrace creative solutions to address social and environmental challenges.' },
              { icon: '🔒', title: 'Integrity', desc: 'We operate transparently, ethically, and responsibly in all we do.' }
            ].map((v, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-4xl mb-4">{v.icon}</div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">{v.title}</h4>
                <p className="text-gray-700 text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Milestones */}
{/* Our Milestones */}
<section className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
  <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-16">Our Milestones</h2>

  <div className="relative">
    {/* Vertical timeline line */}
    <div className="absolute left-1/2 top-0 -translate-x-1/2 w-2 bg-green-600 h-full"></div>

    {[
      { year: '2010', label: 'Founded by 5 volunteers' },
      { year: '2012', label: 'First medical camp for 300 villagers' },
      { year: '2015', label: 'Launched primary education program' },
      { year: '2018', label: '5000 trees planted across rural areas' },
      { year: '2020', label: 'Helped 2000 families during COVID-19' },
      { year: '2023', label: 'Reached 10,000 beneficiaries' },
    ].map((milestone, idx) => (
      <div
        key={idx}
        className={`mb-12 flex w-full max-w-2xl mx-auto items-center ${
          idx % 2 === 0 ? 'flex-row-reverse' : 'flex-row'
        }`}
      >
        {/* Year circle */}
        <div className="z-10 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-green-400 to-green-600 font-bold text-white shadow-lg">
          {milestone.year}
        </div>

        {/* Content card */}
        <div className="w-5/12 rounded-lg bg-white p-6 shadow-lg text-gray-800">
          <p className="text-lg font-semibold">{milestone.label}</p>
        </div>
      </div>
    ))}
  </div>
</section>


        {/* Leadership Team */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center">Meet Our Leadership</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Dr. Kavitha Raj', role: 'Founder & CEO', img: null },
              { name: 'Mr. Aravind Kumar', role: 'Director, Programs', img: null },
              { name: 'Ms. Priya Nair', role: 'Head, Volunteer Engagement', img: null },
              { name: 'Dr. Mohan R.', role: 'Medical Advisor', img: null }
            ].map((member, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl text-gray-500">
                  {member.img ? (
                    <img src={member.img} alt={member.name} className="w-full h-full object-cover rounded-full" />
                  ) : (
                    member.name.charAt(0)
                  )}
                </div>
                <h4 className="text-lg font-semibold text-gray-900">{member.name}</h4>
                <p className="text-sm text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Partners & Supporters */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center">Our Partners & Supporters</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 items-center">
            {/* Replace with partner logos */}
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-lg p-4 shadow-sm flex items-center justify-center">
                <div className="text-gray-400">Logo {i+1}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg text-white text-center py-16 px-6">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Join Us in Making a Difference</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            It takes all of us working together to create lasting change. Whether you donate, volunteer, 
            or partner with us, your support transforms lives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/donations"
              className="bg-white text-green-600 font-semibold px-6 py-3 rounded-lg hover:bg-green-50 transition-colors"
            >
              💝 Donate Now
            </Link>
            <Link
              href="/volunteer"
              className="border-2 border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              🤝 Become a Volunteer
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
