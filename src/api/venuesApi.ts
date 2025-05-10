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
