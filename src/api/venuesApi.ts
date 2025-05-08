// src/api/venuesApi.ts
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function handleResponse(res: Response) {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error((body as any).message || res.statusText);
  }
  return res.json();
}

/**
 * Fetches all venues (first page).
 */
export async function fetchAllVenues(): Promise<any[]> {
  const res = await fetch(`${BASE_URL}/venues`);
  const json = await handleResponse(res) as { data: any[] };
  return json.data;
}
