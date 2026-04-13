import { MOCK_RESTAURANTS } from "@/lib/mock-data";
import { Restaurant } from "@/types/restaurant";

export async function getRestaurants(): Promise<Restaurant[]> {
  return MOCK_RESTAURANTS;
}

export async function getRestaurantByIdFromApi(
  id: string
): Promise<Restaurant | undefined> {
  return MOCK_RESTAURANTS.find((item) => item.id === id);
}