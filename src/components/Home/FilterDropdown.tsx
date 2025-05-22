// src/components/Home/FilterDropdown.tsx

import { Container, Form } from 'react-bootstrap';

export const FILTER_OPTIONS = [
  'popular destinations',
  'price: low → high',
  'price: high → low'
];

export default function FilterDropdown({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <Container className="mb-4 d-flex justify-content-center">
      <Form.Select
        style={{ maxWidth: '200px' }}
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        {FILTER_OPTIONS.map(o => <option key={o}>{o}</option>)}
      </Form.Select>
    </Container>
  );
}
