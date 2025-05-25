import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "../components/Layout";
import Home from "../pages/Home";
import VenueDetails from "../pages/VenueDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CustomerAccount from "../pages/account/Customer";
import ManagerAccount from "../pages/account/Manager";

import { PrivateRoute } from "../components/PrivateRoute";

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="venues/:id" element={<VenueDetails />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />

      <Route element={<PrivateRoute requireManager={false} />}>
        <Route path="account/customer" element={<CustomerAccount />} />
      </Route>

      <Route element={<PrivateRoute requireManager={true} />}>
        <Route path="account/manager" element={<ManagerAccount />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  </Routes>
);

export default AppRoutes;
