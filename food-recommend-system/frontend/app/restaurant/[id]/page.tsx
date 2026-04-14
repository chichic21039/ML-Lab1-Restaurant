import RestaurantDetail from "@/components/restaurant/RestaurantDetail";
import { getRestaurantByIdFromApi, getReviewsByRestaurantId } from "@/lib/api";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    type?: string;
    minPrice?: string;
    maxPrice?: string;
    arrivalDateTime?: string;
    lgbt?: string;
    advanced?: string;
  }>;
};

export default async function RestaurantDetailPage({
  params,
  searchParams,
}: Props) {
  const { id } = await params;
  const currentSearchParams = await searchParams;

  const restaurant = await getRestaurantByIdFromApi(id);
  if (!restaurant) {
    notFound();
  }

  const reviews = await getReviewsByRestaurantId(id);

  const mergedRestaurant = {
    ...restaurant,
    reviews,
  };

  const backParams = new URLSearchParams();

  Object.entries(currentSearchParams).forEach(([key, value]) => {
    if (value) {
      backParams.set(key, value);
    }
  });

  const backHref = backParams.toString()
    ? `/results?${backParams.toString()}`
    : "/results";

  return (
    <main className="container-page space-y-6 py-8">
      <Link
        href={backHref}
        className="inline-flex rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700"
      >
        ← Quay lại kết quả
      </Link>

      <RestaurantDetail restaurant={mergedRestaurant} />
    </main>
  );
}