"use client";

import { Restaurant } from "@/types/restaurant";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type Props = {
  restaurant: Restaurant & {
    matchScore?: number;
    matchedCriteria?: string[];
  };
};

function formatPriceLevel(priceLevel: unknown) {
  const value = String(priceLevel ?? "").trim();

  if (!value) return null;

  if (value === "1") return "Giá rẻ";
  if (value === "2") return "Giá trung bình";
  if (value === "3") return "Giá khá cao";
  if (value === "4") return "Giá cao";

  return value;
}

export default function RestaurantCard({ restaurant }: Props) {
  const searchParams = useSearchParams();
  const currentQuery = searchParams.toString();

  const title = restaurant.restaurant_name || restaurant.name || "Chưa có tên";
  const category =
    restaurant.category_clean || restaurant.category || "Chưa có danh mục";
  const rating =
    typeof restaurant.rating === "number"
      ? restaurant.rating
      : restaurant.avg_rating || "Chưa có";

  const detailHref = currentQuery
    ? `/restaurant/${restaurant.restaurant_id}?${currentQuery}`
    : `/restaurant/${restaurant.restaurant_id}`;

  return (
    <Link
      href={detailHref}
      className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-bold text-gray-800">{title}</h3>
          <div className="rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-800">
            ⭐ {rating}
          </div>
        </div>

        <p className="text-sm text-gray-500">
          {restaurant.address || "Chưa có địa chỉ"}
        </p>

        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700">
            {category}
          </span>

          {formatPriceLevel(restaurant.price_level) ? (
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700">
              {formatPriceLevel(restaurant.price_level)}
            </span>
          ) : null}

          {typeof restaurant.matchScore === "number" && restaurant.matchScore > 0 ? (
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-700">
              Khớp {restaurant.matchScore} tiêu chí thêm
            </span>
          ) : null}
        </div>

        {restaurant.matchedCriteria && restaurant.matchedCriteria.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {restaurant.matchedCriteria.slice(0, 4).map((item) => (
              <span
                key={item}
                className="rounded-full bg-orange-50 px-3 py-1 text-xs text-orange-700"
              >
                {item}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </Link>
  );
}