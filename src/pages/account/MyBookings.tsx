import { useEffect, useState } from "react";
import { fetchMyBookings } from "../../api/bookingsApi";

export default function MyBookings() {
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    fetchMyBookings().then(setBookings).catch(console.error);
  }, []);

  return (
    <div className="max-w-2xl mx-auto py-6">
      <h2 className="text-xl font-bold mb-4">My bookings</h2>
      {bookings.map((b) => (
        <div key={b.id} className="border rounded p-4 mb-3 shadow-sm">
          <p>
            <strong>Venue:</strong> {b.venue.name}
          </p>
          <p>
            <strong>Location:</strong> {b.venue.location.city},{" "}
            {b.venue.location.country}
          </p>
          <p>
            <strong>From:</strong> {new Date(b.dateFrom).toLocaleDateString()}
          </p>
          <p>
            <strong>To:</strong> {new Date(b.dateTo).toLocaleDateString()}
          </p>
          <p>
            <strong>Guests:</strong> {b.guests}
          </p>
        </div>
      ))}
    </div>
  );
}
