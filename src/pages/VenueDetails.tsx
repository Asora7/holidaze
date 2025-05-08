// src/pages/VenueDetails.tsx
import { useParams } from 'react-router-dom'

export default function VenueDetails() {
  const { id } = useParams<{ id: string }>()
  return <div>Venue Details for ID: {id}</div>
}
