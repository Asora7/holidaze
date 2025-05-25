import React, { createContext, useContext, useState, useEffect } from "react";
import * as profilesApi from "../api/profilesApi";

export interface User {
  name: string;
  email: string;
  avatar?: string;
  venueManager: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login(authData: {
    token: string;
    name: string;
    email: string;
    venueManager: boolean;
  }): Promise<void>;
  logout(): void;
  redirectToLogin(next: string): void;
  updateProfileAvatar(url: string): Promise<void>;
}

const defaultCtx: AuthContextType = {
  user: null,
  isAuthenticated: false,
  login: async () => {},
  logout: () => {},
  redirectToLogin: (next) => {
    window.location.href = `/login?next=${encodeURIComponent(next)}`;
  },
  updateProfileAvatar: async () => {},
};

const AuthContext = createContext<AuthContextType>(defaultCtx);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(() => {
    const raw = localStorage.getItem("user");
    return raw ? (JSON.parse(raw) as User) : null;
  });

  const isAuthenticated = !!user;

  useEffect(() => {
    if (user) {
      profilesApi
        .getProfile(user.name)
        .then((fresh) => {
          const updatedUser: User = {
            name: fresh.name,
            email: fresh.email,
            venueManager: fresh.venueManager,
            avatar: fresh.avatar?.url,
          };
          setUser(updatedUser);
          localStorage.setItem("user", JSON.stringify(updatedUser));
        })
        .catch(() => {});
    }
  }, []);

  const login = async (authData: {
    token: string;
    name: string;
    email: string;
    venueManager: boolean;
  }) => {
    localStorage.setItem("token", authData.token);
    const fresh = await profilesApi.getProfile(authData.name);
    const u: User = {
      name: fresh.name,
      email: fresh.email,
      venueManager: fresh.venueManager,
      avatar: fresh.avatar?.url,
    };
    setUser(u);
    localStorage.setItem("user", JSON.stringify(u));
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const redirectToLogin = (next: string) => {
    window.location.href = `/login?next=${encodeURIComponent(next)}`;
  };

  const updateProfileAvatar = async (newUrl: string) => {
    if (!user) throw new Error("Not authenticated");

    const updatedProfile = await profilesApi.updateProfileAvatar(
      user.name,
      newUrl,
    );

    const newUser: User = {
      ...user,
      avatar: updatedProfile.avatar.url,
    };

    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        redirectToLogin,
        updateProfileAvatar,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
