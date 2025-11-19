# Uptime Monitor - Web Dashboard

This is the main web application for the Uptime Monitor project. It provides the user interface for managing monitors, viewing status pages, and handling incidents.

## 🛠️ Tech Stack

-   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS, Shadcn UI
-   **Database ORM**: Drizzle ORM
-   **API**: tRPC
-   **Authentication**: Better Auth / Polar.sh
-   **State Management**: TanStack Query

## 🚀 Getting Started

### Prerequisites

-   Node.js (v18+)
-   PostgreSQL database
-   npm / pnpm / bun

### Installation

1.  Install dependencies:
    ```bash
    npm install
    ```

2.  Set up environment variables:
    Create a `.env` file in this directory. You can use `.env.example` if available as a reference.
    
    Required variables typically include:
    ```env
    DATABASE_URL="postgresql://..."
    # Auth and other service secrets
    ```

### Database Setup

This project uses Drizzle ORM. You can manage the database schema using the following commands:

-   **Generate migrations**: `npm run db:generate`
-   **Push schema changes**: `npm run db:push`
-   **Open Drizzle Studio**: `npm run db:studio`

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## 📜 Scripts

-   `dev`: Start the development server with Turbo.
-   `build`: Build the application for production.
-   `start`: Start the production server.
-   `lint`: Run Biome check.
-   `typecheck`: Run TypeScript type checking.
