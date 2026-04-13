export interface BasicFilterState {
  restaurantType: string;
  minPrice: string;
  maxPrice: string;
  time: string;
  lgbtFriendly: boolean;
}

export type AdvancedFilterState = Record<string, string[]>;