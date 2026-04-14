import { Restaurant } from "@/types/restaurant";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export async function getRestaurants(): Promise<Restaurant[]> {
  const res = await fetch(`${API_BASE_URL}/restaurants`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Không thể tải danh sách nhà hàng");
  }

  return res.json();
}

export async function getRestaurantByIdFromApi(
  id: string
): Promise<Restaurant | undefined> {
  const res = await fetch(`${API_BASE_URL}/restaurants/${id}`, {
    cache: "no-store",
  });

  if (res.status === 404) {
    return undefined;
  }

  if (!res.ok) {
    throw new Error("Không thể tải chi tiết nhà hàng");
  }

  return res.json();
}

export async function getReviewsByRestaurantId(
  id: string
): Promise<any[]> {
  const res = await fetch(`${API_BASE_URL}/restaurants/${id}/reviews`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Không thể tải danh sách review");
  }

  return res.json();
}