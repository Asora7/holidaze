//AppRoutes.tsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from '../components/Layout'
import Home from '../pages/Home'
import VenueDetails from '../pages/VenueDetails'
import Login from '../pages/Login'
import Register from '../pages/Register'
import MyAccount from '../pages/MyAccount'

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="venues/:id" element={<VenueDetails />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="account" element={<MyAccount />} />
    </Route>
  </Routes>
)

export default AppRoutes
