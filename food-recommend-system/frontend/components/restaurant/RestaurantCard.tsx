import { formatCurrency } from "@/lib/utils";
import { Restaurant } from "@/types/restaurant";
import Link from "next/link";

type Props = {
  restaurant: Restaurant;
};

export default function RestaurantCard({ restaurant }: Props) {
  return (
    <Link
      href={`/restaurant/${restaurant.id}`}
      className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div
        className="h-52 w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${restaurant.image})` }}
      />

      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-bold text-gray-800">{restaurant.name}</h3>
          <div className="rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-800">
            ⭐ {restaurant.rating}
          </div>
        </div>

        <p className="text-sm text-gray-500">{restaurant.address}</p>

        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700">
            {restaurant.priceLevel}
          </span>
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700">
            {restaurant.category}
          </span>
          <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
            {restaurant.openingStatus}
          </span>
        </div>

        <p className="text-sm font-medium text-gray-700">
          Giá trung bình: {formatCurrency(restaurant.averagePrice)}
        </p>

        <div className="flex flex-wrap gap-2">
          {restaurant.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-orange-50 px-3 py-1 text-xs text-orange-700"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}