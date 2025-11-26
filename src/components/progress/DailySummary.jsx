'use client'

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import DailyNutrientChart from "./DailyNutrientChart";

export default function DailySummary({
  dateLabel,
  calorie,
  protein,
  carbs,
  fat,
  onPrevDay,
  onNextDay,
  isToday,
}) {
  return (
    <div className="bg-white rounded-2xl shadow p-5 mb-6">

      {/* Header */}
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Ringkasan Nutrisi Harian
      </h3>

      {/* Date nav */}
      <div className="flex justify-between items-center border-b pb-3 mb-4">
        <button
          onClick={onPrevDay}
          className="p-2 text-blue-600"
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </button>

        <span className="font-semibold text-gray-800">{dateLabel}</span>

        <button
          onClick={onNextDay}
          disabled={isToday}
          className={`
            p-2 
            ${isToday ? "text-gray-300" : "text-blue-600"}
          `}
        >
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Content grid */}
      <div className="flex gap-6 items-center">

        {/* Left — macronutrient numbers */}
        <div className="grid grid-cols-2 gap-y-4 gap-x-6 flex-2 border-r pr-6">

          <div className="text-center">
            <span className="text-2xl font-bold block">{calorie}</span>
            <small className="text-gray-500 text-xs">Kalori</small>
          </div>

          <div className="text-center">
            <span className="text-2xl font-bold block">{protein}g</span>
            <small className="text-gray-500 text-xs">Protein</small>
          </div>

          <div className="text-center">
            <span className="text-2xl font-bold block">{carbs}g</span>
            <small className="text-gray-500 text-xs">Karbo</small>
          </div>

          <div className="text-center">
            <span className="text-2xl font-bold block">{fat}g</span>
            <small className="text-gray-500 text-xs">Lemak</small>
          </div>

        </div>

        {/* Right — donut chart */}
        <div className="flex-1 flex justify-center">
          <DailyNutrientChart
            calorie={calorie}
            protein={protein}
            carbs={carbs}
            fat={fat}
          />
        </div>

      </div>
    </div>
  );
}
