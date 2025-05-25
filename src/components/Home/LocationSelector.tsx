import { Container, Row, Col, Card } from "react-bootstrap";

import allImg from "../../assets/images/all.jpg";
import osloImg from "../../assets/images/oslo.jpg";
import italyImg from "../../assets/images/italy.jpg";
import austImg from "../../assets/images/australia.jpg";
import spainImg from "../../assets/images/spain.jpg";

const IMAGE_MAP: Record<string, string> = {
  all: allImg,
  oslo: osloImg,
  italy: italyImg,
  australia: austImg,
  spain: spainImg,
};

interface LocationSelectorProps {
  options: string[];
  value: string;
  onChange: (loc: string) => void;
}

export default function LocationSelector({
  options,
  value,
  onChange,
}: LocationSelectorProps) {
  return (
    <Container className="my-5">
      <Row xs={2} sm={3} md={4} lg={5} className="g-4">
        {options.map((loc) => {
          const key = loc.toLowerCase();
          const isActive = value === loc;
          return (
            <Col key={loc}>
              <Card
                onClick={() => onChange(loc)}
                className={`h-100 border-0 shadow-sm position-relative ${isActive ? "border-warning border-3" : ""}`}
                style={{ cursor: "pointer" }}
              >
                <Card.Img
                  variant="top"
                  src={IMAGE_MAP[key]}
                  alt={loc}
                  className="w-100"
                  style={{ objectFit: "cover", height: "240px" }}
                />

                <div
                  className="position-absolute top-0 start-0 w-100 h-100"
                  style={{
                    background: "rgba(0,0,0,0.3)",
                  }}
                />

                <Card.Body className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-end justify-content-center p-2">
                  <Card.Text
                    className="mb-0 text-white fw-bold"
                    style={{ textShadow: "0 1px 4px rgba(0,0,0,0.7)" }}
                  >
                    {loc}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
