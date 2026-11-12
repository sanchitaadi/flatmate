import {
  FlatmatePreferences,
  CompatibilityResult,
  CompatibilityBreakdown,
} from '../types';

/**
 * Deterministic Indian Flatmate Compatibility Matching Engine
 * Weight distribution:
 * - Budget compatibility: 20%
 * - Location compatibility: 20%
 * - Cleanliness: 15%
 * - Sleep schedule: 15%
 * - Lifestyle (smoking, drinking, parties, pets): 15%
 * - Food preferences: 5%
 * - Move-in date proximity: 10%
 * Total: 100%
 */

export function calculateFlatmateCompatibility(
  userA: FlatmatePreferences,
  userB: FlatmatePreferences
): CompatibilityResult {
  const highlights: string[] = [];
  const potentialConflicts: string[] = [];

  // 1. Budget Compatibility (Weight: 20%)
  const budgetMinOverlap = Math.max(userA.budget_min, userB.budget_min);
  const budgetMaxOverlap = Math.min(userA.budget_max, userB.budget_max);
  const hasBudgetOverlap = budgetMaxOverlap >= budgetMinOverlap;

  let budgetScore = 0;
  let budgetDetails = '';

  if (hasBudgetOverlap) {
    const overlapSpan = budgetMaxOverlap - budgetMinOverlap;
    const totalUnionSpan = Math.max(userA.budget_max, userB.budget_max) - Math.min(userA.budget_min, userB.budget_min);
    const overlapRatio = totalUnionSpan > 0 ? overlapSpan / totalUnionSpan : 1;
    budgetScore = Math.round(12 + overlapRatio * 8);
    budgetDetails = `Budgets overlap comfortably between ₹${budgetMinOverlap.toLocaleString('en-IN')} and ₹${budgetMaxOverlap.toLocaleString('en-IN')}`;
    highlights.push(`Budget match: ₹${budgetMinOverlap.toLocaleString('en-IN')} - ₹${budgetMaxOverlap.toLocaleString('en-IN')}`);
  } else {
    const gap = budgetMinOverlap - budgetMaxOverlap;
    if (gap <= 3000) {
      budgetScore = 8;
      budgetDetails = `Budgets are close with a slight ₹${gap.toLocaleString('en-IN')} difference`;
    } else if (gap <= 7000) {
      budgetScore = 4;
      budgetDetails = `Budgets differ by ₹${gap.toLocaleString('en-IN')}`;
      potentialConflicts.push(`Budget gap of ₹${gap.toLocaleString('en-IN')} between expectations`);
    } else {
      budgetScore = 0;
      budgetDetails = `Significant budget discrepancy of ₹${gap.toLocaleString('en-IN')}`;
      potentialConflicts.push('Disparate budget expectations');
    }
  }

  // 2. Location Compatibility (Weight: 20%)
  const cityMatch = userA.target_city.trim().toLowerCase() === userB.target_city.trim().toLowerCase();
  let locationScore = 0;
  let sharedLocalities: string[] = [];
  let locationDetails = '';

  if (!cityMatch) {
    locationScore = 0;
    locationDetails = `Different target cities (${userA.target_city} vs ${userB.target_city})`;
    potentialConflicts.push(`Targeting different cities (${userA.target_city} vs ${userB.target_city})`);
  } else {
    // Both in same city
    const normA = userA.preferred_localities.map((l) => l.trim().toLowerCase());
    const normB = userB.preferred_localities.map((l) => l.trim().toLowerCase());
    sharedLocalities = userA.preferred_localities.filter((loc) =>
      normB.includes(loc.trim().toLowerCase())
    );

    if (sharedLocalities.length >= 2) {
      locationScore = 20;
      locationDetails = `Multiple matching localities: ${sharedLocalities.slice(0, 3).join(', ')}`;
      highlights.push(`Shared top localities: ${sharedLocalities.join(', ')}`);
    } else if (sharedLocalities.length === 1) {
      locationScore = 17;
      locationDetails = `Shared locality: ${sharedLocalities[0]}`;
      highlights.push(`Both looking around ${sharedLocalities[0]}`);
    } else if (normA.length === 0 || normB.length === 0) {
      locationScore = 15;
      locationDetails = `Same city (${userA.target_city}) with flexible localities`;
      highlights.push(`Both looking across ${userA.target_city}`);
    } else {
      locationScore = 12;
      locationDetails = `Same city (${userA.target_city}), but distinct locality preferences`;
    }
  }

  // 3. Cleanliness Compatibility (Weight: 15%)
  const cleanDiff = Math.abs(userA.cleanliness_level - userB.cleanliness_level);
  let cleanlinessScore = 0;
  let cleanlinessDetails = '';

  if (cleanDiff === 0) {
    cleanlinessScore = 15;
    cleanlinessDetails = `Identical cleanliness standard (${userA.cleanliness_level}/5)`;
    highlights.push('Aligned cleanliness standards');
  } else if (cleanDiff === 1) {
    cleanlinessScore = 12;
    cleanlinessDetails = `Very close cleanliness levels (${userA.cleanliness_level}/5 vs ${userB.cleanliness_level}/5)`;
  } else if (cleanDiff === 2) {
    cleanlinessScore = 7;
    cleanlinessDetails = `Moderate difference in housekeeping expectations (${userA.cleanliness_level}/5 vs ${userB.cleanliness_level}/5)`;
  } else {
    cleanlinessScore = 2;
    cleanlinessDetails = `Significant difference in cleanliness habits`;
    potentialConflicts.push('Noticeable difference in cleanliness expectations');
  }

  // 4. Sleep Schedule Compatibility (Weight: 15%)
  let sleepScore = 0;
  let sleepDetails = '';
  const sleepA = userA.sleep_schedule;
  const sleepB = userB.sleep_schedule;

  if (sleepA === sleepB) {
    sleepScore = 15;
    const label = sleepA === 'night_owl' ? 'Night Owls' : sleepA === 'early_bird' ? 'Early Birds' : 'Flexible sleepers';
    sleepDetails = `Both are ${label}`;
    highlights.push(`Matching sleep rhythm: ${label}`);
  } else if (sleepA === 'flexible' || sleepB === 'flexible') {
    sleepScore = 13;
    sleepDetails = 'One has a flexible sleep schedule';
  } else if (
    (sleepA === 'standard' && (sleepB === 'early_bird' || sleepB === 'night_owl')) ||
    (sleepB === 'standard' && (sleepA === 'early_bird' || sleepA === 'night_owl'))
  ) {
    sleepScore = 9;
    sleepDetails = 'Compatible daily schedules with minor shift';
  } else {
    // early_bird vs night_owl
    sleepScore = 4;
    sleepDetails = 'Early bird vs Night owl (opposite waking hours)';
    potentialConflicts.push('Opposite sleep schedules (Early riser vs Night owl)');
  }

  // 5. Lifestyle Compatibility (Weight: 15%)
  // Sub-weights: Smoking 4 pts, Drinking 3 pts, Party 4 pts, Pets 4 pts
  let lifestyleScore = 0;
  const lifestyleDetailsList: string[] = [];

  // 5a. Smoking (4 pts)
  let smokingMatch = false;
  if (userA.smoking_preference === userB.smoking_preference) {
    lifestyleScore += 4;
    smokingMatch = true;
    if (userA.smoking_preference === 'non_smoker') {
      highlights.push('Both non-smokers');
    }
  } else if (
    (userA.smoking_preference === 'non_smoker' && userB.smoking_preference === 'outside_only') ||
    (userB.smoking_preference === 'non_smoker' && userA.smoking_preference === 'outside_only')
  ) {
    lifestyleScore += 2.5;
  } else if (
    userA.smoking_preference === 'non_smoker' ||
    userB.smoking_preference === 'non_smoker'
  ) {
    lifestyleScore += 0.5;
    potentialConflicts.push('Smoker vs strictly non-smoking preference');
  } else {
    lifestyleScore += 3;
    smokingMatch = true;
  }

  // 5b. Drinking (3 pts)
  let drinkingMatch = false;
  if (userA.drinking_preference === userB.drinking_preference) {
    lifestyleScore += 3;
    drinkingMatch = true;
  } else if (
    (userA.drinking_preference === 'social_drinker' && userB.drinking_preference === 'non_drinker') ||
    (userB.drinking_preference === 'social_drinker' && userA.drinking_preference === 'non_drinker')
  ) {
    lifestyleScore += 2;
  } else {
    lifestyleScore += 1;
  }

  // 5c. Party habits (4 pts)
  let partyMatch = false;
  if (userA.party_habits === userB.party_habits) {
    lifestyleScore += 4;
    partyMatch = true;
    if (userA.party_habits === 'no_parties' || userA.party_habits === 'rarely') {
      highlights.push('Both prefer calm, quiet home environments');
    }
  } else if (
    (userA.party_habits === 'no_parties' && userB.party_habits === 'frequent') ||
    (userB.party_habits === 'no_parties' && userA.party_habits === 'frequent')
  ) {
    lifestyleScore += 0;
    potentialConflicts.push('Opposite home hosting and party preferences');
  } else {
    lifestyleScore += 2.5;
  }

  // 5d. Pets compatibility (4 pts)
  let petMatch = false;
  const userAHasPets = userA.has_pets;
  const userBHasPets = userB.has_pets;
  const userAAllowsPets = userA.allows_pets;
  const userBAllowsPets = userB.allows_pets;

  if (userAHasPets && !userBAllowsPets) {
    lifestyleScore += 0;
    potentialConflicts.push('Pet incompatibility (owns pet but flatmate prefers pet-free)');
  } else if (userBHasPets && !userAAllowsPets) {
    lifestyleScore += 0;
    potentialConflicts.push('Pet incompatibility (owns pet but flatmate prefers pet-free)');
  } else {
    lifestyleScore += 4;
    petMatch = true;
    if (userAAllowsPets && userBAllowsPets && (userAHasPets || userBHasPets)) {
      highlights.push('Pet-friendly mindset');
    }
  }

  const roundedLifestyleScore = Math.min(15, Math.round(lifestyleScore));
  const lifestyleDetails = `Smoking, drinking, party, and pet compatibility assessed`;

  // 6. Food Preference Compatibility (Weight: 5%)
  let foodScore = 0;
  let foodCompatible = false;
  let foodDetails = '';

  const foodA = userA.food_preference;
  const foodB = userB.food_preference;

  if (foodA === foodB) {
    foodScore = 5;
    foodCompatible = true;
    foodDetails = `Both are ${foodA}`;
    if (foodA === 'vegetarian' || foodA === 'jain' || foodA === 'vegan') {
      highlights.push(`Shared ${foodA} dietary preference`);
    }
  } else if (
    (foodA === 'vegetarian' && foodB === 'jain') ||
    (foodB === 'vegetarian' && foodA === 'jain') ||
    (foodA === 'vegetarian' && foodB === 'vegan') ||
    (foodB === 'vegetarian' && foodA === 'vegan')
  ) {
    foodScore = 4.5;
    foodCompatible = true;
    foodDetails = `Compatible plant-based dietary preferences (${foodA} & ${foodB})`;
  } else if (
    (foodA === 'non_vegetarian' && foodB === 'eggetarian') ||
    (foodB === 'non_vegetarian' && foodA === 'eggetarian')
  ) {
    foodScore = 4;
    foodCompatible = true;
    foodDetails = 'Compatible dietary preferences';
  } else if (
    (foodA === 'jain' && foodB === 'non_vegetarian') ||
    (foodB === 'jain' && foodA === 'non_vegetarian')
  ) {
    foodScore = 1;
    foodCompatible = false;
    foodDetails = 'Different dietary preferences (Jain vs Non-Vegetarian)';
    potentialConflicts.push('Strict dietary difference (Jain vs Non-Vegetarian)');
  } else {
    foodScore = 2.5;
    foodCompatible = true;
    foodDetails = `Different dietary preferences (${foodA} vs ${foodB})`;
  }

  // 7. Move-in Date Proximity (Weight: 10%)
  const dateA = new Date(userA.target_move_date).getTime();
  const dateB = new Date(userB.target_move_date).getTime();
  const diffDays = Math.round(Math.abs(dateA - dateB) / (1000 * 60 * 60 * 24));

  let moveInScore = 0;
  let moveInDetails = '';

  if (diffDays <= 7) {
    moveInScore = 10;
    moveInDetails = `Move-in dates match almost exactly (within ${diffDays} days)`;
    highlights.push('Immediate move-in timeline alignment');
  } else if (diffDays <= 15) {
    moveInScore = 8;
    moveInDetails = `Move-in dates within 2 weeks (${diffDays} days difference)`;
    highlights.push('Target move-in dates within two weeks');
  } else if (diffDays <= 30) {
    moveInScore = 6;
    moveInDetails = `Move-in dates within a month (${diffDays} days difference)`;
  } else if (diffDays <= 60) {
    moveInScore = 3;
    moveInDetails = `Move-in dates are ${diffDays} days apart`;
  } else {
    moveInScore = 0;
    moveInDetails = `Target dates are more than 2 months apart`;
    potentialConflicts.push('Different target move-in timelines');
  }

  // Overall Score Calculation (Clamped 0 - 100)
  const totalScore = Math.min(
    100,
    Math.max(
      0,
      Math.round(
        budgetScore +
        locationScore +
        cleanlinessScore +
        sleepScore +
        roundedLifestyleScore +
        foodScore +
        moveInScore
      )
    )
  );

  let tier: 'exceptional' | 'high' | 'moderate' | 'fair' | 'low' = 'low';
  if (totalScore >= 85) tier = 'exceptional';
  else if (totalScore >= 70) tier = 'high';
  else if (totalScore >= 55) tier = 'moderate';
  else if (totalScore >= 40) tier = 'fair';
  else tier = 'low';

  const breakdown: CompatibilityBreakdown = {
    budget: {
      score: budgetScore,
      overlap: hasBudgetOverlap,
      details: budgetDetails,
    },
    location: {
      score: locationScore,
      cityMatch,
      sharedLocalities,
      details: locationDetails,
    },
    cleanliness: {
      score: cleanlinessScore,
      userCleanliness: userA.cleanliness_level,
      targetCleanliness: userB.cleanliness_level,
      difference: cleanDiff,
      details: cleanlinessDetails,
    },
    sleepSchedule: {
      score: sleepScore,
      compatible: sleepScore >= 9,
      details: sleepDetails,
    },
    lifestyle: {
      score: roundedLifestyleScore,
      smokingMatch,
      drinkingMatch,
      partyMatch,
      petMatch,
      details: lifestyleDetails,
    },
    food: {
      score: Math.round(foodScore * 10) / 10,
      compatible: foodCompatible,
      details: foodDetails,
    },
    moveInDate: {
      score: moveInScore,
      daysDifference: diffDays,
      details: moveInDetails,
    },
  };

  return {
    overallScore: totalScore,
    tier,
    breakdown,
    highlights,
    potentialConflicts,
  };
}

/**
 * Filter candidate profiles to eliminate:
 * - Current user
 * - Suspended accounts
 * - Profiles already passed or swiped
 * - Existing mutual matches
 */
export function filterCandidateProfiles<T extends { id: string; is_suspended?: boolean }>(
  candidates: T[],
  currentUserId: string,
  swipedTargetIds: Set<string>,
  existingMatchedIds: Set<string>
): T[] {
  return candidates.filter((candidate) => {
    if (candidate.id === currentUserId) return false;
    if (candidate.is_suspended) return false;
    if (swipedTargetIds.has(candidate.id)) return false;
    if (existingMatchedIds.has(candidate.id)) return false;
    return true;
  });
}
