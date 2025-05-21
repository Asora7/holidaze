// src/auth/AuthContext.tsx
import React, { createContext, useContext, useState } from 'react'

export interface User {
  name: string
  email: string
  venueManager: boolean
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login(authData: {
    token: string
    name: string
    email: string
    venueManager: boolean
  }): void
  logout(): void
  redirectToLogin(next: string): void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  redirectToLogin: (next) => {
    window.location.href = `/login?next=${encodeURIComponent(next)}`
  },
})

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // hydrate user from localStorage if present
  const [user, setUser] = useState<User | null>(() => {
    const raw = localStorage.getItem('user')
    return raw ? (JSON.parse(raw) as User) : null
  })

  const isAuthenticated = user !== null

  const login = (authData: {
    token: string
    name: string
    email: string
    venueManager: boolean
  }) => {
    localStorage.setItem('token', authData.token)
    const u: User = {
      name: authData.name,
      email: authData.email,
      venueManager: authData.venueManager,
    }
    localStorage.setItem('user', JSON.stringify(u))
    setUser(u)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  const redirectToLogin = (next: string) => {
    window.location.href = `/login?next=${encodeURIComponent(next)}`
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, redirectToLogin }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}