'use client'
import { useState, useEffect } from 'react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

export default function MembersPage() {
  const [members, setMembers] = useState([])
  const [filtered, setFiltered] = useState([])
  const [search, setSearch] = useState('')
  const [filterRole, setFilterRole] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedMember, setSelectedMember] = useState(null)
  const topRoles = ['CEO', 'Founder', 'Chairperson']
  const topMembers = members.filter(m => topRoles.includes(m.role))
  const otherMembers = filtered.filter(m => !topRoles.includes(m.role))
  const perPage = 12
const sampleMembers = Array.from({ length: 50 }).map((_, i) => ({
  id: i + 1,
  firstName: ['Priya', 'Arun', 'Meera', 'Rajesh', 'Kavitha'][i % 5],
  lastName: ['Sharma', 'Kumar', 'Nair', 'Patel', 'Rao'][i % 5],
  role: ['CEO', 'Founder', 'Chairperson', 'Volunteer', 'Donor', 'Partner', 'Staff'][i % 7],  // added top roles
  joinDate: `2025-0${(i % 9) + 1}-15`,
  avatar: null
}))


  useEffect(() => {
    // Fetch from API in production
    setMembers(sampleMembers)
    setFiltered(sampleMembers)
  }, [])

  useEffect(() => {
    let list = members
    if (filterRole !== 'all') {
      list = list.filter(m => m.role === filterRole)
    }
    if (search) {
      const q = search.toLowerCase()
      list = list.filter(m =>
        `${m.firstName} ${m.lastName}`.toLowerCase().includes(q)
      )
    }
    setFiltered(list)
    setCurrentPage(1)
  }, [search, filterRole, members])

  async function fetchMemberDetails(id) {
    // In production, call your API like:
    // const response = await fetch(`/api/members/${id}`)
    // const data = await response.json()
    // For now, use sample members:
    const data = members.find(m => m.id === id)
    setSelectedMember(data)
  }

  const totalPages = Math.ceil(otherMembers.length / perPage)
  const pageMembers = otherMembers.slice((currentPage - 1) * perPage, currentPage * perPage)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Leadership Team */}
      {topMembers.length > 0 && (
<section className="mb-16 px-4">
  <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center tracking-tight">
    Our Leadership Team
  </h2>
  <div className="flex flex-wrap justify-center gap-10">
    {topMembers.map(member => (
      <div
        key={member.id}
        onClick={() => fetchMemberDetails(member.id)}
        className="cursor-pointer bg-white border border-gray-200 rounded-xl w-56 p-6 flex flex-col items-center text-center shadow-md hover:shadow-lg transition-shadow duration-300"
        title={`${member.firstName} ${member.lastName} - ${member.role}`}
      >
        <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center shadow-inner mb-5">
          {member.avatar ? (
            <img
              src={member.avatar}
              alt={`${member.firstName} ${member.lastName}`}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <span className="text-4xl font-bold text-indigo-700">
              {member.firstName.charAt(0)}{member.lastName.charAt(0)}
            </span>
          )}
        </div>

        <h3 className="text-xl font-medium text-gray-900">{member.firstName} {member.lastName}</h3>
        <p className="text-indigo-600 font-semibold mt-1">{member.role}</p>
      </div>
    ))}
  </div>
</section>


      )}

      {/* Member Detail Modal */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full overflow-auto max-h-[90vh] relative p-8">
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-3xl font-bold leading-none"
              aria-label="Close modal"
            >
              &times;
            </button>

            <div className="flex flex-col items-center space-y-4">
              {selectedMember.avatar ? (
                <img
                  src={selectedMember.avatar}
                  alt={`${selectedMember.firstName} ${selectedMember.lastName}`}
                  className="w-32 h-32 rounded-full object-cover shadow-md"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-6xl font-bold">
                  {selectedMember.firstName.charAt(0)}{selectedMember.lastName.charAt(0)}
                </div>
              )}

              <h2 className="text-2xl font-semibold text-gray-900">
                {selectedMember.firstName} {selectedMember.lastName}
              </h2>

              <div className="w-full text-gray-700 space-y-2 text-sm max-w-full">
                <p><strong>Role:</strong> {selectedMember.role}</p>
                <p><strong>Joined:</strong> {new Date(selectedMember.joinDate).toLocaleDateString()}</p>
                <p><strong>Email:</strong> {selectedMember.email || 'N/A'}</p>
                <p><strong>Phone:</strong> {selectedMember.phone || 'N/A'}</p>
                <p><strong>Location:</strong> {selectedMember.city}, {selectedMember.state}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Members Section */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">Our Members</h1>
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Search members..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-64"
            />
            <select
              value={filterRole}
              onChange={e => setFilterRole(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Roles</option>
              <option value="Volunteer">Volunteer</option>
              <option value="Donor">Donor</option>
              <option value="Partner">Partner</option>
              <option value="Staff">Staff</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {pageMembers.map(member => (
            <div
              key={member.id}
              onClick={() => fetchMemberDetails(member.id)}
              className="cursor-pointer bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition"
            >
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4 text-gray-500 text-xl">
                {member.avatar
                  ? <img src={member.avatar} alt={`${member.firstName} ${member.lastName}`} className="w-full h-full object-cover rounded-full" />
                  : `${member.firstName.charAt(0)}${member.lastName.charAt(0)}`
                }
              </div>
              <h3 className="font-semibold text-gray-900">{member.firstName} {member.lastName}</h3>
              <p className="text-sm text-blue-600 mb-1">{member.role}</p>
              <p className="text-xs text-gray-500">Joined {new Date(member.joinDate).toLocaleDateString()}</p>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="text-center text-gray-600 col-span-full">No members found.</p>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-8 space-x-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-gray-700">{currentPage} / {totalPages}</span>
            <button
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
