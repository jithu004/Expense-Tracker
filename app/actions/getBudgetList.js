"use server";

import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { eq, sql } from "drizzle-orm";
import { getTableColumns } from 'drizzle-orm'

export async function getBudgetList(userId) {
  try {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalspend: sql`SUM(${Expenses.amount})`.mapWith(Number),
        totalItem: sql`COUNT(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, userId))
      .groupBy(Budgets.id);

    return result;
  } catch (error) {
    console.error("Error fetching budget list:", error);
    return [];
  }
}
