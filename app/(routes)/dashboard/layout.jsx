"use client";
import React, { useState } from "react";
import SideNav from "./_components/SideNav";
import DashboardHeader from "./_components/DashboardHeader";
import MobileNav from "./_components/MobileNav";
import { SearchProvider } from "@/app/(routes)/dashboard/_context/SearchContext";
import { RoleProvider } from "@/app/(routes)/dashboard/_context/RoleContext";

function DashboardLayout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <RoleProvider>
      <SearchProvider>
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
    </RoleProvider>
  );
}

export default DashboardLayout;
