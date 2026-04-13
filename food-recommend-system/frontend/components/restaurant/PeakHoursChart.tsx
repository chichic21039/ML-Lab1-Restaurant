"use client";

import { PeakHourItem } from "@/types/restaurant";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type Props = {
  data: PeakHourItem[];
};

export default function PeakHoursChart({ data }: Props) {
  return (
    <div className="h-72 w-full rounded-2xl border border-gray-200 bg-white p-4">
      <h3 className="mb-4 text-lg font-semibold text-gray-800">Giờ cao điểm</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="hour" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}