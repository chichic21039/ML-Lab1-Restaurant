"use client";

import { RESTAURANT_TYPES } from "@/lib/constants";
import { BasicFilterState } from "@/types/filters";

type Props = {
  filters: BasicFilterState;
  onChange: (next: BasicFilterState) => void;
};

export default function BasicFilters({ filters, onChange }: Props) {
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
          placeholder="Ví dụ: 300000"
          value={filters.maxPrice}
          onChange={(e) => onChange({ ...filters, maxPrice: e.target.value })}
          className="w-full rounded-xl border border-gray-300 px-3 py-2 outline-none focus:border-amber-600"
        />
        <p className="mt-1 text-xs text-gray-400">Đơn vị: VNĐ</p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Giờ dự định đến
        </label>
        <input
          type="time"
          value={filters.time}
          onChange={(e) => onChange({ ...filters, time: e.target.value })}
          className="w-full rounded-xl border border-gray-300 px-3 py-2 outline-none focus:border-amber-600"
        />
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