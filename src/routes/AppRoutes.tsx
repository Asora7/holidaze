// src/routes/AppRoutes.tsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from '../components/Layout'
import Home from '../pages/Home'
import VenueDetails from '../pages/VenueDetails'
import Login from '../pages/Login'
import Register from '../pages/Register'
import CustomerAccount from '../pages/account/Customer'
import ManagerAccount  from '../pages/account/Manager'

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="venues/:id" element={<VenueDetails />} />
      <Route path="login"    element={<Login />} />
      <Route path="register" element={<Register />} />

      <Route path="account">
        <Route path="customer" element={<CustomerAccount />} />
        <Route path="manager"  element={<ManagerAccount  />} />
      </Route>
    </Route>
  </Routes>
)

export default AppRoutes
