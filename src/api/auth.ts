// src/api/auth.ts
export interface RegisterPayload {
    name: string;
    email: string;
    password: string;
    venueManager: boolean;
  }
  
  export interface UserResponse {
    data: {
      name: string;
      email: string;
      avatar?: { url: string; alt: string };
      banner?: { url: string; alt: string };
      accessToken: string;
      venueManager: boolean;
    };
    meta: object;
  }
  
  const API_BASE = import.meta.env.VITE_API_BASE_URL as string;
  
  export async function registerUser(
    payload: RegisterPayload
  ): Promise<UserResponse> {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  
    if (!res.ok) {
      // assume API returns JSON { errors: { field: message } }
      const err = await res.json();
      throw err;
    }
    return res.json();
  }
  