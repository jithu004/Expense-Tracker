"use server";

import { db } from "@/utils/dbConfig";
import { Expenses, Income } from "@/utils/schema";

export async function createTransaction(data) {
  // FIX: Add a guard clause to check if 'data' is a valid object.
  if (!data || typeof data !== 'object') {
    const errorMsg = "Invalid or missing data provided for transaction.";
    console.error("Transaction insert failed:", errorMsg);
    return { success: false, error: errorMsg };
  }

  try {
    const { type, name, category, amount, budgetId, createdBy, date } = data;

    const createdAt = date
      ? new Date(date).toISOString()
      : new Date().toISOString();

    if (type === "expense") {
      const result = await db.insert(Expenses).values({
        name: name || "Untitled Expense",
        category: category || "General",
        amount: amount,
        budgetId: budgetId || null,
        createdAt,
        createdBy: createdBy || "system", // Ensure createdBy is saved
      }).returning();
      return { success: true, transaction: result[0] };
    }

    if (type === "income") {
      const result = await db.insert(Income).values({
        name: name || "Untitled Income",
        category: category || "General",
        amount: amount,
        createdAt,
        createdBy: createdBy || "system",
      }).returning();
      return { success: true, transaction: result[0] };
    }

    throw new Error("Invalid transaction type");
  } catch (err) {
    // FIX: Enhanced logging for better debugging
    console.error("Transaction insert failed with error:", err.message, "Data:", data);
    return { success: false, error: err.message };
  }
}