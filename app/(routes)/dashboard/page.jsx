"use client";
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react';
import { getDashboardData } from '@/app/actions/getDashboardData';
import LatestTransactions from './_components/LatestTransactions';
import CategoryDoughnutChart from './_components/CategoryDoughnutChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import EmptyState from './_components/EmptyState';
import { PiggyBank } from 'lucide-react';
import ExpensesLineChart from './_components/ExpensesLineChart';
import SummaryCards from './_components/SummaryCards';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

function Dashboard() {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [timeFilter, setTimeFilter] = useState('monthly');

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        setLoading(true);
        const result = await getDashboardData(user.primaryEmailAddress.emailAddress);
        if (result.success) setData(result);
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  if (loading) {
    return (
      <div className="p-8 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => (
            <div key={i} className="h-28 bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse" />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 h-64 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse" />
          <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse" />
          <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse" />
          <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse" />
        </div>
      </div>
    );
  }

  const isEmpty = !data || (
    data.latestTransactions.length === 0 &&
    data.expenseCategories.length === 0 &&
    data.incomeCategories.length === 0
  );

  if (isEmpty) {
    return (
      <div className="p-8">
        <EmptyState
          icon={PiggyBank}
          title="Welcome to Your Dashboard!"
          subtitle="There's no data yet. Add some transactions to get started."
        />
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
        Welcome back — here's your financial overview
      </p>
    </div>
      {/* Summary Cards */}
      <SummaryCards data={data} />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Expense Insights</CardTitle>
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Last 7 Days</SelectItem>
                <SelectItem value="weekly">Last 5 Weeks</SelectItem>
                <SelectItem value="monthly">Last 6 Months</SelectItem>
                <SelectItem value="yearly">By Year</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            {data.allExpenses.length > 0
              ? <ExpensesLineChart allExpenses={data.allExpenses} timeFilter={timeFilter} />
              : <p className="text-center h-48 flex items-center justify-center text-gray-400">No expense data yet.</p>
            }
          </CardContent>
        </Card>

        <div>
          {data.latestTransactions.length > 0
            ? <LatestTransactions transactions={data.latestTransactions} />
            : <p className="text-gray-400 text-sm">No recent transactions.</p>
          }
        </div>
      </div>

      {/* Doughnut Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            {data.expenseCategories.length > 0
              ? <CategoryDoughnutChart title="Expense Categories" dataList={data.expenseCategories} />
              : <p className="text-center text-gray-400">No expense data for chart.</p>
            }
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            {data.incomeCategories.length > 0
              ? <CategoryDoughnutChart title="Income Categories" dataList={data.incomeCategories} />
              : <p className="text-center text-gray-400">No income data for chart.</p>
            }
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;