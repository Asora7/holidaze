// src/pages/account/Manager.tsx

import { useEffect, useState } from 'react'
import { Container, Row, Col, Button, Card, Spinner } from 'react-bootstrap'
import { useAuth } from '../../auth/AuthContext'
import { getProfileVenues } from '../../api/profilesApi'
import { format, parseISO } from 'date-fns'
import VenueForm from '../../components/VenueForm'
import ProfileCard from './ProfileCard'

export default function ManagerAccount() {
  const { user, updateProfileAvatar } = useAuth()
  const [venues, setVenues] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

  // keep local edit of the avatar URL
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar || '')

  // load venues on mount / user change
  useEffect(() => {
    if (!user) return
    setLoading(true)
    getProfileVenues(user.name)
      .then(data => setVenues(data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [user])

  if (!user) return null
  if (loading)
    return (
      <Container className="py-4">
        <Spinner animation="border" />
      </Container>
    )

  // flatten all bookings so we can list them in one card
  const allBookings = venues.flatMap(v =>
    v.bookings.map((b: any) => ({ ...b, venue: v }))
  )

  // callback for saving avatar
  const handleSaveAvatar = () => {
    updateProfileAvatar(avatarUrl).catch(console.error)
  }

  return (
    <Container className="py-4">
      <Row className="gy-4">
        {/* ←—— Left column: your existing ProfileCard */}
        <Col md={4} lg={3} className="position-sticky" style={{ top: '1rem' }}>
          <ProfileCard
            profile={{
              name: user.name,
              email: user.email,
              avatar: user.avatar,
            }}
            avatarUrl={avatarUrl}
            onAvatarChange={setAvatarUrl}
            onSaveAvatar={handleSaveAvatar}
          />
        </Col>

        {/* ——→ Right column: manager content */}
        <Col lg={8}>
          {/* header + new-venue button */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <Button onClick={() => setShowForm(true)}>+ New venue</Button>
          </div>

          {/* venue creation form */}
          {showForm && (
            <VenueForm
              onCreated={() => {
                setShowForm(false)
                getProfileVenues(user.name).then(setVenues)
              }}
              onCancel={() => setShowForm(false)}
            />
          )}

          {/* two-card grid: My Venues + Upcoming Bookings */}
          <Row>
            {/* My Venues */}
            <Col md={6}>
              <Card className="mb-4 shadow-sm">
                <Card.Body>
                  <Card.Title>My Venues</Card.Title>
                  {venues.length === 0 ? (
                    <p>You haven’t created any venues yet.</p>
                  ) : (
                    venues.map(v => (
                      <div
                        key={v.id}
                        className="d-flex justify-content-between align-items-center py-2 border-bottom"
                      >
                        <div className="d-flex align-items-center">
                          <img
                            src={v.pictureUrl}
                            alt={v.name}
                            className="rounded me-3"
                            style={{ width: 48, height: 48, objectFit: 'cover' }}
                          />
                          <div>
                            <div>{v.name}</div>
                            <small className="text-muted">
                              {v.location.city}, {v.location.country}
                            </small>
                          </div>
                        </div>
                        <div>
                          <Button size="sm" variant="outline-secondary" className="me-2">
                            Edit
                          </Button>
                          <Button size="sm" variant="danger">
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </Card.Body>
              </Card>
            </Col>

            {/* Upcoming Bookings */}
            <Col md={6}>
              <Card className="mb-4 shadow-sm">
                <Card.Body>
                  <Card.Title>Upcoming Bookings</Card.Title>
                  {allBookings.length === 0 ? (
                    <p>No upcoming bookings.</p>
                  ) : (
                    allBookings.map(b => (
                      <div
                        key={b.id}
                        className="d-flex align-items-center py-2 border-bottom"
                      >
                        <img
                          src={b.venue.pictureUrl}
                          alt={b.venue.name}
                          className="rounded me-3"
                          style={{ width: 48, height: 48, objectFit: 'cover' }}
                        />
                        <div>
                          <div>{b.venue.name}</div>
                          <small className="text-muted d-block">
                            {format(parseISO(b.dateFrom), 'MMM d, yyyy')} –{' '}
                            {format(parseISO(b.dateTo), 'MMM d, yyyy')}
                          </small>
                          <small className="text-muted">
                            {b.guests} guest{b.guests > 1 ? 's' : ''}
                          </small>
                        </div>
                      </div>
                    ))
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}