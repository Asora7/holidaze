// src/pages/account/Customer.tsx
import { useAuth } from '../../auth/AuthContext'

export default function CustomerAccount() {
  const { user } = useAuth()
  return (
    <div>
      <h1>Welcome, {user?.name} (Customer)</h1>
    </div>
  )
}
