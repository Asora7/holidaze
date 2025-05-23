// components/VenueForm.tsx
import React, { useState } from "react"
import { Card, Form, Row, Col, Button, Spinner } from "react-bootstrap"
import { createVenue } from "../api/venuesApi"

interface Props {
  onCreated: () => void
  onCancel: () => void
}

export default function VenueForm({ onCreated, onCancel }: Props) {
  const [name, setName]               = useState("")
  const [imageUrl, setImageUrl]       = useState("")
  const [price, setPrice]             = useState<number>(0)
  const [city, setCity]               = useState("")
  const [maxGuests, setMaxGuests]     = useState<number>(1)
  const [description, setDescription] = useState("")
  const [wifi, setWifi]               = useState(false)
  const [parking, setParking]         = useState(false)
  const [breakfast, setBreakfast]     = useState(false)
  const [pets, setPets]               = useState(false)
  const [submitting, setSubmitting]   = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await createVenue({
        name,
        description,
        media: imageUrl ? [{ url: imageUrl }] : [],
        price,
        maxGuests,
        meta: { wifi, parking, breakfast, pets },
        location: { city },
      })
      onCreated()
    } catch (err: any) {
      alert("Failed to create venue: " + err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Row className="justify-content-center mb-4">
      <Col lg={6} md={8}>
        <Card className="shadow-sm rounded-3">
          <Card.Body>
            <Card.Title className="mb-4">Create Venue</Card.Title>

            <Form onSubmit={handleSubmit}>

              {/* Name */}
              <Form.Group className="mb-3" controlId="venueName">
                <Form.Label>Name</Form.Label>
                <Form.Control 
                  type="text" 
                  value={name} 
                  onChange={e => setName(e.target.value)} 
                  required 
                  placeholder="Enter venue name"
                />
              </Form.Group>

              {/* Image URL */}
              <Form.Group className="mb-3" controlId="venueImage">
                <Form.Label>Image URL</Form.Label>
                <Form.Control 
                  type="url" 
                  value={imageUrl} 
                  onChange={e => setImageUrl(e.target.value)} 
                  placeholder="https://example.com/photo.jpg"
                />
              </Form.Group>

              {/* Price + City + Capacity */}
              <Row className="g-3 mb-3">
                <Col sm={4}>
                  <Form.Group controlId="venuePrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="number"
                      value={price}
                      onChange={e => setPrice(+e.target.value)}
                      required
                      placeholder="€/night"
                    />
                  </Form.Group>
                </Col>
                <Col sm={4}>
                  <Form.Group controlId="venueCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      value={city}
                      onChange={e => setCity(e.target.value)}
                      placeholder="City"
                    />
                  </Form.Group>
                </Col>
                <Col sm={4}>
                  <Form.Group controlId="venueGuests">
                    <Form.Label>Capacity</Form.Label>
                    <Form.Control
                      type="number"
                      value={maxGuests}
                      onChange={e => setMaxGuests(+e.target.value)}
                      required
                      placeholder="Max guests"
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Amenities */}
              <fieldset className="mb-3">
                <Form.Label as="legend" column className="mb-2">
                  Amenities
                </Form.Label>
                <Form.Check 
                  type="checkbox"
                  id="amenityWifi"
                  label="Free wifi"
                  checked={wifi}
                  onChange={() => setWifi(!wifi)}
                />
                <Form.Check 
                  type="checkbox"
                  id="amenityParking"
                  label="Free parking"
                  checked={parking}
                  onChange={() => setParking(!parking)}
                />
                <Form.Check 
                  type="checkbox"
                  id="amenityBreakfast"
                  label="Breakfast"
                  checked={breakfast}
                  onChange={() => setBreakfast(!breakfast)}
                />
                <Form.Check 
                  type="checkbox"
                  id="amenityPets"
                  label="Pets allowed"
                  checked={pets}
                  onChange={() => setPets(!pets)}
                />
              </fieldset>

              {/* Description */}
              <Form.Group className="mb-4" controlId="venueDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </Form.Group>

              {/* Buttons */}
              <div className="d-flex justify-content-end">
                <Button 
                  variant="secondary" 
                  className="me-2" 
                  onClick={onCancel}
                  disabled={submitting}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  variant="primary"
                  disabled={submitting}
                >
                  {submitting 
                    ? <><Spinner as="span" animation="border" size="sm" /> Creating…</> 
                    : "Create"}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}
