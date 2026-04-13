import { BasicFilterState } from "@/types/filters";
import { Restaurant } from "@/types/restaurant";

export function filterRestaurants(
  restaurants: Restaurant[],
  basicFilters: BasicFilterState
) {
  return restaurants.filter((restaurant) => {
    const matchType =
      !basicFilters.restaurantType ||
      restaurant.category === basicFilters.restaurantType;

    const matchLgbt =
      !basicFilters.lgbtFriendly || restaurant.lgbtFriendly === true;

    const minPrice = basicFilters.minPrice
      ? Number(basicFilters.minPrice)
      : null;

    const maxPrice = basicFilters.maxPrice
      ? Number(basicFilters.maxPrice)
      : null;

    const matchMinPrice =
      minPrice === null || restaurant.averagePrice >= minPrice;

    const matchMaxPrice =
      maxPrice === null || restaurant.averagePrice <= maxPrice;

    return matchType && matchLgbt && matchMinPrice && matchMaxPrice;
  });
}

export function getRestaurantById(
  restaurants: Restaurant[],
  id: string
): Restaurant | undefined {
  return restaurants.find((item) => item.id === id);
}

export function formatCurrency(value: number) {
  return value.toLocaleString("vi-VN") + "đ";
}