import { formatCurrency } from "@/lib/utils";
import { Restaurant } from "@/types/restaurant";
import PeakHoursChart from "./PeakHoursChart";
import SentimentBarChart from "./SentimentBarChart";
import SentimentPieChart from "./SentimentPieChart";

type Props = {
  restaurant: Restaurant;
};

export default function RestaurantDetail({ restaurant }: Props) {
  return (
    <div className="space-y-8">
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.2fr_1fr]">
        <div
          className="min-h-[360px] rounded-3xl bg-cover bg-center"
          style={{ backgroundImage: `url(${restaurant.image})` }}
        />
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                {restaurant.name}
              </h1>
              <p className="mt-2 text-gray-500">{restaurant.category}</p>
            </div>
            <div className="rounded-full bg-amber-100 px-4 py-2 font-bold text-amber-800">
              ⭐ {restaurant.rating}
            </div>
          </div>

          <div className="space-y-3 text-sm text-gray-700">
            <p>
              <span className="font-semibold">Địa chỉ:</span> {restaurant.address}
            </p>
            <p>
              <span className="font-semibold">Số điện thoại:</span>{" "}
              {restaurant.phone}
            </p>
            <p>
              <span className="font-semibold">Trạng thái:</span>{" "}
              {restaurant.openingStatus}
            </p>
            <p>
              <span className="font-semibold">Giá trung bình:</span>{" "}
              {formatCurrency(restaurant.averagePrice)}
            </p>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {restaurant.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-orange-50 px-3 py-1 text-xs text-orange-700"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <PeakHoursChart data={restaurant.peakHours} />
        <SentimentPieChart data={restaurant.sentimentSummary} />
      </section>

      <section>
        <SentimentBarChart data={restaurant.sentimentTimeline} />
      </section>

      <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-2xl font-bold text-gray-800">
          Đánh giá gần đây
        </h2>
        <div className="space-y-4">
          {restaurant.reviews.map((review) => (
            <div
              key={review.id}
              className="rounded-2xl border border-gray-100 bg-gray-50 p-4"
            >
              <div className="mb-2 flex items-center justify-between">
                <p className="font-semibold text-gray-800">{review.author}</p>
                <p className="text-sm text-gray-500">{review.time}</p>
              </div>
              <p className="mb-2 text-sm text-amber-700">⭐ {review.rating}</p>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}