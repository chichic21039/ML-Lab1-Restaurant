// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
//       <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={100}
//           height={20}
//           priority
//         />
//         <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
//           <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
//             To get started, edit the page.tsx file.
//           </h1>
//           <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
//             Looking for a starting point or more instructions? Head over to{" "}
//             <a
//               href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Templates
//             </a>{" "}
//             or the{" "}
//             <a
//               href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Learning
//             </a>{" "}
//             center.
//           </p>
//         </div>
//         <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
//           <a
//             className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={16}
//               height={16}
//             />
//             Deploy Now
//           </a>
//           <a
//             className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Documentation
//           </a>
//         </div>
//       </main>
//     </div>
//   );
// }
"use client";

import AdvancedFilters from "@/components/filters/AdvancedFilters";
import BasicFilters from "@/components/filters/BasicFilters";
import SectionTitle from "@/components/ui/SectionTitle";
import { MOCK_RESTAURANTS } from "@/lib/mock-data";
import { filterRestaurants } from "@/lib/utils";
import { AdvancedFilterState, BasicFilterState } from "@/types/filters";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const initialBasicFilters: BasicFilterState = {
  restaurantType: "",
  minPrice: "",
  maxPrice: "",
  time: "",
  lgbtFriendly: false,
};

export default function HomePage() {
  const router = useRouter();

  const [basicFilters, setBasicFilters] =
    useState<BasicFilterState>(initialBasicFilters);
  const [advancedFilters, setAdvancedFilters] = useState<AdvancedFilterState>(
    {}
  );

  const previewResults = useMemo(() => {
    return filterRestaurants(MOCK_RESTAURANTS, basicFilters);
  }, [basicFilters]);

  const selectedAdvancedCount = Object.values(advancedFilters).reduce(
    (sum, arr) => sum + arr.length,
    0
  );

  const handleSearch = () => {
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

    if (basicFilters.time) {
      params.set("time", basicFilters.time);
    }

    if (basicFilters.lgbtFriendly) {
      params.set("lgbt", "true");
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
          Giao diện ưu tiên trải nghiệm lọc nhiều tiêu chí, hiển thị rõ ràng,
          sạch sẽ và dễ mở rộng để tích hợp model phân tích review sau này.
        </p>
      </section>

      <section className="space-y-4">
        <SectionTitle
          title="Bộ lọc cơ bản"
          subtitle="Chọn nhanh loại quán, mức giá, thời gian và tiêu chí LGBTQ+ friendly."
        />
        <BasicFilters filters={basicFilters} onChange={setBasicFilters} />
      </section>

      <section className="space-y-4">
        <SectionTitle
          title="Bộ lọc nâng cao"
          subtitle={`Đã chọn ${selectedAdvancedCount} tiêu chí nâng cao.`}
        />
        <AdvancedFilters values={advancedFilters} onChange={setAdvancedFilters} />
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-800">Kết quả xem trước</h3>
            <p className="text-sm text-gray-500">
              Hiện có {previewResults.length} quán phù hợp với bộ lọc cơ bản.
            </p>
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