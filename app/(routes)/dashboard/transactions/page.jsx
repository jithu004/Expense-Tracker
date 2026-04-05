"use client";
import React, { useState, useEffect } from 'react';
import TransactionList from "./_components/TransactionsList";
import CreateTransaction from "./_components/CreateTransaction";
import { useUser } from '@clerk/nextjs';
import { useRole } from '../_context/RoleContext';

function Transactions() {
  const { user } = useUser();
  const { role } = useRole();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className='p-5'>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Transactions
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            View and manage all your income and expenses
          </p>
        </div>
        {/* Only show after mount to avoid hydration mismatch */}
        {mounted && role === 'admin' && (
          <CreateTransaction
            onTransactionCreated={() => window.location.reload()}
          />
        )}
      </div>
      <TransactionList userId={user?.primaryEmailAddress?.emailAddress} />
    </div>
  );
}

export default Transactions;