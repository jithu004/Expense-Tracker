import { config } from "dotenv";
config({ path: ".env.local" }); // This line loads your .env.local file

import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.jsx", // Make sure this path is correct
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL, // This needs the .env.local file to be loaded
  },
});