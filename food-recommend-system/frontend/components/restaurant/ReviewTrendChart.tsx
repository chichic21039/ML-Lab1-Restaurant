"use client";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

type Props = {
  data: any[];
};

export default function ReviewTrendChart({ data }: Props) {
  return (
    <div className="h-[400px] w-full"> {/* Tăng chiều cao một chút để dễ nhìn 3 đường */}
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} allowDecimals={false} />
          <Tooltip contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
          <Legend verticalAlign="top" height={36}/>
          
          {/* Đường Tích cực - Màu xanh lá */}
          <Area
            type="monotone"
            dataKey="positive"
            stackId="1" // Xếp chồng lên nhau hoặc bỏ stackId nếu muốn các đường cắt nhau
            stroke="#16a34a"
            fill="#16a34a"
            fillOpacity={0.2}
            name="Tích cực"
          />

          {/* Đường Trung bình - Màu vàng/cam */}
          <Area
            type="monotone"
            dataKey="neutral"
            stackId="1"
            stroke="#f59e0b"
            fill="#f59e0b"
            fillOpacity={0.2}
            name="Bình thường"
          />

          {/* Đường Tiêu cực - Màu đỏ */}
          <Area
            type="monotone"
            dataKey="negative"
            stackId="1"
            stroke="#dc2626"
            fill="#dc2626"
            fillOpacity={0.2}
            name="Tiêu cực"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}