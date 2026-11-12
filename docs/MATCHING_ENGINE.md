# NestMate Deterministic Flatmate Matching Engine

## 1. Overview & Weight Distribution

NestMate uses a deterministic, rule-based compatibility engine calibrated specifically for Indian shared living environments. It computes an overall compatibility score between 0 and 100 alongside human-readable highlights and potential points to align on.

| Criterion | Weight | Scoring Logic |
| :--- | :--- | :--- |
| **Budget Compatibility** | **20%** | Overlap between `[minA, maxA]` and `[minB, maxB]`. Minimum 12/20 points for overlap, scaled by union overlap ratio. Minor gaps (<= ₹3,000) award 8/20. |
| **Location & Locality** | **20%** | 0/20 if different cities. 10 base points for same city. Up to 20/20 based on intersection of preferred localities (e.g. Koramangala + Indiranagar). |
| **Cleanliness Standard** | **15%** | Evaluated on a 1–5 scale. Identical = 15 pts; diff = 1 (12 pts); diff = 2 (7 pts); diff >= 3 (2 pts). |
| **Sleep Schedule Rhythm** | **15%** | Early Bird, Night Owl, Flexible, Standard. Identical = 15 pts; Flexible = 13 pts; Early Bird vs Night Owl = 4 pts. |
| **Lifestyle Habits** | **15%** | Sub-weighted: Smoking (4 pts), Drinking (3 pts), Parties/Hosting (4 pts), Pets (4 pts). Strict conflict on pet ownership vs pet-free preference = 0 pts. |
| **Food Preferences** | **5%** | Vegetarian, Eggetarian, Non-Vegetarian, Vegan, Jain. Exact match = 5 pts; Vegetarian + Jain/Vegan = 4.5 pts; Jain vs Non-Veg = 1 pt. |
| **Move-in Timeline** | **10%** | Proximity of move-in dates in calendar days: <= 7 days (10 pts); <= 15 days (8 pts); <= 30 days (6 pts); > 60 days (0 pts). |

## 2. Compatibility Tiers

Scores are mapped into five tiers with distinct visual cues:
- **85% – 100%:** `Exceptional Match` (Emerald badge)
- **70% – 84%:** `High Match` (Indigo badge)
- **55% – 69%:** `Moderate Match` (Amber badge)
- **40% – 54%:** `Fair Match` (Slate badge)
- **0% – 39%:** `Low Match` (Filtered out of primary swipe deck)

## 3. Exclusion Rules

The discovery pipeline strictly excludes:
1. The authenticated user themselves (`id = current_user_id`).
2. Suspended accounts (`is_suspended = true`).
3. Profiles already swiped (recorded in `swipes`).
4. Profiles already mutually matched (recorded in `matches`).
