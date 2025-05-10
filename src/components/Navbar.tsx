// src/components/Navbar.tsx
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useAuth } from '../auth/AuthContext'
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
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuth()

  function handleLogout() {
    logout()       // clear token & user
    navigate('/')  // redirect to homepage
  }

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom">
      <div className="container-fluid px-4 px-lg-5 d-flex justify-content-between align-items-center">
        {/* logo */}
        <Link to="/" className="navbar-brand p-0">
          <img src={Logo} alt="Holidaze logo" height={96} />
        </Link>

        <div className="d-flex gap-4 align-items-center">
          {isAuthenticated ? (
            <>
              <NavLink to={user!.venueManager ? "/account/manager" : "/account/customer"}>
                My Account
              </NavLink>
              <button
                onClick={handleLogout}
                className="btn btn-outline-secondary"
              >
                Log out
              </button>
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
