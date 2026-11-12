-- ==============================================================================
-- NESTMATE STARTUP PLATFORM - INITIAL POSTGRESQL SCHEMA & SECURITY POLICIES
-- Production Architecture for Flatmate Matching & Indian Rental Marketplace
-- ==============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ------------------------------------------------------------------------------
-- 1. ENUMS
-- ------------------------------------------------------------------------------

CREATE TYPE user_role_type AS ENUM (
  'flatmate_seeker',
  'solo_renter',
  'property_owner',
  'property_agent',
  'admin'
);

CREATE TYPE property_category_type AS ENUM (
  'entire_apartment',
  'entire_flat',
  'private_room',
  'shared_room',
  'individual_bed',
  'pg_accommodation',
  'flatmate_vacancy'
);

CREATE TYPE furnishing_type AS ENUM (
  'fully_furnished',
  'semi_furnished',
  'unfurnished'
);

CREATE TYPE property_status_type AS ENUM (
  'active',
  'under_review',
  'occupied',
  'inactive',
  'rejected'
);

CREATE TYPE sleep_schedule_type AS ENUM (
  'early_bird',
  'night_owl',
  'flexible',
  'standard'
);

CREATE TYPE food_preference_type AS ENUM (
  'vegetarian',
  'eggetarian',
  'non_vegetarian',
  'vegan',
  'jain'
);

CREATE TYPE smoking_pref_type AS ENUM (
  'non_smoker',
  'occasional',
  'regular',
  'outside_only'
);

CREATE TYPE drinking_pref_type AS ENUM (
  'non_drinker',
  'social_drinker',
  'regular'
);

CREATE TYPE party_habits_type AS ENUM (
  'rarely',
  'weekends_only',
  'frequent',
  'no_parties'
);

CREATE TYPE work_style_type AS ENUM (
  'work_from_home',
  'office',
  'hybrid',
  'student'
);

CREATE TYPE gender_type AS ENUM (
  'male',
  'female',
  'non_binary',
  'prefer_not_to_say'
);

CREATE TYPE gender_pref_type AS ENUM (
  'any',
  'male_only',
  'female_only'
);

CREATE TYPE verification_status_type AS ENUM (
  'pending',
  'verified',
  'rejected'
);

CREATE TYPE document_type AS ENUM (
  'aadhaar',
  'pan',
  'ownership_deed',
  'utility_bill',
  'rera_license',
  'agent_id'
);

CREATE TYPE enquiry_status_type AS ENUM (
  'pending',
  'reviewed',
  'accepted',
  'declined',
  'closed'
);

CREATE TYPE report_reason_type AS ENUM (
  'fraud',
  'harassment',
  'fake_listing',
  'wrong_information',
  'offensive_content',
  'spam',
  'other'
);

CREATE TYPE report_status_type AS ENUM (
  'pending',
  'investigating',
  'resolved',
  'dismissed'
);

CREATE TYPE contact_share_status_type AS ENUM (
  'requested',
  'approved',
  'rejected',
  'revoked'
);

CREATE TYPE swipe_direction_type AS ENUM (
  'left',
  'right',
  'superlike'
);

-- ------------------------------------------------------------------------------
-- 2. CORE USER TABLES
-- ------------------------------------------------------------------------------

-- User profiles (Public directory info, safe for discovery)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  age INT CHECK (age >= 18 AND age <= 99),
  gender gender_type,
  occupation TEXT,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  is_verified BOOLEAN DEFAULT FALSE,
  is_suspended BOOLEAN DEFAULT FALSE,
  active_role user_role_type NOT NULL DEFAULT 'flatmate_seeker',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Assigned roles (Allows multi-role accounts: e.g. Owner + Flatmate seeker)
CREATE TABLE user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role user_role_type NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- Private contacts (Phone numbers, emergency contacts - strictly guarded)
CREATE TABLE private_contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
  phone_number TEXT NOT NULL,
  emergency_contact TEXT,
  id_document_number_masked TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 3. PROPERTY MARKETPLACE TABLES
-- ------------------------------------------------------------------------------

CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_by_user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  authorized_agent_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  property_category property_category_type NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  locality TEXT NOT NULL,
  pincode VARCHAR(10) NOT NULL,
  -- Exact address line is strictly confidential to avoid unvetted walk-ins
  address_line TEXT NOT NULL,
  latitude NUMERIC(10, 7),
  longitude NUMERIC(10, 7),
  rent_monthly NUMERIC(12, 2) NOT NULL CHECK (rent_monthly > 0),
  security_deposit NUMERIC(12, 2) NOT NULL DEFAULT 0 CHECK (security_deposit >= 0),
  maintenance_charge NUMERIC(10, 2) NOT NULL DEFAULT 0,
  bedrooms INT NOT NULL DEFAULT 1 CHECK (bedrooms >= 0),
  bathrooms INT NOT NULL DEFAULT 1 CHECK (bathrooms >= 1),
  balconies INT NOT NULL DEFAULT 0,
  carpet_area_sqft NUMERIC(8, 2),
  furnishing furnishing_type NOT NULL DEFAULT 'semi_furnished',
  status property_status_type NOT NULL DEFAULT 'active',
  is_verified BOOLEAN DEFAULT FALSE,
  available_from DATE NOT NULL DEFAULT CURRENT_DATE,
  preferred_tenants TEXT[] DEFAULT ARRAY['Any']::TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Property images
CREATE TABLE property_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 0,
  caption TEXT,
  is_primary BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Property amenities
CREATE TABLE property_amenities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  amenity_name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(property_id, amenity_name)
);

-- Saved properties (User bookmarks)
CREATE TABLE saved_properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, property_id)
);

-- Property enquiries
CREATE TABLE enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  renter_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  owner_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  agent_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  message TEXT NOT NULL,
  status enquiry_status_type NOT NULL DEFAULT 'pending',
  proposed_move_date DATE,
  occupant_count INT DEFAULT 1,
  has_pets BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Owner <-> Agent authorizations
CREATE TABLE owner_agent_authorizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  agent_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  is_authorized BOOLEAN NOT NULL DEFAULT FALSE,
  commission_percentage NUMERIC(5, 2) CHECK (commission_percentage >= 0 AND commission_percentage <= 50),
  notes TEXT,
  requested_by TEXT NOT NULL CHECK (requested_by IN ('owner', 'agent')),
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (owner_id != agent_id)
);

-- ------------------------------------------------------------------------------
-- 4. FLATMATE MATCHING TABLES
-- ------------------------------------------------------------------------------

CREATE TABLE flatmate_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
  budget_min NUMERIC(10, 2) NOT NULL CHECK (budget_min > 0),
  budget_max NUMERIC(10, 2) NOT NULL CHECK (budget_max >= budget_min),
  target_city TEXT NOT NULL,
  preferred_localities TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  target_move_date DATE NOT NULL,
  sleep_schedule sleep_schedule_type NOT NULL DEFAULT 'flexible',
  cleanliness_level INT NOT NULL DEFAULT 3 CHECK (cleanliness_level BETWEEN 1 AND 5),
  food_preference food_preference_type NOT NULL DEFAULT 'vegetarian',
  smoking_preference smoking_pref_type NOT NULL DEFAULT 'non_smoker',
  drinking_preference drinking_pref_type NOT NULL DEFAULT 'non_drinker',
  party_habits party_habits_type NOT NULL DEFAULT 'rarely',
  work_style work_style_type NOT NULL DEFAULT 'hybrid',
  allows_pets BOOLEAN NOT NULL DEFAULT FALSE,
  has_pets BOOLEAN NOT NULL DEFAULT FALSE,
  gender_preference gender_pref_type NOT NULL DEFAULT 'any',
  max_flatmates INT DEFAULT 2,
  about_living_style TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Swipes (Tinder-style matching queue)
CREATE TABLE swipes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  swiper_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  target_user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  direction swipe_direction_type NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (swiper_id != target_user_id),
  UNIQUE(swiper_id, target_user_id)
);

-- Mutual Matches
CREATE TABLE matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_1_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  user_2_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  compatibility_score INT NOT NULL DEFAULT 70 CHECK (compatibility_score BETWEEN 0 AND 100),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_activity_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (user_1_id < user_2_id),
  UNIQUE(user_1_id, user_2_id)
);

-- ------------------------------------------------------------------------------
-- 5. COMMUNICATION & MESSAGING TABLES
-- ------------------------------------------------------------------------------

CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN ('direct_match', 'property_enquiry')),
  property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
  last_message_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE conversation_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_read_at TIMESTAMPTZ,
  UNIQUE(conversation_id, user_id)
);

CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_system BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Explicit contact sharing consent
CREATE TABLE contact_shares (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  requester_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  recipient_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status contact_share_status_type NOT NULL DEFAULT 'requested',
  conversation_id UUID REFERENCES conversations(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (requester_id != recipient_id),
  UNIQUE(requester_id, recipient_id)
);

-- ------------------------------------------------------------------------------
-- 6. TRUST & SAFETY TABLES
-- ------------------------------------------------------------------------------

CREATE TABLE verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  document_type document_type NOT NULL,
  document_storage_path TEXT NOT NULL,
  status verification_status_type NOT NULL DEFAULT 'pending',
  reviewer_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  rejection_reason TEXT,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ
);

CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  reported_user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  reported_property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
  reason report_reason_type NOT NULL,
  description TEXT NOT NULL,
  status report_status_type NOT NULL DEFAULT 'pending',
  resolution_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 7. PERFORMANCE INDEXES
-- ------------------------------------------------------------------------------

-- Property indexes
CREATE INDEX idx_properties_city_locality ON properties(city, locality);
CREATE INDEX idx_properties_rent ON properties(rent_monthly);
CREATE INDEX idx_properties_category ON properties(property_category);
CREATE INDEX idx_properties_status ON properties(status);
CREATE INDEX idx_properties_owner ON properties(owner_id);

-- Flatmate matching indexes
CREATE INDEX idx_flatmate_city_budget ON flatmate_preferences(target_city, budget_min, budget_max);
CREATE INDEX idx_flatmate_sleep ON flatmate_preferences(sleep_schedule);
CREATE INDEX idx_flatmate_food ON flatmate_preferences(food_preference);
CREATE INDEX idx_swipes_swiper ON swipes(swiper_id);
CREATE INDEX idx_swipes_target ON swipes(target_user_id);
CREATE INDEX idx_matches_users ON matches(user_1_id, user_2_id);

-- Messaging indexes
CREATE INDEX idx_messages_conversation ON messages(conversation_id, created_at DESC);
CREATE INDEX idx_conv_members_user ON conversation_members(user_id);
CREATE INDEX idx_enquiries_property ON enquiries(property_id);
CREATE INDEX idx_enquiries_renter ON enquiries(renter_id);
CREATE INDEX idx_enquiries_owner ON enquiries(owner_id);

-- ------------------------------------------------------------------------------
-- 8. SECURITY HELPER FUNCTIONS
-- ------------------------------------------------------------------------------

-- Check if current authenticated user has Admin role
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Check if an agent is authorized for a property
CREATE OR REPLACE FUNCTION is_agent_authorized_for_property(
  target_property_id UUID,
  check_agent_id UUID
)
RETURNS BOOLEAN AS $$
DECLARE
  prop_owner_id UUID;
BEGIN
  SELECT owner_id INTO prop_owner_id FROM properties WHERE id = target_property_id;
  IF prop_owner_id IS NULL THEN
    RETURN FALSE;
  END IF;

  RETURN EXISTS (
    SELECT 1 FROM owner_agent_authorizations
    WHERE owner_id = prop_owner_id
      AND agent_id = check_agent_id
      AND is_authorized = TRUE
      AND (property_id IS NULL OR property_id = target_property_id)
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger: Automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_properties_updated_at BEFORE UPDATE ON properties FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_flatmate_prefs_updated_at BEFORE UPDATE ON flatmate_preferences FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_enquiries_updated_at BEFORE UPDATE ON enquiries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_authorizations_updated_at BEFORE UPDATE ON owner_agent_authorizations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger: Mutual Swipe Detection -> Automatically create a Match and Conversation
CREATE OR REPLACE FUNCTION process_swipe_mutual_match()
RETURNS TRIGGER AS $$
DECLARE
  v_other_swipe RECORD;
  v_user1 UUID;
  v_user2 UUID;
  v_conv_id UUID;
BEGIN
  -- Only process if direction is 'right' or 'superlike'
  IF NEW.direction IN ('right', 'superlike') THEN
    SELECT * INTO v_other_swipe
    FROM swipes
    WHERE swiper_id = NEW.target_user_id
      AND target_user_id = NEW.swiper_id
      AND direction IN ('right', 'superlike');

    IF FOUND THEN
      -- Deterministic ordering for matches table constraint (user_1_id < user_2_id)
      IF NEW.swiper_id < NEW.target_user_id THEN
        v_user1 := NEW.swiper_id;
        v_user2 := NEW.target_user_id;
      ELSE
        v_user1 := NEW.target_user_id;
        v_user2 := NEW.swiper_id;
      END IF;

      -- Create Match record if not exists
      INSERT INTO matches (user_1_id, user_2_id, compatibility_score)
      VALUES (v_user1, v_user2, 85)
      ON CONFLICT (user_1_id, user_2_id) DO NOTHING;

      -- Create Direct Conversation for matched pair
      INSERT INTO conversations (type)
      VALUES ('direct_match')
      RETURNING id INTO v_conv_id;

      INSERT INTO conversation_members (conversation_id, user_id) VALUES
        (v_conv_id, v_user1),
        (v_conv_id, v_user2);

      -- Add welcoming system message
      INSERT INTO messages (conversation_id, sender_id, content, is_system)
      VALUES (
        v_conv_id,
        NEW.swiper_id,
        'Congratulations! You matched with each other on NestMate. Say hello and find out if you make great flatmates!',
        TRUE
      );
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trg_swipe_mutual_match
AFTER INSERT ON swipes
FOR EACH ROW
EXECUTE FUNCTION process_swipe_mutual_match();

-- Constraint Trigger: Agents cannot authorize themselves or claim own properties
CREATE OR REPLACE FUNCTION prevent_agent_self_authorization()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.agent_id = NEW.owner_id THEN
    RAISE EXCEPTION 'An agent cannot authorize themselves as a property owner.';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_prevent_agent_self_auth
BEFORE INSERT OR UPDATE ON owner_agent_authorizations
FOR EACH ROW
EXECUTE FUNCTION prevent_agent_self_authorization();

-- ------------------------------------------------------------------------------
-- 9. ROW-LEVEL SECURITY (RLS) POLICIES
-- ------------------------------------------------------------------------------

-- Enable RLS on ALL tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE private_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE owner_agent_authorizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE flatmate_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE swipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversation_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_shares ENABLE ROW LEVEL SECURITY;
ALTER TABLE verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- PROFILES
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (is_suspended = FALSE);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id OR is_admin());

-- USER ROLES
CREATE POLICY "Users can read own roles or admin can read all"
  ON user_roles FOR SELECT
  USING (auth.uid() = user_id OR is_admin());

CREATE POLICY "Admins or signup service can insert roles"
  ON user_roles FOR INSERT
  WITH CHECK (auth.uid() = user_id OR is_admin());

-- PRIVATE CONTACTS
-- Crucial: private phone numbers must NEVER be publicly accessible!
CREATE POLICY "Users can view and manage their own private contact"
  ON private_contacts FOR ALL
  USING (auth.uid() = user_id OR is_admin());

CREATE POLICY "Authorized contact share recipients can view private contact"
  ON private_contacts FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM contact_shares
      WHERE requester_id = auth.uid()
        AND recipient_id = private_contacts.user_id
        AND status = 'approved'
    )
  );

-- PROPERTIES
CREATE POLICY "Active properties are viewable by everyone"
  ON properties FOR SELECT
  USING (status = 'active' OR owner_id = auth.uid() OR created_by_user_id = auth.uid() OR is_admin() OR is_agent_authorized_for_property(id, auth.uid()));

CREATE POLICY "Owners and authorized agents can insert properties"
  ON properties FOR INSERT
  WITH CHECK (auth.uid() = owner_id OR is_admin());

CREATE POLICY "Owners and authorized agents can update properties"
  ON properties FOR UPDATE
  USING (auth.uid() = owner_id OR is_agent_authorized_for_property(id, auth.uid()) OR is_admin());

CREATE POLICY "Owners or admin can delete properties"
  ON properties FOR DELETE
  USING (auth.uid() = owner_id OR is_admin());

-- PROPERTY IMAGES & AMENITIES
CREATE POLICY "Property images are publicly viewable"
  ON property_images FOR SELECT USING (TRUE);

CREATE POLICY "Property owners/agents can manage images"
  ON property_images FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM properties p
      WHERE p.id = property_images.property_id
        AND (p.owner_id = auth.uid() OR is_agent_authorized_for_property(p.id, auth.uid()) OR is_admin())
    )
  );

CREATE POLICY "Property amenities are publicly viewable"
  ON property_amenities FOR SELECT USING (TRUE);

CREATE POLICY "Property owners/agents can manage amenities"
  ON property_amenities FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM properties p
      WHERE p.id = property_amenities.property_id
        AND (p.owner_id = auth.uid() OR is_agent_authorized_for_property(p.id, auth.uid()) OR is_admin())
    )
  );

-- SAVED PROPERTIES
CREATE POLICY "Users can manage their saved properties"
  ON saved_properties FOR ALL
  USING (auth.uid() = user_id);

-- ENQUIRIES
CREATE POLICY "Enquiries viewable by renter, owner, or assigned agent"
  ON enquiries FOR SELECT
  USING (
    auth.uid() = renter_id OR
    auth.uid() = owner_id OR
    auth.uid() = agent_id OR
    is_admin()
  );

CREATE POLICY "Authenticated users can create enquiries"
  ON enquiries FOR INSERT
  WITH CHECK (auth.uid() = renter_id);

CREATE POLICY "Owners or agents can update enquiry status"
  ON enquiries FOR UPDATE
  USING (auth.uid() = owner_id OR auth.uid() = agent_id OR is_admin());

-- OWNER AGENT AUTHORIZATIONS
CREATE POLICY "Owners and agents can view their authorizations"
  ON owner_agent_authorizations FOR SELECT
  USING (auth.uid() = owner_id OR auth.uid() = agent_id OR is_admin());

CREATE POLICY "Agents can request authorization"
  ON owner_agent_authorizations FOR INSERT
  WITH CHECK (auth.uid() = agent_id OR auth.uid() = owner_id);

CREATE POLICY "Owners can approve or modify authorizations"
  ON owner_agent_authorizations FOR UPDATE
  USING (auth.uid() = owner_id OR is_admin());

-- FLATMATE PREFERENCES
CREATE POLICY "Preferences viewable by active platform users"
  ON flatmate_preferences FOR SELECT
  USING (TRUE);

CREATE POLICY "Users can insert their flatmate preferences"
  ON flatmate_preferences FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their flatmate preferences"
  ON flatmate_preferences FOR UPDATE
  USING (auth.uid() = user_id OR is_admin());

-- SWIPES
CREATE POLICY "Users can manage their own swipes"
  ON swipes FOR ALL
  USING (auth.uid() = swiper_id);

-- MATCHES
CREATE POLICY "Matches viewable only by involved participants"
  ON matches FOR SELECT
  USING (auth.uid() = user_1_id OR auth.uid() = user_2_id OR is_admin());

-- CONVERSATIONS & MEMBERS
CREATE POLICY "Conversation members can view their conversations"
  ON conversations FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM conversation_members cm
      WHERE cm.conversation_id = conversations.id AND cm.user_id = auth.uid()
    ) OR is_admin()
  );

CREATE POLICY "Members can view members of their conversations"
  ON conversation_members FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM conversation_members cm
      WHERE cm.conversation_id = conversation_members.conversation_id AND cm.user_id = auth.uid()
    ) OR is_admin()
  );

CREATE POLICY "Users can join conversations when authorized"
  ON conversation_members FOR INSERT
  WITH CHECK (auth.uid() = user_id OR is_admin());

-- MESSAGES
CREATE POLICY "Users can view messages in their conversations"
  ON messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM conversation_members cm
      WHERE cm.conversation_id = messages.conversation_id AND cm.user_id = auth.uid()
    ) OR is_admin()
  );

CREATE POLICY "Users can send messages to their conversations"
  ON messages FOR INSERT
  WITH CHECK (
    auth.uid() = sender_id AND
    EXISTS (
      SELECT 1 FROM conversation_members cm
      WHERE cm.conversation_id = messages.conversation_id AND cm.user_id = auth.uid()
    )
  );

-- CONTACT SHARES
CREATE POLICY "Contact shares viewable by parties involved"
  ON contact_shares FOR SELECT
  USING (auth.uid() = requester_id OR auth.uid() = recipient_id OR is_admin());

CREATE POLICY "Users can request contact share"
  ON contact_shares FOR INSERT
  WITH CHECK (auth.uid() = requester_id);

CREATE POLICY "Recipients can approve or reject contact requests"
  ON contact_shares FOR UPDATE
  USING (auth.uid() = recipient_id OR is_admin());

-- VERIFICATIONS
CREATE POLICY "Users can view their own verifications, admins can review all"
  ON verifications FOR SELECT
  USING (auth.uid() = user_id OR is_admin());

CREATE POLICY "Users can submit their own verifications"
  ON verifications FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can update verification status"
  ON verifications FOR UPDATE
  USING (is_admin());

-- REPORTS
CREATE POLICY "Reporters can view their reports, admins can view all"
  ON reports FOR SELECT
  USING (auth.uid() = reporter_id OR is_admin());

CREATE POLICY "Authenticated users can submit reports"
  ON reports FOR INSERT
  WITH CHECK (auth.uid() = reporter_id);

CREATE POLICY "Admins can moderate reports"
  ON reports FOR UPDATE
  USING (is_admin());

-- ------------------------------------------------------------------------------
-- 10. STORAGE BUCKET CONFIGURATION & POLICIES
-- ------------------------------------------------------------------------------

-- Insert storage buckets if not exists
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('avatars', 'avatars', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp']::text[]),
  ('property-images', 'property-images', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp']::text[]),
  ('verification-documents', 'verification-documents', false, 15728640, ARRAY['image/jpeg', 'image/png', 'application/pdf']::text[])
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Storage RLS: Avatars
CREATE POLICY "Avatar images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Storage RLS: Property Images
CREATE POLICY "Property photos are publicly viewable"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'property-images');

CREATE POLICY "Authenticated property posters can upload property photos"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'property-images' AND auth.role() = 'authenticated');

-- Storage RLS: Verification Documents (PRIVATE - NOT PUBLICLY ACCESSIBLE)
CREATE POLICY "Verification docs accessible only by owner or admin"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'verification-documents' AND
    (auth.uid()::text = (storage.foldername(name))[1] OR is_admin())
  );

CREATE POLICY "Users can upload verification docs"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'verification-documents' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );
