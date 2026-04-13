import RestaurantCard from "@/components/restaurant/RestaurantCard";
import SectionTitle from "@/components/ui/SectionTitle";
import { getRestaurants } from "@/lib/api";
import { filterRestaurants, formatCurrency } from "@/lib/utils";
import { BasicFilterState } from "@/types/filters";
import Link from "next/link";

type Props = {
  searchParams: Promise<{
    type?: string;
    minPrice?: string;
    maxPrice?: string;
    time?: string;
    lgbt?: string;
  }>;
};

export default async function ResultsPage({ searchParams }: Props) {
  const params = await searchParams;
  const restaurants = await getRestaurants();

  const filters: BasicFilterState = {
    restaurantType: params.type ?? "",
    minPrice: params.minPrice ?? "",
    maxPrice: params.maxPrice ?? "",
    time: params.time ?? "",
    lgbtFriendly: params.lgbt === "true",
  };

  const filteredRestaurants = filterRestaurants(restaurants, filters);

  const activeBadges: string[] = [];

  if (filters.restaurantType) {
    activeBadges.push(filters.restaurantType);
  }

  if (filters.minPrice) {
    activeBadges.push(`Từ ${formatCurrency(Number(filters.minPrice))}`);
  }

  if (filters.maxPrice) {
    activeBadges.push(`Đến ${formatCurrency(Number(filters.maxPrice))}`);
  }

  if (filters.time) {
    activeBadges.push(`Giờ đến: ${filters.time}`);
  }

  if (filters.lgbtFriendly) {
    activeBadges.push("LGBTQ+ friendly");
  }

  return (
    <main className="container-page space-y-6 py-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <SectionTitle
            title="Kết quả tìm kiếm"
            subtitle={`Tìm thấy ${filteredRestaurants.length} quán ăn phù hợp.`}
          />
        </div>

        <Link
          href="/"
          className="inline-flex rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          ← Quay lại chỉnh bộ lọc
        </Link>
      </div>

      {activeBadges.length > 0 ? (
        <section className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <p className="mb-3 text-sm font-semibold text-gray-700">
            Bộ lọc đang áp dụng
          </p>
          <div className="flex flex-wrap gap-2">
            {activeBadges.map((badge) => (
              <span
                key={badge}
                className="rounded-full bg-amber-50 px-3 py-1 text-sm text-amber-800"
              >
                {badge}
              </span>
            ))}
          </div>
        </section>
      ) : null}

      {filteredRestaurants.length === 0 ? (
        <section className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center shadow-sm">
          <h3 className="text-xl font-bold text-gray-800">
            Không tìm thấy quán phù hợp
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Hãy thử bỏ bớt một vài điều kiện lọc hoặc quay lại trang chủ để chọn
            lại.
          </p>

          <div className="mt-5">
            <Link
              href="/"
              className="inline-flex rounded-xl bg-amber-700 px-5 py-3 font-semibold text-white transition hover:bg-amber-800"
            >
              Quay lại trang chủ
            </Link>
          </div>
        </section>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      )}
    </main>
  );
}