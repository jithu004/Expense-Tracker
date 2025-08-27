"use client";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Header() {
  const { user, isSignedIn } = useUser();

  return (
    <div className="Header p-2.5 mb-5 flex justify-between items-center shadow-md bg-white dark:bg-slate-900">
      <Image src="/logo.svg" alt="logo" width={70} height={40} />
      
      {/* FIX: This now correctly shows the UserButton or a smart "Get Started" link */}
      {isSignedIn ? (
        <UserButton />
      ) : (
        <Link href="/sign-in">
          <Button>Get Started</Button>
        </Link>
      )}
    </div>
  );
}

export default Header;