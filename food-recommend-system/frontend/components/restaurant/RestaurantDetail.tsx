import { Restaurant } from "@/types/restaurant";
import PeakHoursChart from "./PeakHoursChart";
import SentimentPieChart from "./SentimentPieChart";
//Thien test
import ReviewTrendChart from "./ReviewTrendChart"; // Thêm dòng này


type Props = {
  restaurant: Restaurant;
};
function getSentimentLabel(sentiment: number | null | undefined) {
  if (sentiment === 1) return "Tích cực";
  if (sentiment === 2) return "Bình thường";
  if (sentiment === 0) return "Tiêu cực";
  return "Không rõ";
}

function formatPriceRange(restaurant: Restaurant) {
  const min = restaurant.price_min;
  const max = restaurant.price_max;
  const level = restaurant.price_level;

  const hasMin = min !== undefined && min !== null && String(min).trim() !== "";
  const hasMax = max !== undefined && max !== null && String(max).trim() !== "";

  if (hasMin && hasMax) {
    return `${Number(min).toLocaleString("vi-VN")}đ - ${Number(max).toLocaleString("vi-VN")}đ`;
  }

  if (hasMin) {
    return `Từ ${Number(min).toLocaleString("vi-VN")}đ`;
  }

  if (hasMax) {
    return `Đến ${Number(max).toLocaleString("vi-VN")}đ`;
  }

  if (level && String(level).trim() !== "") {
    return String(level);
  }

  return "Chưa có";
}

function buildSentimentSummary(reviews: any[] = []) {
  let good = 0;
  let neutral = 0;
  let bad = 0;

  for (const review of reviews) {
    if (review.sentiment === 1) good++;
    else if (review.sentiment === 2) neutral++;
    else if (review.sentiment === 0) bad++;
  }

  return [
    { name: "Tích cực" as const, value: good },
    { name: "Bình thường" as const, value: neutral },
    { name: "Tiêu cực" as const, value: bad },
  ];
}

//line chart của Thiện
function buildReviewTrend(reviews: any[] = []) {
  const now = new Date();
  
  interface InternalTrendItem {
    month: string;
    positive: number;   // Đổi tên để dễ dùng trong biểu đồ
    neutral: number;
    negative: number;
    monthsAgo: number;
  }

  const trend: InternalTrendItem[] = [];

  // Khởi tạo 6 tháng với tất cả các chỉ số bằng 0
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    trend.push({
      month: `T${d.getMonth() + 1}`,
      positive: 0,
      neutral: 0,
      negative: 0,
      monthsAgo: i,
    });
  }

  reviews.forEach((r) => {
    const timeStr = r.time || "";
    let monthsAgo = 0;
    const match = timeStr.match(/(\d+)\s+tháng/);
    if (match) monthsAgo = parseInt(match[1]);

    if (monthsAgo <= 5) {
      const target = trend.find((t) => t.monthsAgo === monthsAgo);
      if (target) {
        // Dựa vào trường sentiment trong DB của bạn
        if (r.sentiment === 1) target.positive++;
        else if (r.sentiment === 2) target.neutral++;
        else if (r.sentiment === 0) target.negative++;
      }
    }
  });

  return trend;
}


const ABOUT_LABELS: Record<string, string> = {
  phu_hop_cho_nguoi_khuyet_tat: "Phù hợp cho người khuyết tật",
  cac_tuy_chon_dich_vu: "Các tùy chọn dịch vụ",
  diem_noi_bat: "Điểm nổi bật",
  noi_tieng_ve: "Nổi tiếng về",
  dich_vu: "Dịch vụ",
  lua_chon_an_uong: "Lựa chọn ăn uống",
  tien_nghi: "Tiện nghi",
  bau_khong_khi: "Bầu không khí",
  khach_hang: "Khách hàng",
  len_ke_hoach: "Lên kế hoạch",
  thanh_toan: "Thanh toán",
  tre_em: "Trẻ em",
  bai_do_xe: "Bãi đỗ xe",
  tu_doanh_nghiep: "Tự doanh nghiệp",
  thu_cung: "Thú cưng",
};

export default function RestaurantDetail({ restaurant }: Props) {
  const title =
    restaurant.restaurant_name || restaurant.name || "Chưa có tên nhà hàng";
  const category =
    restaurant.category_clean || restaurant.category || "Chưa có danh mục";

  const reviews = restaurant.reviews || [];
  const sentimentSummary = buildSentimentSummary(reviews);
  const trendSummary = buildReviewTrend(reviews); // Thêm dòng này (THiện)
  const about = restaurant.about_clean || {};
  const openingHours = restaurant.opening_hours || {};
  const popularParsed = restaurant.popular_parsed || {};

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
            <p className="mt-2 text-gray-500">{category}</p>
          </div>
          <div className="rounded-full bg-amber-100 px-4 py-2 font-bold text-amber-800">
            ⭐ {restaurant.rating ?? restaurant.avg_rating ?? "Chưa có"}
          </div>
        </div>

        <div className="space-y-3 text-sm text-gray-700">
          <p>
            <span className="font-semibold">Địa chỉ:</span>{" "}
            {restaurant.address || "Chưa có"}
          </p>

          <p>
            <span className="font-semibold">Số điện thoại:</span>{" "}
            {restaurant.phone || "Chưa có"}
          </p>
          <p>
            <span className="font-semibold">Khoảng giá:</span>{" "}
            {formatPriceRange(restaurant)}
          </p>
          <p>
            <span className="font-semibold">Google Maps:</span>{" "}
            {restaurant.canonical_url || restaurant.url ? (
              <a
                href={restaurant.canonical_url || restaurant.url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline"
              >
                Mở trên Google Maps
              </a>
            ) : (
              "Chưa có"
            )}
          </p>

          <p>
            <span className="font-semibold">Thân thiện với LGBTQ+:</span>{" "}
            {restaurant.lgbtq_friendly == "có" ? "Có" : "Không rõ"}
          </p>
        </div>
      </section>

      <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-2xl font-bold text-gray-800">Giờ mở cửa</h2>
        {Object.keys(openingHours).length === 0 ? (
          <p className="text-gray-500">Chưa có dữ liệu giờ mở cửa.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <tbody>
                {Object.entries(openingHours).map(([day, hours]) => (
                  <tr key={day} className="border-b border-gray-100">
                    <td className="py-2 pr-4 font-semibold text-gray-700">{day}</td>
                    <td className="py-2 text-gray-600">{hours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <PeakHoursChart dataByDay={popularParsed} />
        <SentimentPieChart data={sentimentSummary} />
      </section>
      
    


      <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-2xl font-bold text-gray-800">Thông tin thêm</h2>

        <div className="space-y-6">
          {Object.entries(about).map(([groupKey, values]) => {
            if (!values || values.length === 0) return null;

            return (
              <div key={groupKey}>
                <h3 className="mb-2 text-lg font-semibold text-gray-800">
                  {ABOUT_LABELS[groupKey] || groupKey}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {values.map((value) => (
                    <span
                      key={`${groupKey}-${value}`}
                      className="rounded-full bg-orange-50 px-3 py-1 text-sm text-orange-700"
                    >
                      {value}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-2xl font-bold text-gray-800">Đánh giá gần đây</h2>

        <div className="space-y-4">
          {reviews.length === 0 ? (
            <p className="text-gray-500">Chưa có review.</p>
          ) : (
            reviews.map((review: any, index: number) => (
              <div
                key={review._id || review.id || index}
                className="rounded-2xl border border-gray-100 bg-gray-50 p-4"
              >
                <div className="mb-2 flex items-center justify-between gap-4">
                  <p className="font-semibold text-gray-800">
                    {review.reviewer || "Người dùng ẩn danh"}
                  </p>
                  <p className="text-sm text-amber-700">
                    ⭐ {review.rating ?? "Chưa có"}
                  </p>
                </div>

                {review.comment ? (
                  <p className="mb-3 text-gray-700">{review.comment}</p>
                ) : null}

                <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                  {review.food_rating != null ? (
                    <span>Đồ ăn: {review.food_rating}</span>
                  ) : null}
                  {review.service_rating != null ? (
                    <span>Dịch vụ: {review.service_rating}</span>
                  ) : null}
                  {review.atmosphere_rating != null ? (
                    <span>Không khí: {review.atmosphere_rating}</span>
                  ) : null}
                  {review.sentiment != null ? (
                    <span>Sentiment: {getSentimentLabel(review.sentiment)}</span>
                  ) : null}
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}