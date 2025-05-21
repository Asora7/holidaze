// src/pages/account/Customer.tsx
import { useEffect, useState } from 'react'
import { useAuth } from '../../auth/AuthContext'
import {
  getProfile,
  updateProfileAvatar,
} from '../../api/profilesApi'
import {
  fetchMyBookings,
  cancelBooking,
} from '../../api/bookingsApi'
import { format, parseISO } from 'date-fns'

export default function CustomerAccount() {
  const { user } = useAuth()
  const [profile, setProfile] = useState<any>(null)
  const [avatarUrl, setAvatarUrl] = useState('')
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // 1) Load your profile
  useEffect(() => {
    if (!user) return
    getProfile(user.name)
      .then((p) => {
        setProfile(p)
        setAvatarUrl(p.avatar || '')
      })
      .catch(console.error)
  }, [user])

  // 2) Load your bookings
  useEffect(() => {
    if (!user) return
    fetchMyBookings() // no args, reads user from localStorage internally
      .then((bks) => setBookings(bks))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [user])

  // 3) Save avatar back to API
  const handleSaveAvatar = () => {
    if (!profile) return
    updateProfileAvatar(profile.name, avatarUrl)
      .then((updated) => {
        setProfile(updated)
        alert('Avatar updated!')
      })
      .catch((e) => alert(e.message))
  }

  // 4) Cancel booking
  const handleCancel = (id: string) => {
    if (!confirm('Cancel this booking?')) return
    cancelBooking(id)
      .then(() => setBookings((bks) => bks.filter((b) => b.id !== id)))
      .catch((e) => alert(e.message))
  }

  if (!user) return <p className="p-4">Please log in.</p>
  if (loading) return <p className="p-4">Loading…</p>

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-4 gap-8">
      {/* — PROFILE COLUMN — */}
      <div className="space-y-4">
        <div className="flex flex-col items-center space-y-2">
          <img
            src={profile.avatar || '/images/avatar-placeholder.png'}
            alt="Your avatar"
            className="w-32 h-32 rounded-full border object-cover"
          />
          <h2 className="text-xl font-semibold">{profile.name}</h2>
          <p className="text-gray-600">{profile.email}</p>
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium">Avatar URL</label>
          <input
            type="text"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="https://..."
          />
          <button
            onClick={handleSaveAvatar}
            className="mt-1 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>

      {/* — BOOKINGS COLUMN — */}
      <div className="md:col-span-3 space-y-6">
        <h1 className="text-2xl font-bold">My Bookings</h1>
        {bookings.length === 0 ? (
          <p>No upcoming bookings.</p>
        ) : (
          bookings.map((b) => (
            <div
              key={b.id}
              className="border rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">{b.venue.name}</h3>
                <p className="text-gray-600">
                  {format(parseISO(b.dateFrom), 'MMM d, yyyy')} —{' '}
                  {format(parseISO(b.dateTo), 'MMM d, yyyy')}
                </p>
                <p className="text-gray-600">
                  {b.venue.location.city}, {b.venue.location.country}
                </p>
              </div>
              <button
                onClick={() => handleCancel(b.id)}
                className="border border-red-500 text-red-500 px-4 py-2 rounded hover:bg-red-50"
              >
                Cancel
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
