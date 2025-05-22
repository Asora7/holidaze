// src/components/Home/Hero.tsx
import { Container } from 'react-bootstrap';
import heroImg from '../../assets/images/hero.jpg';

export default function Hero() {
  return (
    <div className="hero-full">
      <div
        className="position-relative text-white"
        style={{
          height: '600px',
          background: `url(${heroImg}) center/cover no-repeat`
        }}
      >
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
        />

<Container className="position-relative h-100 d-flex flex-column justify-content-center">
  <h1 className="display-4 fw-bold hero-heading">
    Welcome to <span className="text-warning">Holidaze</span>
  </h1>
  <p className="lead hero-heading fs-2 ms-4">
    Find your perfect stay
  </p>
</Container>

      </div>
    </div>
  );
}
