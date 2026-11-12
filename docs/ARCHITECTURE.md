# NestMate System Architecture & Security Design

## 1. High-Level Monorepo Architecture

NestMate is architected as a production-grade monorepo containing a modern web application, native mobile application, shared domain package, and centralized Supabase PostgreSQL database.

```
                      ┌────────────────────────────────────────┐
                      │              CLIENT TIER               │
                      │                                        │
                      │  Next.js 14 Web       Expo React Native│
                      │  (App Router)         (Android / iOS)  │
                      └───────┬───────────────────────┬────────┘
                              │                       │
                              │   TypeScript Types,   │
                              │   Zod Schemas,        │
                              │   Deterministic Engine│
                              │                       │
                      ┌───────▼───────────────────────▼────────┐
                      │            @flatmate/shared            │
                      └───────────────────┬────────────────────┘
                                          │
                                          │ Supabase Client SDK
                                          │ & PostgREST / Realtime
                                          │
                      ┌───────────────────▼────────────────────┐
                      │              BACKEND TIER              │
                      │                                        │
                      │         Supabase / PostgreSQL          │
                      │ ────────────────────────────────────── │
                      │ • Row Level Security (RLS) on all tabs │
                      │ • Mutual Swipe Match Triggers          │
                      │ • Private Contact Shield Views         │
                      │ • Public Geocoded Marketplace Views    │
                      │ • Document Storage (Private/Public)    │
                      └────────────────────────────────────────┘
```

## 2. Security & Row-Level Security (RLS) Policy Matrix

Security is enforced at the database level using PostgreSQL Row-Level Security (RLS). Frontend restrictions are purely for user convenience; all authorization checks execute on the database server.

| Table | SELECT | INSERT | UPDATE | DELETE |
| :--- | :--- | :--- | :--- | :--- |
| `profiles` | Public (non-suspended) | Auth user only (`auth.uid() = id`) | User self or Admin | Admin only |
| `private_contacts` | User self or Approved Share Recipient | User self | User self | User self |
| `properties` | Public active listings (sensitive address filtered) | Verified owner or Admin | Owner or authorized agent | Owner or Admin |
| `property_images` | Public | Property owner / authorized agent | Owner / Agent | Owner / Agent |
| `enquiries` | Renter, Owner, Assigned Agent, Admin | Authenticated Renter | Owner, Agent, Admin | Admin only |
| `owner_agent_authorizations` | Owner, Agent, Admin | Owner or Agent | Owner only | Owner or Admin |
| `flatmate_preferences` | Public active seekers | User self | User self | User self |
| `swipes` | Swiper user only | Swiper user only | Forbidden (immutable) | Swiper user |
| `matches` | Involved pair (`user_1_id` or `user_2_id`) | Database trigger only | Activity timestamp trigger | Admin only |
| `conversations` | Conversation members only | Database trigger / Enquiries | Members | Admin only |
| `messages` | Conversation members only | Sender (must be in conversation) | Forbidden (immutable) | Admin only |
| `contact_shares` | Requester or Recipient | Requester | Recipient only (approve/reject) | Either party |
| `verifications` | Submitter or Admin | Submitter | Admin only | Admin only |
| `reports` | Reporter or Admin | Authenticated user | Admin only | Admin only |

## 3. Privacy & Address Shielding Protocol

In Indian rental markets, exposing full street addresses and phone numbers causes tenant harassment, unannounced visits, and spam broker calls. NestMate mitigates this through:
1. **Locality Generalization:** Only city and locality (e.g. *Koramangala 4th Block, Bangalore*) are delivered over public API endpoints.
2. **Confidential Address Line:** The `address_line` field is strictly withheld from public queries and only delivered after visit acceptance.
3. **Contact Consent Flow:** Phone numbers are sequestered in `private_contacts`. Users communicate via in-app chat until explicit mutual consent is recorded in `contact_shares`.

## 4. Agent Authorization Governance

To prevent unauthorized brokers from scraping owner photos and claiming ownership:
- A PostgreSQL constraint `prevent_agent_self_auth` enforces that `owner_id != agent_id`.
- Agents can only manage properties when `owner_agent_authorizations.is_authorized = TRUE`.
- Admin reviews RERA registration certificates before awarding the Agent badge.
