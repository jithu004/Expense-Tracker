// app/(routes)/dashboard/_components/MobileNav.jsx
import React from 'react';
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
import { ThemeToggleButton } from '@/components/ui/ThemeToggleButton';

function MobileNav({ isOpen, toggleMenu }) {
  const menuList = [
    { id: 1, name: 'Dashboard', icon: LayoutGrid, path: '/dashboard' },
    { id: 2, name: 'Budgets', icon: PiggyBank, path: '/dashboard/budgets' },
    { id: 3, name: 'Transactions', icon: ReceiptText, path: '/dashboard/transactions' },
  ];

  return (
    <div
      className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity md:hidden ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={toggleMenu}
    >
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white dark:bg-slate-900 shadow-md transform transition-transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 flex flex-col h-full">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-lg font-bold">Menu</h2>
          </div>
          <nav className="flex-grow">
            <ul>
              {menuList.map((menu) => (
                <li key={menu.id}>
                  <Link
                    href={menu.path}
                    onClick={toggleMenu}
                    className="flex items-center gap-2 p-3 text-gray-500 font-medium rounded-md hover:text-indigo-600 hover:bg-blue-100"
                  >
                    <menu.icon />
                    {menu.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggleButton />
            <div className="flex items-center gap-2">
              <UserButton />
              <span>Profile</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileNav;