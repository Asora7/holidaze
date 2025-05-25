import { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getVenueWithBookings, createBooking } from "../api/bookingsApi";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { addDays, parseISO } from "date-fns";
import { Modal, Button, Form } from "react-bootstrap";

interface DateSelectorProps {
  venueId: string;
  price: number;
  maxGuests: number;
}

export default function DateSelector({
  venueId,
  maxGuests,
}: DateSelectorProps) {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [unavailable, setUnavailable] = useState<Date[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [guests, setGuests] = useState<number>(1);

  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    getVenueWithBookings(venueId)
      .then(({ bookings }) => {
        const days: Date[] = [];
        bookings.forEach(({ dateFrom, dateTo }) => {
          let cursor = parseISO(dateFrom);
          const end = parseISO(dateTo);
          while (cursor <= end) {
            days.push(new Date(cursor));
            cursor = addDays(cursor, 1);
          }
        });
        setUnavailable(days);
      })
      .catch(console.error);
  }, [venueId]);

  const attemptBooking = () => {
    if (!startDate || !endDate) return;

    if (!isAuthenticated) {
      navigate("/login", {
        state: {
          from: location.pathname,
          errorMessage: "You must be logged in to book a venue",
        },
      });
      return;
    }

    setShowConfirm(true);
  };

  const handleConfirm = async () => {
    setShowConfirm(false);
    try {
      await createBooking({
        venueId,
        dateFrom: startDate!.toISOString().split("T")[0],
        dateTo: endDate!.toISOString().split("T")[0],
        guests,
      });
      navigate("/account/customer");
    } catch (err: any) {
      alert(`Booking failed: ${err.message}`);
    }
  };

  return (
    <>
      <div className="p-4 border rounded shadow-sm">
        <div className="d-flex justify-content-center mb-3">
          <div style={{ display: "inline-block" }}>
            <ReactDatePicker
              inline
              selectsRange
              startDate={startDate}
              endDate={endDate}
              onChange={(dates) => {
                const [start, end] = dates as [Date, Date];
                setStartDate(start);
                setEndDate(end);
              }}
              excludeDates={unavailable}
              minDate={new Date()}
              calendarClassName="shadow rounded"
            />
          </div>
        </div>

        <Form.Group className="mt-3">
          <Form.Label>Guests</Form.Label>
          <Form.Control
            type="number"
            min={1}
            max={maxGuests}
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
          />
        </Form.Group>

        <Button
          className="mt-3 w-100"
          variant="warning"
          disabled={!startDate || !endDate || guests < 1}
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
          Are you sure you want to book from{" "}
          <strong>{startDate?.toLocaleDateString()}</strong> to{" "}
          <strong>{endDate?.toLocaleDateString()}</strong> for{" "}
          <strong>
            {guests} guest{guests > 1 ? "s" : ""}
          </strong>
          ?
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
  );
}
