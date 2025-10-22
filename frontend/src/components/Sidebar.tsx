
import React from 'react';
import DashboardNav from './DashboardNav';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white p-4">
      <nav>
        <DashboardNav isMobile={true} />
      </nav>
    </aside>
  );
};

export default Sidebar;
