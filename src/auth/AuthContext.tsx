// src/auth/AuthContext.tsx
import React, {
    createContext,
    useContext,
    useState,
    useEffect,
  } from 'react'
  import * as profilesApi from '../api/profilesApi'
  
  export interface User {
    name: string
    email: string
    avatar?: string
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
    }): Promise<void>
    logout(): void
    redirectToLogin(next: string): void
    updateProfileAvatar(url: string): Promise<void>
  }
  
  const defaultCtx: AuthContextType = {
    user: null,
    isAuthenticated: false,
    login: async () => {},
    logout: () => {},
    redirectToLogin: (next) => {
      window.location.href = `/login?next=${encodeURIComponent(next)}`
    },
    updateProfileAvatar: async () => {},
  }
  
  const AuthContext = createContext<AuthContextType>(defaultCtx)
  
  export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => {
    // initialize from localStorage
    const [user, setUser] = useState<User | null>(() => {
      const raw = localStorage.getItem('user')
      return raw ? (JSON.parse(raw) as User) : null
    })
  
    const isAuthenticated = !!user
  
    // If you want to re-fetch the full profile (including avatar) on mount:
    useEffect(() => {
      if (user) {
        profilesApi.getProfile(user.name)
          .then((fresh) => {
            setUser(fresh)
            localStorage.setItem('user', JSON.stringify(fresh))
          })
          .catch(() => {
            /* ignore */
          })
      }
    }, [])
  
    // login now also fetches the server profile
    const login = async (authData: {
      token: string
      name: string
      email: string
      venueManager: boolean
    }) => {
      // store token
      localStorage.setItem('token', authData.token)
  
      // fetch full profile (including avatar) from backend
      const fresh = await profilesApi.getProfile(authData.name)
      // if your backend login endpoint also returns avatar, you could merge here
      const u: User = {
        name: authData.name,
        email: authData.email,
        venueManager: authData.venueManager,
        avatar: fresh.avatar,
      }
  
      setUser(u)
      localStorage.setItem('user', JSON.stringify(u))
    }
  
    const logout = () => {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      setUser(null)
    }
  
    const redirectToLogin = (next: string) => {
      window.location.href = `/login?next=${encodeURIComponent(next)}`
    }
  
    // —— new method for avatar updates ——
    const updateProfileAvatar = async (newUrl: string) => {
      if (!user) throw new Error('Not authenticated')
      // call your API to update avatar on server
      const updated = await profilesApi.updateProfileAvatar(
        user.name,
        newUrl
      )
      // updated should include the new avatar property
      setUser(updated)
      localStorage.setItem('user', JSON.stringify(updated))
    }
  
    return (
      <AuthContext.Provider
        value={{
          user,
          isAuthenticated,
          login,
          logout,
          redirectToLogin,
          updateProfileAvatar, // now guaranteed
        }}
      >
        {children}
      </AuthContext.Provider>
    )
  }
  
  export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth must be inside AuthProvider')
    return ctx
  }
  