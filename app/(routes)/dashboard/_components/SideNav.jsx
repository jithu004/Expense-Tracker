"use client";
import { LayoutGrid, PiggyBank, ReceiptText, Lightbulb } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { UserButton } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ThemeToggleButton } from '@/components/ui/ThemeToggleButton';
import RoleSwitcher from './RoleSwitcher';

function SideNav() {
  const menuList = [
    { id: 1, name: 'Dashboard', icon: LayoutGrid, path: '/dashboard' },
    { id: 2, name: 'Budgets', icon: PiggyBank, path: '/dashboard/budgets' },
    { id: 3, name: 'Transactions', icon: ReceiptText, path: '/dashboard/transactions' },
    { id: 4, name: 'Insights', icon: Lightbulb, path: '/dashboard/insights' },
  ];
  const path = usePathname();

  return (
    <div className="h-screen p-5 flex flex-col">
      <Image src={'/logo.svg'} alt="logo" width={100} height={35} />
      <div className="mt-5 flex-grow">
        {menuList.map((menu) => (
          <Link
            key={menu.id}
            href={menu.path}
            className={`flex gap-2 mt-2 items-center text-gray-500 font-medium p-5 
                        cursor-pointer rounded-md hover:text-indigo-600 hover:bg-blue-100 
                        ${path === menu.path && 'text-indigo-600 bg-blue-100'}`}
          >
            <menu.icon />
            {menu.name}
          </Link>
        ))}
      </div>
      <div className="flex flex-col gap-3">
        <RoleSwitcher />
        <div className="flex items-center gap-2">
          <ThemeToggleButton />
          <div className="flex items-center gap-2">
            <UserButton />
            <span>Profile</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideNav;