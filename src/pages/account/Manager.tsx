// src/pages/account/Manager.tsx
import { useEffect, useState } from 'react'
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Spinner,
  Modal
} from 'react-bootstrap'
import { useAuth } from '../../auth/AuthContext'
import { getProfileVenues } from '../../api/profilesApi'
import { format, parseISO } from 'date-fns'
import VenueForm from '../../components/VenueForm'
import ProfileCard from './ProfileCard'
import { deleteVenue } from '../../api/venuesApi'

export default function ManagerAccount() {
  const { user, updateProfileAvatar } = useAuth()
  const [venues, setVenues]           = useState<any[]>([])
  const [loading, setLoading]         = useState(true)

  // Modal state: null = create, or the venue object = edit
  const [activeVenue, setActiveVenue] = useState<any | null>(null)
  const [showModal, setShowModal]     = useState(false)

  // Keep a local copy of the avatar URL while editing
  const [avatarUrl, setAvatarUrl]     = useState(user?.avatar || '')

  // Fetch venues on mount / user change
  useEffect(() => {
    if (!user) return
    setLoading(true)
    getProfileVenues(user.name)
      .then(data => setVenues(data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [user])

  if (!user) return null

  if (loading) {
    return (
      <Container className="py-4 text-center">
        <Spinner animation="border" />
      </Container>
    )
  }

  // Refresh helper
  const refresh = () => getProfileVenues(user.name).then(setVenues)

  return (
    <Container className="py-4">
      <Row className="gy-4">
        {/* ←— Left column: ProfileCard */}
        <Col md={4} lg={3} className="position-sticky" style={{ top: '1rem' }}>
          <ProfileCard
            profile={{
              name:  user.name,
              email: user.email,
              avatar:user.avatar
            }}
            avatarUrl={avatarUrl}
            onAvatarChange={setAvatarUrl}
            onSaveAvatar={() => updateProfileAvatar(avatarUrl)}
          />
        </Col>

        {/* —→ Right column: manager dashboard */}
        <Col lg={8}>
          {/* Header + New venue button */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <Button
              onClick={() => {
                setActiveVenue(null)  // clear for “create” mode
                setShowModal(true)
              }}
              style={{
                backgroundColor: 'var(--bs-secondary)',
                borderColor:     'var(--bs-secondary)',
                color:           '#000',
              }}
            >
              + New venue
            </Button>
          </div>

          {/* “My Venues” list */}
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
              src={v.media?.[0]?.url || '/images/venue-placeholder.png'}
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
            <Button
              size="sm"
              variant="outline-secondary"
              className="me-2"
              onClick={() => {
                setActiveVenue(v)  // load into form for editing
                setShowModal(true)
              }}
            >
              Edit
            </Button>
            <Button
              size="sm"
              variant="danger"
              onClick={async () => {
                if (
                  !window.confirm(
                    `Delete venue "${v.name}"? This cannot be undone.`
                  )
                ) {
                  return
                }
                try {
                  await deleteVenue(v.id)  // hit DELETE /venues/:id
                  await refresh()          // re-fetch your list
                } catch (err: any) {
                  console.error(err)
                  alert(`Could not delete: ${err.message}`)
                }
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      ))
    )}
  </Card.Body>
</Card>

          {/* “Upcoming Bookings” */}
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Card.Title>Upcoming Bookings</Card.Title>
              {venues
                .flatMap(v => v.bookings.map((b: any) => ({ ...b, venue: v })))
                .map(b => (
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
                ))}
              {venues.flatMap(v => v.bookings).length === 0 && (
                <p>No upcoming bookings.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal for both Create & Edit */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {activeVenue ? 'Edit Venue' : 'Create Venue'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <VenueForm
            venue={activeVenue || undefined}
            onSaved={() => {
              setShowModal(false)
              refresh()
            }}
            onCancel={() => setShowModal(false)}
          />
        </Modal.Body>
      </Modal>
    </Container>
  )
}