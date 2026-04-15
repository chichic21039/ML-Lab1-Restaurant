"use client";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

type Props = {
  data: any[];
};

export default function ReviewTrendChart({ data }: { data: any[] }) {
  return (
    <div className="h-[350px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis 
            dataKey="month" 
            axisLine={false} 
            tickLine={false} 
            interval={data.length > 10 ? 1 : 0} // Nếu quá nhiều tháng thì ẩn bớt label cho đỡ rối
            tick={{fontSize: 11}}
          />
          <YAxis axisLine={false} tickLine={false} allowDecimals={false} />
          <Tooltip />
          <Legend verticalAlign="top" height={36} />
          
          <Area
            type="monotone"
            dataKey="positive"
            stackId="1" // Dùng stackId để thấy tổng lượng review tăng giảm
            stroke="#16a34a"
            fill="#16a34a"
            fillOpacity={0.2}
            name="Tích cực"
          />
          <Area
            type="monotone"
            dataKey="neutral"
            stackId="1"
            stroke="#f59e0b"
            fill="#f59e0b"
            fillOpacity={0.2}
            name="Bình thường"
          />
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