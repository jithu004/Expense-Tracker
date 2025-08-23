// File: app/(routes)/dashboard/layout.jsx

"use client";
import React, { useEffect } from "react";
import SideNav from "./_components/SideNav";
import DashboardHeader from "./_components/DashboardHeader";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
// Import the new server action
import { checkUserBudget } from "./_actions/userActions";

function DashboardLayout({ children }) {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    // We only need to run the check if the user object is available
    if (user) {
      checkAndRedirect();
    }
  }, [user]); // The dependency array ensures this runs when the user object changes

  // This function now calls the server action
  const checkAndRedirect = async () => {
    const hasBudget = await checkUserBudget();
    // If the user has NO budgets, redirect them
    if (!hasBudget) {
      router.replace("/dashboard/budgets");
    }
  };

  return (
    <div>
      <div className="fixed md:w-64 hidden md:block shadow-md">
        <SideNav />
      </div>
      <div className="md:ml-64 ">
        <DashboardHeader />
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;