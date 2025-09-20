'use client'
import { useEffect, useState } from 'react'

function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 transition-opacity">
      <div className="bg-gray-800 text-white rounded-xl w-full max-w-lg p-8 shadow-xl relative animate-fadeIn">
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-300 hover:text-white text-2xl leading-none"
          aria-label="Close"
        >
          ×
        </button>
        <div>{children}</div>
      </div>
    </div>
  )
}

const dummyUsers = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    userType: 'MEMBER',
    isActive: true,
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    userType: 'VOLUNTEER',
    isActive: false,
  },
  {
    id: '3',
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@example.com',
    userType: 'ADMIN',
    isActive: true,
  },
]

export default function ManageUsersPage() {
  const [users, setUsers] = useState(dummyUsers)
  const [loading, setLoading] = useState(false) // false initially since we have dummy data
  const [error, setError] = useState('')

  const [modalOpen, setModalOpen] = useState(false)
  const [modalType, setModalType] = useState('') // 'create', 'edit', 'view'
  const [selectedUser, setSelectedUser] = useState(null)

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    userType: 'MEMBER',
  })
  const [formError, setFormError] = useState('')
  const [formLoading, setFormLoading] = useState(false)

  useEffect(() => {
    fetchUsers()
  }, [])

  async function fetchUsers() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/users')
      const data = await res.json()
      if (data.success) {
        setUsers(data.users)
      } else {
        setError(data.message || 'Failed to load users')
      }
    } catch {
      setError('Network error loading users, showing dummy data')
    } finally {
      setLoading(false)
    }
  }

  function openCreateModal() {
    setForm({ firstName: '', lastName: '', email: '', password: '', userType: 'MEMBER' })
    setFormError('')
    setModalType('create')
    setModalOpen(true)
  }

  function openEditModal(user) {
    setSelectedUser(user)
    setForm({ ...user, password: '' })
    setFormError('')
    setModalType('edit')
    setModalOpen(true)
  }

  function openViewModal(user) {
    setSelectedUser(user)
    setModalType('view')
    setModalOpen(true)
  }

  function closeModal() {
    setModalOpen(false)
    setSelectedUser(null)
    setFormError('')
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setFormError('')
    setFormLoading(true)
    try {
      const method = modalType === 'create' ? 'POST' : 'PUT'
      const url = modalType === 'create' ? '/api/admin/users' : `/api/admin/users/${selectedUser.id}`

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) {
        fetchUsers()
        closeModal()
      } else {
        setFormError(data.message || 'Failed to save user')
      }
    } catch {
      setFormError('Network error')
    } finally {
      setFormLoading(false)
    }
  }

  async function handleDelete(id) {
    if (!confirm('Are you sure you want to delete this user?')) return
    try {
      const res = await fetch(`/api/admin/users/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (data.success) {
        setUsers(prev => prev.filter(user => user.id !== id))
      } else {
        alert(data.message || 'Failed to delete user')
      }
    } catch {
      alert('Network error deleting user')
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto bg-gray-800 rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Manage Users</h1>
          <button
            onClick={openCreateModal}
            className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 px-4 py-2 rounded font-semibold"
          >
            Create User
          </button>
        </div>

        {loading && <p className="text-gray-400">Loading users...</p>}
        {error && <p className="text-yellow-400 mb-4">{error}</p>}

        {!loading && !error && users.length === 0 && (
          <p className="text-gray-400">No users found.</p>
        )}

        {!loading && users.length > 0 && (
          <div className="overflow-auto max-h-[600px] rounded bg-gray-700 shadow-inner border border-gray-600">
            <table className="w-full table-auto text-left">
              <thead className="sticky top-0 bg-gray-800 border-b border-gray-600 z-10">
                <tr>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wide">Name</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wide">Email</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wide">Role</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wide text-center">Active</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wide text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-700 hover:bg-gray-700 transition cursor-pointer"
                  >
                    <td className="px-6 py-4 font-medium">{user.firstName} {user.lastName}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.userType}</td>
                    <td className="px-6 py-4 text-center">{user.isActive ? 'Yes' : 'No'}</td>
                    <td className="px-6 py-4 text-center space-x-2">
                      <button
                        onClick={() => openViewModal(user)}
                        className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded"
                      >
                        View
                      </button>
                      <button
                        onClick={() => openEditModal(user)}
                        className="bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal Popup */}
        <Modal
          isOpen={modalOpen}
          onClose={closeModal}
          title={
            modalType === 'create'
              ? 'Create New User'
              : modalType === 'edit'
              ? 'Edit User'
              : 'View User'
          }
        >
          {(modalType === 'create' || modalType === 'edit') && (
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <input
                name="firstName"
                placeholder="First Name"
                value={form.firstName}
                onChange={handleChange}
                required
                className="p-2 rounded bg-gray-700 border border-gray-600"
              />
              <input
                name="lastName"
                placeholder="Last Name"
                value={form.lastName}
                onChange={handleChange}
                required
                className="p-2 rounded bg-gray-700 border border-gray-600"
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
                className="p-2 rounded bg-gray-700 border border-gray-600"
              />
              {modalType === 'create' && (
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="p-2 rounded bg-gray-700 border border-gray-600"
                />
              )}

              <select
                name="userType"
                value={form.userType}
                onChange={handleChange}
                className="p-2 rounded bg-gray-700 border border-gray-600"
              >
                <option value="MEMBER">Member</option>
                <option value="VOLUNTEER">Volunteer</option>
                <option value="ADMIN">Admin</option>
              </select>

              <button
                type="submit"
                disabled={formLoading}
                className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white py-2 rounded font-semibold disabled:opacity-60 transition"
              >
                {formLoading ? 'Saving...' : 'Save'}
              </button>

              {formError && <p className="text-red-500">{formError}</p>}
            </form>
          )}

          {modalType === 'view' && selectedUser && (
            <div className="space-y-4">
              <p>
                <strong>Name: </strong> {selectedUser.firstName} {selectedUser.lastName}
              </p>
              <p>
                <strong>Email: </strong> {selectedUser.email}
              </p>
              <p>
                <strong>Role: </strong> {selectedUser.userType}
              </p>
              <p>
                <strong>Active: </strong> {selectedUser.isActive ? 'Yes' : 'No'}
              </p>
            </div>
          )}
        </Modal>
      </div>
    </div>
  )
}
