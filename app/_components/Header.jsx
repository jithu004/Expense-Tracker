"use client";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Header() {
  const { user, isSignedIn } = useUser();

  return (
    // FIX: Changed background to bg-gray-900 and removed shadow-md
    <div className="Header p-2.5 flex justify-between items-center bg-gray-900">
      <Image src="/logo.svg" alt="logo" width={70} height={40} />
      
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