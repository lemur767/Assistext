import React from 'react';
import { Outlet } from 'react-router-dom';
import AuthenticatedNavbar from './AuthenticatedNavbar';

const AuthenticatedLayout: React.FC = () => {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--background)',
      transition: 'background-color 0.3s ease'
    }}>
      <AuthenticatedNavbar />
      <main style={{
        maxWidth: '80rem',
        margin: '0 auto',
        padding: '2rem 1rem'
      }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AuthenticatedLayout;
