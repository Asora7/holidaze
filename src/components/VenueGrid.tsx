// src/components/VenueGrid.tsx
import { Container, Row, Col } from 'react-bootstrap';
import VenueCard from './VenueCard';

export default function VenueGrid({ venues }: { venues: any[] }) {
  return (
    <Container className="pb-5">
      <Row xs={1} sm={2} lg={3} className="g-4">
        {venues.map(v => (
          <Col key={v.id}>
            <VenueCard venue={v} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
