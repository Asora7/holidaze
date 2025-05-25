import { Container, Row, Col, Form } from "react-bootstrap";

export const FILTER_OPTIONS = [
  "popular destinations",
  "price: low → high",
  "price: high → low",
];

interface FilterDropdownProps {
  value: string;
  onChange: (v: string) => void;
}

export default function FilterDropdown({
  value,
  onChange,
}: FilterDropdownProps) {
  return (
    <Container className="pt-5 mb-4">
      <Row>
        <Col xs="auto" className="ps-0">
          <Form.Select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            style={{ maxWidth: "200px" }}
          >
            {FILTER_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>
    </Container>
  );
}
