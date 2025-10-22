
import React from 'react';
import { NavLink } from 'react-router-dom';

const navLinks = [
  { to: '/dashboard', text: 'Dashboard' },
  { to: '/conversations', text: 'Conversations' },
  { to: '/contacts', text: 'Contacts' },
  { to: '/settings', text: 'Settings' },
  { to: '/subscription', text: 'Subscription' },
];

interface DashboardNavProps {
  isMobile?: boolean;
}

const DashboardNav: React.FC<DashboardNavProps> = ({ isMobile }) => {
  const baseClasses = isMobile ? 'block py-2 px-4 rounded' : '';
  const activeClass = isMobile ? 'bg-gray-700' : 'text-gray-900 font-bold';
  const inactiveClass = isMobile ? 'hover:bg-gray-700' : 'text-gray-600 hover:text-gray-800';

  return (
    <ul className={isMobile ? '' : 'flex space-x-4'}>
      {navLinks.map((link) => (
        <li key={link.to}>
          <NavLink
            to={link.to}
            className={({ isActive }) =>
              `${baseClasses} ${isActive ? activeClass : inactiveClass}`
            }
          >
            {link.text}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default DashboardNav;
