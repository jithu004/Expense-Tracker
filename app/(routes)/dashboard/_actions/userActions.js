// File: app/(routes)/dashboard/_actions/userActions.js

"use server"; // Defines this as a server-only module

import { db } from "@/utils/dbConfig";
import { Budgets } from "@/utils/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

// This function will run securely on the server
export const checkUserBudget = async () => {
  const { user } = auth();

  if (!user) {
    // Handle case where there is no user
    return false;
  }

  const result = await db
    .select()
    .from(Budgets)
    .where(eq(Budgets.createdBy, user.primaryEmailAddress.emailAddress));

  // Return true if budgets exist, false otherwise
  return result.length > 0;
};