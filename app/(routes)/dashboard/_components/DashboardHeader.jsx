"use client";
import { UserButton } from '@clerk/nextjs';
import { Menu } from 'lucide-react';
import React from 'react';
import SearchBar from './SearchBar';
import { usePathname } from 'next/navigation';

function DashboardHeader({ toggleMenu }) {
  const path = usePathname();
  const showSearch = path === '/dashboard/transactions' || path === '/dashboard/budgets';

  return (
    <div className="p-5 border-b shadow-sm flex justify-between items-center gap-4">
      <button onClick={toggleMenu} className="md:hidden">
        <Menu />
      </button>
      <div className="w-full">
        {showSearch && <SearchBar />}
      </div>
      <div>
        <UserButton />
      </div>
    </div>
  );
}

export default DashboardHeader;