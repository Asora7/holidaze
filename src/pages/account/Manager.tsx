// src/pages/account/Manager.tsx

import { useEffect, useState } from 'react';
import { useAuth } from '../../auth/AuthContext';
import { getProfileVenues } from '../../api/profilesApi';
import { format, parseISO } from 'date-fns';
import VenueForm from '../../components/VenueForm';

export default function ManagerAccount() {
  const { user } = useAuth();
  const [venues, setVenues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // helper to load venues
  const fetchVenues = () => {
    if (!user) return;
    setLoading(true);
    getProfileVenues(user.name)
      .then(data => setVenues(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  // load on mount and when user changes
  useEffect(fetchVenues, [user]);

  if (!user) return null;         // or <Navigate to="/login" />
  if (loading) return <p className="p-4">Loading your venues…</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        Welcome, {user.name}{' '}
        <span className="text-gray-500">(Venue Manager)</span>
      </h1>

      {/* New venue button */}
      <button
        onClick={() => setShowForm(true)}
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        + New venue
      </button>

      {/* Create venue form */}
      {showForm && (
        <VenueForm
          onCreated={() => {
            setShowForm(false);
            fetchVenues();
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* List existing venues */}
      {venues.length === 0 ? (
        <p>You haven’t created any venues yet.</p>
      ) : (
        venues.map(venue => (
          <div
            key={venue.id}
            className="border rounded-lg p-4 shadow-sm space-y-2"
          >
            <h2 className="text-xl font-semibold">{venue.name}</h2>
            <p className="text-gray-600">
              {venue.location.city}, {venue.location.country}
            </p>

            <h3 className="mt-4 font-semibold">Bookings</h3>
            {venue.bookings.length === 0 ? (
              <p>No one has booked this venue yet.</p>
            ) : (
              <ul className="list-disc list-inside space-y-1">
                {venue.bookings.map((b: any) => (
                  <li key={b.id}>
                    {format(parseISO(b.dateFrom), 'MMM d, yyyy')} &ndash;{' '}
                    {format(parseISO(b.dateTo), 'MMM d, yyyy')} (
                    {b.guests} guest{b.guests > 1 ? 's' : ''})
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))
      )}
    </div>
  );
}
