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
} from "@fortawesome/free-solid-svg-icons";

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

  const [item, setItem] = useState(() => {
    const pick = seeds[Math.floor(Math.random() * seeds.length)];
    return { ...pick };
  });

  const [addOpen, setAddOpen] = useState(false);
  const [suggestOpen, setSuggestOpen] = useState(false);
  const [suggestMeal, setSuggestMeal] = useState("Lunch");

  const MEAL_ORDER = ["breakfast", "lunch", "dinner", "snack"];
  const MEAL_LABEL = {
    breakfast: "Breakfast",
    lunch: "Lunch",
    dinner: "Dinner",
    snack: "Snack/Etc",
  };

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

  const handleDone = () => setAddOpen(true);

  const chooseMeal = (meal) => {
    const entry = {
      at: new Date().toISOString(),
      meal,
      title: item.title,
      macro: { ...item.macro },
      kcal: kcal(item.macro.p, item.macro.c, item.macro.f),
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

          {/* DESCRIPTION */}
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

      {/* MODAL ADD */}
      {addOpen && (
        <Modal onClose={() => setAddOpen(false)} title="Add to?">
          {["breakfast", "lunch", "dinner", "snack"].map((m) => (
            <button
              key={m}
              className="opt w-full bg-gray-100 border rounded-full py-3 font-semibold mb-2"
              onClick={() => chooseMeal(m)}
            >
              {MEAL_LABEL[m]}
            </button>
          ))}
        </Modal>
      )}

      {/* MODAL SUGGEST */}
      {suggestOpen && (
        <Modal onClose={() => setSuggestOpen(false)}>
          <h4 className="text-lg font-bold text-center mb-3">
            Ingin mencoba rekomendasi AI untuk {suggestMeal}?
          </h4>
          <div className="flex gap-3">
            <button
              className="flex-1 opt bg-gray-100 border rounded-full py-3 font-semibold"
              onClick={goDashboard}
            >
              Nanti
            </button>
            <button
              className="flex-1 opt bg-gray-100 border rounded-full py-3 font-semibold"
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
