"use server";

import { db } from "@/utils/dbConfig";
import { Budgets } from "@/utils/schema";

export async function createBudget(formData) {

  console.log("Form data received on server:", formData);

  const { name, amount, createdBy, icon = null } = formData || {};
  const result = await db.insert(Budgets).values({
    name,
    amount: Number(amount),
    icon,
    createdBy,
  }).returning();

  return result;
}