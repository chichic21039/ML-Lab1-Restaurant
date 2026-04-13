import RestaurantDetail from "@/components/restaurant/RestaurantDetail";
import { getRestaurantByIdFromApi } from "@/lib/api";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function RestaurantDetailPage({ params }: Props) {
  const { id } = await params;
  const restaurant = await getRestaurantByIdFromApi(id);

  if (!restaurant) {
    notFound();
  }

  return (
    <main className="container-page space-y-6 py-8">
      <Link
        href="/results"
        className="inline-flex rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700"
      >
        ← Quay lại kết quả
      </Link>

      <RestaurantDetail restaurant={restaurant} />
    </main>
  );
}