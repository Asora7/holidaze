//api/profilesApi.ts
const BASE = "https://v2.api.noroff.dev/holidaze"
const API_KEY = import.meta.env.VITE_API_KEY
const token = () => localStorage.getItem("token")!

const headers = (isJSON = true): Record<string,string> => ({
  "Authorization": `Bearer ${token()}`,
  "X-Noroff-API-Key": API_KEY,
  ...(isJSON && { "Content-Type": "application/json" }),
})

export async function getProfile(username: string) {
    const res = await fetch(`${BASE}/profiles/${encodeURIComponent(username)}`, {
      headers: headers(false),
    })
    if (!res.ok) throw new Error("Failed to load profile")
    // pull off the `data` field
    const json = await res.json() as { data: any }
    return json.data
  }
  

  export async function updateProfileAvatar(username: string, avatarUrl: string) {
    const res = await fetch(`${BASE}/profiles/${encodeURIComponent(username)}`, {
      method: "PATCH",
      headers: headers(),
      body: JSON.stringify({ avatar: { url: avatarUrl } }),
    })
    if (!res.ok) throw new Error("Failed to update avatar")
    const json = await res.json() as { data: any }
    return json.data
  }
  