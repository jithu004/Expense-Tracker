
import { Layout, LayoutGrid, PiggyBank, ReceiptIcon, ReceiptText, ShieldCheck } from 'lucide-react';
import Image from 'next/image'
import React, { useEffect } from 'react'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation';
import Link from 'next/link';

function SideNav() {
    const menuList=[
        {
            id : 1,
            name : "dashboard",
            icon: LayoutGrid,
            path: "/dashboard"
        },
        {
            id : 2,
            name : "Budgets",
            icon: PiggyBank,
            path: "/dashboard/budgets"
        },
        {
            id : 3,
            name : "Expenses",
            icon: ReceiptText,
            path: "/dashboard/expenses"
        },
        {
            id : 4,
            name : "Upgrade",
            icon: ShieldCheck,
            path: "/dashboard/upgrade"
        }
    ];
    const path = usePathname();
    useEffect(()=>{
        console.log(path);
    },[path])
  return (
    <div className='h-screen'>
        <Image src={'/logo.svg'} 
        alt='logo'
        width={100}
        height={35}/>
        <div className='mt-5'>
            {menuList.map((menu,index)=>(
                <Link href={menu.path}>
                <h2 className={`flex gap-2 mt-2 items-center text-gray-500 
                font-medium p-5 cursor-pointer rounded-md
                 hover:text-indigo-600 hover:bg-blue-100 ${path==menu.path &&'text-indigo-600 bg-blue-100'} `}>
                    <menu.icon />
                    {menu.name}
                </h2>
                </Link>
            ))}
        </div>
        <div className='bottom-10 fixed flex items-center p-5 gap-2'>
            <UserButton />
            Profile
        </div>
    </div>
  )
}

export default SideNav