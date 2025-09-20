'use client'
import { useEffect, useState } from 'react'

const sampleEvents = [
  {
    id: '1',
    name: 'Community Cleanup',
    date: '2025-10-05',
    location: 'City Park',
    status: 'Upcoming',
  },
  {
    id: '2',
    name: 'Fundraising Gala',
    date: '2025-09-22',
    location: 'Grand Ballroom',
    status: 'Active',
  },
  {
    id: '3',
    name: 'Volunteer Training',
    date: '2025-09-30',
    location: 'Community Center',
    status: 'Upcoming',
  },
]

export default function ManageEventsPage() {
  const [events, setEvents] = useState(sampleEvents)
  const [loading, setLoading] = useState(false) //set false initially since we have fallback data
  const [error, setError] = useState('')
  const [deletingId, setDeletingId] = useState(null)

  useEffect(() => {
    fetchEvents()
  }, [])

  async function fetchEvents() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/events')
      if (!res.ok) throw new Error('Failed to fetch events')
      const data = await res.json()
      if (data.success) {
        setEvents(data.events)
      } else {
        setError(data.message || 'Failed to load events')
        setEvents(sampleEvents) //Fallback data
      }
    } catch {
      setError('Network error loading events, showing sample data')
      setEvents(sampleEvents) //Fallback data
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id) {
    if (!confirm('Are you sure you want to delete this event?')) return
    setDeletingId(id)
    try {
      const res = await fetch(`/api/admin/events/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (data.success) {
        setEvents(prev => prev.filter(event => event.id !== id))
      } else {
        alert(data.message || 'Failed to delete event')
      }
    } catch {
      alert('Network error deleting event')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-7xl mx-auto bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-extrabold mb-8 border-b border-gray-700 pb-4">Manage Events</h1>

        {loading && (
          <div className="flex justify-center py-16 text-xl text-gray-400">Loading events...</div>
        )}

        {error && (
          <div className="bg-yellow-700 text-yellow-200 p-4 rounded mb-6 font-semibold">
            {error}
          </div>
        )}

        {!loading && events.length === 0 && (
          <p className="text-center text-gray-500">No events found.</p>
        )}

        {!loading && events.length > 0 && (
          <div className="overflow-auto max-h-[600px] rounded bg-gray-700 shadow-inner border border-gray-600">
            <table className="w-full table-auto text-left">
              <thead className="sticky top-0 bg-gray-800 border-b border-gray-600 z-10">
                <tr>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wide">Event Name</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wide">Date</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wide">Location</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wide text-center">Status</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wide text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map(event => (
                  <tr
                    key={event.id}
                    className="border-b border-gray-700 hover:bg-gray-700 transition cursor-pointer"
                  >
                    <td className="px-6 py-4 font-medium">{event.name}</td>
                    <td className="px-6 py-4">{new Date(event.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4">{event.location}</td>
                    <td className="px-6 py-4 text-center">{event.status || 'Upcoming'}</td>
                    <td className="px-6 py-4 text-center">
                      <button
                        disabled={deletingId === event.id}
                        onClick={() => handleDelete(event.id)}
                        className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white px-4 py-2 rounded font-semibold disabled:opacity-50 transition"
                      >
                        {deletingId === event.id ? 'Deleting...' : 'Delete'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
