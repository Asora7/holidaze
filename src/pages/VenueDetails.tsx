// src/pages/VenueDetails.tsx
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { fetchVenueById } from '../api/venuesApi'
import DateSelector from '../components/DateSelector'

export default function VenueDetails() {
  const { id } = useParams<{ id: string }>()
  const [venue, setVenue] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    fetchVenueById(id)
      .then(data => setVenue(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <p className="text-center my-8">Loading…</p>
  if (error)   return <p className="text-center text-red-500">{error}</p>
  if (!venue) return <p className="text-center">No venue found.</p>

  const imageUrl = venue.media?.[0]?.url ?? '/images/placeholder.png'

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">{venue.name}</h1>
      <img
        src={imageUrl}
        alt={venue.name}
        className="w-full h-64 object-cover rounded"
      />
      <p>{venue.description}</p>
      <ul className="space-y-1">
        <li><strong>Price:</strong> ${venue.price} / day</li>
        <li><strong>Location:</strong> {venue.location.city}, {venue.location.country}</li>
        <li><strong>Max Guests:</strong> {venue.maxGuests}</li>
        <li><strong>Rating:</strong> {venue.rating} ⭐️</li>
      </ul>

      {/* ← here is the calendar & button */}
      <DateSelector venueId={id!} price={venue.price} />
    </div>
  )
}
