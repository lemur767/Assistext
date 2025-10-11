import React from 'react';
import { Outlet } from 'react-router-dom';

import LandingHeader from './LandingPage/LandingHeader';

const DashboardLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <LandingHeader />
      <main className="p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;