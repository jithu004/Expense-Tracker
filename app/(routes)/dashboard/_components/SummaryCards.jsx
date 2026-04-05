"use client";
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Wallet, Target } from 'lucide-react';

function SummaryCards({ data }) {
  const totalIncome = data?.incomeCategories?.reduce((s, i) => s + i.total, 0) || 0;
  const totalExpenses = data?.expenseCategories?.reduce((s, i) => s + i.total, 0) || 0;
  const balance = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 
    ? Math.round(((totalIncome - totalExpenses) / totalIncome) * 100) 
    : 0;

  const cards = [
    {
      label: 'Total Balance',
      value: `₹${balance.toLocaleString('en-IN')}`,
      icon: Wallet,
      color: balance >= 0 ? 'text-green-600' : 'text-red-600',
      bg: balance >= 0 ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20',
      iconColor: balance >= 0 ? 'text-green-500' : 'text-red-500',
      sub: 'Income minus expenses',
    },
    {
      label: 'Total Income',
      value: `₹${totalIncome.toLocaleString('en-IN')}`,
      icon: TrendingUp,
      color: 'text-green-600',
      bg: 'bg-green-50 dark:bg-green-900/20',
      iconColor: 'text-green-500',
      sub: 'All time earnings',
    },
    {
      label: 'Total Expenses',
      value: `₹${totalExpenses.toLocaleString('en-IN')}`,
      icon: TrendingDown,
      color: 'text-red-600',
      bg: 'bg-red-50 dark:bg-red-900/20',
      iconColor: 'text-red-500',
      sub: 'All time spending',
    },
    {
      label: 'Savings Rate',
      value: `${savingsRate}%`,
      icon: Target,
      color: savingsRate >= 20 ? 'text-indigo-600' : 'text-orange-500',
      bg: savingsRate >= 20 
        ? 'bg-indigo-50 dark:bg-indigo-900/20' 
        : 'bg-orange-50 dark:bg-orange-900/20',
      iconColor: savingsRate >= 20 ? 'text-indigo-500' : 'text-orange-500',
      sub: savingsRate >= 20 ? 'Great job! 🎉' : 'Aim for 20%+',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.label} className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                  {card.label}
                </p>
                <div className={`p-2 rounded-full ${card.bg}`}>
                  <Icon className={`h-4 w-4 ${card.iconColor}`} />
                </div>
              </div>
              <p className={`text-xl font-bold ${card.color}`}>{card.value}</p>
              <p className="text-xs text-gray-400 mt-1">{card.sub}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

export default SummaryCards;