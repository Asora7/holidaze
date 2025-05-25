import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export interface Venue {
  id: string;
  name: string;
  media: Array<{ url: string; alt?: string }>;
  price: number;
  location?: { city?: string; country?: string };
}

interface VenueCardProps {
  venue: Venue;
}

export default function VenueCard({ venue }: VenueCardProps) {
  const img = venue.media[0].url
  const alt = venue.media[0]?.alt || venue.name;

  return (
    <Card className="h-100 shadow-sm border-0">
      <Link to={`/venues/${venue.id}`}>
        <Card.Img
          variant="top"
          src={img}
          alt={alt}
          style={{ height: "200px", objectFit: "cover" }}
        />
      </Link>
      <Card.Body>
        <Card.Title>{venue.name}</Card.Title>
        {venue.location && (
          <Card.Text className="text-muted">
            {venue.location.city}, {venue.location.country}
          </Card.Text>
        )}
        <Card.Text className="fw-bold">${venue.price}/night</Card.Text>
      </Card.Body>
    </Card>
  );
}
