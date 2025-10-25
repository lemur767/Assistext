import React from 'react';
import { Outlet } from 'react-router-dom';
import AuthenticatedNavbar from './AuthenticatedNavbar';

const AuthenticatedLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <AuthenticatedNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthenticatedLayout;
