"use client";

import { ADVANCED_FILTERS } from "@/lib/constants";
import { AdvancedFilterState } from "@/types/filters";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

type Props = {
  values: AdvancedFilterState;
  onChange: (next: AdvancedFilterState) => void;
};

export default function AdvancedFilters({ values, onChange }: Props) {
  const [open, setOpen] = useState(false);

  const toggleValue = (group: string, item: string) => {
    const currentValues = values[group] || [];
    const exists = currentValues.includes(item);

    const nextGroupValues = exists
      ? currentValues.filter((v) => v !== item)
      : [...currentValues, item];

    onChange({
      ...values,
      [group]: nextGroupValues,
    });
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between rounded-xl bg-gray-50 px-4 py-3 text-left font-semibold text-gray-800"
      >
        <span>Tiêu chí thêm</span>
        <ChevronDown
          className={`h-5 w-5 transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open ? (
        <div className="mt-5 space-y-6">
          {Object.entries(ADVANCED_FILTERS).map(([group, items]) => (
            <div key={group} className="rounded-xl border border-gray-200 p-4">
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-700">
                {group.replaceAll("_", " ")}
              </h3>

              <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
                {items.map((item) => {
                  const checked = (values[group] || []).includes(item);

                  return (
                    <label
                      key={item}
                      className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-sm ${
                        checked
                          ? "border-amber-600 bg-amber-50 text-amber-800"
                          : "border-gray-200 bg-white text-gray-700"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleValue(group, item)}
                      />
                      <span>{item}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}