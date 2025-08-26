import { PiggyBank, ReceiptText } from 'lucide-react';
import React from 'react';

function EmptyState({ icon, title, subtitle }) {
  const Icon = icon; // Assign the component to a variable with a capital letter

  return (
    <div className="flex flex-col items-center justify-center text-center p-10 border-2 border-dashed rounded-lg mt-7 bg-gray-50 dark:bg-slate-800">
      <Icon className="h-16 w-16 text-gray-400 mb-4" />
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
        {title}
      </h2>
      <p className="text-gray-500 dark:text-gray-400 mt-2">{subtitle}</p>
    </div>
  );
}

export default EmptyState;