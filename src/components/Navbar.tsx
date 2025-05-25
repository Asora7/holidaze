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

// Container: fixes the layout height and allows overflow
const LogoContainer = styled.div`
  height: 48px;             /* controls navbar height */
  overflow: visible;        /* lets the logo stick out */
  display: flex;            /* align-items center if needed */
  align-items: center;
`

// Logo itself: small container but scaled up
const LogoImg = styled.img`
  height: 48px;             /* sets the layout box inside the container */
  transform: scale(3.5);      /* visually double size (~96px tall) */
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
    <nav className="navbar navbar-expand-lg bg-white navbar-taller">
      <div className="container-fluid d-flex justify-content-between align-items-center">

        {/* Brand */}
        <Link to="/" className="navbar-brand p-0">
          <LogoContainer>
            <LogoImg src="/holidaze-logo.svg" alt="Holidaze logo" />
          </LogoContainer>
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
