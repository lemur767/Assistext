
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import DashboardNav from './DashboardNav';

const DashboardHeader: React.FC = () => {
  const { logout } = useAuth();

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/dashboard" className="text-xl font-bold text-gray-800">
          Assistext
        </Link>
        <nav className="hidden md:flex items-center space-x-4">
          <DashboardNav />
          <button onClick={logout} className="text-gray-600 hover:text-gray-800">
            Logout
          </button>
        </nav>
        <div className="md:hidden">
          {/* Mobile menu button can be added here */}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
