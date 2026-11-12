-- ==============================================================================
-- NESTMATE PLATFORM - REALISTIC INDIAN SEED DATA
-- Cities: Bangalore, Mumbai, Delhi-NCR, Pune, Hyderabad
-- ==============================================================================

-- 1. Create Mock Auth Users in auth.users (Supabase convention for local/dev)
-- Note: In production Supabase, users are created via auth.signUp()
INSERT INTO auth.users (id, email, raw_user_meta_data, created_at)
VALUES
  ('a0000000-0000-0000-0000-000000000001', 'aarav.sharma@example.com', '{"full_name": "Aarav Sharma"}', NOW()),
  ('a0000000-0000-0000-0000-000000000002', 'priya.patel@example.com', '{"full_name": "Priya Patel"}', NOW()),
  ('a0000000-0000-0000-0000-000000000003', 'rohan.mehta@example.com', '{"full_name": "Rohan Mehta"}', NOW()),
  ('a0000000-0000-0000-0000-000000000004', 'ananya.iyer@example.com', '{"full_name": "Ananya Iyer"}', NOW()),
  ('a0000000-0000-0000-0000-000000000005', 'vikram.singh@example.com', '{"full_name": "Vikram Singh"}', NOW()),
  ('a0000000-0000-0000-0000-000000000006', 'neha.reddy@example.com', '{"full_name": "Neha Reddy"}', NOW()),
  ('a0000000-0000-0000-0000-000000000007', 'rajesh.malhotra@example.com', '{"full_name": "Rajesh Malhotra"}', NOW()),
  ('a0000000-0000-0000-0000-000000000008', 'meera.nambiar@example.com', '{"full_name": "Meera Nambiar"}', NOW()),
  ('a0000000-0000-0000-0000-000000000009', 'sunil.joshi@example.com', '{"full_name": "Sunil Joshi (Apex Realty)"}', NOW()),
  ('a0000000-0000-0000-0000-000000000010', 'admin@nestmate.in', '{"full_name": "NestMate SuperAdmin"}', NOW())
ON CONFLICT (id) DO NOTHING;

-- 2. Populate Profiles
INSERT INTO profiles (id, email, full_name, avatar_url, bio, age, gender, occupation, city, state, is_verified, active_role)
VALUES
  ('a0000000-0000-0000-0000-000000000001', 'aarav.sharma@example.com', 'Aarav Sharma', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80', 'Senior Frontend Engineer at a fintech unicorn. Love weekend badminton, board games, filter coffee and quiet evenings.', 26, 'male', 'Software Engineer', 'Bangalore', 'Karnataka', TRUE, 'flatmate_seeker'),
  ('a0000000-0000-0000-0000-000000000002', 'priya.patel@example.com', 'Priya Patel', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80', 'Product Designer passionate about minimalism, plants, and sourdough baking. Looking for a neat and peaceful home.', 25, 'female', 'Product Designer', 'Bangalore', 'Karnataka', TRUE, 'flatmate_seeker'),
  ('a0000000-0000-0000-0000-000000000003', 'rohan.mehta@example.com', 'Rohan Mehta', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80', 'Investment Banker working in Bandra-Kurla Complex. Avid runner, music collector, non-smoker.', 28, 'male', 'Financial Analyst', 'Mumbai', 'Maharashtra', TRUE, 'flatmate_seeker'),
  ('a0000000-0000-0000-0000-000000000004', 'ananya.iyer@example.com', 'Ananya Iyer', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80', 'Content strategist & podcaster. Early bird, yoga enthusiast, strict vegetarian. Always keeps shared spaces clean.', 27, 'female', 'Content Strategist', 'Bangalore', 'Karnataka', TRUE, 'flatmate_seeker'),
  ('a0000000-0000-0000-0000-000000000005', 'vikram.singh@example.com', 'Vikram Singh', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80', 'Consultant at Big 4 in Cyber City Gurgaon. Frequent traveler, weekend golfer, casual cook.', 29, 'male', 'Management Consultant', 'Delhi NCR', 'Haryana', TRUE, 'flatmate_seeker'),
  ('a0000000-0000-0000-0000-000000000006', 'neha.reddy@example.com', 'Neha Reddy', 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80', 'AI Researcher in HITEC City Hyderabad. Pet lover, night owl coder, friendly and open-minded flatmate.', 24, 'female', 'AI Research Scientist', 'Hyderabad', 'Telangana', TRUE, 'flatmate_seeker'),
  ('a0000000-0000-0000-0000-000000000007', 'rajesh.malhotra@example.com', 'Rajesh Malhotra', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80', 'Verified property owner with luxury properties across Bangalore and Pune. Direct owner dealings only.', 52, 'male', 'Real Estate Investor', 'Bangalore', 'Karnataka', TRUE, 'property_owner'),
  ('a0000000-0000-0000-0000-000000000008', 'meera.nambiar@example.com', 'Meera Nambiar', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80', 'Owner of boutique serviced flats in Mumbai & Bangalore. Well-maintained spaces for young professionals.', 48, 'female', 'Architect & Owner', 'Mumbai', 'Maharashtra', TRUE, 'property_owner'),
  ('a0000000-0000-0000-0000-000000000009', 'sunil.joshi@example.com', 'Sunil Joshi (Apex Realty)', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80', 'RERA-certified real estate advisor. Specialized in verified rentals across Bangalore and Mumbai.', 38, 'male', 'Authorized Property Agent', 'Bangalore', 'Karnataka', TRUE, 'property_agent'),
  ('a0000000-0000-0000-0000-000000000010', 'admin@nestmate.in', 'NestMate SuperAdmin', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80', 'NestMate Platform Operations & Trust Safety Officer.', 35, 'male', 'Platform Administrator', 'Bangalore', 'Karnataka', TRUE, 'admin')
ON CONFLICT (id) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  city = EXCLUDED.city;

-- 3. Assign User Roles
INSERT INTO user_roles (user_id, role) VALUES
  ('a0000000-0000-0000-0000-000000000001', 'flatmate_seeker'),
  ('a0000000-0000-0000-0000-000000000002', 'flatmate_seeker'),
  ('a0000000-0000-0000-0000-000000000003', 'flatmate_seeker'),
  ('a0000000-0000-0000-0000-000000000004', 'flatmate_seeker'),
  ('a0000000-0000-0000-0000-000000000005', 'flatmate_seeker'),
  ('a0000000-0000-0000-0000-000000000006', 'flatmate_seeker'),
  ('a0000000-0000-0000-0000-000000000007', 'property_owner'),
  ('a0000000-0000-0000-0000-000000000008', 'property_owner'),
  ('a0000000-0000-0000-0000-000000000009', 'property_agent'),
  ('a0000000-0000-0000-0000-000000000010', 'admin')
ON CONFLICT DO NOTHING;

-- 4. Private Contacts
INSERT INTO private_contacts (user_id, phone_number, emergency_contact) VALUES
  ('a0000000-0000-0000-0000-000000000001', '+91 98765 43210', '+91 98765 00001'),
  ('a0000000-0000-0000-0000-000000000002', '+91 98111 22334', '+91 98111 00002'),
  ('a0000000-0000-0000-0000-000000000003', '+91 99222 33445', '+91 99222 00003'),
  ('a0000000-0000-0000-0000-000000000004', '+91 97333 44556', '+91 97333 00004'),
  ('a0000000-0000-0000-0000-000000000007', '+91 98200 11223', '+91 98200 00007')
ON CONFLICT (user_id) DO NOTHING;

-- 5. Flatmate Preferences
INSERT INTO flatmate_preferences (
  user_id, budget_min, budget_max, target_city, preferred_localities,
  target_move_date, sleep_schedule, cleanliness_level, food_preference,
  smoking_preference, drinking_preference, party_habits, work_style,
  allows_pets, has_pets, gender_preference, max_flatmates, about_living_style
) VALUES
  (
    'a0000000-0000-0000-0000-000000000001', 18000, 30000, 'Bangalore',
    ARRAY['Koramangala', 'HSR Layout', 'Indiranagar']::TEXT[],
    CURRENT_DATE + INTERVAL '12 days', 'night_owl', 4, 'non_vegetarian',
    'non_smoker', 'social_drinker', 'weekends_only', 'hybrid',
    TRUE, FALSE, 'any', 2, 'Work hard during week, love exploring cafes on weekends.'
  ),
  (
    'a0000000-0000-0000-0000-000000000002', 17000, 28000, 'Bangalore',
    ARRAY['Koramangala', 'Indiranagar', 'Domlur']::TEXT[],
    CURRENT_DATE + INTERVAL '15 days', 'night_owl', 5, 'vegetarian',
    'non_smoker', 'social_drinker', 'rarely', 'work_from_home',
    TRUE, FALSE, 'female_only', 2, 'Prefer clean and calm spaces with plenty of sunlight.'
  ),
  (
    'a0000000-0000-0000-0000-000000000003', 35000, 55000, 'Mumbai',
    ARRAY['Bandra West', 'Khar', 'Santacruz']::TEXT[],
    CURRENT_DATE + INTERVAL '20 days', 'standard', 4, 'non_vegetarian',
    'non_smoker', 'social_drinker', 'weekends_only', 'office',
    FALSE, FALSE, 'male_only', 1, 'Busy weekdays, relaxed weekend vibe.'
  ),
  (
    'a0000000-0000-0000-0000-000000000004', 15000, 25000, 'Bangalore',
    ARRAY['Indiranagar', 'Koramangala', 'Ulsoor']::TEXT[],
    CURRENT_DATE + INTERVAL '14 days', 'early_bird', 5, 'vegetarian',
    'non_smoker', 'non_drinker', 'no_parties', 'hybrid',
    FALSE, FALSE, 'female_only', 2, 'Strictly non-smoking, early riser with daily yoga practice.'
  ),
  (
    'a0000000-0000-0000-0000-000000000005', 20000, 35000, 'Delhi NCR',
    ARRAY['Cyber City', 'Golf Course Road', 'DLF Phase 2']::TEXT[],
    CURRENT_DATE + INTERVAL '25 days', 'flexible', 4, 'non_vegetarian',
    'occasional', 'social_drinker', 'weekends_only', 'hybrid',
    TRUE, FALSE, 'any', 2, 'Friendly corporate guy who respects personal boundaries.'
  ),
  (
    'a0000000-0000-0000-0000-000000000006', 16000, 26000, 'Hyderabad',
    ARRAY['Gachibowli', 'HITEC City', 'Madhapur']::TEXT[],
    CURRENT_DATE + INTERVAL '10 days', 'night_owl', 4, 'eggetarian',
    'non_smoker', 'social_drinker', 'rarely', 'work_from_home',
    TRUE, TRUE, 'any', 2, 'Own a very friendly indie cat named Chai. Love tech and good conversations.'
  )
ON CONFLICT (user_id) DO NOTHING;

-- 6. Rental Properties Across India
INSERT INTO properties (
  id, owner_id, created_by_user_id, title, description, property_category,
  city, state, locality, pincode, address_line, rent_monthly, security_deposit,
  maintenance_charge, bedrooms, bathrooms, balconies, carpet_area_sqft, furnishing,
  status, is_verified, available_from, preferred_tenants
) VALUES
  (
    'b0000000-0000-0000-0000-000000000001',
    'a0000000-0000-0000-0000-000000000007',
    'a0000000-0000-0000-0000-000000000007',
    'Luxurious 3BHK with Panoramic Balcony in HSR Layout Sector 2',
    'Stunning high-floor apartment located in a premier gated community. Features Italian marble flooring, fully modular kitchen with Faber chimney, high-end woodwork in all rooms, and direct view of Agara Lake. High speed fiber internet ready, 100% DG power backup, clubhouse access.',
    'entire_flat',
    'Bangalore', 'Karnataka', 'HSR Layout', '560102', 'Tower 4, Sobha Magnolia, 14th Main Road, HSR Sector 2',
    52000, 150000, 4500, 3, 3, 2, 1650, 'fully_furnished',
    'active', TRUE, CURRENT_DATE + INTERVAL '5 days', ARRAY['Bachelors', 'Families', 'Company Lease']::TEXT[]
  ),
  (
    'b0000000-0000-0000-0000-000000000002',
    'a0000000-0000-0000-0000-000000000007',
    'a0000000-0000-0000-0000-000000000007',
    'Sunlit Private Master Bedroom in Koramangala 4th Block',
    'Private master bedroom with attached bathroom and private sit-out balcony inside a spacious 3BHK flat. Currently occupied by two tech professionals. Walking distance to 80 Feet Road cafes, Third Wave Coffee, and Sony World Signal.',
    'private_room',
    'Bangalore', 'Karnataka', 'Koramangala', '560034', 'House 284, 8th Cross, 4th Block, Koramangala',
    21000, 50000, 1200, 1, 1, 1, 350, 'fully_furnished',
    'active', TRUE, CURRENT_DATE + INTERVAL '7 days', ARRAY['Bachelors', 'Working Professionals']::TEXT[]
  ),
  (
    'b0000000-0000-0000-0000-000000000003',
    'a0000000-0000-0000-0000-000000000008',
    'a0000000-0000-0000-0000-000000000008',
    'Chic Sea-Facing 2BHK on Carter Road, Bandra West',
    'Rare opportunity on Carter Road promenade with expansive Arabian Sea views. Completely remodeled with Scandinavian aesthetic, brand new Daikin inverter ACs, double glazed soundproof windows, and modular appliances. 24/7 security with CCTV surveillance.',
    'entire_apartment',
    'Mumbai', 'Maharashtra', 'Bandra West', '400050', 'Seagull Heights, Carter Road, Bandra West',
    95000, 250000, 6000, 2, 2, 1, 950, 'fully_furnished',
    'active', TRUE, CURRENT_DATE + INTERVAL '10 days', ARRAY['Bachelors', 'Working Professionals', 'Expats']::TEXT[]
  ),
  (
    'b0000000-0000-0000-0000-000000000004',
    'a0000000-0000-0000-0000-000000000007',
    'a0000000-0000-0000-0000-000000000007',
    'Modern Techie Flatmate Vacancy in Gachibowli Gated Society',
    'Single occupancy room available in a luxury 3BHK inside Jayabheri Silicon County. Opposite DLF Cyber City. Gated society with Olympic-size swimming pool, 2 gymnasiums, squash court and supermarket inside campus. Flatmate is a Google software engineer.',
    'flatmate_vacancy',
    'Hyderabad', 'Telangana', 'Gachibowli', '500032', 'Flat 702, Block C, Jayabheri Silicon County, Gachibowli',
    18500, 40000, 1500, 1, 1, 1, 300, 'fully_furnished',
    'active', TRUE, CURRENT_DATE + INTERVAL '3 days', ARRAY['Bachelors', 'Working Professionals']::TEXT[]
  ),
  (
    'b0000000-0000-0000-0000-000000000005',
    'a0000000-0000-0000-0000-000000000008',
    'a0000000-0000-0000-0000-000000000008',
    'Premium Co-Living Studio & PG near DLF Cyber Hub',
    'High-spec co-living room with ensuite washroom, work desk, high-speed WiFi and daily professional housekeeping. Includes chef-prepared hygienic breakfast and dinner. 5 minutes commute to Cyber City Rapid Metro and DLF Phase 2.',
    'pg_accommodation',
    'Delhi NCR', 'Haryana', 'Cyber City', '122002', 'Building 45, DLF Phase 2, near Sikanderpur Metro, Gurgaon',
    24000, 24000, 0, 1, 1, 0, 220, 'fully_furnished',
    'active', TRUE, CURRENT_DATE + INTERVAL '2 days', ARRAY['Bachelors', 'Students', 'Working Professionals']::TEXT[]
  ),
  (
    'b0000000-0000-0000-0000-000000000006',
    'a0000000-0000-0000-0000-000000000007',
    'a0000000-0000-0000-0000-000000000007',
    'Spacious 2BHK Apartment near Phoenix Marketcity Viman Nagar',
    'Well ventilated, breezy second-floor apartment in prime Viman Nagar. Walkable distance to Symbiosis campus and Phoenix Mall. Equipped with gas pipeline, dedicated covered four-wheeler parking, 24/7 security guard and water storage.',
    'entire_flat',
    'Pune', 'Maharashtra', 'Viman Nagar', '411014', 'Rowhouse 12, Clover Park, Viman Nagar',
    31000, 75000, 2000, 2, 2, 2, 1100, 'semi_furnished',
    'active', TRUE, CURRENT_DATE + INTERVAL '12 days', ARRAY['Bachelors', 'Families', 'Students']::TEXT[]
  )
ON CONFLICT (id) DO NOTHING;

-- 7. Property Images
INSERT INTO property_images (property_id, image_url, display_order, caption, is_primary) VALUES
  ('b0000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80', 1, 'Spacious living room with large glass balcony', TRUE),
  ('b0000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80', 2, 'Modern open kitchen with breakfast counter', FALSE),
  ('b0000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80', 3, 'Master bedroom with wooden flooring', FALSE),
  ('b0000000-0000-0000-0000-000000000002', 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80', 1, 'Master bedroom interior with sunlight', TRUE),
  ('b0000000-0000-0000-0000-000000000002', 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80', 2, 'Ensuite clean bathroom with geyser', FALSE),
  ('b0000000-0000-0000-0000-000000000003', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', 1, 'Carter Road sea-view living deck', TRUE),
  ('b0000000-0000-0000-0000-000000000003', 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1200&q=80', 2, 'Modernist dining & kitchen space', FALSE),
  ('b0000000-0000-0000-0000-000000000004', 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80', 1, 'Available room with ergonomic work desk', TRUE),
  ('b0000000-0000-0000-0000-000000000005', 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80', 1, 'Co-living studio with hotel style setup', TRUE),
  ('b0000000-0000-0000-0000-000000000006', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80', 1, 'Bright 2BHK living room in Viman Nagar', TRUE)
ON CONFLICT DO NOTHING;

-- 8. Property Amenities
INSERT INTO property_amenities (property_id, amenity_name) VALUES
  ('b0000000-0000-0000-0000-000000000001', 'High-Speed Wi-Fi'),
  ('b0000000-0000-0000-0000-000000000001', '100% Power Backup (DG)'),
  ('b0000000-0000-0000-0000-000000000001', 'Modular Kitchen'),
  ('b0000000-0000-0000-0000-000000000001', 'Swimming Pool'),
  ('b0000000-0000-0000-0000-000000000001', 'Clubhouse & Gym'),
  ('b0000000-0000-0000-0000-000000000001', 'Dedicated Parking'),
  ('b0000000-0000-0000-0000-000000000002', 'High-Speed Wi-Fi'),
  ('b0000000-0000-0000-0000-000000000002', 'Washing Machine'),
  ('b0000000-0000-0000-0000-000000000002', 'Attached Balcony'),
  ('b0000000-0000-0000-0000-000000000002', 'Daily Housekeeping Maid'),
  ('b0000000-0000-0000-0000-000000000003', 'Air Conditioner'),
  ('b0000000-0000-0000-0000-000000000003', 'Sea View Balcony'),
  ('b0000000-0000-0000-0000-000000000003', '24/7 Security CCTV'),
  ('b0000000-0000-0000-0000-000000000004', 'Swimming Pool'),
  ('b0000000-0000-0000-0000-000000000004', 'Gymnasium'),
  ('b0000000-0000-0000-0000-000000000004', 'Work Desk & Ergonomic Chair'),
  ('b0000000-0000-0000-0000-000000000005', 'Meals Included'),
  ('b0000000-0000-0000-0000-000000000005', 'Daily Housekeeping'),
  ('b0000000-0000-0000-0000-000000000006', 'Covered Parking'),
  ('b0000000-0000-0000-0000-000000000006', 'Piped Natural Gas (PNG)')
ON CONFLICT DO NOTHING;

-- 9. Owner Agent Authorization (Sunil Joshi authorized by Rajesh Malhotra)
INSERT INTO owner_agent_authorizations (
  owner_id, agent_id, property_id, is_authorized, commission_percentage, notes, requested_by, approved_at
) VALUES (
  'a0000000-0000-0000-0000-000000000007',
  'a0000000-0000-0000-0000-000000000009',
  'b0000000-0000-0000-0000-000000000001',
  TRUE,
  15.00,
  'Authorized to conduct tenant inspections and manage inquiries for HSR Layout apartment.',
  'agent',
  NOW()
) ON CONFLICT DO NOTHING;

-- 10. Sample Enquiries
INSERT INTO enquiries (
  property_id, renter_id, owner_id, message, status, proposed_move_date, occupant_count, has_pets
) VALUES (
  'b0000000-0000-0000-0000-000000000002',
  'a0000000-0000-0000-0000-000000000001',
  'a0000000-0000-0000-0000-000000000007',
  'Hi Rajesh, I am Aarav, software engineer at a fintech startup. I work in Koramangala and am looking to move in by end of this month. Can I schedule a visit this Saturday?',
  'reviewed',
  CURRENT_DATE + INTERVAL '12 days',
  1,
  FALSE
) ON CONFLICT DO NOTHING;

-- 11. Sample Matches & Conversations
INSERT INTO matches (user_1_id, user_2_id, compatibility_score)
VALUES (
  'a0000000-0000-0000-0000-000000000001',
  'a0000000-0000-0000-0000-000000000002',
  91
) ON CONFLICT DO NOTHING;

INSERT INTO conversations (id, type)
VALUES ('c0000000-0000-0000-0000-000000000001', 'direct_match')
ON CONFLICT (id) DO NOTHING;

INSERT INTO conversation_members (conversation_id, user_id) VALUES
  ('c0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001'),
  ('c0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000002')
ON CONFLICT DO NOTHING;

INSERT INTO messages (conversation_id, sender_id, content, is_system) VALUES
  ('c0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'Congratulations! You matched with each other on NestMate with a 91% compatibility score!', TRUE),
  ('c0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'Hey Priya! Saw that you are also hunting around Koramangala and Indiranagar. How is your search going?', FALSE),
  ('c0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000002', 'Hey Aarav! It has been hectic haha. I checked a couple of places in 4th block. Have you shortlisted any 2BHKs?', FALSE)
ON CONFLICT DO NOTHING;
