// src/pages/account/CustomerAccount.tsx

import { useEffect, useState } from 'react'
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner
} from 'react-bootstrap'
import { useAuth } from '../../auth/AuthContext'
import { getProfile, updateProfileAvatar } from '../../api/profilesApi'
import { fetchMyBookings, cancelBooking } from '../../api/bookingsApi'
import { format, parseISO } from 'date-fns'
import ProfileCard from './ProfileCard'

export default function CustomerAccount() {
  const { user } = useAuth()
  const [profile, setProfile] = useState<any>(null)
  const [avatarUrl, setAvatarUrl] = useState('')
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Load profile
  useEffect(() => {
    if (!user) return
    getProfile(user.name)
      .then(p => {
        setProfile(p)
        setAvatarUrl(p.avatar || '')
      })
      .catch(console.error)
  }, [user])

  // Load bookings
  useEffect(() => {
    if (!user) return
    fetchMyBookings()
      .then(bks => setBookings(bks))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [user])

  // Save avatar
  const handleSaveAvatar = () => {
    if (!profile) return
    updateProfileAvatar(profile.name, avatarUrl)
      .then(updated => {
        setProfile(updated)
        alert('Avatar updated!')
      })
      .catch(e => alert(e.message))
  }

  // Cancel booking
  const handleCancel = (id: string) => {
    if (!window.confirm('Cancel this booking?')) return
    cancelBooking(id)
      .then(() => setBookings(bs => bs.filter(b => b.id !== id)))
      .catch(e => alert(e.message))
  }

  if (!user) return <p className="p-4">Please log in.</p>
  if (loading) return (
    <div className="p-4 text-center"><Spinner animation="border" /></div>
  )

  return (
    <Container fluid style={{ backgroundColor: '#f8f9fa' }} className="py-5">
      <Container style={{ maxWidth: '1140px' }}>
        <Row className="g-4">
          {/* — PROFILE SIDEBAR — */}
          <Col md={4} lg={3}>
          <ProfileCard
          profile={profile}
          onSaveAvatar={handleSaveAvatar}
          />
          </Col>

          {/* — BOOKINGS STACKED CARDS — */}
          <Col md={8} lg={9}>
            <h2 className="text-center mb-4">My Bookings</h2>

            {bookings.length === 0 ? (
              <p className="text-center text-muted">
                You have no upcoming bookings.
              </p>
            ) : (
              <div className="d-flex flex-column align-items-center">
                {bookings.map((b) => (
                  <Card
                    key={b.id}
                    className="mb-4 shadow-sm"
                    style={{
                      width: '75%',
                      minWidth: '300px',
                      maxWidth: '500px',
                    }}
                  >
                    <Card.Body className="d-flex justify-content-between align-items-center">
                      <div>
                        <Card.Title className="h6 mb-1">
                          {b.venue.name}
                        </Card.Title>
                        <Card.Text className="small text-muted mb-1">
                          {format(parseISO(b.dateFrom), 'MMM d, yyyy')} –{' '}
                          {format(parseISO(b.dateTo), 'MMM d, yyyy')}
                        </Card.Text>
                        <Card.Text className="small text-muted mb-1">
                          {b.venue.location.city},{' '}
                          {b.venue.location.country}
                        </Card.Text>
                        <Card.Text className="fw-bold mt-2">
                          Total: ${((b.total ?? 0)).toFixed(2)}
                        </Card.Text>
                      </div>
                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => handleCancel(b.id)}
                      >
                        Cancel
                      </Button>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </Container>
  )
}