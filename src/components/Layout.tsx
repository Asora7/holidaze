// src/components/Layout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout: React.FC = () => (
  <>
    <Navbar />

    {/* The Outlet will render each page’s component.
        Pages themselves wrap their own content in <Container> where needed */}
    <Outlet />

    <Footer />
  </>
);

export default Layout;
