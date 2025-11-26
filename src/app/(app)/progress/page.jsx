"use client";

import useProgressData from "@/components/progress/useProgressData";

import ProgressHeader from "@/components/progress/ProgressHeader";
import TimeFilter from "@/components/progress/TimeFilter";
import DailySummary from "@/components/progress/DailySummary";
import BodyMetrics from "@/components/progress/BodyMetrics";
import WeightTrendChart from "@/components/progress/WeightTrendChart";
import CalorieTrendChart from "@/components/progress/CalorieTrendChart";

export default function ProgressPage() {
  const {
    // daily
    daily,
    prevDay,
    nextDay,

    // body metrics
    weight,
    targetWeight,
    bmiValue,
    bmiStatus,
    updateWeight,
    updateTarget,

    // charts
    weightTrend,
    weeklyCalories,
    monthlyCalories,

    // time filter
    mode,
    setMode,
  } = useProgressData();

  return (
    <div className="px-4 py-6 max-w-[1000px] mx-auto">
      {/* HEADER */}
      <ProgressHeader />

      {/* TIME FILTER (Weekly / Monthly) */}
      <TimeFilter period={mode} setPeriod={setMode} />

      {/* DAILY SUMMARY CARD */}
      <DailySummary
        dateLabel={daily.dateLabel}
        calorie={daily.calorie}
        protein={daily.protein}
        carbs={daily.carbs}
        fat={daily.fat}
        isToday={daily.isToday}
        onPrevDay={prevDay}
        onNextDay={nextDay}
      />

      {/* BODY METRICS CARD */}
      <BodyMetrics
        currentWeight={weight}
        targetWeight={targetWeight}
        bmi={bmiValue}
        bmiStatus={bmiStatus}
        onUpdateWeight={updateWeight}
        onUpdateTarget={updateTarget}
      />

      {/* WEIGHT TREND CHART */}
      <WeightTrendChart
        labels={weightTrend.labels}
        values={weightTrend.values}
        target={targetWeight}
      />

      {/* CALORIE TREND CHART */}
      <CalorieTrendChart
        weekly={weeklyCalories}
        monthly={monthlyCalories}
        mode={mode}
        onChangeMode={setMode}
      />
    </div>
  );
}
