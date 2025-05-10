// src/auth/AuthContext.tsx
import React, { createContext, useContext } from 'react'

// right now we’ll assume “not authenticated” always
interface AuthContextType {
  isAuthenticated: boolean
  redirectToLogin(next: string): void
}
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  redirectToLogin: (next) => {
    window.location.href = `/login?next=${encodeURIComponent(next)}`
  },
})

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => (
  <AuthContext.Provider value={{
    isAuthenticated: false,
    redirectToLogin: (next) => {
      window.location.href = `/login?next=${encodeURIComponent(next)}`
    },
  }}>
    {children}
  </AuthContext.Provider>
)

export function useAuth() {
  return useContext(AuthContext)
}
