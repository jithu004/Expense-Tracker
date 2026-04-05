"use client";
import React from 'react';
import TransactionList from "./_components/TransactionsList";
import CreateTransaction from "./_components/CreateTransaction";
import { useUser } from '@clerk/nextjs';
import { useRole } from '../_context/RoleContext';

function Transactions() {
  const { user } = useUser();
  const { role } = useRole();

  return (
    <div className='p-5'>
      {/* Header row */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Transactions
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            View and manage all your income and expenses
          </p>
        </div>
        {/* Add button — only visible to Admin */}
        {role === 'admin' && (
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