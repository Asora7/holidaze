//pages/account/ProfileCard.tsx

import { useEffect, useState } from 'react'
import { useAuth } from '../../auth/AuthContext'
import { getProfile, updateProfileAvatar } from '../../api/profilesApi'

export default function ProfileCard() {
  const { user } = useAuth()
  const [profile, setProfile] = useState<any>(null)
  const [avatarUrl, setAvatarUrl] = useState('')

  useEffect(() => {
    if (!user) return
    getProfile(user.name)
      .then(p => {
        setProfile(p)
        setAvatarUrl(p.avatar?.url || '')
      })
      .catch(console.error)
  }, [user])

  if (!profile) return <p>Loading profile…</p>

  const handleSave = () => {
    updateProfileAvatar(profile.name, avatarUrl)
      .then(updated => {
        setProfile(updated)
        alert('Avatar updated!')
      })
      .catch(e => alert(e.message))
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center space-y-2">
        <img
          src={profile.avatar?.url || '/images/avatar-placeholder.png'}
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
          onChange={e => setAvatarUrl(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          placeholder="https://..."
        />
        <button
          onClick={handleSave}
          className="mt-1 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </div>
    </div>
  )
}