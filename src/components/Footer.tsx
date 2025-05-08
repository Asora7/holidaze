// src/components/Footer.tsx
import styled from 'styled-components';

const FooterLink = styled.a`
  color: #255E4C;
  text-decoration: none;
  &:hover {
    color: #1E473F;
  }
`;

export default function Footer() {
  return (
    <footer className="bg-white border-top py-4 mt-auto">
      <div className="container text-center small text-muted">
        © 2025 Holidaze &nbsp;•&nbsp;
        <FooterLink href="#">Privacy Policy</FooterLink>
        &nbsp;•&nbsp;
        <FooterLink href="#">Terms & Conditions</FooterLink>
      </div>
    </footer>
  );
}
