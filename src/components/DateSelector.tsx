// src/components/DateSelector.tsx
import { useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { getAvailability, createBooking } from '../api/bookingsApi'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

interface DateSelectorProps {
  venueId: string
}

export default function DateSelector({ venueId }: DateSelectorProps) {
  const [startDate, setStartDate]   = useState<Date | null>(null)
  const [endDate, setEndDate]       = useState<Date | null>(null)
  const [unavailable, setUnavailable] = useState<Date[]>([])
  const navigate = useNavigate()
  const { isAuthenticated, redirectToLogin } = useAuth()

  useEffect(() => {
    getAvailability(venueId)
      .then(dates => setUnavailable(dates.map(d => new Date(d))))
      .catch(console.error)
  }, [venueId])

  const handleBook = async () => {
    if (!startDate || !endDate) return

    if (!isAuthenticated) {
      return redirectToLogin(`/venues/${venueId}`)
    }

    // build an array of ISO dates from startDate → endDate inclusive
    const bookings: Promise<void>[] = []
    const cursor = new Date(startDate)
    while (cursor <= endDate) {
      bookings.push(
        createBooking({
          venueId,
          date: cursor.toISOString().slice(0, 10),
        })
      )
      cursor.setDate(cursor.getDate() + 1)
    }

    try {
      await Promise.all(bookings)
      navigate('/my-bookings')
    } catch (err: any) {
      alert(`Booking failed: ${err.message}`)
    }
  }

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <ReactDatePicker
        inline
        selectsRange               // ← correct prop name
        startDate={startDate}
        endDate={endDate}
        onChange={(dates) => {
          // dates is Date[] | null when selectsRange is true
          if (!dates) return
          const [start, end] = dates as [Date, Date]
          setStartDate(start)
          setEndDate(end)
        }}
        excludeDates={unavailable}
        minDate={new Date()}
      />

      <button
        onClick={handleBook}
        disabled={!startDate || !endDate}
        className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded"
      >
        Book from {startDate?.toLocaleDateString()} to {endDate?.toLocaleDateString()}
      </button>
    </div>
  )
}
