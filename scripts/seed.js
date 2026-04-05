const { neon } = require("@neondatabase/serverless");
require("dotenv").config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL);

const DEMO_EMAIL = "demo@trackify.com";

async function seed() {
  console.log("🌱 Seeding database for:", DEMO_EMAIL);

  // Clear existing data for this email first
  console.log("🧹 Clearing old data...");
  await sql`DELETE FROM expenses WHERE "createdBy" = ${DEMO_EMAIL}`;
  await sql`DELETE FROM income   WHERE "createdBy" = ${DEMO_EMAIL}`;
  await sql`DELETE FROM budgets  WHERE "createdBy" = ${DEMO_EMAIL}`;

  // Budgets
  console.log("📦 Inserting budgets...");
  await sql`INSERT INTO budgets (name, amount, icon, "createdBy") VALUES
    ('Groceries',     '8000',  '🛒', ${DEMO_EMAIL}),
    ('Entertainment', '3000',  '🎬', ${DEMO_EMAIL}),
    ('Travel',        '5000',  '✈️', ${DEMO_EMAIL}),
    ('Shopping',      '6000',  '🛍️', ${DEMO_EMAIL}),
    ('Bills',         '10000', '📄', ${DEMO_EMAIL}),
    ('Health',        '4000',  '💊', ${DEMO_EMAIL}),
    ('Education',     '5000',  '📚', ${DEMO_EMAIL})
  `;

  const budgets = await sql`
    SELECT id, name FROM budgets WHERE "createdBy" = ${DEMO_EMAIL}
  `;
  const getId = (name) => budgets.find(b => b.name === name)?.id;

  // Expenses — spread across Jan, Feb, Mar, Apr for good chart data
  console.log("💸 Inserting expenses...");
  await sql`INSERT INTO expenses (name, category, amount, "budgetId", "createdAt", "createdBy") VALUES
    ('Supermarket',        'Food',          1200, ${getId('Groceries')},     '2026-01-03', ${DEMO_EMAIL}),
    ('Netflix',            'Entertainment',  649, ${getId('Entertainment')}, '2026-01-05', ${DEMO_EMAIL}),
    ('Bus Pass',           'Travel',         500, ${getId('Travel')},        '2026-01-08', ${DEMO_EMAIL}),
    ('Winter Jacket',      'Shopping',      2800, ${getId('Shopping')},      '2026-01-12', ${DEMO_EMAIL}),
    ('Electricity Bill',   'Bills',         2100, ${getId('Bills')},         '2026-01-15', ${DEMO_EMAIL}),
    ('Doctor Visit',       'Health',         800, ${getId('Health')},        '2026-01-18', ${DEMO_EMAIL}),
    ('Online Course',      'Education',     1500, ${getId('Education')},     '2026-01-22', ${DEMO_EMAIL}),
    ('Zomato',             'Food',           380, ${getId('Groceries')},     '2026-01-25', ${DEMO_EMAIL}),

    ('Grocery Store',      'Food',          1800, ${getId('Groceries')},     '2026-02-02', ${DEMO_EMAIL}),
    ('Spotify',            'Entertainment',  119, ${getId('Entertainment')}, '2026-02-05', ${DEMO_EMAIL}),
    ('Uber Rides',         'Travel',         640, ${getId('Travel')},        '2026-02-08', ${DEMO_EMAIL}),
    ('New Shoes',          'Shopping',      1900, ${getId('Shopping')},      '2026-02-11', ${DEMO_EMAIL}),
    ('Internet Bill',      'Bills',          999, ${getId('Bills')},         '2026-02-14', ${DEMO_EMAIL}),
    ('Gym Membership',     'Health',         800, ${getId('Health')},        '2026-02-16', ${DEMO_EMAIL}),
    ('Books',              'Education',      650, ${getId('Education')},     '2026-02-20', ${DEMO_EMAIL}),
    ('Swiggy',             'Food',           520, ${getId('Groceries')},     '2026-02-24', ${DEMO_EMAIL}),
    ('Movie Tickets',      'Entertainment',  600, ${getId('Entertainment')}, '2026-02-27', ${DEMO_EMAIL}),

    ('Supermarket',        'Food',          2200, ${getId('Groceries')},     '2026-03-01', ${DEMO_EMAIL}),
    ('Flight Tickets',     'Travel',        3200, ${getId('Travel')},        '2026-03-05', ${DEMO_EMAIL}),
    ('Amazon Purchase',    'Shopping',      1800, ${getId('Shopping')},      '2026-03-08', ${DEMO_EMAIL}),
    ('Electricity Bill',   'Bills',         2400, ${getId('Bills')},         '2026-03-10', ${DEMO_EMAIL}),
    ('Pharmacy',           'Health',         450, ${getId('Health')},        '2026-03-13', ${DEMO_EMAIL}),
    ('Udemy Course',       'Education',     1299, ${getId('Education')},     '2026-03-15', ${DEMO_EMAIL}),
    ('Zomato',             'Food',           780, ${getId('Groceries')},     '2026-03-18', ${DEMO_EMAIL}),
    ('Netflix',            'Entertainment',  649, ${getId('Entertainment')}, '2026-03-20', ${DEMO_EMAIL}),
    ('Hotel Stay',         'Travel',        1800, ${getId('Travel')},        '2026-03-25', ${DEMO_EMAIL}),

    ('Grocery Store',      'Food',          2400, ${getId('Groceries')},     '2026-04-01', ${DEMO_EMAIL}),
    ('Uber Ride',          'Travel',         340, ${getId('Travel')},        '2026-04-02', ${DEMO_EMAIL}),
    ('New Clothes',        'Shopping',      2200, ${getId('Shopping')},      '2026-04-03', ${DEMO_EMAIL}),
    ('Internet Bill',      'Bills',          999, ${getId('Bills')},         '2026-04-03', ${DEMO_EMAIL}),
    ('Movie Tickets',      'Entertainment',  600, ${getId('Entertainment')}, '2026-04-04', ${DEMO_EMAIL}),
    ('Gym',                'Health',         800, ${getId('Health')},        '2026-04-04', ${DEMO_EMAIL}),
    ('Swiggy',             'Food',           430, ${getId('Groceries')},     '2026-04-05', ${DEMO_EMAIL})
  `;

  // Income — monthly salary + extras
  console.log("💰 Inserting income...");
  await sql`INSERT INTO income (name, category, amount, "createdAt", "createdBy") VALUES
    ('January Salary',   'Salary',     55000, '2026-01-01', ${DEMO_EMAIL}),
    ('Freelance Project','Business',    8000, '2026-01-20', ${DEMO_EMAIL}),
    ('February Salary',  'Salary',     55000, '2026-02-01', ${DEMO_EMAIL}),
    ('Stock Dividend',   'Investment',  2500, '2026-02-15', ${DEMO_EMAIL}),
    ('March Salary',     'Salary',     55000, '2026-03-01', ${DEMO_EMAIL}),
    ('Freelance Work',   'Business',   12000, '2026-03-15', ${DEMO_EMAIL}),
    ('April Salary',     'Salary',     55000, '2026-04-01', ${DEMO_EMAIL}),
    ('Stock Dividend',   'Investment',  3500, '2026-04-02', ${DEMO_EMAIL}),
    ('Gift',             'Gift',        5000, '2026-04-03', ${DEMO_EMAIL})
  `;

  console.log("✅ Done! Login with:");
  console.log("   Email:    demo@trackify.com");
  console.log("   Password: Demo@1234");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err.message);
  process.exit(1);
});