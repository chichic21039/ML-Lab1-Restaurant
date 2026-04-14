"use client";

import AdvancedFilters from "@/components/filters/AdvancedFilters";
import BasicFilters from "@/components/filters/BasicFilters";
import SectionTitle from "@/components/ui/SectionTitle";
//import { MOCK_RESTAURANTS } from "@/lib/mock-data";
import { rankRestaurantsByMatching } from "@/lib/utils";
import { AdvancedFilterState, BasicFilterState } from "@/types/filters";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const initialBasicFilters: BasicFilterState = {
  restaurantType: "",
  minPrice: "",
  maxPrice: "",
  arrivalDateTime: "",
  lgbtFriendly: false,
};

function getArrivalBounds() {
  const now = new Date();
  const minDate = new Date(now.getTime() + 15 * 60 * 1000);
  const maxDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  return { minDate, maxDate };
}
export default function HomePage() {
  const router = useRouter();

  const [basicFilters, setBasicFilters] =
    useState<BasicFilterState>(initialBasicFilters);
  const [advancedFilters, setAdvancedFilters] = useState<AdvancedFilterState>(
    {}
  );

  // const previewResults = useMemo(() => {
  //   return rankRestaurantsByMatching(MOCK_RESTAURANTS, basicFilters, advancedFilters);
  // }, [basicFilters, advancedFilters]);

  const selectedAdvancedCount = Object.values(advancedFilters).reduce(
    (sum, arr) => sum + arr.length,
    0
  );

  const min = basicFilters.minPrice ? Number(basicFilters.minPrice) : null;
  const max = basicFilters.maxPrice ? Number(basicFilters.maxPrice) : null;
  const invalidPriceRange =
    min !== null && max !== null && !Number.isNaN(min) && !Number.isNaN(max) && max < min;

  const handleSearch = () => {
    if (invalidPriceRange) {
      alert("Giá tối đa không được nhỏ hơn giá tối thiểu.");
      return;
    }

    if (basicFilters.arrivalDateTime) {
      const selected = new Date(basicFilters.arrivalDateTime);
      const { minDate, maxDate } = getArrivalBounds();

      if (selected < minDate) {
        alert("Thời điểm đến phải từ 15 phút sau hiện tại trở đi.");
        return;
      }

      if (selected > maxDate) {
        alert("Thời điểm đến chỉ được trong vòng 7 ngày tới.");
        return;
      }
    }

    const params = new URLSearchParams();

    if (basicFilters.restaurantType) {
      params.set("type", basicFilters.restaurantType);
    }

    if (basicFilters.minPrice) {
      params.set("minPrice", basicFilters.minPrice);
    }

    if (basicFilters.maxPrice) {
      params.set("maxPrice", basicFilters.maxPrice);
    }

    if (basicFilters.arrivalDateTime) {
      params.set("arrivalDateTime", basicFilters.arrivalDateTime);
    }

    if (basicFilters.lgbtFriendly) {
      params.set("lgbt", "true");
    }

    if (selectedAdvancedCount > 0) {
      params.set("advanced", JSON.stringify(advancedFilters));
    }

    router.push(`/results?${params.toString()}`);
  };

  const handleReset = () => {
    setBasicFilters(initialBasicFilters);
    setAdvancedFilters({});
  };

  return (
    <main className="container-page space-y-8 py-8">
      <section className="rounded-3xl bg-gradient-to-r from-amber-50 to-orange-50 p-8">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-amber-700">
          search and filter dashboard
        </p>
        <h1 className="max-w-3xl text-4xl font-bold leading-tight text-gray-800">
          Tìm kiếm và gợi ý nhà hàng tại Quận 5 theo bộ lọc phù hợp với nhu cầu
          của bạn
        </h1>
        <p className="mt-4 max-w-2xl text-gray-600">
          Các tiêu chí chính được lọc cứng, còn tiêu chí thêm dùng để xếp hạng
          quán phù hợp nhất.
        </p>
      </section>

      <section className="space-y-4">
        <SectionTitle
          title="Bộ lọc cơ bản"
          subtitle="Các tiêu chí ở đây là tiêu chí cứng nếu bạn có nhập/chọn."
        />
        <BasicFilters filters={basicFilters} onChange={setBasicFilters} />
      </section>

      <section className="space-y-4">
        <SectionTitle
          title="Bộ lọc nâng cao"
          subtitle={`Đã chọn ${selectedAdvancedCount} tiêu chí thêm.`}
        />
        <AdvancedFilters values={advancedFilters} onChange={setAdvancedFilters} />
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-800">Kết quả xem trước</h3>
            {/* <p className="text-sm text-gray-500">
              Hiện có 0 quán phù hợp nhất.
            </p> */}
            {invalidPriceRange ? (
              <p className="mt-2 text-sm text-red-500">
                Giá tối đa không được nhỏ hơn giá tối thiểu.
              </p>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="rounded-xl border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Đặt lại bộ lọc
            </button>

            <button
              type="button"
              onClick={handleSearch}
              className="rounded-xl bg-amber-700 px-5 py-3 font-semibold text-white transition hover:bg-amber-800"
            >
              Tìm kiếm
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}