# NestMate — Find Your People. Share Your Space.

> **Production-grade Indian Flatmate Matching Engine & Zero-Brokerage Rental Property Marketplace.**
> Built with Next.js (App Router), React Native (Expo Router), Supabase (PostgreSQL + RLS), and Tailwind CSS in a clean monorepo architecture.

---

## 🌟 Product Vision

NestMate is an Indian startup platform operating across major tech hubs (**Bangalore, Mumbai, Delhi-NCR, Pune, and Hyderabad**) that seamlessly merges two essential housing workflows into one verified ecosystem:

1. **Tinder-Style Flatmate Discovery:** Connect with compatible flatmates using a mathematical 7-factor compatibility algorithm (Budget 20%, Location 20%, Cleanliness 15%, Sleep schedule 15%, Lifestyle 15%, Food habits 5%, Move-in date 10%).
2. **Zero-Spam Rental Property Marketplace:** Discover entire flats, private rooms in luxury gated societies, PG accommodations, and flatmate vacancies directly from verified property owners and RERA-authorized agents.
3. **Privacy & Contact Shield:** Safeguards private phone numbers and confidential street addresses until explicit mutual consent is recorded.

---

## 🏗️ Monorepo Structure

```text
flatmate-platform/
├── apps/
│   ├── web/                     # Next.js 14 App Router Web Application
│   │   ├── src/
│   │   │   ├── app/             # App Router pages (Explore, Flatmates, Owner, Admin, etc.)
│   │   │   ├── components/      # UI Design System, Property cards, Swipe deck, Map
│   │   │   └── lib/             # Supabase client, Auth context, formatters
│   │   └── tailwind.config.ts   # Design system theme
│   └── mobile/                  # React Native / Expo Native Mobile Application
│       ├── app/                 # Expo Router stack & bottom tabs
│       │   ├── (tabs)/          # Home, Explore, Flatmates, Matches, Messages, Profile
│       │   ├── property/        # Property details & Post wizard
│       │   ├── messages/        # In-app chat with phone request shield
│       │   └── auth/            # Mobile authentication
│       └── app.json             # Expo configuration
├── packages/
│   └── shared/                  # Domain Types, Zod Schemas & Matching Engine
│       └── src/
│           ├── types/           # Production TypeScript definitions matching Postgres
│           ├── schemas/         # Zod schemas (Auth, Property, Enquiries, Reports)
│           └── matching/        # Deterministic 7-factor compatibility algorithm
├── supabase/
│   ├── migrations/              # Initial schema with RLS on all 18 tables + triggers
│   └── seed.sql                 # Authentic Indian seed data (Bangalore, Mumbai, Gurgaon, Pune, Hyd)
├── docs/                        # Complete architecture, algorithm & deployment guides
└── README.md
```

---

## 🚀 Key Features

### 1. Flatmate Seekers
- Interactive swipe deck with Framer Motion gestures (Swipe Right to Like, Left to Pass, Star for Superlike).
- Comprehensive compatibility radar breaking down all 7 weighted criteria.
- Mutual match celebration modal with instant chat connection.
- Normal browse and search mode with city and locality filters.

### 2. Solo Renters & Rental Marketplace
- Explore entire flats, private rooms, shared rooms, flatmate vacancies, and managed PGs.
- Interactive OpenStreetMap (OSM) map view with dynamic price pins.
- Filter by City, Locality, Rent slider, Security deposit, Furnishing, and Amenities.
- Schedule a visit / Send enquiry modal with direct owner notification.

### 3. Property Owners & Authorized Agents
- Dedicated Owner Portal with analytics, total listings, and pending enquiries.
- Step-by-step Post Property Listing wizard (multi-photo preview, amenities, rent breakdown).
- Toggle listing availability between Active and Occupied.
- Authorized Agent Shield: Agents must have owner approval; cannot claim direct ownership.

### 4. Protected Administration Dashboard
- Real-time platform KPI metrics (Total users, active properties, open reports).
- Property moderation queue: approve, flag, or suspend listings.
- User verification queue: inspect and verify KYC documents.
- User reports queue: investigate harassment, fake listings, or misleading details.
- User accounts directory: suspend suspicious accounts.

### 5. Multi-Role Testing Switcher (Built-in for Founders)
Switch between 5 realistic Indian personas with 1 click from the navbar banner:
- **Aarav Sharma:** Flatmate Seeker (Software Engineer, Bangalore)
- **Priya Patel:** Flatmate Seeker (Product Designer, Bangalore - 91% Match!)
- **Rajesh Malhotra:** Verified Property Owner (Bangalore & Pune)
- **Sunil Joshi:** RERA-Certified Agent (Apex Realty)
- **SuperAdmin:** Trust, Safety & Moderation Controls

---

## ⚡ Quick Start

### 1. Install Dependencies
```bash
# From repository root
npm install
```

### 2. Run the Next.js Web Application
```bash
npm run dev:web
# Web app runs at http://localhost:3000
```

### 3. Run the Expo Mobile Application
```bash
npm run dev:mobile
# Expo dev tools launch for iOS, Android & Web
```

### 4. Run Unit Tests for Matching Engine
```bash
npm test --workspace=@flatmate/shared
```

---

## 🗄️ Database Setup (Supabase)

1. Open your [Supabase](https://supabase.com) project SQL editor.
2. Run `supabase/migrations/20261112000000_initial_schema.sql`.
3. Run `supabase/seed.sql` to populate authentic Indian listings.
4. Set your environment variables in `apps/web/.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

---

## 🛡️ License & Compliance

Designed and built for Indian co-living and rental housing markets adhering to:
- Digital Personal Data Protection (DPDP) Act of India.
- Real Estate (Regulation and Development) Act (RERA) compliance for broker authorization.
