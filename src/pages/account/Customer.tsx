// src/pages/account/Customer.tsx
import { useEffect, useState } from 'react'
import { useAuth } from '../../auth/AuthContext'

export default function CustomerAccount() {
  const { user } = useAuth()
  const [bookings, setBookings] = useState<any[]>([])

  useEffect(() => {
    if (!user) return;
  
    const token = localStorage.getItem("token");
    const apiKey = import.meta.env.VITE_API_KEY;
  
    fetch(`https://v2.api.noroff.dev/holidaze/profiles/${user.name}/bookings?_venue=true`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        "X-Noroff-API-Key": apiKey ?? "",
      },
    })
      .then((res) => res.json())
      .then((data) => setBookings(data.data))
      .catch(console.error);
  }, [user]);
  
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">My Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul className="space-y-4">
          {bookings.map((b) => (
            <li key={b.id} className="border p-4 rounded">
              <p><strong>Venue:</strong> {b.venue.name}</p>
              <p><strong>From:</strong> {b.dateFrom}</p>
              <p><strong>To:</strong> {b.dateTo}</p>
              <p><strong>Guests:</strong> {b.guests}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
