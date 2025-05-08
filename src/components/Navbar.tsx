// src/components/Navbar.tsx
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Logo from '../assets/images/holidaze-logo.svg'

const NavLink = styled(Link)`
  color: var(--bs-primary);
  font-family: var(--font-sans);
  font-weight: 500;
  font-size: 18px;
  letter-spacing: 0.5px;
  text-decoration: none;

  &:hover {
    color: #1e473f;
  }
`

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom">
      <div className="container-fluid px-4 px-lg-5 d-flex justify-content-between align-items-center">
        {/* Just the logo as brand */}
        <Link to="/" className="navbar-brand p-0">
          <img src={Logo} alt="Holidaze logo" height={96} />
        </Link>

        {/* Nav links spaced out */}
        <div className="d-flex gap-5 me-4">
          <NavLink to="/login">Log in</NavLink>
          <NavLink to="/register">Register</NavLink>
        </div>
      </div>
    </nav>
  )
}
