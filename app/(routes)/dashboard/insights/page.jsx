"use client";
import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { getInsightsData } from '@/app/actions/getInsightsData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  TrendingUp, TrendingDown, Flame, Calendar,
  PiggyBank, AlertTriangle, Lightbulb, 
  ThumbsUp, ArrowRight, Star, Coffee,
  ShoppingBag, Utensils, Car, Tv
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell, ReferenceLine
} from 'recharts';
import { useTheme } from 'next-themes';
import EmptyState from '../_components/EmptyState';

// Category icon map
const CATEGORY_ICONS = {
  Food: Utensils, Shopping: ShoppingBag, Travel: Car,
  Entertainment: Tv, Bills: Flame, General: Coffee,
};

const BAR_COLORS = ['#6366f1','#8b5cf6','#a78bfa','#c4b5fd','#ddd6fe','#ede9fe'];

function SmartTip({ icon: Icon, title, description, type = 'info' }) {
  const styles = {
    warning: 'border-l-4 border-orange-400 bg-orange-50 dark:bg-orange-900/20',
    success: 'border-l-4 border-green-400 bg-green-50 dark:bg-green-900/20',
    info:    'border-l-4 border-indigo-400 bg-indigo-50 dark:bg-indigo-900/20',
    danger:  'border-l-4 border-red-400 bg-red-50 dark:bg-red-900/20',
  };
  const iconStyles = {
    warning: 'text-orange-500', success: 'text-green-500',
    info: 'text-indigo-500',    danger: 'text-red-500',
  };
  return (
    <div className={`rounded-lg p-4 ${styles[type]}`}>
      <div className="flex items-start gap-3">
        <Icon className={`h-5 w-5 mt-0.5 shrink-0 ${iconStyles[type]}`} />
        <div>
          <p className="font-semibold text-sm text-gray-800 dark:text-gray-100">{title}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-0.5">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function InsightsPage() {
  const { user } = useUser();
  const { theme } = useTheme();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    (async () => {
      setLoading(true);
      const result = await getInsightsData(user.primaryEmailAddress.emailAddress);
      if (result.success) setData(result);
      setLoading(false);
    })();
  }, [user]);

  const tickColor = theme === 'dark' ? '#9ca3af' : '#6b7280';

  if (loading) {
    return (
      <div className="p-8 space-y-4">
        {[1,2,3,4].map(i => (
          <div key={i} className="h-32 bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  if (!data || data.categoryBreakdown.length === 0) {
    return (
      <div className="p-8">
        <EmptyState
          icon={Lightbulb}
          title="No Insights Yet"
          subtitle="Add some transactions to unlock your spending insights."
        />
      </div>
    );
  }

  const {
    categoryBreakdown, monthlyData, monthOverMonthChange,
    thisMonthExp, lastMonthExp, avgDailySpend,
    projectedMonthlySpend, topCategory, savingsRate,
    totalIncome, totalExpenses
  } = data;

  // Generate smart tips
  const tips = [];

  if (monthOverMonthChange > 20) {
    tips.push({
      icon: AlertTriangle, type: 'danger',
      title: `Spending up ${monthOverMonthChange}% vs last month`,
      description: `You've spent ₹${(thisMonthExp - lastMonthExp).toLocaleString('en-IN')} more than last month. Consider reviewing your ${topCategory?.category} expenses.`
    });
  } else if (monthOverMonthChange < -10) {
    tips.push({
      icon: ThumbsUp, type: 'success',
      title: `Great! Spending down ${Math.abs(monthOverMonthChange)}% vs last month`,
      description: `You saved ₹${(lastMonthExp - thisMonthExp).toLocaleString('en-IN')} compared to last month. Keep it up!`
    });
  }

  if (savingsRate < 10) {
    tips.push({
      icon: AlertTriangle, type: 'warning',
      title: 'Low savings rate',
      description: `You're saving only ${savingsRate}% of your income. Financial experts recommend saving at least 20%.`
    });
  } else if (savingsRate >= 30) {
    tips.push({
      icon: Star, type: 'success',
      title: `Excellent savings rate of ${savingsRate}%`,
      description: 'You are saving well above the recommended 20%. Consider investing the surplus.'
    });
  }

  if (topCategory) {
    const topPct = totalExpenses > 0
      ? Math.round((topCategory.total / totalExpenses) * 100) : 0;
    if (topPct > 40) {
      tips.push({
        icon: Flame, type: 'warning',
        title: `${topCategory.category} takes up ${topPct}% of spending`,
        description: `₹${topCategory.total.toLocaleString('en-IN')} spent on ${topCategory.category}. This is unusually high — consider setting a budget for it.`
      });
    }
  }

  if (projectedMonthlySpend > lastMonthExp * 1.15) {
    tips.push({
      icon: TrendingUp, type: 'danger',
      title: 'On track to overspend this month',
      description: `Projected spend of ₹${projectedMonthlySpend.toLocaleString('en-IN')} is higher than last month's ₹${lastMonthExp.toLocaleString('en-IN')}. Slow down spending for the rest of the month.`
    });
  }

  if (tips.length === 0) {
    tips.push({
      icon: ThumbsUp, type: 'success',
      title: 'Your finances look healthy!',
      description: 'No major issues detected. Keep maintaining your current spending habits.'
    });
  }

  return (
    <div className="p-6 md:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Lightbulb className="h-6 w-6 text-indigo-500" />
          Smart Insights
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          AI-powered analysis of your spending patterns and predictions
        </p>
      </div>

      {/* Smart Tips Section */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-indigo-500" />
            Smart Tips & Alerts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {tips.map((tip, i) => (
            <SmartTip key={i} {...tip} />
          ))}
        </CardContent>
      </Card>

      {/* Prediction Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-0 shadow-sm bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
          <CardContent className="p-5">
            <p className="text-indigo-100 text-sm font-medium mb-1">Projected Month-End</p>
            <p className="text-3xl font-bold">
              ₹{projectedMonthlySpend.toLocaleString('en-IN')}
            </p>
            <p className="text-indigo-100 text-xs mt-2">
              Based on ₹{avgDailySpend.toLocaleString('en-IN')}/day average
            </p>
            <div className={`mt-3 inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full
              ${projectedMonthlySpend > lastMonthExp 
                ? 'bg-red-400/30 text-red-100' 
                : 'bg-green-400/30 text-green-100'}`}>
              {projectedMonthlySpend > lastMonthExp 
                ? <TrendingUp className="h-3 w-3" /> 
                : <TrendingDown className="h-3 w-3" />}
              {projectedMonthlySpend > lastMonthExp ? 'Above' : 'Below'} last month
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-5">
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">
              Top Spending Category
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {topCategory?.category || '—'}
            </p>
            <p className="text-sm text-gray-400 mt-1">
              ₹{topCategory?.total?.toLocaleString('en-IN')} •{' '}
              {totalExpenses > 0 
                ? Math.round((topCategory?.total / totalExpenses) * 100) 
                : 0}% of total
            </p>
            <div className="mt-3 w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full">
              <div
                className="h-1.5 rounded-full bg-indigo-500"
                style={{ width: `${totalExpenses > 0 ? Math.min((topCategory?.total / totalExpenses) * 100, 100) : 0}%` }}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-5">
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">
              Savings Rate
            </p>
            <p className={`text-2xl font-bold ${savingsRate >= 20 ? 'text-green-600' : 'text-orange-500'}`}>
              {savingsRate}%
            </p>
            <p className="text-sm text-gray-400 mt-1">
              {savingsRate >= 20 ? '🎉 Above target' : `${20 - savingsRate}% below target`}
            </p>
            <div className="mt-3 w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full">
              <div
                className={`h-1.5 rounded-full transition-all ${savingsRate >= 20 ? 'bg-green-500' : 'bg-orange-400'}`}
                style={{ width: `${Math.min(savingsRate, 100)}%` }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Bar Chart */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base">Income vs Expenses — Last 6 Months</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={monthlyData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
              <XAxis dataKey="month" tick={{ fill: tickColor, fontSize: 11 }} />
              <YAxis tick={{ fill: tickColor, fontSize: 11 }} tickFormatter={v => `₹${v}`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme === 'dark' ? '#1f2937' : '#fff',
                  border: 'none', borderRadius: '8px',
                  color: theme === 'dark' ? '#f9fafb' : '#111827',
                }}
                formatter={val => `₹${Number(val).toLocaleString('en-IN')}`}
              />
              <Bar dataKey="income" name="Income" fill="#22c55e" radius={[4,4,0,0]} />
              <Bar dataKey="expenses" name="Expenses" fill="#ef4444" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Bottom row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Category breakdown */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Category Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {categoryBreakdown.slice(0, 6).map((cat, i) => {
              const pct = totalExpenses > 0
                ? Math.round((cat.total / totalExpenses) * 100) : 0;
              return (
                <div key={cat.category}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {cat.category}
                    </span>
                    <span className="text-gray-400">
                      ₹{cat.total.toLocaleString('en-IN')} ({pct}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full">
                    <div
                      className="h-2 rounded-full transition-all duration-700"
                      style={{ width: `${pct}%`, backgroundColor: BAR_COLORS[i % BAR_COLORS.length] }}
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        
      </div>
    </div>
  );
}