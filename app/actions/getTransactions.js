"use server";

import { db } from "@/utils/dbConfig";
import { Expenses, Income, Budgets } from "@/utils/schema";
import { eq, sql, or, isNull } from "drizzle-orm";

export async function getTransactions(userId) {
  try {
    const expenses = await db
      .select({
        id: Expenses.id,
        title: Expenses.name,
        amount: Expenses.amount,
        category: Expenses.category,
        date: Expenses.createdAt,
        type: sql`'expense'`.as("type"),
      })
      .from(Expenses)
      .leftJoin(Budgets, eq(Expenses.budgetId, Budgets.id))
      .where(
        or(
          eq(Budgets.createdBy, userId),  // budgeted expenses
          isNull(Expenses.budgetId)       // unbudgeted expenses
        )
      );

    const incomes = await db
      .select({
        id: Income.id,
        title: Income.name,
        amount: Income.amount,
        category: Income.category,
        date: Income.createdAt,
        type: sql`'income'`.as("type"),
      })
      .from(Income)
      .where(eq(Income.createdBy, userId));

    // Merge transactions
    const transactions = [...expenses, ...incomes].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    // Calculate totals
    const totalIncome = incomes.reduce((sum, item) => sum + Number(item.amount), 0);
    const totalExpenses = expenses.reduce((sum, item) => sum + Number(item.amount), 0);

    return {
      transactions,
      totalIncome,
      totalExpenses,
    };
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return {
      transactions: [],
      totalIncome: 0,
      totalExpenses: 0,
    };
  }
}
