# Azure Retreat - Frontend

A React single-page application for browsing hotels, managing bookings, and completing secure checkout. It communicates with a dedicated backend API, uses Clerk for authentication, and Stripe Embedded Checkout for payments. Deployed on Vercel.

## Tech stack

| Area | Technologies |
|------|----------------|
| **Runtime & language** | [Node.js](https://nodejs.org/), [TypeScript](https://www.typescriptlang.org/) |
| **Build & dev server** | [Vite](https://vite.dev/)
| **UI framework** | [React 19](https://react.dev/) |
| **Routing** | [React Router](https://reactrouter.com/) v7 |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) via [@tailwindcss/vite](https://tailwindcss.com/docs/installation/using-vite) |
| **Components & primitives** | [Radix UI](https://www.radix-ui.com/) (dialogs, selects, tabs, etc.), [shadcn-style patterns](https://ui.shadcn.com/) |
| **Icons & motion** | [Lucide React](https://lucide.dev/), [Motion](https://motion.dev/) |
| **State & data** | [Redux Toolkit](https://redux-toolkit.js.org/) including [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) for API calls |
| **Forms & validation** | [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/), [@hookform/resolvers](https://github.com/react-hook-form/resolvers) |
| **Dates** | [date-fns](https://date-fns.org/), [React Day Picker](https://react-day-picker.js.org/) |
| **Auth** | [Clerk](https://clerk.com/) (`@clerk/clerk-react`) |
| **Payments** | [Stripe](https://stripe.com/)

## Prerequisites

- **Node.js** — use a current LTS release; Vite 7 expects a recent Node version.
- **npm** (or pnpm/yarn) for installing dependencies.
- A running **backend API** that matches the RTK Query base URL (see environment variables).
- **Clerk** and **Stripe** accounts if you need sign-in and checkout end-to-end.

## Environment variables

Create a `.env` (or `.env.local`) in the project root. Vite only exposes variables prefixed with `VITE_`.

| Variable | Purpose |
|----------|---------|
| `VITE_CLERK_PUBLISHABLE_KEY` | **Required.** Clerk publishable key for the React app (`ClerkProvider`). |
| `VITE_BACKEND_URL` | Base URL of your API (no trailing `/api` here — the code appends `/api/`). Example: `https://your-api.example.com`. |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key for the checkout flow. |

## Getting started

```bash
# Install dependencies
npm install

# Start dev server (default: http://localhost:5173)
npm run dev
```

## App routes (overview)

- **Public:** home, sign-in, sign-up, hotel listing and hotel details.
- **Authenticated:** account, booking, checkout (Stripe).
- **Admin (protected):** create hotel (under admin layout).

Exact paths are defined in `src/main.tsx`.

## Project layout

- `src/components/` — UI components, layouts, checkout.
- `src/pages/` — Route-level pages.
- `src/lib/` — Redux store, RTK Query API (`api.ts`), utilities.

