import React from 'react';
import { Outlet } from 'react-router-dom';
import AuthenticatedNavbar from './AuthenticatedNavbar';
import '../index.css';
import '../styles/AuthenticatedLayout_dashboard.css';

const AuthenticatedLayout: React.FC = () => {
  return (
    <div className="auth-layout-container">
      <AuthenticatedNavbar />
      <main className="auth-layout-main">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthenticatedLayout;
