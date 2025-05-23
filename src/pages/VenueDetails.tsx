// src/pages/VenueDetails.tsx

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { fetchVenueById } from '../api/venuesApi'
import DateSelector from '../components/DateSelector'

import {
  Container,
  Row,
  Col,
  Carousel,
  Card,
  Badge,
  Spinner,
} from 'react-bootstrap'
import { StarFill, PeopleFill } from 'react-bootstrap-icons'

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

  if (loading)
    return (
      <div className="d-flex justify-content-center my-5">
        <Spinner animation="border" />
      </div>
    )
  if (error)
    return <p className="text-center text-danger my-5">{error}</p>
  if (!venue) return <p className="text-center my-5">No venue found.</p>

  return (
    <Container className="my-5">
      {/* Move the title above the row so the columns start at the carousel level */}
      <h1 className="mb-4">{venue.name}</h1>

      <Row className="align-items-start gy-4">
        {/* ————————————— Left column ————————————— */}
        <Col lg={8}>
          <Carousel controls indicators className="rounded-4 shadow-sm mb-4">
            {venue.media?.map((m: any, i: number) => (
              <Carousel.Item key={i}>
                <img
                  className="d-block w-100 rounded-4"
                  style={{
                    height: '400px',
                    objectFit: 'cover',
                    borderRadius: '1rem', // match Bootstrap’s rounded-4
                  }}
                  src={m.url}
                  alt={`${venue.name} ${i + 1}`}
                />
              </Carousel.Item>
            ))}
          </Carousel>

          <Row className="mb-4 text-muted">
            <Col>
              <small>
                <i className="bi bi-geo-alt-fill me-1" />
                {venue.location.city}, {venue.location.country}
              </small>
            </Col>
          </Row>

          <Card className="mb-4 rounded-4 shadow-sm border-0">
            <Card.Body>
              <Card.Title>Description</Card.Title>
              <Card.Text>{venue.description}</Card.Text>
            </Card.Body>
          </Card>

          <Card className="mb-4 rounded-4 shadow-sm border-0">
            <Card.Body>
              <Card.Title>Facilities</Card.Title>
              <ul className="list-unstyled mb-0">
                <li>
                  <i className="bi bi-wifi text-primary me-2" />
                  Free high-speed Wi-Fi
                </li>
                <li>
                  <i className="bi bi-snow text-primary me-2" />
                  Air conditioning
                </li>
                <li>
                  <i className="bi bi-broom text-primary me-2" />
                  Housekeeping included
                </li>
                <li>
                  <i className="bi bi-droplet text-primary me-2" />
                  Private infinity pool
                </li>
                <li>
                  <i className="bi bi-door-open text-primary me-2" />
                  Beach access
                </li>
                <li>
                  <i className="bi bi-cart-check text-primary me-2" />
                  Free parking
                </li>
                <li>
                  <i className="bi bi-paw text-primary me-2" />
                  Pets allowed
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>

        {/* ————————————— Right column ————————————— */}
        <Col lg={4}>
          <Card className="p-4 rounded-4 shadow-sm sticky-top">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h4 className="mb-1">
                  ${venue.price}{' '}
                  <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                    per night
                  </small>
                </h4>
                <Badge bg="warning" className="text-dark">
                  <StarFill /> {venue.rating.toFixed(1)}
                </Badge>
              </div>
              <div className="text-center">
                <PeopleFill size={24} className="me-1 text-secondary" />
                <div>{venue.maxGuests}</div>
              </div>
            </div>

            <DateSelector
              venueId={id!}
              price={venue.price}
              maxGuests={venue.maxGuests}
            />
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
