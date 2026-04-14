"use client";

import { SentimentPieItem } from "@/types/restaurant";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

type Props = {
  data: SentimentPieItem[];
};

const COLORS = ["#16a34a", "#f59e0b", "#dc2626"];

export default function SentimentPieChart({ data }: Props) {
  return (
    <div className="h-72 w-full rounded-2xl border border-gray-200 bg-white p-4">
      <h3 className="mb-4 text-lg font-semibold text-gray-800">
        Tỷ lệ đánh giá theo model
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Tooltip />
          <Pie data={data} dataKey="value" nameKey="name" outerRadius={90} label>
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}