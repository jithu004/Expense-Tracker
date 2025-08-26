"use server";

import { db } from "@/utils/dbConfig";
import { Budgets, Expenses, Income } from "@/utils/schema";
import { desc, eq, sql } from "drizzle-orm";

export async function getDashboardData(userId) {
  try {
    // 1. Get last 7 transactions
    const expenses = await db.select().from(Expenses).where(eq(Expenses.createdBy, userId)).orderBy(desc(Expenses.createdAt)).limit(7);
    const incomes = await db.select().from(Income).where(eq(Income.createdBy, userId)).orderBy(desc(Income.createdAt)).limit(7);

    const latestTransactions = [...expenses.map(e => ({...e, type: 'expense'})), ...incomes.map(i => ({...i, type: 'income'}))]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 7);

    // 2. Get Expense Categories
    const expenseCategories = await db.select({
        category: Expenses.category,
        total: sql`sum(${Expenses.amount})`.mapWith(Number)
      }).from(Expenses)
      .where(eq(Expenses.createdBy, userId))
      .groupBy(Expenses.category);

    // 3. Get Income Categories
    const incomeCategories = await db.select({
        category: Income.category,
        total: sql`sum(${Income.amount})`.mapWith(Number)
      }).from(Income)
      .where(eq(Income.createdBy, userId))
      .groupBy(Income.category);

    // 4. Get all expenses for the line chart (we'll process this on the client)
    const allExpenses = await db.select().from(Expenses).where(eq(Expenses.createdBy, userId)).orderBy(desc(Expenses.createdAt));

    return {
      success: true,
      latestTransactions,
      expenseCategories,
      incomeCategories,
      allExpenses
    };

  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return { success: false, error: "Failed to fetch dashboard data." };
  }
}