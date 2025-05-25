const API_BASE = import.meta.env.VITE_API_BASE_URL as string;
const H_API = `${API_BASE}/holidaze`;

async function handleJson<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error((body as any).message || res.statusText);
  }
  return res.json();
}

export async function getVenueWithBookings(venueId: string): Promise<{
  id: string;
  bookings: Array<{ dateFrom: string; dateTo: string }>;
}> {
  const res = await fetch(`${H_API}/venues/${venueId}?_bookings=true`);
  const json = await handleJson<{ data: any }>(res);
  return {
    id: json.data.id,
    bookings: json.data.bookings.map((b: any) => ({
      dateFrom: b.dateFrom,
      dateTo: b.dateTo,
    })),
  };
}

export async function createBooking(payload: {
  venueId: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
}): Promise<void> {
  const token = localStorage.getItem("token");
  const apiKey = import.meta.env.VITE_API_KEY;

  const res = await fetch(`${H_API}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Noroff-API-Key": apiKey ?? "",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as any).message || "Booking failed");
  }
}

export async function fetchMyBookings(): Promise<any[]> {
  const token = localStorage.getItem("token");
  const apiKey = import.meta.env.VITE_API_KEY;
  const rawUser = localStorage.getItem("user");
  if (!rawUser) throw new Error("User not logged in");
  const { name } = JSON.parse(rawUser);

  const res = await fetch(
    `${H_API}/profiles/${encodeURIComponent(name)}/bookings?_venue=true`,
    {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        "X-Noroff-API-Key": apiKey ?? "",
      },
    },
  );
  const json = await handleJson<{ data: any[] }>(res);
  return json.data;
}

export async function cancelBooking(bookingId: string): Promise<void> {
  const API_BASE = import.meta.env.VITE_API_BASE_URL as string;
  const H_API = `${API_BASE}/holidaze`;
  const token = localStorage.getItem("token") ?? "";
  const apiKey = import.meta.env.VITE_API_KEY ?? "";

  const res = await fetch(`${H_API}/bookings/${bookingId}`, {
    method: "DELETE",
    headers: {
      "X-Noroff-API-Key": apiKey,
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as any).message || "Failed to cancel booking");
  }
}
