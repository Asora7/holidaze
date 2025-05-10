// src/api/bookingApi.ts
const API_BASE = import.meta.env.VITE_API_BASE_URL

// GET /api/venues/:id/availability
export async function getAvailability(venueId: string): Promise<string[]> {
  const resp = await fetch(`${API_BASE}/api/venues/${venueId}/availability`)
  if (!resp.ok) throw new Error('Could not load availability')
  return resp.json()
}

// POST /api/bookings
export async function createBooking(payload: {
  venueId: string
  date: string    // 'YYYY-MM-DD'
}): Promise<void> {
  const resp = await fetch(`${API_BASE}/api/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // add auth header here later if you need one
    },
    body: JSON.stringify(payload),
  })
  if (resp.status === 401) {
    throw new Error('You must be logged in to book')
  }
  if (!resp.ok) {
    const err = await resp.json()
    throw new Error(err.message || 'Booking failed')
  }
}
