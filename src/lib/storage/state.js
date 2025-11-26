// ==========================
//  STATE MANAGER (LOCALSTORAGE)
// ==========================

const STORAGE_KEY = "captfood_state_v1";

// Default State
const defaultState = {
  user: {
    heightCm: 180,
    currentWeight: 75,
    targetWeight: 65,
  },
  dailyLogs: {}, // { "2025-01-19": { calories, protein, carbs, fat } }
  history: {
  weightTrend: [
    { label: "2025-01-01", weight: 75 },
    { label: "2025-01-05", weight: 74.5 },
    { label: "2025-01-10", weight: 74.2 },
    { label: "2025-01-15", weight: 73.9 },
    { label: "2025-01-20", weight: 73.5 },
  ],
  weeklyCalorieAvg: [
    { label: "Sen", calorie: 2100 },
    { label: "Sel", calorie: 1950 },
    { label: "Rab", calorie: 2000 },
    { label: "Kam", calorie: 1800 },
    { label: "Jum", calorie: 2200 },
    { label: "Sab", calorie: 1900 },
    { label: "Min", calorie: 2050 },
  ],
}
};

// ===== LOAD STATE =====
export function getAppState() {
  if (typeof window === "undefined") return defaultState;
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : defaultState;
}

// ===== SAVE STATE =====
function save(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

// ===== UPDATE CURRENT WEIGHT =====
export function updateCurrentWeight(newWeight) {
  const state = getAppState();
  state.user.currentWeight = newWeight;

  // Tambahkan ke tren
  const today = new Date().toISOString().slice(0, 10);
  state.history.weightTrend.push({
    label: today,
    weight: newWeight,
  });

  save(state);
  return true;
}

// ===== UPDATE TARGET WEIGHT =====
export function updateTargetWeight(newTarget) {
  const state = getAppState();
  state.user.targetWeight = newTarget;
  save(state);
  return true;
}

// ===== LOG DAILY NUTRIENTS =====
export function logDailyIntake({ calories, protein, carbs, fat }) {
  const state = getAppState();
  const today = new Date().toISOString().slice(0, 10);

  state.dailyLogs[today] = {
    calories,
    protein,
    carbs,
    fat,
  };

  save(state);
}

// ===== GET DAILY LOG (DINAMIS) =====
export function getDailyLog(dateObj) {
  const state = getAppState();
  const key = dateObj.toISOString().slice(0, 10);

  return state.dailyLogs[key] || {
    calorie: 2000,
    protein: 120,
    carbs: 250,
    fat: 60,
    macroRatio: [40, 40, 20],
  };
}
// ===== GENERATE WEEKLY CALORIE DUMMY =====
export function generateWeeklyCalorieDummy() {
  const days = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

  const data = days.map((day) => ({
    label: day,
    calorie: 1800 + Math.floor(Math.random() * 400) // 1800–2200
  }));

  const state = getAppState();
  state.history.weeklyCalorieAvg = data;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

  return data;
}

export function generateMonthlyCalorieDummy() {
  const weeks = ["W1", "W2", "W3", "W4"];
  
  const data = weeks.map((week) => ({
    label: week,
    calorie: 1800 + Math.floor(Math.random() * 400)
  }));

  const state = getAppState();
  state.history.monthlyCalorieAvg = data;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

  return data;
}

// // ===== GENERATE WEEKLY CALORIES =====
// export function getWeeklyCalories() {
//   const state = getAppState();

//   // 7 hari kebelakang
//   const labels = [];
//   const values = [];

//   for (let i = 6; i >= 0; i--) {
//     const d = new Date();
//     d.setDate(d.getDate() - i);

//     const log = state.dailyLogs[d.toISOString().slice(0, 10)];

//     labels.push(d.toLocaleDateString("id-ID", { weekday: "short" }));
//     values.push(log ? log.calories || log.calorie : Math.floor(1800 + Math.random() * 400));
//   }

//   return { labels, values };
// }


// // ===== GENERATE MONTHLY CALORIES =====
// export function getMonthlyCalories() {
//   const state = getAppState();

//   const labels = [];
//   const values = [];

//   for (let i = 29; i >= 0; i--) {
//     const d = new Date();
//     d.setDate(d.getDate() - i);

//     const log = state.dailyLogs[d.toISOString().slice(0, 10)];

//     labels.push(d.getDate().toString());
//     values.push(log ? log.calories || log.calorie : Math.floor(1800 + Math.random() * 400));
//   }

//   return { labels, values };
// }

// ===== DUMMY WEEKLY & MONTHLY CALORIE TREND =====
export function getWeeklyCalories(state) {
  // dummy data 7 hari
  return [
    { label: "Sen", calorie: 2000 },
    { label: "Sel", calorie: 2100 },
    { label: "Rab", calorie: 1900 },
    { label: "Kam", calorie: 2200 },
    { label: "Jum", calorie: 2050 },
    { label: "Sab", calorie: 1950 },
    { label: "Min", calorie: 2150 },
  ];
}

export function getMonthlyCalories(state) {
  // dummy 4 minggu
  return [
    { label: "Minggu 1", calorie: 2000 },
    { label: "Minggu 2", calorie: 2100 },
    { label: "Minggu 3", calorie: 1950 },
    { label: "Minggu 4", calorie: 2050 },
  ];
}

