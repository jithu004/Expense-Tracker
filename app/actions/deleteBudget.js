"use server";

import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { toast } from "sonner";

export async function deleteBudget(budgetId) {
  try {
    // First, delete all expenses associated with this budget
    await db.delete(Expenses).where(eq(Expenses.budgetId, budgetId));

    // Then, delete the budget itself
    await db.delete(Budgets).where(eq(Budgets.id, budgetId));

    return { success: true };
  } catch (error) {
    console.error("Error deleting budget:", error);
    return { success: false, error: "Failed to delete budget." };
  }
}