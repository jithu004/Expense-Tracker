"use server";

import { db } from "@/utils/dbConfig";
import { Budgets } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { toast } from "sonner";

export async function updateBudget(budget, updatedData) {
  try {
    const result = await db
      .update(Budgets)
      .set({
        name: updatedData.name,
        amount: updatedData.amount,
        icon: updatedData.icon,
      })
      .where(eq(Budgets.id, budget.id))
      .returning();

    return { success: true, budget: result[0] };
  } catch (error) {
    console.error("Error updating budget:", error);
    return { success: false, error: "Failed to update budget." };
  }
}