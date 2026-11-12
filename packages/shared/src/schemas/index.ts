import { z } from 'zod';

export const userRoleSchema = z.enum([
  'flatmate_seeker',
  'solo_renter',
  'property_owner',
  'property_agent',
  'admin',
]);

export const propertyCategorySchema = z.enum([
  'entire_apartment',
  'entire_flat',
  'private_room',
  'shared_room',
  'individual_bed',
  'pg_accommodation',
  'flatmate_vacancy',
]);

export const furnishingStatusSchema = z.enum([
  'fully_furnished',
  'semi_furnished',
  'unfurnished',
]);

export const sleepScheduleSchema = z.enum([
  'early_bird',
  'night_owl',
  'flexible',
  'standard',
]);

export const foodPreferenceSchema = z.enum([
  'vegetarian',
  'eggetarian',
  'non_vegetarian',
  'vegan',
  'jain',
]);

export const smokingPreferenceSchema = z.enum([
  'non_smoker',
  'occasional',
  'regular',
  'outside_only',
]);

export const drinkingPreferenceSchema = z.enum([
  'non_drinker',
  'social_drinker',
  'regular',
]);

export const partyHabitsSchema = z.enum([
  'rarely',
  'weekends_only',
  'frequent',
  'no_parties',
]);

export const workStyleSchema = z.enum([
  'work_from_home',
  'office',
  'hybrid',
  'student',
]);

export const genderSchema = z.enum([
  'male',
  'female',
  'non_binary',
  'prefer_not_to_say',
]);

export const genderPreferenceSchema = z.enum([
  'any',
  'male_only',
  'female_only',
]);

// -------------------------------------------------------------
// Authentication Schemas
// -------------------------------------------------------------

export const signupSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  full_name: z.string().min(2, 'Name must be at least 2 characters').max(80),
  active_role: userRoleSchema.default('flatmate_seeker'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
});

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password is required'),
});

export const resetPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

// -------------------------------------------------------------
// Profile & Preferences Schemas
// -------------------------------------------------------------

export const profileUpdateSchema = z.object({
  full_name: z.string().min(2, 'Name must be at least 2 characters').max(80),
  bio: z.string().max(500, 'Bio cannot exceed 500 characters').optional().nullable(),
  age: z.number().int().min(18, 'Must be at least 18 years old').max(99).optional().nullable(),
  gender: genderSchema.optional().nullable(),
  occupation: z.string().max(80).optional().nullable(),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  avatar_url: z.string().url().optional().nullable(),
});

export const flatmatePreferencesSchema = z
  .object({
    budget_min: z.number().min(1000, 'Minimum budget must be at least ₹1,000'),
    budget_max: z.number().max(500000, 'Maximum budget must be under ₹5,00,000'),
    target_city: z.string().min(2, 'City is required'),
    preferred_localities: z.array(z.string()).min(1, 'Select at least one preferred locality'),
    target_move_date: z.string().min(10, 'Move-in date is required'),
    sleep_schedule: sleepScheduleSchema,
    cleanliness_level: z.number().int().min(1).max(5),
    food_preference: foodPreferenceSchema,
    smoking_preference: smokingPreferenceSchema,
    drinking_preference: drinkingPreferenceSchema,
    party_habits: partyHabitsSchema,
    work_style: workStyleSchema,
    allows_pets: z.boolean().default(false),
    has_pets: z.boolean().default(false),
    gender_preference: genderPreferenceSchema.default('any'),
    max_flatmates: z.number().int().min(1).max(10).optional().nullable(),
    about_living_style: z.string().max(400).optional().nullable(),
  })
  .refine((data) => data.budget_max >= data.budget_min, {
    message: 'Maximum budget must be greater than or equal to minimum budget',
    path: ['budget_max'],
  });

// -------------------------------------------------------------
// Property Listing Schema
// -------------------------------------------------------------

export const propertyCreateSchema = z.object({
  title: z.string().min(10, 'Title must be at least 10 characters').max(120),
  description: z.string().min(30, 'Description should provide adequate detail (30+ chars)').max(3000),
  property_category: propertyCategorySchema,
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  locality: z.string().min(2, 'Locality is required'),
  pincode: z.string().regex(/^[1-9][0-9]{5}$/, 'Enter a valid 6-digit Indian PIN code'),
  address_line: z.string().min(5, 'Address is required for verification (not displayed publicly)'),
  rent_monthly: z.number().min(1000, 'Rent must be at least ₹1,000/month'),
  security_deposit: z.number().min(0, 'Deposit must be non-negative'),
  maintenance_charge: z.number().min(0).default(0),
  bedrooms: z.number().int().min(0, 'Enter number of bedrooms'),
  bathrooms: z.number().int().min(1, 'Must have at least 1 bathroom'),
  balconies: z.number().int().min(0).default(0),
  carpet_area_sqft: z.number().min(50, 'Carpet area must be realistic').optional().nullable(),
  furnishing: furnishingStatusSchema,
  available_from: z.string().min(10, 'Available from date is required'),
  preferred_tenants: z.array(z.string()).default(['Any']),
  amenities: z.array(z.string()).min(1, 'Select at least one amenity'),
  images: z.array(z.string().url()).min(1, 'Upload at least one property photo'),
});

// -------------------------------------------------------------
// Enquiry & Messaging Schemas
// -------------------------------------------------------------

export const enquiryCreateSchema = z.object({
  property_id: z.string().uuid(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000),
  proposed_move_date: z.string().optional().nullable(),
  occupant_count: z.number().int().min(1).max(10).default(1),
  has_pets: z.boolean().default(false),
});

export const messageSendSchema = z.object({
  conversation_id: z.string().uuid(),
  content: z.string().min(1, 'Message cannot be empty').max(2000),
});

export const reportCreateSchema = z.object({
  reported_user_id: z.string().uuid().optional().nullable(),
  reported_property_id: z.string().uuid().optional().nullable(),
  reason: z.enum([
    'fraud',
    'harassment',
    'fake_listing',
    'wrong_information',
    'offensive_content',
    'spam',
    'other',
  ]),
  description: z.string().min(15, 'Please provide detailed description (at least 15 chars)').max(1500),
});

export const agentAuthorizationRequestSchema = z.object({
  owner_id: z.string().uuid(),
  property_id: z.string().uuid().optional().nullable(),
  commission_percentage: z.number().min(0).max(50).optional().nullable(),
  notes: z.string().max(500).optional().nullable(),
});
