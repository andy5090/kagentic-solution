# Andineering

> We provide all-in-one agentic solutions for engineers and non-engineer users.

A full-stack web application built with React Router, TypeScript, and tRPC, designed to deliver comprehensive agentic AI solutions for both technical and non-technical users.

## 🚀 Features

- **User Management** - Complete user lifecycle management with authentication
- **Organization Dashboard** - Multi-tenant organization support with dedicated dashboards
- **Agents** - AI agent management and configuration
- **Inquiries** - Inquiry tracking and management system
- **Authentication** - Secure authentication powered by Better Auth
- **Email Templates** - Email templates using React Email
- **Real-time API** - Type-safe APIs with tRPC
- **Developer Friendly UI** - Accessible components with shadcn/ui and Tailwind CSS

## 🛠️ Tech Stack

### Frontend

- **React 19** - Latest React with concurrent features
- **React Router v7** - Full-stack React Router framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality component library
- **Motion** - Smooth animations
- **React Hook Form** - Performant forms with validation
- **Zod** - Schema validation

### Backend

- **tRPC** - End-to-end typesafe APIs
- **Better Auth** - Modern authentication solution
- **Drizzle ORM** - TypeScript ORM for PostgreSQL
- **PostgreSQL** - Relational database
- **Resend** - Email delivery service
- **React Email** - Email template framework

### Development

- **Vitest** - Fast unit test framework
- **Bun** - Fast JavaScript runtime and package manager
- **Vercel** - Deployment platform

## 📦 Prerequisites

- **Bun** (v1.0+) - [Install Bun](https://bun.sh)
- **PostgreSQL** (v14+) - Database server
- **Node.js** (v20+) - For compatibility (if needed)

## 🔧 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd kagentic-solution
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:

   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/andineering
   BETTER_AUTH_SECRET=your-secret-key-here
   BETTER_AUTH_URL=http://localhost:5173
   RESEND_API_KEY=your-resend-api-key
   ```

4. **Set up the database**

   ```bash
   # Generate migration files
   bun run db:generate

   # Run migrations
   bun run db:migrate
   ```

5. **Start the development server**

   ```bash
   bun run dev
   ```

   The application will be available at `http://localhost:5173`

## 📜 Available Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run start` - Start production server
- `bun run typecheck` - Type check the codebase
- `bun run db:generate` - Generate database migration files
- `bun run db:migrate` - Run database migrations
- `bun run test` - Run tests in watch mode
- `bun run test:run` - Run tests once
- `bun run add:ui` - Add shadcn/ui components

## 📁 Project Structure

```
kagentic-solution/
├── app/
│   ├── api/              # API routes (auth, tRPC)
│   ├── common/           # Shared components and pages
│   │   ├── components/   # Reusable UI components
│   │   └── pages/        # Common pages (landing, etc.)
│   ├── features/         # Feature modules
│   │   ├── agents/       # Agent management
│   │   ├── inquiries/    # Inquiry system
│   │   ├── organizations/# Organization management
│   │   └── users/        # User management
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Shared utilities
│   │   ├── auth/         # Authentication configuration
│   │   ├── trpc/         # tRPC setup
│   │   └── utils.ts      # Utility functions
│   ├── sql/              # Database migrations
│   ├── routes.ts         # Route configuration
│   ├── trpc-router.ts    # tRPC router setup
│   └── root.tsx          # Root component
├── public/               # Static assets
├── react-email-starter/  # Email templates
└── package.json
```

## 🔐 Authentication

This project uses Better Auth for authentication. The authentication routes are configured at `/api/auth/*` and include:

- Email/password authentication
- Magic link authentication
- Session management
- User management

## 🗄️ Database

The project uses Drizzle ORM with PostgreSQL. Database schemas are defined in:

- `app/features/*/schema.ts` - Feature-specific schemas

Migrations are stored in `app/sql/migrations/` and managed via Drizzle Kit.

## 🧪 Testing

Tests are written with Vitest. Run tests with:

```bash
bun run test       # Watch mode
bun run test:run   # Single run
```

## 📧 Email Templates

Email templates are built with React Email and located in `react-email-starter/emails/`. Templates include:

- Welcome emails
- Magic link authentication
- Identity verification
- Transactional emails

## 🚢 Deployment

1. Push your code to GitHub
