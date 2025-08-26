"use server";

import { db } from "@/utils/dbConfig";
import { Expenses, Income } from "@/utils/schema";

// data = { type: "expense" | "income", name, category, amount, date?, budgetId?, createdBy? }
export async function createTransaction(data) {
  try {
    const { type, name, category, amount, budgetId, createdBy, date } = data;

    // ✅ Use provided date (from UI) if available, else default to now
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
    console.error("Transaction insert failed:", err);
    return { success: false, error: err.message };
  }
}
