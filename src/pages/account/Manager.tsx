// src/pages/account/Manager.tsx
import { useAuth } from '../../auth/AuthContext'

export default function ManagerAccount() {
  const { user } = useAuth()
  return (
    <div>
      <h1>Welcome, {user?.name} (Venue Manager)</h1>
    </div>
  )
}