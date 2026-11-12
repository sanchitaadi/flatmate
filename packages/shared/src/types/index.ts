/**
 * Core Domain Models and Shared Types for NestMate Platform
 * Production-ready definitions matching PostgreSQL Supabase schema
 */

export type UserRole = 
  | 'flatmate_seeker'
  | 'solo_renter'
  | 'property_owner'
  | 'property_agent'
  | 'admin';

export type PropertyCategory = 
  | 'entire_apartment'
  | 'entire_flat'
  | 'private_room'
  | 'shared_room'
  | 'individual_bed'
  | 'pg_accommodation'
  | 'flatmate_vacancy';

export type FurnishingStatus = 
  | 'fully_furnished'
  | 'semi_furnished'
  | 'unfurnished';

export type PropertyStatus = 
  | 'active'
  | 'under_review'
  | 'occupied'
  | 'inactive'
  | 'rejected';

export type SleepSchedule = 
  | 'early_bird'
  | 'night_owl'
  | 'flexible'
  | 'standard';

export type FoodPreference = 
  | 'vegetarian'
  | 'eggetarian'
  | 'non_vegetarian'
  | 'vegan'
  | 'jain';

export type SmokingPreference = 
  | 'non_smoker'
  | 'occasional'
  | 'regular'
  | 'outside_only';

export type DrinkingPreference = 
  | 'non_drinker'
  | 'social_drinker'
  | 'regular';

export type PartyHabits = 
  | 'rarely'
  | 'weekends_only'
  | 'frequent'
  | 'no_parties';

export type WorkStyle = 
  | 'work_from_home'
  | 'office'
  | 'hybrid'
  | 'student';

export type Gender = 
  | 'male'
  | 'female'
  | 'non_binary'
  | 'prefer_not_to_say';

export type GenderPreference = 
  | 'any'
  | 'male_only'
  | 'female_only';

export type VerificationStatus = 
  | 'pending'
  | 'verified'
  | 'rejected';

export type DocumentType = 
  | 'aadhaar'
  | 'pan'
  | 'ownership_deed'
  | 'utility_bill'
  | 'rera_license'
  | 'agent_id';

export type EnquiryStatus = 
  | 'pending'
  | 'reviewed'
  | 'accepted'
  | 'declined'
  | 'closed';

export type ReportReason = 
  | 'fraud'
  | 'harassment'
  | 'fake_listing'
  | 'wrong_information'
  | 'offensive_content'
  | 'spam'
  | 'other';

export type ReportStatus = 
  | 'pending'
  | 'investigating'
  | 'resolved'
  | 'dismissed';

export type ContactShareStatus = 
  | 'requested'
  | 'approved'
  | 'rejected'
  | 'revoked';

export type SwipeDirection = 'left' | 'right' | 'superlike';

// -------------------------------------------------------------
// Database Entity Interfaces
// -------------------------------------------------------------

export interface Profile {
  id: string; // references auth.users(id)
  email: string;
  full_name: string;
  avatar_url?: string | null;
  bio?: string | null;
  age?: number | null;
  gender?: Gender | null;
  occupation?: string | null;
  city: string;
  state: string;
  is_verified: boolean;
  is_suspended: boolean;
  active_role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface PrivateContact {
  id: string;
  user_id: string;
  phone_number: string;
  emergency_contact?: string | null;
  id_document_number_masked?: string | null;
  created_at: string;
  updated_at: string;
}

export interface FlatmatePreferences {
  id: string;
  user_id: string;
  budget_min: number;
  budget_max: number;
  target_city: string;
  preferred_localities: string[];
  target_move_date: string;
  sleep_schedule: SleepSchedule;
  cleanliness_level: number; // 1 (relaxed) to 5 (meticulous)
  food_preference: FoodPreference;
  smoking_preference: SmokingPreference;
  drinking_preference: DrinkingPreference;
  party_habits: PartyHabits;
  work_style: WorkStyle;
  allows_pets: boolean;
  has_pets: boolean;
  gender_preference: GenderPreference;
  max_flatmates?: number | null;
  about_living_style?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Property {
  id: string;
  owner_id: string;
  created_by_user_id: string;
  authorized_agent_id?: string | null;
  title: string;
  description: string;
  property_category: PropertyCategory;
  city: string;
  state: string;
  locality: string;
  pincode: string;
  // Exact address is strictly guarded; not sent to public listings
  address_line?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  rent_monthly: number;
  security_deposit: number;
  maintenance_charge: number;
  bedrooms: number;
  bathrooms: number;
  balconies?: number;
  carpet_area_sqft?: number;
  furnishing: FurnishingStatus;
  status: PropertyStatus;
  is_verified: boolean;
  available_from: string;
  preferred_tenants?: string[]; // e.g. ["Bachelors", "Families", "Students", "Any"]
  images: PropertyImage[];
  amenities: string[];
  created_at: string;
  updated_at: string;
}

export interface PropertyImage {
  id: string;
  property_id: string;
  image_url: string;
  display_order: number;
  caption?: string | null;
  is_primary: boolean;
  created_at: string;
}

export interface SavedProperty {
  id: string;
  user_id: string;
  property_id: string;
  notes?: string | null;
  created_at: string;
  property?: Property;
}

export interface Enquiry {
  id: string;
  property_id: string;
  renter_id: string;
  owner_id: string;
  agent_id?: string | null;
  message: string;
  status: EnquiryStatus;
  proposed_move_date?: string | null;
  occupant_count?: number;
  has_pets?: boolean;
  created_at: string;
  updated_at: string;
  renter?: Profile;
  property?: Property;
}

export interface OwnerAgentAuthorization {
  id: string;
  owner_id: string;
  agent_id: string;
  property_id?: string | null; // null means blanket agency authorization
  is_authorized: boolean;
  commission_percentage?: number | null;
  notes?: string | null;
  requested_by: 'owner' | 'agent';
  approved_at?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Swipe {
  id: string;
  swiper_id: string;
  target_user_id: string;
  direction: SwipeDirection;
  created_at: string;
}

export interface Match {
  id: string;
  user_1_id: string;
  user_2_id: string;
  compatibility_score: number;
  created_at: string;
  last_activity_at: string;
  matched_user?: Profile & { preferences?: FlatmatePreferences };
}

export interface Conversation {
  id: string;
  type: 'direct_match' | 'property_enquiry';
  property_id?: string | null;
  last_message_at: string;
  created_at: string;
  members?: ConversationMember[];
  last_message?: Message;
  other_participant?: Profile;
  property?: Property;
}

export interface ConversationMember {
  id: string;
  conversation_id: string;
  user_id: string;
  joined_at: string;
  last_read_at?: string | null;
  profile?: Profile;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  is_system: boolean;
  created_at: string;
  read_by_others?: boolean;
  sender?: Profile;
}

export interface ContactShare {
  id: string;
  requester_id: string;
  recipient_id: string;
  status: ContactShareStatus;
  conversation_id?: string | null;
  shared_phone_number?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Verification {
  id: string;
  user_id: string;
  document_type: DocumentType;
  document_storage_path: string;
  status: VerificationStatus;
  reviewer_id?: string | null;
  rejection_reason?: string | null;
  submitted_at: string;
  reviewed_at?: string | null;
  profile?: Profile;
}

export interface Report {
  id: string;
  reporter_id: string;
  reported_user_id?: string | null;
  reported_property_id?: string | null;
  reason: ReportReason;
  description: string;
  status: ReportStatus;
  resolution_notes?: string | null;
  created_at: string;
  updated_at: string;
  reporter?: Profile;
  reported_user?: Profile;
  reported_property?: Property;
}

// -------------------------------------------------------------
// Compatibility & Matching Engine Results
// -------------------------------------------------------------

export interface CompatibilityBreakdown {
  budget: {
    score: number; // 0 - 20
    overlap: boolean;
    details: string;
  };
  location: {
    score: number; // 0 - 20
    cityMatch: boolean;
    sharedLocalities: string[];
    details: string;
  };
  cleanliness: {
    score: number; // 0 - 15
    userCleanliness: number;
    targetCleanliness: number;
    difference: number;
    details: string;
  };
  sleepSchedule: {
    score: number; // 0 - 15
    compatible: boolean;
    details: string;
  };
  lifestyle: {
    score: number; // 0 - 15
    smokingMatch: boolean;
    drinkingMatch: boolean;
    partyMatch: boolean;
    petMatch: boolean;
    details: string;
  };
  food: {
    score: number; // 0 - 5
    compatible: boolean;
    details: string;
  };
  moveInDate: {
    score: number; // 0 - 10
    daysDifference: number;
    details: string;
  };
}

export interface CompatibilityResult {
  overallScore: number; // 0 - 100
  tier: 'exceptional' | 'high' | 'moderate' | 'fair' | 'low';
  breakdown: CompatibilityBreakdown;
  highlights: string[];
  potentialConflicts: string[];
}
