import React, { useState, useEffect } from "react";
import { Card, Form, Row, Col, Button, Spinner } from "react-bootstrap";
import { createVenue, updateVenue } from "../api/venuesApi";

interface Props {
  venue?: any;

  onSaved: () => void;
  onCancel: () => void;
}

export default function VenueForm({ venue, onSaved, onCancel }: Props) {
  const [name, setName] = useState(venue?.name || "");
  const [imageUrl, setImageUrl] = useState(venue?.media?.[0]?.url || "");
  const [price, setPrice] = useState<number>(venue?.price || 0);
  const [city, setCity] = useState(venue?.location?.city || "");
  const [maxGuests, setMaxGuests] = useState<number>(venue?.maxGuests || 1);
  const [description, setDescription] = useState(venue?.description || "");
  const [wifi, setWifi] = useState(venue?.meta?.wifi || false);
  const [parking, setParking] = useState(venue?.meta?.parking || false);
  const [breakfast, setBreakfast] = useState(venue?.meta?.breakfast || false);
  const [pets, setPets] = useState(venue?.meta?.pets || false);
  const [submitting, setSubmitting] = useState(false);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (venue) {
      setName(venue.name);
      setImageUrl(venue.media?.[0]?.url || "");
      setPrice(venue.price);
      setCity(venue.location.city);
      setMaxGuests(venue.maxGuests);
      setDescription(venue.description);
      setWifi(venue.meta?.wifi || false);
      setParking(venue.meta?.parking || false);
      setBreakfast(venue.meta?.breakfast || false);
      setPets(venue.meta?.pets || false);
    }
  }, [venue]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setSubmitting(true);
    const payload = {
      name,
      description,
      media: imageUrl ? [{ url: imageUrl }] : [],
      price,
      maxGuests,
      meta: { wifi, parking, breakfast, pets },
      location: { city },
    };

    try {
      if (venue?.id) {
        await updateVenue(venue.id, payload);
      } else {
        await createVenue(payload);
      }
      onSaved();
    } catch (err: any) {
      alert(
        `Failed to ${venue?.id ? "update" : "create"} venue: ${err.message}`,
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="shadow-sm rounded-3">
      <Card.Body>
        <Card.Title className="mb-4">
          {venue ? "Edit Venue" : "Create Venue"}
        </Card.Title>

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="venueName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter a name.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="venueImage">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid image URL.
            </Form.Control.Feedback>
          </Form.Group>

          <Row className="g-3 mb-3">
            <Col sm={4}>
              <Form.Group controlId="venuePrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(+e.target.value)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a price.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col sm={4}>
              <Form.Group controlId="venueCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a city.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col sm={4}>
              <Form.Group controlId="venueGuests">
                <Form.Label>Capacity</Form.Label>
                <Form.Control
                  type="number"
                  value={maxGuests}
                  onChange={(e) => setMaxGuests(+e.target.value)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter the maximum number of guests.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

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

          <Form.Group className="mb-4" controlId="venueDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter a description.
            </Form.Control.Feedback>
          </Form.Group>

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
              disabled={submitting}
              style={{
                backgroundColor: "var(--bs-secondary)",
                borderColor: "var(--bs-secondary)",
                color: "#000",
                fontWeight: 600,
              }}
            >
              {submitting ? (
                <>
                  <Spinner as="span" animation="border" size="sm" /> Saving…
                </>
              ) : venue ? (
                "Save changes"
              ) : (
                "Create"
              )}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}
