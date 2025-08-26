import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IndianRupee } from 'lucide-react';
import React from 'react';

function LatestTransactions({ transactions }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Latest Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <div className={`p-2 rounded-full ${tx.type === 'expense' ? 'bg-red-100 dark:bg-red-900' : 'bg-green-100 dark:bg-green-900'}`}>
                    <IndianRupee className={`h-5 w-5 ${tx.type === 'expense' ? 'text-red-500' : 'text-green-500'}`} />
                 </div>
                 <div>
                    <h3 className="font-semibold">{tx.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(tx.createdAt).toLocaleDateString()}</p>
                 </div>
              </div>
              <p className={`font-bold ${tx.type === 'expense' ? 'text-red-600' : 'text-green-600'}`}>
                {tx.type === 'expense' ? '-' : '+'}₹{tx.amount}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default LatestTransactions;