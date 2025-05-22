// src/components/Navbar.tsx

import { Link, useNavigate } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { useAuth } from '../auth/AuthContext'
import Logo from '../assets/images/holidaze-logo.svg'

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

// a styled Link
const NavLink = styled(Link)`
  ${navItemStyles}
`

// a styled button with the exact same look
const NavButton = styled.button`
  ${navItemStyles}
`

export default function Navbar() {
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuth()

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom">
      <div className="container-fluid px-4 px-lg-5 d-flex justify-content-between align-items-center">
        {/* logo */}
        <Link to="/" className="navbar-brand p-0">
          <img src={Logo} alt="Holidaze logo" height={96} />
        </Link>

        {/* wider gap between items */}
        <div className="d-flex gap-5 align-items-center">
          {isAuthenticated ? (
            <>
              <NavLink to={user!.venueManager ? "/account/manager" : "/account/customer"}>
                My Account
              </NavLink>
              <NavButton onClick={handleLogout}>
                Log out
              </NavButton>
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
