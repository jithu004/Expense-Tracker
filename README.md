# Expense Tracker

A full-stack web application designed to help users manage their personal finances by tracking income and expenses, creating budgets, and visualizing their financial habits through an interactive dashboard.

## ✨ Features

  * **User Authentication**: Secure sign-up and sign-in functionality provided by Clerk.]/page.jsx, jithu004/expense-tracker/Expense-Tracker-f7ecbfb4022ce6263cac8f929cb474b799b0e8d0/app/(auth)/sign-up/[[...sign-up]]/page.jsx]
  * **Interactive Dashboard**: A central hub with visualizations for expense trends, category breakdowns, and recent transactions.
  * **Budget Management**: Full CRUD (Create, Read, Update, Delete) functionality for managing budgets.
  * **Transaction Tracking**: Log both income and expenses with details like name, amount, category, and date.
  * **Data Visualization**: Utilizes Chart.js to render dynamic line charts for expense trends and doughnut charts for category analysis.
  * **Dynamic Filtering & Searching**: A global search bar to filter budgets and transactions, along with advanced filters on the transactions page.
  * **Theme Support**: A sleek dark/light mode toggle for user comfort.
  * **Responsive Design**: A mobile-first design with a dedicated slide-out navigation menu for smaller screens.

## 🚀 Tech Stack

  * **Framework**: [Next.js](https://nextjs.org) (React)
  * **Authentication**: [Clerk](https://clerk.com/)
  * **Database**: [Neon](https://neon.tech/) (Serverless Postgres)
  * **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
  * **Styling**: [Tailwind CSS](https://tailwindcss.com/)
  * **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
  * **Charting**: [Chart.js](https://www.chartjs.org/)
  * **Deployment**: [Vercel](https://vercel.com/)

## 🏁 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

  * Node.js (v18.0 or later)
  * npm or yarn
  * A free [Neon](https://neon.tech/) account for the database.
  * A free [Clerk](https://clerk.com/) account for authentication.

### Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a new file named `.env.local` in the root of your project and add the following variables.

    ```
    # NeonDB Connection String (use the Pooled connection string)
    DATABASE_URL="your_neon_database_url"

    # Clerk Authentication Keys
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
    CLERK_SECRET_KEY="your_clerk_secret_key"
    ```

      * You can get your `DATABASE_URL` from your Neon project dashboard.
      * You can get your Clerk keys from your Clerk application's API Keys page.

4.  **Push database schema:**
    This command will sync your Drizzle schema (`utils/schema.jsx`) with your Neon database.

    ```bash
    npm run db:push
    ```

5.  **Run the development server:**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) with your browser to see the result.

