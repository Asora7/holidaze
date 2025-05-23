// src/components/Home/SearchBar.tsx
import { useState } from 'react';
import type { FormEvent } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';

interface SearchBarProps {
  onSearch?: (params: {
    where: string;
    dates: { from: string; to: string };
    guests: number;
  }) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [where, setWhere]       = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate]     = useState('');
  const [guests, setGuests]     = useState(1);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch?.({ where, dates: { from: fromDate, to: toDate }, guests });
  };

  return (
    <Container className="mt-5">
      <Form onSubmit={handleSubmit}>
        <Row className="g-2 align-items-center">
          <Col md>
            <Form.Control
              placeholder="Where to?"
              value={where}
              onChange={e => setWhere(e.target.value)}
            />
          </Col>
          <Col md>
            <Form.Control
              type="date"
              value={fromDate}
              onChange={e => setFromDate(e.target.value)}
            />
          </Col>
          <Col md>
            <Form.Control
              type="date"
              value={toDate}
              onChange={e => setToDate(e.target.value)}
            />
          </Col>
          <Col md="auto">
            <Form.Control
              type="number"
              min={1}
              value={guests}
              onChange={e => setGuests(+e.target.value)}
              style={{ width: '80px' }}
            />
          </Col>
          <Col md="auto">
            <Button type="submit" variant="warning" className="px-4">
              Search
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
