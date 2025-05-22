// src/api/venuesApi.ts
const BASE_URL = import.meta.env.VITE_API_BASE_URL;  // https://v2.api.noroff.dev

async function handleResponse(res: Response) {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error((body as any).message || res.statusText);
  }
  return res.json();
}

const H_API = `${BASE_URL}/holidaze`;

export async function fetchAllVenues(): Promise<any[]> {
  const res  = await fetch(`${H_API}/venues`);    
  const json = await handleResponse(res) as { data: any[] };
  return json.data;
}

export async function searchVenues(q: string): Promise<any[]> {
  const res  = await fetch(
    `${H_API}/venues/search?q=${encodeURIComponent(q)}`
  );
  const json = await handleResponse(res) as { data: any[] };
  return json.data;
}

export async function fetchVenueById(id: string): Promise<any> {
  const res  = await fetch(`${H_API}/venues/${id}`);
  const json = await handleResponse(res) as { data: any };
  return json.data;
}

/**
 * POST /holidaze/venues
 * Create a new venue (manager only)
 */
export async function createVenue(payload: {
    name: string
    description: string
    media?: Array<{ url: string; alt?: string }>
    price: number
    maxGuests: number
    rating?: number
    meta?: {
      wifi?: boolean
      parking?: boolean
      breakfast?: boolean
      pets?: boolean
    }
    location?: {
      address?: string
      city?: string
      zip?: string
      country?: string
      continent?: string
      lat?: number
      lng?: number
    }
  }): Promise<any> {
    const token  = localStorage.getItem("token");
    const apiKey = import.meta.env.VITE_API_KEY;
    const res = await fetch(`${H_API}/venues`, {
      method: "POST",
      headers: {
        "Content-Type":      "application/json",
        "X-Noroff-API-Key":   apiKey ?? "",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(payload),
    });
    return handleResponse(res);
  }
  