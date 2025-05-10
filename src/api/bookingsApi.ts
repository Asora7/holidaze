const API_BASE = import.meta.env.VITE_API_BASE_URL as string;  // e.g. https://v2.api.noroff.dev
const H_API    = `${API_BASE}/holidaze`;                       // …/holidaze

async function handleJson<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error((body as any).message || res.statusText);
  }
  return res.json();
}

/**
 * GET /holidaze/venues/:id?_bookings=true
 */
export async function getVenueWithBookings(
  venueId: string
): Promise<{
  id: string;
  bookings: Array<{ dateFrom: string; dateTo: string }>;
}> {
  const res  = await fetch(`${H_API}/venues/${venueId}?_bookings=true`);
  const json = await handleJson<{ data: any }>(res);
  return {
    id: json.data.id,
    bookings: json.data.bookings.map((b: any) => ({
      dateFrom: b.dateFrom,
      dateTo:   b.dateTo,
    })),
  };
}

/**
 * POST /holidaze/bookings
 */
export async function createBooking(payload: {
  venueId: string;
  date: string; // 'YYYY-MM-DD'
}): Promise<void> {
  const token = localStorage.getItem("token");
  const res = await fetch(`${H_API}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
  });

  if (res.status === 401) {
    throw new Error("You must be logged in to book");
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as any).message || "Booking failed");
  }
}
