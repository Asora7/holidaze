// src/components/DateSelector.tsx

import { useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { getVenueWithBookings, createBooking } from '../api/bookingsApi'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { addDays, parseISO } from 'date-fns'
import { Modal, Button } from 'react-bootstrap'

interface DateSelectorProps {
  venueId: string
  price: number
}

export default function DateSelector({ venueId }: DateSelectorProps) {
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [unavailable, setUnavailable] = useState<Date[]>([])
  const [showConfirm, setShowConfirm] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()
  const { isAuthenticated } = useAuth()

  // Fetch unavailable dates
  useEffect(() => {
    getVenueWithBookings(venueId)
      .then(({ bookings }) => {
        const days: Date[] = []
        bookings.forEach(({ dateFrom, dateTo }) => {
          let cursor = parseISO(dateFrom)
          const end = parseISO(dateTo)
          while (cursor <= end) {
            days.push(new Date(cursor))
            cursor = addDays(cursor, 1)
          }
        })
        setUnavailable(days)
      })
      .catch(console.error)
  }, [venueId])

  // Show the confirmation modal (or redirect to login)
  const attemptBooking = () => {
    if (!startDate || !endDate) return

    if (!isAuthenticated) {
      navigate('/login', {
        state: {
          from: location.pathname,
          errorMessage: 'You must be logged in to book a venue',
        },
      })
      return
    }

    setShowConfirm(true)
  }

  // When user confirms in modal
  const handleConfirm = async () => {
    setShowConfirm(false)
    try {
      await createBooking({
        venueId,
        dateFrom: startDate!.toISOString().split('T')[0],
        dateTo:   endDate!.toISOString().split('T')[0],
        guests:   1,
      })
      navigate('/account/customer')
    } catch (err: any) {
      alert(`Booking failed: ${err.message}`)
    }
  }

  return (
    <>
      <div className="p-4 border rounded-lg shadow-sm">
        <ReactDatePicker
          inline
          selectsRange
          startDate={startDate}
          endDate={endDate}
          onChange={(dates) => {
            const [start, end] = dates as [Date, Date]
            setStartDate(start)
            setEndDate(end)
          }}
          excludeDates={unavailable}
          minDate={new Date()}
        />

      <Button
      className="mt-4 w-100"
       variant="warning"
       disabled={!startDate || !endDate}
       onClick={attemptBooking}
       >
        Book Now
        </Button>
      </div>

      <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Your Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to book from{' '}
          <strong>{startDate?.toLocaleDateString()}</strong> to{' '}
          <strong>{endDate?.toLocaleDateString()}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Yes, Book
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}