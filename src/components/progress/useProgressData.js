"use client";

import { useState } from "react";
import {
  getAppState,
  updateCurrentWeight,
  updateTargetWeight,
  getDailyLog,
  getWeeklyCalories,
  getMonthlyCalories
} from "@/lib/storage/state";

// BMI helper
function calcBMI(weight, heightCm) {
  const h = heightCm / 100;
  if (!weight || !heightCm) return { bmi: "0", status: "Unknown" };

  const bmiNumber = weight / (h * h);

  let status = "Normal";
  if (bmiNumber < 18.5) status = "Underweight";
  else if (bmiNumber < 25) status = "Normal";
  else if (bmiNumber < 30) status = "Overweight";
  else status = "Obese";

  return { bmi: bmiNumber.toFixed(1), status };
}

// Daily summary builder
function createDailySummary(dateObj, log) {
  const today = new Date();
  const isToday = dateObj.toDateString() === today.toDateString();

  const dateLabel = isToday
    ? "Hari Ini"
    : dateObj.toLocaleDateString("id-ID", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });

  return {
    dateLabel,
    calorie: log.calorie,
    protein: log.protein,
    carbs: log.carbs,
    fat: log.fat,
    isToday
  };
}

export default function useProgressData() {
  // load state ONCE at initialization
  const initialDate = new Date();
  const initialState = getAppState();
  const dailyLog = getDailyLog(initialDate);
  const { bmi, status } = calcBMI(initialState.user.currentWeight, initialState.user.heightCm);

  // ========== STATES ==========
  const [date, setDate] = useState(initialDate);

  const [progress, setProgress] = useState({
    daily: createDailySummary(initialDate, dailyLog),
    weight: initialState.user.currentWeight,
    targetWeight: initialState.user.targetWeight,
    bmiValue: bmi,
    bmiStatus: status,
    weightTrend: {
        labels: initialState.history.weightTrend.map(i => i.label),
        values: initialState.history.weightTrend.map(i => i.weight)
    },
    weeklyCalories: getWeeklyCalories(initialState),
    monthlyCalories: getMonthlyCalories(initialState),
  });

  const [mode, setMode] = useState("weekly");

  // ========== HANDLERS ==========
  function prevDay() {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() - 1);

    const log = getDailyLog(newDate);
    setDate(newDate);

    setProgress(p => ({
      ...p,
      daily: createDailySummary(newDate, log),
    }));
  }

  function nextDay() {
    const today = new Date();
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);

    if (newDate > today) return;

    const log = getDailyLog(newDate);
    setDate(newDate);

    setProgress(p => ({
      ...p,
      daily: createDailySummary(newDate, log),
    }));
  }

  function updateWeightHandler(newValue) {
  updateCurrentWeight(newValue);

  const state = getAppState();
  const { bmi, status } = calcBMI(newValue, state.user.heightCm);

  setProgress(p => ({
    ...p,
    weight: newValue,
    bmiValue: bmi,
    bmiStatus: status,
    weightTrend: {
      labels: state.history.weightTrend.map(i => i.label),
      values: state.history.weightTrend.map(i => i.weight)
    },
    weeklyCalories: getWeeklyCalories(initialState),
    monthlyCalories: getMonthlyCalories(initialState),
  }));
}


  function updateTargetHandler(newValue) {
    updateTargetWeight(newValue);

    setProgress(p => ({
      ...p,
      targetWeight: newValue,
    }));
  }

  return {
    daily: progress.daily,
    prevDay,
    nextDay,

    weight: progress.weight,
    targetWeight: progress.targetWeight,
    bmiValue: progress.bmiValue,
    bmiStatus: progress.bmiStatus,

    updateWeight: updateWeightHandler,
    updateTarget: updateTargetHandler,

    weightTrend: progress.weightTrend,

    weeklyCalories: progress.weeklyCalories,
    monthlyCalories: progress.monthlyCalories,

    mode,
    setMode,
  };
}
