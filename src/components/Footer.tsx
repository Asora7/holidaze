// src/components/Footer.tsx
import styled from 'styled-components'

/** 
 * 1px light gray top border, white background,
 * padding: 2rem 0 for extra vertical breathing space 
 */
const FooterContainer = styled.footer`
  background: #ffffff;
  border-top: 1px solid #e6e6e6; 
  padding: 3rem 0;            

  /* center everything and stack vertically */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem; /* bump from 0.5rem → 1rem */
`

/** Copyright text: same body-text style */
const FooterText = styled.p`
  font-family: var(--font-sans);
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0.5px;
  color: var(--bs-primary);
  margin: 0; 
`

export default function Footer() {
  return (
    <FooterContainer>
      <FooterText>© 2025 Holidaze. All Rights Reserved.</FooterText>
    </FooterContainer>
  )
}
