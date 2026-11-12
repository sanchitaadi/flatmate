import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateFlatmateCompatibility } from './index';
import { FlatmatePreferences } from '../types';

test('Matching Engine: Identical preferences calculate high compatibility', () => {
  const userA: FlatmatePreferences = {
    id: '1',
    user_id: 'u1',
    budget_min: 20000,
    budget_max: 30000,
    target_city: 'Bangalore',
    preferred_localities: ['Koramangala', 'HSR Layout'],
    target_move_date: '2026-12-01',
    sleep_schedule: 'night_owl',
    cleanliness_level: 4,
    food_preference: 'vegetarian',
    smoking_preference: 'non_smoker',
    drinking_preference: 'social_drinker',
    party_habits: 'weekends_only',
    work_style: 'hybrid',
    allows_pets: true,
    has_pets: false,
    gender_preference: 'any',
    created_at: '',
    updated_at: '',
  };

  const userB: FlatmatePreferences = {
    ...userA,
    id: '2',
    user_id: 'u2',
  };

  const result = calculateFlatmateCompatibility(userA, userB);
  assert.ok(result.overallScore >= 95, `Expected score >= 95 for identical prefs, got ${result.overallScore}`);
  assert.equal(result.tier, 'exceptional');
  assert.ok(result.highlights.length > 0);
  assert.equal(result.potentialConflicts.length, 0);
});

test('Matching Engine: Incompatible city returns zero location score', () => {
  const userBangalore: FlatmatePreferences = {
    id: '1',
    user_id: 'u1',
    budget_min: 20000,
    budget_max: 30000,
    target_city: 'Bangalore',
    preferred_localities: ['Koramangala'],
    target_move_date: '2026-12-01',
    sleep_schedule: 'standard',
    cleanliness_level: 4,
    food_preference: 'vegetarian',
    smoking_preference: 'non_smoker',
    drinking_preference: 'non_drinker',
    party_habits: 'rarely',
    work_style: 'office',
    allows_pets: false,
    has_pets: false,
    gender_preference: 'any',
    created_at: '',
    updated_at: '',
  };

  const userMumbai: FlatmatePreferences = {
    ...userBangalore,
    id: '2',
    user_id: 'u2',
    target_city: 'Mumbai',
    preferred_localities: ['Bandra West'],
  };

  const result = calculateFlatmateCompatibility(userBangalore, userMumbai);
  assert.equal(result.breakdown.location.score, 0);
  assert.ok(result.potentialConflicts.some((c) => c.includes('Targeting different cities')));
});

test('Matching Engine: Pet conflict detected when owner has pet and other disallows', () => {
  const petOwner: FlatmatePreferences = {
    id: '1',
    user_id: 'u1',
    budget_min: 20000,
    budget_max: 30000,
    target_city: 'Bangalore',
    preferred_localities: ['Koramangala'],
    target_move_date: '2026-12-01',
    sleep_schedule: 'standard',
    cleanliness_level: 4,
    food_preference: 'non_vegetarian',
    smoking_preference: 'non_smoker',
    drinking_preference: 'social_drinker',
    party_habits: 'rarely',
    work_style: 'hybrid',
    allows_pets: true,
    has_pets: true, // has dog/cat
    gender_preference: 'any',
    created_at: '',
    updated_at: '',
  };

  const petDisallower: FlatmatePreferences = {
    ...petOwner,
    id: '2',
    user_id: 'u2',
    allows_pets: false, // strict no pets
    has_pets: false,
  };

  const result = calculateFlatmateCompatibility(petOwner, petDisallower);
  assert.equal(result.breakdown.lifestyle.petMatch, false);
  assert.ok(result.potentialConflicts.some((c) => c.toLowerCase().includes('pet')));
});
