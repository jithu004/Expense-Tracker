# Expense Tracker (Trackify)

A full-stack web application built with Next.js and Tailwind CSS to help users manage their personal finances. Track income, expenses, create budgets, and visualize your financial habits through a modern, interactive dashboard.

**Live Demo:** [**https://trackify-opal.vercel.app/**](https://trackify-opal.vercel.app/)

## ✨ Features

  * **Secure Authentication**: Handles user sign-up and sign-in with password and social logins powered by Clerk.]/page.jsx]
  * **Interactive Dashboard**: A central hub with visualizations for expense trends, category breakdowns, and a list of the latest transactions.
  * **Budget Management**: Full CRUD (Create, Read, Update, Delete) functionality for managing budgets.
  * **Transaction Tracking**: Log income and expenses with details like name, amount, category, and date.
  * **Data Visualization**: Uses Chart.js to render dynamic line charts for expense trends (filterable by day, week, month, year) and doughnut charts for category analysis.
  * **Dynamic Filtering & Search**: A global search bar filters budgets and transactions in real-time.
  * **Performance Optimized**: Server-side data aggregation in the dashboard ensures fast load times, even with large amounts of data.
  * **Modern UI/UX**:
      * A sleek dark/light mode toggle.
      * A fully responsive design with a dedicated mobile navigation menu.
      * An animated and interactive landing page to showcase the application.

## 🚀 Tech Stack

  * **Framework**: [Next.js](https://nextjs.org)
  * **Authentication**: [Clerk](https://clerk.com/)
  * **Database**: [Neon](https://neon.tech/) (Serverless Postgres)
  * **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
  * **Styling**: [Tailwind CSS](https://tailwindcss.com/)
  * **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
  * **Charting**: [Chart.js](https://www.chartjs.org/) & [react-chartjs-2](https://react-chartjs-2.js.org/)
  * **Animation**: [Framer Motion](https://www.framer.com/motion/)
  * **Deployment**: [Vercel](https://vercel.com/)

## 🏁 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

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
    Create a file named `.env.local` in the root of your project and add the following, replacing the placeholder values with your own keys:

    ```sh
    # NeonDB Connection String (use the Pooled connection string from your Neon dashboard)
    DATABASE_URL="your_neon_database_url"

    # Clerk Authentication Keys (from your Clerk dashboard)
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
    CLERK_SECRET_KEY="your_clerk_secret_key"
    ```

4.  **Push database schema:**
    This command syncs your Drizzle schema with your Neon database.

    ```bash
    npm run db:push
    ```

5.  **Run the development server:**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) with your browser to see the result.

## 🚢 Deployment

This application is configured for easy deployment on [Vercel](https://vercel.com/).

1.  Push your code to a GitHub repository.
2.  Import the repository into Vercel.
3.  Add the same environment variables from your `.env.local` file to the Vercel project settings.
4.  Click "Deploy". Vercel will automatically handle the build process and deployment.