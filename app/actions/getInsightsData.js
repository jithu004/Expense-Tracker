"use server";
import { db } from "@/utils/dbConfig";
import { Expenses, Income } from "@/utils/schema";
import { eq, sql } from "drizzle-orm";
import { 
  format, parseISO, startOfMonth, subMonths, 
  startOfYear, endOfMonth 
} from "date-fns";

export async function getInsightsData(userId) {
  try {
    const expenses = await db.select().from(Expenses)
      .where(eq(Expenses.createdBy, userId));
    const incomes = await db.select().from(Income)
      .where(eq(Income.createdBy, userId));

    // --- Category breakdown ---
    const categoryMap = {};
    expenses.forEach(e => {
      const cat = e.category || 'General';
      categoryMap[cat] = (categoryMap[cat] || 0) + Number(e.amount);
    });
    const categoryBreakdown = Object.entries(categoryMap)
      .map(([category, total]) => ({ category, total }))
      .sort((a, b) => b.total - a.total);

    // --- Monthly comparison (last 6 months) ---
    const now = new Date();
    const monthlyData = [];
    for (let i = 5; i >= 0; i--) {
      const monthDate = subMonths(now, i);
      const monthKey = format(startOfMonth(monthDate), 'yyyy-MM');
      const label = format(monthDate, 'MMM yyyy');

      const monthExpenses = expenses
        .filter(e => e.createdAt?.startsWith(monthKey))
        .reduce((s, e) => s + Number(e.amount), 0);

      const monthIncome = incomes
        .filter(inc => inc.createdAt?.startsWith(monthKey))
        .reduce((s, inc) => s + Number(inc.amount), 0);

      monthlyData.push({ 
        month: label, 
        expenses: monthExpenses, 
        income: monthIncome,
        savings: monthIncome - monthExpenses
      });
    }

    // --- This month vs last month ---
    const thisMonthKey = format(startOfMonth(now), 'yyyy-MM');
    const lastMonthKey = format(startOfMonth(subMonths(now, 1)), 'yyyy-MM');

    const thisMonthExp = expenses
      .filter(e => e.createdAt?.startsWith(thisMonthKey))
      .reduce((s, e) => s + Number(e.amount), 0);
    const lastMonthExp = expenses
      .filter(e => e.createdAt?.startsWith(lastMonthKey))
      .reduce((s, e) => s + Number(e.amount), 0);

    const monthOverMonthChange = lastMonthExp > 0
      ? Math.round(((thisMonthExp - lastMonthExp) / lastMonthExp) * 100)
      : 0;

    // --- Average daily spend (this month) ---
    const dayOfMonth = now.getDate();
    const avgDailySpend = dayOfMonth > 0 
      ? Math.round(thisMonthExp / dayOfMonth) 
      : 0;

    // --- Projected monthly spend ---
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const projectedMonthlySpend = Math.round(avgDailySpend * daysInMonth);

    // --- Total stats ---
    const totalIncome = incomes.reduce((s, i) => s + Number(i.amount), 0);
    const totalExpenses = expenses.reduce((s, e) => s + Number(e.amount), 0);
    const savingsRate = totalIncome > 0
      ? Math.round(((totalIncome - totalExpenses) / totalIncome) * 100)
      : 0;

    return {
      success: true,
      categoryBreakdown,
      monthlyData,
      monthOverMonthChange,
      thisMonthExp,
      lastMonthExp,
      avgDailySpend,
      projectedMonthlySpend,
      topCategory: categoryBreakdown[0] || null,
      savingsRate,
      totalIncome,
      totalExpenses,
    };
  } catch (error) {
    console.error("Insights error:", error);
    return { success: false, error: error.message };
  }
}