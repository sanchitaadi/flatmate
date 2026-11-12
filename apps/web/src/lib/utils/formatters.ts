export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumberINR(amount: number): string {
  return new Intl.NumberFormat('en-IN').format(amount);
}

export function formatCategory(cat: string): string {
  const map: Record<string, string> = {
    entire_apartment: 'Entire Apartment',
    entire_flat: 'Entire Flat',
    private_room: 'Private Room',
    shared_room: 'Shared Room',
    individual_bed: 'Individual Bed / PG',
    pg_accommodation: 'PG Accommodation',
    flatmate_vacancy: 'Flatmate Vacancy',
  };
  return map[cat] || cat.replace(/_/g, ' ');
}

export function formatFurnishing(f: string): string {
  const map: Record<string, string> = {
    fully_furnished: 'Fully Furnished',
    semi_furnished: 'Semi Furnished',
    unfurnished: 'Unfurnished',
  };
  return map[f] || f.replace(/_/g, ' ');
}

export function formatDiet(diet: string): string {
  const map: Record<string, string> = {
    vegetarian: 'Vegetarian',
    eggetarian: 'Eggetarian',
    non_vegetarian: 'Non-Vegetarian',
    vegan: 'Vegan',
    jain: 'Jain Food Only',
  };
  return map[diet] || diet;
}

export function formatSleepSchedule(s: string): string {
  const map: Record<string, string> = {
    early_bird: 'Early Bird (Up before 7 AM)',
    night_owl: 'Night Owl (Active late night)',
    flexible: 'Flexible Schedule',
    standard: 'Standard (8 AM - 11 PM)',
  };
  return map[s] || s;
}

export function getCompatibilityBadgeClass(score: number): {
  bg: string;
  text: string;
  border: string;
  label: string;
} {
  if (score >= 85) {
    return {
      bg: 'bg-emerald-50 text-emerald-700',
      text: 'text-emerald-700',
      border: 'border-emerald-200',
      label: 'Exceptional Match',
    };
  }
  if (score >= 70) {
    return {
      bg: 'bg-indigo-50 text-indigo-700',
      text: 'text-indigo-700',
      border: 'border-indigo-200',
      label: 'High Match',
    };
  }
  if (score >= 55) {
    return {
      bg: 'bg-amber-50 text-amber-700',
      text: 'text-amber-700',
      border: 'border-amber-200',
      label: 'Moderate Match',
    };
  }
  return {
    bg: 'bg-slate-100 text-slate-700',
    text: 'text-slate-700',
    border: 'border-slate-200',
    label: 'Basic Match',
  };
}
