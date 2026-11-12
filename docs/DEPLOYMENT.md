# NestMate Production Deployment Guide

## 1. Supabase Backend Setup

1. Create a Supabase Project at [supabase.com](https://supabase.com).
2. Open the SQL Editor and execute:
   - `supabase/migrations/20261112000000_initial_schema.sql` (Creates all 18 tables, RLS policies, triggers, and storage buckets).
   - `supabase/seed.sql` (Populates authentic seed data across Bangalore, Mumbai, Delhi-NCR, Pune & Hyderabad).
3. Under **Storage**, ensure the following buckets are configured:
   - `avatars` (Public: Yes)
   - `property-images` (Public: Yes)
   - `verification-documents` (Public: No - Private encrypted)
4. Copy your project URL and `anon` key from **Settings -> API**.

## 2. Web Application Deployment (Vercel)

1. Connect your Git repository to [Vercel](https://vercel.com).
2. Set Root Directory to `apps/web`.
3. Add Environment Variables:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```
4. Build Command: `npm run build`
5. Output Directory: `.next`
6. Deploy!

## 3. Mobile Application Build (Expo EAS)

1. Navigate to `apps/mobile`.
2. Configure your EAS project:
   ```bash
   npm install -g eas-cli
   eas login
   eas build:configure
   ```
3. Update `apps/mobile/app.json` with your Supabase credentials or pass them via EAS Secrets.
4. Build for Android APK or iOS:
   ```bash
   eas build -p android --profile preview
   eas build -p ios --profile preview
   ```
