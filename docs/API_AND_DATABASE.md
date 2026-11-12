# NestMate Supabase PostgreSQL Schema & API Reference

## 1. Relational Database Tables

### User Management
- `profiles`: Public identity, avatar, city, role, verification status.
- `user_roles`: Multi-role assignment (e.g. flatmate seeker + property owner).
- `private_contacts`: Encrypted mobile numbers and identity document numbers.
- `owner_agent_authorizations`: RERA agency authorization records with commission percentage and status.

### Property Marketplace
- `properties`: Categorized listings (Entire flat, private room, PG, flatmate vacancy). Includes sensitive `address_line` protected from public views.
- `property_images`: Gallery images with order index and cover flag.
- `property_amenities`: Tagged amenities (WiFi, Power backup, AC, Parking, etc.).
- `saved_properties`: User bookmarks.
- `enquiries`: Visit requests and tenant inquiries.

### Flatmate Matching
- `flatmate_preferences`: Living habits, sleep schedules, budgets, food preferences, pet mindset.
- `swipes`: Tinder-style interaction log (direction: `left`, `right`, `superlike`).
- `matches`: Mutual matches generated automatically by database trigger upon mutual like.

### Communication & Realtime
- `conversations`: Match dialogues and property enquiry threads.
- `conversation_members`: Active participants with last read timestamps.
- `messages`: Real-time chat messages with system celebration alerts.
- `contact_shares`: Mutual consent records for phone number exchange.

### Trust & Safety
- `verifications`: KYC uploads (Aadhaar, PAN, Title Deeds, RERA licenses).
- `reports`: User moderation reports with status (`pending`, `investigating`, `resolved`).

## 2. Automated PostgreSQL Triggers

- `trg_swipe_mutual_match`: Fires after insert on `swipes`. When a reciprocal like is detected, it automatically creates a row in `matches`, creates a direct `conversation`, and dispatches a welcoming system greeting.
- `trg_prevent_agent_self_auth`: Constraint trigger preventing real estate agents from self-authorizing or claiming ownership.
- `update_updated_at_column`: Automatically keeps `updated_at` timestamps accurate across all core tables.
