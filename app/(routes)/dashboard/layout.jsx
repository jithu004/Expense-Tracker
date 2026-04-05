"use client";
import React, { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import SideNav from './_components/SideNav';
import DashboardHeader from './_components/DashboardHeader';
import MobileNav from './_components/MobileNav';
import { SearchProvider } from './_context/SearchContext';
import { RoleProvider } from './_context/RoleContext';
import { DataProvider } from './_context/DataContext';

function DashboardLayout({ children }) {
  const { user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const userId = user?.primaryEmailAddress?.emailAddress;

  return (
    <RoleProvider>
      <SearchProvider>
        <DataProvider userId={userId}>
          <div>
            <div className="fixed md:w-64 hidden md:block shadow-md">
              <SideNav />
            </div>
            <MobileNav isOpen={isMenuOpen} toggleMenu={toggleMenu} />
            <div className="md:ml-64">
              <DashboardHeader toggleMenu={toggleMenu} />
              {children}
            </div>
          </div>
        </DataProvider>
      </SearchProvider>
    </RoleProvider>
  );
}

export default DashboardLayout;