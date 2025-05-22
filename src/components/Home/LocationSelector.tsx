// src/components/Home/LocationSelector.tsx
import { Button, ButtonGroup, Container, Card } from 'react-bootstrap';

interface Props {
  options: string[];
  value: string;
  onChange: (loc: string) => void;
}

export default function LocationSelector({ options, value, onChange }: Props) {
  return (
    <Container className="my-5 d-flex justify-content-center">
      <ButtonGroup>
        {options.map(loc => (
          <Button
            key={loc}
            variant={value === loc ? 'warning' : 'light'}
            onClick={() => onChange(loc)}
            className="d-flex flex-column align-items-center px-0 border-0"
          >
            <Card.Img
              src={`/assets/locations/${loc.toLowerCase()}.jpg`}
              alt={loc}
              style={{ width: '120px', height: '160px', objectFit: 'cover', borderRadius: '0.5rem' }}
            />
            <small className="mt-2">{loc}</small>
          </Button>
        ))}
      </ButtonGroup>
    </Container>
  );
}
