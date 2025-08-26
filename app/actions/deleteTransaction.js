"use server";

import { db } from "@/utils/dbConfig";
import { Expenses, Income } from "@/utils/schema";
import { eq } from "drizzle-orm";

export async function deleteTransaction(txId, txType) {
  try {
    if (txType === "expense") {
      await db.delete(Expenses).where(eq(Expenses.id, txId));
    } else {
      await db.delete(Income).where(eq(Income.id, txId));
    }

    return { success: true };
  } catch (error) {
    console.error("Error deleting transaction:", error);
    return { success: false, error: "Failed to delete transaction" };
  }
}
