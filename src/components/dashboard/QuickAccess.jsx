"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faCloudSun,
  faMoon,
  faCookie,
  faFire,
  faDrumstickBite,
  faBreadSlice,
  faDroplet,
} from "@fortawesome/free-solid-svg-icons";

const MEAL_LABEL = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
  snack: "Snack",
};

export default function QuickAccess() {
  const router = useRouter();

  const [mealStatus, setMealStatus] = useState({
    breakfast: false,
    lunch: false,
    dinner: false,
    snack: false,
  });

  const [mealEntries, setMealEntries] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
    snack: [],
  });

  const [detailMeal, setDetailMeal] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const raw = localStorage.getItem("captfood:entries");
      if (!raw) return;

      const entries = JSON.parse(raw);
      const today = new Date();

      const isSameDay = (d1, d2) =>
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();

      const status = {
        breakfast: false,
        lunch: false,
        dinner: false,
        snack: false,
      };

      const grouped = {
        breakfast: [],
        lunch: [],
        dinner: [],
        snack: [],
      };

      for (const e of entries) {
        if (!e?.meal || !e?.at) continue;
        const d = new Date(e.at);
        if (Number.isNaN(d.getTime())) continue;
        if (!isSameDay(d, today)) continue;

        const mealKey = (e.meal || "").toLowerCase();
        if (status.hasOwnProperty(mealKey)) {
          status[mealKey] = true;
          grouped[mealKey].push(e);
        }
      }

      setMealStatus(status);
      setMealEntries(grouped);
    } catch {
      // ignore
    }
  }, []);

 const handleQuickMeal = (meal) => {
  if (!mealStatus[meal]) {
    // BELUM ada log untuk meal ini → pergi ke kamera
    if (typeof window !== "undefined") {
      sessionStorage.setItem("captfood:lastMeal", meal);
      sessionStorage.setItem("captfood:lastMealSource", "quick");
    }
    router.push("/scan");
  } else {
    // SUDAH ada log → tampilkan popup detail
    setDetailMeal(meal);
  }
};


  const baseCard =
    "p-4 rounded-xl shadow-sm flex flex-col items-center cursor-pointer border transition-all";

  const renderCard = (mealKey, icon, iconBg, iconColor) => {
    const isLogged = mealStatus[mealKey];

    return (
      <button
        key={mealKey}
        type="button"
        onClick={() => handleQuickMeal(mealKey)}
        className={
          baseCard +
          " " +
          (isLogged
            ? "bg-green-50 border-green-400"
            : "bg-white border-transparent")
        }
      >
        <div
          className={
            "w-10 h-10 rounded-full flex items-center justify-center mb-1 shadow-inner " +
            iconBg +
            " " +
            iconColor
          }
        >
          <FontAwesomeIcon icon={icon} className="w-5 h-5" />
        </div>
        <span className="text-xs font-medium">{MEAL_LABEL[mealKey]}</span>
        <span
          className={
            "text-[10px] mt-0.5 " +
            (isLogged ? "text-green-600" : "text-gray-400")
          }
        >
          {isLogged ? "" : "Add meal"}
        </span>
      </button>
    );
  };

  // entry terakhir utk breakfast/lunch/dinner
  const currentEntry =
    detailMeal &&
    detailMeal !== "snack" &&
    mealEntries[detailMeal]?.length
      ? mealEntries[detailMeal][mealEntries[detailMeal].length - 1]
      : null;

  const kcal = (p, c, f) =>
    Math.round(4 * (p ?? 0) + 4 * (c ?? 0) + 9 * (f ?? 0));

  // foto untuk modal meal utama
  const currentPhoto =
    currentEntry?.photo || currentEntry?.image || null;

  // snack entries (boleh banyak)
  const snackEntries = detailMeal === "snack" ? mealEntries.snack || [] : [];

  const snackTotals =
    detailMeal === "snack"
      ? snackEntries.reduce(
          (acc, e) => {
            const p = e.macro?.p ?? 0;
            const c = e.macro?.c ?? 0;
            const f = e.macro?.f ?? 0;
            acc.p += p;
            acc.c += c;
            acc.f += f;
            acc.kcal += e.kcal ?? kcal(p, c, f);
            return acc;
          },
          { p: 0, c: 0, f: 0, kcal: 0 }
        )
      : null;

  return (
    <>
      <div className="grid grid-cols-4 gap-3 mt-4">
        {renderCard("breakfast", faSun, "bg-yellow-100", "text-yellow-600")}
        {renderCard("lunch", faCloudSun, "bg-blue-100", "text-blue-600")}
        {renderCard("dinner", faMoon, "bg-indigo-100", "text-indigo-600")}
        {renderCard("snack", faCookie, "bg-green-100", "text-green-600")}
      </div>

      {/* POPUP DETAIL */}
      {detailMeal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-sm font-semibold">
                {MEAL_LABEL[detailMeal]} – Today
              </h4>
              <button
                className="text-xs text-gray-500"
                onClick={() => setDetailMeal(null)}
              >
                Close
              </button>
            </div>

            {/* === CASE 1: BREAKFAST / LUNCH / DINNER === */}
            {detailMeal !== "snack" ? (
              currentEntry ? (
                <>
                  <div className="rounded-xl overflow-hidden bg-gray-100 aspect-[4/3] mb-3">
                    {currentPhoto ? (
                      <Image
                        src={currentPhoto}
                        alt={currentEntry.title || "Meal photo"}
                        width={600}
                        height={400}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                        No photo
                      </div>
                    )}
                  </div>

                  <p className="text-base font-bold text-center mb-1">
                    {currentEntry.title ?? "Your meal"}
                  </p>
                  <p className="text-[11px] text-center text-gray-500 mb-3">
                    Logged at{" "}
                    {new Date(currentEntry.at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>

                  <div className="grid grid-cols-4 gap-2 mb-2 text-[11px]">
                    <div className="rounded-xl border bg-orange-50 px-2 py-1 text-center">
                      <FontAwesomeIcon
                        icon={faFire}
                        className="w-3 h-3 mb-1"
                      />
                      <div className="font-semibold">
                        {currentEntry.kcal ??
                          kcal(
                            currentEntry.macro?.p,
                            currentEntry.macro?.c,
                            currentEntry.macro?.f
                          )}{" "}
                        kcal
                      </div>
                      <div className="text-[10px] text-gray-500">Kalori</div>
                    </div>
                    <div className="rounded-xl border bg-purple-50 px-2 py-1 text-center">
                      <FontAwesomeIcon
                        icon={faDrumstickBite}
                        className="w-3 h-3 mb-1"
                      />
                      <div className="font-semibold">
                        {currentEntry.macro?.p ?? 0} g
                      </div>
                      <div className="text-[10px] text-gray-500">Protein</div>
                    </div>
                    <div className="rounded-xl border bg-yellow-50 px-2 py-1 text-center">
                      <FontAwesomeIcon
                        icon={faBreadSlice}
                        className="w-3 h-3 mb-1"
                      />
                      <div className="font-semibold">
                        {currentEntry.macro?.c ?? 0} g
                      </div>
                      <div className="text-[10px] text-gray-500">Karbo</div>
                    </div>
                    <div className="rounded-xl border bg-blue-50 px-2 py-1 text-center">
                      <FontAwesomeIcon
                        icon={faDroplet}
                        className="w-3 h-3 mb-1"
                      />
                      <div className="font-semibold">
                        {currentEntry.macro?.f ?? 0} g
                      </div>
                      <div className="text-[10px] text-gray-500">Lemak</div>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-xs text-gray-500">
                  No entries for this meal today.
                </p>
              )
            ) : (
              /* === CASE 2: SNACK → banyak item, tanpa foto === */
              <>
                {snackEntries.length === 0 ? (
                  <p className="text-xs text-gray-500">
                    No snack entries today.
                  </p>
                ) : (
                  <>
                    <div className="mb-3 text-[11px] rounded-xl bg-gray-50 border px-3 py-2">
                      <p className="font-semibold mb-1">
                        Snack summary today
                      </p>
                      <p className="text-gray-600">
                        {snackTotals.kcal} kcal · P {snackTotals.p} g · C{" "}
                        {snackTotals.c} g · F {snackTotals.f} g
                      </p>
                    </div>

                    <ul className="space-y-2 max-h-56 overflow-y-auto text-[11px]">
                      {snackEntries.map((e, idx) => (
                        <li
                          key={idx}
                          className="border border-gray-100 rounded-xl px-3 py-2 flex justify-between items-center"
                        >
                          <div>
                            <p className="font-semibold text-gray-800">
                              {e.title ?? `Snack ${idx + 1}`}
                            </p>
                            <p className="text-gray-600">
                              {(e.kcal ??
                                kcal(
                                  e.macro?.p,
                                  e.macro?.c,
                                  e.macro?.f
                                )) || 0}{" "}
                              kcal · P {e.macro?.p ?? 0} g · C{" "}
                              {e.macro?.c ?? 0} g · F {e.macro?.f ?? 0} g
                            </p>
                          </div>
                          <span className="text-[10px] text-gray-400">
                            {new Date(e.at).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
