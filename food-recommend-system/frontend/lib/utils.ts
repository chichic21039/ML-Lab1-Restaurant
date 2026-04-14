import { BasicFilterState, AdvancedFilterState } from "@/types/filters";
import { Restaurant } from "@/types/restaurant";

type RestaurantWithScore = Restaurant & {
  matchScore: number;
  matchedCriteria: string[];
};

function getWeekdayKeyFromDate(date: Date): string {
  const day = date.getDay();
  const map = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  return map[day];
}

function normalizeLgbtValue(value: unknown): boolean {
  if (typeof value !== "string") return false;
  const v = value.trim().toLowerCase();
  return v === "có" || v === "yes" || v === "true" || v === "friendly";
}

function isOpenAtArrivalDateTime(
  openingParsed: Record<string, number[][]> | undefined,
  arrivalDateTime: string
): boolean {
  if (!openingParsed || !arrivalDateTime) return false;

  const arrival = new Date(arrivalDateTime);
  if (Number.isNaN(arrival.getTime())) return false;

  const weekdayKey = getWeekdayKeyFromDate(arrival);
  const ranges = openingParsed[weekdayKey];
  if (!ranges || ranges.length === 0) return false;

  const hour = arrival.getHours();
  const minute = arrival.getMinutes();

  for (const range of ranges) {
    const [startHour, startMinute, endHour, endMinute] = range;

    const afterStart =
      hour > startHour || (hour === startHour && minute >= startMinute);
    const beforeEnd =
      hour < endHour || (hour === endHour && minute <= endMinute);

    if (afterStart && beforeEnd) {
      return true;
    }
  }

  return false;
}

function getRestaurantMinPrice(restaurant: Restaurant): number | null {
  const raw = restaurant.price_min;
  if (raw === "" || raw == null) return null;
  const n = Number(raw);
  return Number.isNaN(n) ? null : n;
}

function getRestaurantMaxPrice(restaurant: Restaurant): number | null {
  const raw = restaurant.price_max;
  if (raw === "" || raw == null) return null;
  const n = Number(raw);
  return Number.isNaN(n) ? null : n;
}

function getRestaurantRatingValue(restaurant: Restaurant): number {
  if (typeof restaurant.rating === "number" && !Number.isNaN(restaurant.rating)) {
    return restaurant.rating;
  }

  if (typeof restaurant.avg_rating === "string") {
    const parsed = Number(String(restaurant.avg_rating).replace(",", "."));
    if (!Number.isNaN(parsed)) return parsed;
  }

  return 0;
}

function hardFilterRestaurant(
  restaurant: Restaurant,
  basicFilters: BasicFilterState
): boolean {
  const category = restaurant.category_clean || restaurant.category || "";

  if (
    basicFilters.restaurantType &&
    category !== basicFilters.restaurantType
  ) {
    return false;
  }

  if (basicFilters.arrivalDateTime) {
    const openAtArrival = isOpenAtArrivalDateTime(
      restaurant.opening_parsed,
      basicFilters.arrivalDateTime
    );
    if (!openAtArrival) {
      return false;
    }
  }

  if (basicFilters.lgbtFriendly) {
    const isFriendly = normalizeLgbtValue(restaurant.lgbtq_friendly);
    if (!isFriendly) {
      return false;
    }
  }

  const filterMin = basicFilters.minPrice ? Number(basicFilters.minPrice) : null;
  const filterMax = basicFilters.maxPrice ? Number(basicFilters.maxPrice) : null;

  const restaurantMin = getRestaurantMinPrice(restaurant);
  const restaurantMax = getRestaurantMaxPrice(restaurant);

  if (filterMin !== null && !Number.isNaN(filterMin)) {
    if (restaurantMax === null || restaurantMax < filterMin) {
      return false;
    }
  }

  if (filterMax !== null && !Number.isNaN(filterMax)) {
    if (restaurantMin === null || restaurantMin > filterMax) {
      return false;
    }
  }

  return true;
}

function restaurantMatchesAdvancedOption(
  restaurant: Restaurant,
  groupKey: string,
  option: string
): boolean {
  const about = restaurant.about_clean;
  if (!about) return false;

  const values = about[groupKey];
  if (!values || values.length === 0) return false;

  return values.includes(option);
}

export function rankRestaurantsByMatching(
  restaurants: Restaurant[],
  basicFilters: BasicFilterState,
  advancedFilters: AdvancedFilterState
): RestaurantWithScore[] {
  const hardFiltered = restaurants.filter((restaurant) =>
    hardFilterRestaurant(restaurant, basicFilters)
  );

  const ranked = hardFiltered.map((restaurant) => {
    let score = 0;
    const matchedCriteria: string[] = [];

    for (const [groupKey, selectedOptions] of Object.entries(advancedFilters)) {
      if (!selectedOptions || selectedOptions.length === 0) continue;

      for (const option of selectedOptions) {
        if (restaurantMatchesAdvancedOption(restaurant, groupKey, option)) {
          score += 1;
          matchedCriteria.push(option);
        }
      }
    }

    return {
      ...restaurant,
      matchScore: score,
      matchedCriteria,
    };
  });

  return ranked.sort((a, b) => {
    if (b.matchScore !== a.matchScore) {
      return b.matchScore - a.matchScore;
    }

    return getRestaurantRatingValue(b) - getRestaurantRatingValue(a);
  });
}

export function filterRestaurants(
  restaurants: Restaurant[],
  basicFilters: BasicFilterState
) {
  return rankRestaurantsByMatching(restaurants, basicFilters, {});
}