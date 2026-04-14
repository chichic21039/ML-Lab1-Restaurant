export interface BasicFilterState {
  restaurantType: string;
  minPrice: string;
  maxPrice: string;
  arrivalDateTime: string;
  lgbtFriendly: boolean;
}

export type AdvancedFilterState = Record<string, string[]>;