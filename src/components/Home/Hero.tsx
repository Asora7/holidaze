// src/components/Home/Hero.tsx

import { Container } from 'react-bootstrap';

export default function Hero() {
  return (
    <div
      className="position-relative text-white"
      style={{
        height: '600px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: `url(/assets/hero.jpg)`
      }}
    >
      <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50" />
      <Container className="position-relative h-100 d-flex flex-column justify-content-center">
        <h1 className="display-4 fw-bold">
          Welcome to <span className="text-warning">Holidaze</span>
        </h1>
        <p className="lead">Find your perfect stay</p>
      </Container>
    </div>
  );
}
