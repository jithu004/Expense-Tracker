"use client";
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react';
import { getDashboardData } from '@/app/actions/getDashboardData';
import LatestTransactions from './_components/LatestTransactions';
import CategoryDoughnutChart from './_components/CategoryDoughnutChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import EmptyState from './_components/EmptyState';
import { PiggyBank } from 'lucide-react';
import ExpensesLineChart from './_components/ExpensesLineChart'; // Import the new chart
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function Dashboard() {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [timeFilter, setTimeFilter] = useState('monthly'); // State for the filter

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        setLoading(true);
        const result = await getDashboardData(user.primaryEmailAddress.emailAddress);
        if (result.success) {
          setData(result);
        }
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  if (loading) {
    // ... loading state remains the same
    return (
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="md:col-span-2 h-64 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse"></div>
           <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse"></div>
           <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse"></div>
           <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (!data || (data.latestTransactions.length === 0 && data.expenseCategories.length === 0 && data.incomeCategories.length === 0)) {
    // ... empty state remains the same
     return (
        <div className="p-8">
            <EmptyState 
                icon={PiggyBank}
                title="Welcome to Your Dashboard!"
                subtitle="There's no data to display yet. Add some transactions to get started."
            />
        </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Expense Insights</CardTitle>
            {/* Filter Dropdown */}
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
            {data.allExpenses.length > 0 ? (
              <ExpensesLineChart allExpenses={data.allExpenses} timeFilter={timeFilter} />
            ) : <p className="text-center h-48 flex items-center justify-center">No expense data to display.</p>}
          </CardContent>
        </Card>
        
        <div className="lg:col-span-1">
          {data.latestTransactions.length > 0 ? (
             <LatestTransactions transactions={data.latestTransactions} />
          ) : <p>No recent transactions.</p>}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
            <CardContent className="p-6">
                {data.expenseCategories.length > 0 ? (
                    <CategoryDoughnutChart title="Expense Categories" dataList={data.expenseCategories} />
                ) : <p className='text-center'>No expense data for chart.</p>}
            </CardContent>
        </Card>
        <Card>
            <CardContent className="p-6">
                {data.incomeCategories.length > 0 ? (
                    <CategoryDoughnutChart title="Income Categories" dataList={data.incomeCategories} />
                ) : <p className='text-center'>No income data for chart.</p>}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;