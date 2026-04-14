"use client";

import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Props = {
  dataByDay: Record<string, Record<string, number>>;
};

const DAYS = [
  { key: "mon", label: "Thứ Hai" },
  { key: "tue", label: "Thứ Ba" },
  { key: "wed", label: "Thứ Tư" },
  { key: "thu", label: "Thứ Năm" },
  { key: "fri", label: "Thứ Sáu" },
  { key: "sat", label: "Thứ Bảy" },
  { key: "sun", label: "Chủ Nhật" },
];

function getTodayKey() {
  const day = new Date().getDay();
  const map = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  return map[day];
}

export default function PeakHoursChart({ dataByDay }: Props) {
  const todayKey = getTodayKey();
  const initialIndex = Math.max(
    0,
    DAYS.findIndex((d) => d.key === todayKey)
  );

  const [selectedIndex, setSelectedIndex] = useState(initialIndex);
  const selectedDay = DAYS[selectedIndex];

  const chartData = useMemo(() => {
    const dayData = dataByDay?.[selectedDay.key] || {};
    return Object.entries(dayData).map(([hour, value]) => ({
      hour: `${hour}h`,
      value,
    }));
  }, [dataByDay, selectedDay]);

  const goPrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? DAYS.length - 1 : prev - 1));
  };

  const goNext = () => {
    setSelectedIndex((prev) => (prev === DAYS.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="h-96 w-full rounded-2xl border border-gray-200 bg-white p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={goPrev}
          className="rounded-lg border border-gray-300 px-3 py-1 text-sm"
        >
          ←
        </button>
        <h3 className="text-lg font-semibold text-gray-800">
          Giờ cao điểm - {selectedDay.label}
        </h3>
        <button
          type="button"
          onClick={goNext}
          className="rounded-lg border border-gray-300 px-3 py-1 text-sm"
        >
          →
        </button>
      </div>

      {chartData.length === 0 ? (
        <p className="text-sm text-gray-500">Chưa có dữ liệu giờ cao điểm.</p>
      ) : (
        <ResponsiveContainer width="100%" height="85%">
          <BarChart data={chartData}>
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}