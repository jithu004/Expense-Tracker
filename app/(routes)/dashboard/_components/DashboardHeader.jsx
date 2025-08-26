import { UserButton } from '@clerk/nextjs';
import { Menu } from 'lucide-react';
import React from 'react';
import SearchBar from './SearchBar';

function DashboardHeader({ toggleMenu }) {
  return (
    <div className="p-5 border-b shadow-sm flex justify-between items-center gap-4">
      {/* Menu button for mobile */}
      <button onClick={toggleMenu} className="md:hidden">
        <Menu />
      </button>

      {/* Search bar now visible on all screen sizes */}
      <div className="w-full">
        <SearchBar />
      </div>

      {/* User button */}
      <div>
        <UserButton />
      </div>
    </div>
  );
}

export default DashboardHeader;