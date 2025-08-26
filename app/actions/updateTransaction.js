"use server";

import { db } from "@/utils/dbConfig";
import { Expenses, Income } from "@/utils/schema";
import { eq } from "drizzle-orm";

export async function updateTransaction(updatedTx) {
  try {
    if (updatedTx.type === "expense") {
      await db
        .update(Expenses)
        .set({
          name: updatedTx.title,
          amount: updatedTx.amount,
          category: updatedTx.category,
        })
        .where(eq(Expenses.id, updatedTx.id));
    } else {
      await db
        .update(Income)
        .set({
          name: updatedTx.title,
          amount: updatedTx.amount,
          category: updatedTx.category,
        })
        .where(eq(Income.id, updatedTx.id));
    }

    return { success: true };
  } catch (error) {
    console.error("Error updating transaction:", error);
    return { success: false, error: "Failed to update transaction" };
  }
}
