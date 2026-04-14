import RestaurantCard from "@/components/restaurant/RestaurantCard";
import SectionTitle from "@/components/ui/SectionTitle";
import { getRestaurants } from "@/lib/api";
import { rankRestaurantsByMatching } from "@/lib/utils";
import { AdvancedFilterState, BasicFilterState } from "@/types/filters";
import Link from "next/link";

type Props = {
  searchParams: Promise<{
    type?: string;
    minPrice?: string;
    maxPrice?: string;
    arrivalDateTime?: string;
    lgbt?: string;
    advanced?: string;
  }>;
};

export default async function ResultsPage({ searchParams }: Props) {
  const params = await searchParams;
  const restaurants = await getRestaurants();

  const filters: BasicFilterState = {
    restaurantType: params.type ?? "",
    minPrice: params.minPrice ?? "",
    maxPrice: params.maxPrice ?? "",
    arrivalDateTime: params.arrivalDateTime ?? "",
    lgbtFriendly: params.lgbt === "true",
  };

  let advancedFilters: AdvancedFilterState = {};
  if (params.advanced) {
    try {
      advancedFilters = JSON.parse(params.advanced);
    } catch {
      advancedFilters = {};
    }
  }

  const rankedRestaurants = rankRestaurantsByMatching(
    restaurants,
    filters,
    advancedFilters
  );

  return (
    <main className="container-page space-y-6 py-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <SectionTitle
            title="Kết quả tìm kiếm"
            subtitle={`Tìm thấy ${rankedRestaurants.length} quán đáp ứng tiêu chí.`}
          />
        </div>

        <Link
          href="/"
          className="inline-flex rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          ← Quay lại chỉnh bộ lọc
        </Link>
      </div>

      {rankedRestaurants.length === 0 ? (
        <section className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center shadow-sm">
          <h3 className="text-xl font-bold text-gray-800">
            Không tìm thấy quán phù hợp
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Hãy thử nới rộng tiêu chí cứng hoặc bỏ bớt bộ lọc.
          </p>
        </section>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {rankedRestaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.restaurant_id}
              restaurant={restaurant}
            />
          ))}
        </div>
      )}
    </main>
  );
}