# AgroLens

Oracle-verified fair pricing to connect farmers directly with buyers, bypassing exploitative intermediaries.

## About

AgroLens is a web application designed to bring transparency and fairness to Karnataka's agricultural markets. Today, farmers receive only a fraction of the consumer price, with much of the value lost to middlemen. AgroLens addresses this by providing oracle-verified pricing, trust scores, and regulatory oversight across four distinct user roles.

## Features

### Farmer (Mobile-First)
- **Dashboard** with today's fair price, active alerts, and quick actions
- **List Produce** via a multi-step form with voice input support — select crop, set asking price compared to the oracle fair price, and optionally join pooled FPO listings
- **My Listings** to track all listings with statuses (Open, Matched, In Escrow, Completed)
- **Trust Score** displaying reputation and fair price capture percentage
- **Price Alerts** for setting notifications on crop price thresholds

### Buyer / Trader (Desktop)
- Browse available listings from all farmers
- View asking price vs. oracle fair price with price gap calculations
- Make offers directly to farmers
- Trust score system for fair dealing

### Regulator (Desktop)
- **Exploitation Heatmap** — interactive Karnataka district map color-coded by exploitation risk
- **Flagged Intermediaries** — traders with high exploitation scores, price gap ratios, and number of affected farmers
- **Trader Detail** — deep dive into a specific trader's connected farmers, price gaps, and trust scores

### FPO Manager (Desktop)
- **Pooled Listings** — manage collective crop sales from multiple farmers
- **Member Roster** — track all FPO members with trust scores, vulnerability risk indicators, and crop specializations
- **Revenue Calculator** — distribute proceeds fairly with full transparency

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | React 18 + TypeScript |
| **Build Tool** | Vite |
| **Styling** | Tailwind CSS |
| **UI Components** | shadcn-ui (Radix UI primitives) |
| **Forms** | React Hook Form + Zod |
| **Routing** | React Router v6 |
| **State / Data** | TanStack React Query |
| **Animation** | Framer Motion |
| **Charts** | Recharts |
| **Icons** | Lucide React |
| **Testing** | Vitest + React Testing Library |

## Getting Started

**Prerequisites:** Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

```sh
# Clone the repository
git clone https://github.com/Ayush5091/market-voice-link.git

# Navigate to the project directory
cd market-voice-link

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:8080`.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server with HMR |
| `npm run build` | Create a production build |
| `npm run build:dev` | Create a development build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |
| `npm test` | Run tests with Vitest |
| `npm run test:watch` | Run tests in watch mode |

## Project Structure

```
src/
├── pages/
│   ├── Index.tsx                 # Home page with role selection
│   ├── farmer/                   # Farmer dashboard & features
│   ├── buyer/                    # Buyer dashboard
│   ├── regulator/                # Regulator dashboard & trader detail
│   └── fpo/                      # FPO Manager dashboard
├── components/
│   ├── ui/                       # shadcn-ui components
│   ├── DashboardLayout.tsx       # Desktop dashboard wrapper
│   ├── FarmerLayout.tsx          # Mobile-first farmer layout
│   ├── KarnatakaMap.tsx          # Interactive district heatmap
│   └── PageTransition.tsx        # Framer Motion page transitions
├── data/
│   └── mockData.ts               # Mock data for all roles
├── hooks/                        # Custom React hooks
├── lib/                          # Utility functions
├── App.tsx                       # Root component with routing
└── main.tsx                      # Application entry point
```
