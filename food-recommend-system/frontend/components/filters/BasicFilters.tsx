"use client";

import { useMemo } from "react";
import { RESTAURANT_TYPES } from "@/lib/constants";
import { BasicFilterState } from "@/types/filters";

type Props = {
  filters: BasicFilterState;
  onChange: (next: BasicFilterState) => void;
};

function formatDateTimeLocal(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export default function BasicFilters({ filters, onChange }: Props) {
  const min = filters.minPrice ? Number(filters.minPrice) : null;
  const max = filters.maxPrice ? Number(filters.maxPrice) : null;
  const invalidPriceRange =
    min !== null && max !== null && !Number.isNaN(min) && !Number.isNaN(max) && max < min;

  const { minArrival, maxArrival } = useMemo(() => {
    const now = new Date();

    const minDate = new Date(now.getTime() + 15 * 60 * 1000);
    const maxDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    return {
      minArrival: formatDateTimeLocal(minDate),
      maxArrival: formatDateTimeLocal(maxDate),
    };
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm xl:grid-cols-5">
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Loại nhà hàng
        </label>
        <select
          className="w-full rounded-xl border border-gray-300 px-3 py-2 outline-none focus:border-amber-600"
          value={filters.restaurantType}
          onChange={(e) =>
            onChange({ ...filters, restaurantType: e.target.value })
          }
        >
          <option value="">Tất cả</option>
          {RESTAURANT_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Giá tối thiểu
        </label>
        <input
          type="number"
          min={0}
          placeholder="Ví dụ: 50000"
          value={filters.minPrice}
          onChange={(e) => onChange({ ...filters, minPrice: e.target.value })}
          className="w-full rounded-xl border border-gray-300 px-3 py-2 outline-none focus:border-amber-600"
        />
        <p className="mt-1 text-xs text-gray-400">Đơn vị: VNĐ</p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Giá tối đa
        </label>
        <input
          type="number"
          min={0}
          placeholder="Ví dụ: 300000"
          value={filters.maxPrice}
          onChange={(e) => onChange({ ...filters, maxPrice: e.target.value })}
          className={`w-full rounded-xl border px-3 py-2 outline-none focus:border-amber-600 ${
            invalidPriceRange ? "border-red-400" : "border-gray-300"
          }`}
        />
        <p className="mt-1 text-xs text-gray-400">Đơn vị: VNĐ</p>
        {invalidPriceRange ? (
          <p className="mt-1 text-xs text-red-500">
            Giá tối đa không được nhỏ hơn giá tối thiểu.
          </p>
        ) : null}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Thời điểm dự định đến
        </label>
        <input
          type="datetime-local"
          min={minArrival}
          max={maxArrival}
          step={300}
          value={filters.arrivalDateTime}
          onChange={(e) => {
            const value = e.target.value;

            if (!value) {
              onChange({ ...filters, arrivalDateTime: "" });
              return;
            }

            if (value < minArrival) {
              onChange({ ...filters, arrivalDateTime: minArrival });
              return;
            }

            if (value > maxArrival) {
              onChange({ ...filters, arrivalDateTime: maxArrival });
              return;
            }

            onChange({ ...filters, arrivalDateTime: value });
          }}
          className="w-full rounded-xl border border-gray-300 px-3 py-2 outline-none focus:border-amber-600"
        />
        <p className="mt-1 text-xs text-gray-400">
          Chọn thời điểm đến trong khoảng từ 15 phút sau hiện tại đến 7 ngày tới.
        </p>
      </div>

      <div className="flex items-end">
        <label className="flex w-full cursor-pointer items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
          <input
            type="checkbox"
            checked={filters.lgbtFriendly}
            onChange={(e) =>
              onChange({ ...filters, lgbtFriendly: e.target.checked })
            }
          />
          LGBTQ+ friendly
        </label>
      </div>
    </div>
  );
}