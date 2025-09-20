'use client'
import { useEffect, useState } from 'react'
import Navigation from '../components/Navigation'
import { FaSearch, FaTrashAlt } from 'react-icons/fa'

function PieChart({ data }) {
  const total = data.reduce((sum, item) => sum + item.value, 0)
  let cumulativePercent = 0

  const colors = {
    MEMBERS: '#3B82F6', // Blue
    VOLUNTEERS: '#10B981', // Green
    ADMINS: '#EF4444', // Red
    OTHERS: '#9CA3AF', // Gray (optional)
  }

  function describeArc(x, y, radius, startAngle, endAngle) {
    const start = polarToCartesian(x, y, radius, endAngle)
    const end = polarToCartesian(x, y, radius, startAngle)
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y} L ${x} ${y} Z`
  }

  function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    }
  }

  return (
    <div className="flex flex-col items-center">
      <svg width={200} height={200} viewBox="0 0 200 200" className="mb-6">
        {data.map(({ label, value }, i) => {
          const percent = (value / total) * 100
          const startAngle = cumulativePercent * 3.6
          cumulativePercent += percent
          const endAngle = cumulativePercent * 3.6
          const path = describeArc(100, 100, 90, startAngle, endAngle)
          return <path key={i} d={path} fill={colors[label.toUpperCase()] || colors.OTHERS} />
        })}
        <circle cx="100" cy="100" r="60" fill="#1f2937" />
        <text
          x="100"
          y="104"
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-2xl font-semibold fill-white"
        >
          Users
        </text>
      </svg>

      <div className="flex gap-8">
        {data.map(({ label, value }) => {
          const percent = ((value / total) * 100).toFixed(1)
          return (
            <div key={label} className="flex flex-col items-center">
              <span
                className="inline-block w-6 h-6 rounded-full mb-1"
                style={{ backgroundColor: colors[label.toUpperCase()] || colors.OTHERS }}
              />
              <span className="capitalize font-medium text-gray-300">{label}</span>
              <span className="text-sm text-gray-400">{value} users</span>
              <span className="text-xs text-gray-500">{percent}%</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function AdminDashboardPage() {
  const [members, setMembers] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [deletingId, setDeletingId] = useState(null)

  useEffect(() => {
    fetchMembers()
  }, [])

  async function fetchMembers() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/members')
      const data = await res.json()
      if (data.success) {
        setMembers(data.members)
      } else {
        setError('Failed to load members: ' + (data.message || 'Unknown error'))
      }
    } catch {
      setError('Network error loading members')
    } finally {
      setLoading(false)
    }
  }

  const filteredMembers = members.filter(m =>
    `${m.firstName} ${m.lastName} ${m.email}`.toLowerCase().includes(search.toLowerCase())
  )

  const roleData = [
    { label: 'Members', value: members.filter(m => m.userType.toUpperCase() === 'MEMBER').length },
    { label: 'Volunteers', value: members.filter(m => m.userType.toUpperCase() === 'VOLUNTEER').length },
    { label: 'Admins', value: members.filter(m => m.userType.toUpperCase() === 'ADMIN').length },
  ]

  async function handleDelete(id) {
    if (!confirm('Are you sure you want to delete this member?')) return
    setDeletingId(id)
    try {
      const res = await fetch(`/api/admin/members/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (data.success) {
        setMembers(prev => prev.filter(m => m.id !== id))
      } else {
        alert('Failed to delete: ' + (data.message || 'Unknown error'))
      }
    } catch {
      alert('Network error deleting member')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <>
      <Navigation />
      <div className="max-w-7xl mx-auto p-8 bg-gray-800 rounded-lg shadow-lg min-h-screen">
        <h1 className="text-3xl font-extrabold mb-8 text-white border-b pb-4">
          Admin Dashboard - Members Management
        </h1>

        <div className="flex justify-end mb-6">
          <div className="relative text-gray-400 focus-within:text-gray-200">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FaSearch />
            </span>
            <input
              type="text"
              placeholder="Search members..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="py-2 pl-10 pr-4 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition w-64"
            />
          </div>
        </div>

        <PieChart data={roleData} />

        {loading && <p className="text-gray-300 mt-6">Loading members...</p>}
        {error && <p className="text-red-500 mt-6">{error}</p>}

        {!loading && !error && (
          <div className="overflow-auto max-h-[600px] mt-6 rounded-lg border border-gray-700 shadow-lg">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-900 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    Phone
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    Location
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    Role
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    Active
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    Joined
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-900 divide-y divide-gray-700">
                {filteredMembers.map(member => (
                  <tr key={member.id} className="hover:bg-gray-700 cursor-pointer">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-white">
                      {member.firstName} {member.lastName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">{member.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">{member.phone || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                      {member.city}, {member.state}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">{member.userType}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-green-400 font-semibold">
                      {member.isActive ? 'Yes' : 'No'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                      {new Date(member.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button
                        type="button"
                        disabled={deletingId === member.id}
                        onClick={() => handleDelete(member.id)}
                        className="text-red-500 hover:text-red-700 font-semibold disabled:opacity-50 transition"
                      >
                        {deletingId === member.id ? 'Deleting...' : 'Delete'}
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredMembers.length === 0 && (
                  <tr>
                    <td colSpan={8} className="text-center py-10 text-gray-400">
                      No members found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  )
}
