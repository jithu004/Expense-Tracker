"use client";
import React, { useEffect, useState } from 'react';
import SideNav from './_components/SideNav';
import DashboardHeader from './_components/DashboardHeader';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { checkUserBudget } from './_actions/userActions';
import MobileNav from './_components/MobileNav';
import { SearchProvider } from '@/app/(routes)/dashboard/_context/SearchContext'; // Import the provider

function DashboardLayout({ children }) {
  const { user } = useUser();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (user) {
      checkAndRedirect();
    }
  }, [user]);

  const checkAndRedirect = async () => {
    const hasBudget = await checkUserBudget();
    if (!hasBudget) {
      router.replace('/dashboard/budgets');
    }
  };

  return (
    <SearchProvider> {/* Wrap the content with the provider */}
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
    </SearchProvider>
  );
}

export default DashboardLayout;