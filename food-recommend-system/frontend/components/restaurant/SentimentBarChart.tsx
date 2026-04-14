// "use client";

// import { SentimentTimelineItem } from "@/types/restaurant";
// import {
//   Bar,
//   BarChart,
//   Legend,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";

// type Props = {
//   data: SentimentTimelineItem[];
// };

// export default function SentimentBarChart({ data }: Props) {
//   return (
//     <div className="h-80 w-full rounded-2xl border border-gray-200 bg-white p-4">
//       <h3 className="mb-4 text-lg font-semibold text-gray-800">
//         Số lượng đánh giá theo thời gian
//       </h3>
//       <ResponsiveContainer width="100%" height="100%">
//         <BarChart data={data}>
//           <XAxis dataKey="period" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Bar dataKey="tot" name="Tốt" />
//           <Bar dataKey="trungBinh" name="Trung bình" />
//           <Bar dataKey="do" name="Dở" />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }