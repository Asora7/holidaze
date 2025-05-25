export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  venueManager: boolean;
}

export interface LoginPayload {
  email: string;
  password: string;
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
  payload: RegisterPayload,
): Promise<UserResponse> {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));

    throw err;
  }
  return res.json();
}

export async function loginUser(payload: LoginPayload): Promise<UserResponse> {
  const res = await fetch(`${API_BASE}/auth/login?_holidaze=true`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as any).message || res.statusText);
  }
  return res.json();
}
