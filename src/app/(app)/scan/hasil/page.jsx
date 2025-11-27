"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Komponen
import NutrisiCard from "@/components/scan/NutrisiCard";
import Modal from "@/components/scan/Modal";

// Icons
import {
  faFire,
  faDrumstickBite,
  faBreadSlice,
  faDroplet,
  faRotateRight,
  faCheck,
  faSun,
  faCloudSun,
  faMoon,
  faCookie,
   faBowlFood, 
} from "@fortawesome/free-solid-svg-icons";

const MEAL_ORDER = ["breakfast", "lunch", "dinner", "snack"];
const MEAL_LABEL = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
  snack: "Snack/Etc",
};

export default function ScanResultPage() {
  const [img, setImg] = useState(null);

  // data random dari AI
  const seeds = [
    {
      title: "Nasi Ayam Teriyaki",
      sub: "Hasil identifikasi AI",
      desc: "Nasi putih, ayam teriyaki, tumis sayur. Porsi 1 mangkuk kecil.",
      macro: { p: 24, c: 65, f: 12 },
    },
    {
      title: "Mie Goreng Telur",
      sub: "Hasil identifikasi AI",
      desc: "Mi goreng rumahan dengan telur orak-arik. Porsi sedang.",
      macro: { p: 16, c: 58, f: 18 },
    },
    {
      title: "Sate Ayam + Lontong",
      sub: "Hasil identifikasi AI",
      desc: "10 tusuk sate ayam, bumbu kacang, 1 potong lontong.",
      macro: { p: 28, c: 44, f: 20 },
    },
    {
      title: "Salad Buah Yogurt",
      sub: "Hasil identifikasi AI",
      desc: "Buah segar + yogurt rendah lemak. Tekstur ringan & segar.",
      macro: { p: 10, c: 40, f: 6 },
    },
  ];

  const kcal = (p, c, f) => Math.round(4 * p + 4 * c + 9 * f);

  // init stabil untuk SSR
  const [item, setItem] = useState(seeds[0]);

  const [addOpen, setAddOpen] = useState(false);
  const [suggestOpen, setSuggestOpen] = useState(false);
  const [suggestMeal, setSuggestMeal] = useState("Lunch");

  // meal yang SUDAH terisi hari ini (untuk filter tombol Add to)
  const [takenMealsToday, setTakenMealsToday] = useState({
    breakfast: false,
    lunch: false,
    dinner: false,
    snack: false,
  });

  // ❗ meal yang “dipaksa” dari QuickAccess (captfood:lastMeal)
  const [fixedMeal, setFixedMeal] = useState(null);

  const nextMeal = (meal) => {
    const idx = MEAL_ORDER.indexOf(meal);
    if (idx < 0) return "lunch";
    return MEAL_ORDER[Math.min(idx + 1, MEAL_ORDER.length - 1)];
  };

  // ambil foto dari sessionStorage
  useEffect(() => {
    const d = sessionStorage.getItem("captfood:lastScan");
    if (!d) return;
    queueMicrotask(() => setImg(d));
  }, []);

  // random pilihan menu hanya di client → hindari hydration error
  useEffect(() => {
    const pick = seeds[Math.floor(Math.random() * seeds.length)];
    setItem({ ...pick });
  }, []);

    // baca lastMeal (kalau datang dari QuickAccess) → ONE SHOT
  useEffect(() => {
    try {
      const m = sessionStorage.getItem("captfood:lastMeal");
      if (!m) return;

      const key = m.toLowerCase();
      if (MEAL_ORDER.includes(key)) {
        setFixedMeal(key);
      }

      // ❗ sangat penting: hapus setelah dipakai
      sessionStorage.removeItem("captfood:lastMeal");
    } catch {
      // ignore
    }
  }, []);


  // helper: cek entries hari ini → meal mana saja yang sudah terisi
  const refreshTakenMeals = () => {
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

      for (const e of entries) {
        if (!e?.meal || !e?.at) continue;
        const d = new Date(e.at);
        if (Number.isNaN(d.getTime())) continue;
        if (!isSameDay(d, today)) continue;

        const mealKey = (e.meal || "").toLowerCase();
        if (status.hasOwnProperty(mealKey)) {
          status[mealKey] = true;
        }
      }

      setTakenMealsToday(status);
    } catch {
      // abaikan error
    }
  };

  // panggil sekali saat halaman dibuka
  useEffect(() => {
    refreshTakenMeals();
  }, []);

  const handleRefresh = () => {
    const jitter = (v) =>
      Math.max(0, Math.round(v + (Math.random() * 0.24 - 0.12) * v));

    setItem((prev) => ({
      ...prev,
      macro: {
        p: jitter(prev.macro.p),
        c: jitter(prev.macro.c),
        f: jitter(prev.macro.f),
      },
    }));
  };

  // ✅ kalau fixedMeal ada (dari QuickAccess) → langsung simpan tanpa modal
  const handleDone = () => {
    refreshTakenMeals();

    if (fixedMeal && MEAL_ORDER.includes(fixedMeal)) {
      chooseMeal(fixedMeal);
    } else {
      setAddOpen(true);
    }
  };

  const chooseMeal = (meal) => {
    const entry = {
      at: new Date().toISOString(),
      meal,
      title: item.title,
      macro: { ...item.macro },
      kcal: kcal(item.macro.p, item.macro.c, item.macro.f),
      photo: img || null,
    };

    try {
      const key = "captfood:entries";
      const prev = JSON.parse(localStorage.getItem(key) || "[]");
      prev.push(entry);
      localStorage.setItem(key, JSON.stringify(prev));
    } catch {}

    setAddOpen(false);

    const next = nextMeal(meal);
    setSuggestMeal(MEAL_LABEL[next]);
    setSuggestOpen(true);
  };

  const goDashboard = () => (window.location.href = "/dashboard");
  const goReco = () =>
    (window.location.href = `/recomenai?meal=${suggestMeal.toLowerCase()}`);

  const availableMeals = MEAL_ORDER.filter(
    (m) => m === "snack" || !takenMealsToday[m]
  );

  const mealIcon = {
    breakfast: faSun,
    lunch: faCloudSun,
    dinner: faMoon,
    snack: faCookie,
  };

  const mealAccent = {
    breakfast: "bg-yellow-50 text-yellow-600",
    lunch: "bg-blue-50 text-blue-600",
    dinner: "bg-indigo-50 text-indigo-600",
    snack: "bg-emerald-50 text-emerald-600",
  };

  return (
    <main className="max-w-3xl mx-auto p-4 pb-20">
      <h1 className="text-xl font-bold mb-4 text-center">Hasil Scan</h1>

      <section className="bg-white border border-gray-300 rounded-2xl shadow-lg overflow-hidden">
        <div className="p-4">
          <div className="rounded-xl overflow-hidden bg-gray-200 aspect-video">
            {img && (
              <Image
                src={img}
                alt="Hasil Scan"
                width={900}
                height={600}
                className="object-cover w-full h-full"
              />
            )}
          </div>
        </div>

        <div className="bg-gray-50 border-t border-gray-200 p-6 text-center">
          <h2 className="text-2xl font-extrabold mb-1">{item.title}</h2>
          <p className="text-sm text-gray-600 mb-4">{item.sub}</p>

          {/* NUTRISI */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <NutrisiCard
              icon={faFire}
              label="Kalori"
              value={`${kcal(item.macro.p, item.macro.c, item.macro.f)} kcal`}
              color="text-orange-500 bg-orange-100"
            />
            <NutrisiCard
              icon={faDrumstickBite}
              label="Protein"
              value={`${item.macro.p} g`}
              color="text-purple-600 bg-purple-100"
            />
            <NutrisiCard
              icon={faBreadSlice}
              label="Karbo"
              value={`${item.macro.c} g`}
              color="text-yellow-600 bg-yellow-100"
            />
            <NutrisiCard
              icon={faDroplet}
              label="Lemak"
              value={`${item.macro.f} g`}
              color="text-blue-600 bg-blue-100"
            />
          </div>

          <p className="text-sm text-gray-700 max-w-xl mx-auto mt-4 mb-6">
            {item.desc}
          </p>

          <div className="flex gap-3 justify-between items-center">
            <button
              onClick={handleRefresh}
              className="flex-1 py-3 rounded-full bg-gray-100 font-semibold border border-gray-300"
            >
              <i className="mr-2">
                <FontAwesomeIcon icon={faRotateRight} />
              </i>
              Refresh
            </button>

            <button
              onClick={handleDone}
              className="px-6 py-3 rounded-full bg-green-500 text-white font-bold"
            >
              <i className="mr-2">
                <FontAwesomeIcon icon={faCheck} />
              </i>
              Done
            </button>
          </div>
        </div>
      </section>

      {/* MODAL ADD TO — hanya muncul kalau fixedMeal TIDAK ada */}
      {addOpen && (
        <Modal onClose={() => setAddOpen(false)} title="Add to?">
          <p className="text-xs text-gray-500 mb-3 text-center">
            Pilih waktu makan yang ingin kamu isi untuk hari ini.
          </p>

          <div className="space-y-2">
            {availableMeals.map((m) => (
              <button
                key={m}
                onClick={() => chooseMeal(m)}
                className={`w-full flex items-center justify-between rounded-xl border bg-white px-3 py-2 text-sm hover:shadow-md transition-shadow ${mealAccent[m]}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/70 shadow-inner">
                    <FontAwesomeIcon icon={mealIcon[m]} className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">
                      {MEAL_LABEL[m]}
                    </p>
                    <p className="text-[10px] text-gray-500">
                      Catat menu ini sebagai{" "}
                      {MEAL_LABEL[m].toLowerCase()}.
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-medium text-gray-600">
                  Pilih
                </span>
              </button>
            ))}
          </div>

          {availableMeals.length === 0 && (
            <p className="text-sm text-gray-500 mt-3 text-center">
              Semua meal utama hari ini sudah terisi. Kamu bisa menambah
              makanan lain sebagai snack dari dashboard.
            </p>
          )}
        </Modal>
      )}

           {/* MODAL SUGGEST */}
      {suggestOpen && (
        <Modal onClose={() => setSuggestOpen(false)}>
          <div className="text-center mb-4">
            <p className="text-sm font-semibold text-gray-800">
              Ingin mencoba rekomendasi AI untuk
            </p>
            <p className="text-lg font-extrabold text-gray-900 mt-1">
              {suggestMeal} ?
            </p>
          </div>

          <div className="flex gap-3 pt-1">
            <button
              className="opt flex-1 bg-gray-100 border border-gray-200 rounded-full py-3 text-sm font-semibold text-gray-800 hover:bg-gray-200 transition"
              onClick={goDashboard}
            >
              Nanti
            </button>

            <button
              className="opt flex-1 bg-green-500 border border-green-500 rounded-full py-3 text-sm font-semibold text-white shadow hover:bg-green-600 transition"
              onClick={goReco}
            >
              Coba
            </button>
          </div>
        </Modal>
      )}

    </main>
  );
}
