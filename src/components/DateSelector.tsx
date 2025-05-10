// src/components/DateSelector.tsx
import { useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { getVenueWithBookings, createBooking } from '../api/bookingsApi'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { addDays, parseISO } from 'date-fns'

interface DateSelectorProps {
  venueId: string
}

export default function DateSelector({ venueId }: DateSelectorProps) {
  const [startDate,   setStartDate]   = useState<Date | null>(null)
  const [endDate,     setEndDate]     = useState<Date | null>(null)
  const [unavailable, setUnavailable] = useState<Date[]>([])
  const navigate = useNavigate()
  const { isAuthenticated, redirectToLogin } = useAuth()

  // Fetch existing bookings and expand each date range into individual Date objects
  useEffect(() => {
    getVenueWithBookings(venueId)
      .then(({ bookings }) => {
        const days: Date[] = []
        bookings.forEach(({ dateFrom, dateTo }) => {
          let cursor = parseISO(dateFrom)
          const end   = parseISO(dateTo)
          while (cursor <= end) {
            days.push(new Date(cursor))
            cursor = addDays(cursor, 1)
          }
        })
        setUnavailable(days)
      })
      .catch(console.error)
  }, [venueId])

  const handleBook = async () => {
    if (!startDate || !endDate) return

    if (!isAuthenticated) {
      return redirectToLogin(`/venues/${venueId}`)
    }

    // Build and fire off one POST per day in the selected range
    const promises: Promise<void>[] = []
    const cursor = new Date(startDate)
    while (cursor <= endDate) {
      promises.push(
        createBooking({
          venueId,
          date: cursor.toISOString().slice(0, 10),
        })
      )
      cursor.setDate(cursor.getDate() + 1)
    }

    try {
      await Promise.all(promises)
      // Now we actually use navigate, so the warning goes away
      navigate('/my-bookings')
    } catch (err: any) {
      alert(`Booking failed: ${err.message}`)
    }
  }

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <ReactDatePicker
        inline
        selectsRange
        startDate={startDate}
        endDate={endDate}
        onChange={(dates) => {
          if (!dates) return
          const [s, e] = dates as [Date, Date]
          setStartDate(s)
          setEndDate(e)
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
