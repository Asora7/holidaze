// src/components/Navbar.tsx

import { Link, useNavigate } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { useAuth } from '../auth/AuthContext'

// shared link/button styles
const navItemStyles = css`
  color: var(--bs-primary);
  font-family: var(--font-sans);
  font-weight: 500;
  font-size: 18px;
  letter-spacing: 0.5px;
  text-decoration: none;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;

  &:hover {
    color: #1e473f;
  }
`

const NavLink = styled(Link)`
  ${navItemStyles}
`
const NavButton = styled.button`
  ${navItemStyles}
`

// Logo image: fixed layout height but visually scaled
const LogoImg = styled.img`
  height: 32px;               /* Layout stays 32px tall */
  width: auto;
  transform: scale(4.5);      /* Visually 1.5× larger (≈48px) */
  transform-origin: left center;
  display: block;
`

export default function Navbar() {
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuth()

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom navbar-taller">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Brand: scaled SVG */}
        <Link to="/" className="navbar-brand p-0">
          <LogoImg src="/holidaze-logo.svg" alt="Holidaze logo" />
        </Link>

        {/* Nav links */}
        <div className="d-flex gap-5 align-items-center">
          {isAuthenticated ? (
            <>
              <NavLink to={user!.venueManager ? "/account/manager" : "/account/customer"}>
                My Account
              </NavLink>
              <NavButton onClick={handleLogout}>Log out</NavButton>
            </>
          ) : (
            <>
              <NavLink to="/login">Log in</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
