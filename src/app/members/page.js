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
  const perPage = 12

  // Sample member data (replace with API)
  const sampleMembers = Array.from({ length: 50 }).map((_, i) => ({
    id: i + 1,
    firstName: ['Priya','Arun','Meera','Rajesh','Kavitha'][i % 5],
    lastName: ['Sharma','Kumar','Nair','Patel','Rao'][i % 5],
    role: ['Volunteer','Donor','Partner','Staff'][i % 4],
    joinDate: `2025-0${(i % 9)+1}-15`,
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

  const totalPages = Math.ceil(filtered.length / perPage)
  const pageMembers = filtered.slice((currentPage - 1) * perPage, currentPage * perPage)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
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

        {/* Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {pageMembers.map(member => (
            <div key={member.id} className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4 text-gray-500 text-xl">
                {member.avatar
                  ? <img src={member.avatar} alt={`${member.firstName} ${member.lastName}`} className="w-full h-full object-cover rounded-full"/>
                  : `${member.firstName.charAt(0)}${member.lastName.charAt(0)}`}
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

        {/* Pagination */}
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
