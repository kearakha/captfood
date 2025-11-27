// app/(app)/shop/page.jsx
"use client";

import { useState, useMemo } from "react";
import ShopHero from "@/components/shop/ShopHero";
import ShopList from "@/components/shop/ShopList";
import ShopFilters from "@/components/shop/ShopFilters";
import NotifyModal from "@/components/shop/NotifyModal";
import generateDummy from "@/lib/shop/generateDummy";

export default function ShopPage() {
  const [heroImg] = useState(() => {
    try {
      return (
        sessionStorage.getItem("captfood:hero") ||
        "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=1200&q=80"
      );
    } catch {
      return "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=1200&q=80";
    }
  });

  const [title] = useState(() => {
    try {
      return sessionStorage.getItem("captfood:title") || "Ayam Bakar";
    } catch {
      return "Ayam Bakar";
    }
  });

  const [restaurants] = useState(() => {
    try {
      return generateDummy(title, heroImg);
    } catch {
      return [];
    }
  });

  const [sortKey, setSortKey] = useState("distance");
  const [sortOrder, setSortOrder] = useState("asc");

  const sorted = useMemo(() => {
    if (!restaurants) return [];

    const parseDistance = (d) => {
      if (!d) return Infinity;
      const m = String(d).match(/(\d+(\.\d+)?)/);
      return m ? Number(m[0]) : Infinity;
    };

    const parsePriceLow = (p) => {
      if (!p) return Infinity;
      const m = String(p).match(/(\d+)(?=[^\d]*[-–])/);
      return m ? Number(m[1]) : Number(String(p).match(/(\d+)/)?.[0] ?? Infinity);
    };

    const coll = [...restaurants];
    coll.sort((a, b) => {
      let av = 0;
      let bv = 0;

      if (sortKey === "distance") {
        av = parseDistance(a.dist);
        bv = parseDistance(b.dist);
      } else if (sortKey === "price") {
        av = parsePriceLow(a.price);
        bv = parsePriceLow(b.price);
      } else if (sortKey === "rating") {
        av = a.rating ?? 0;
        bv = b.rating ?? 0;
      }

      if (av === bv) return 0;
      return sortOrder === "asc" ? av - bv : bv - av;
    });

    return coll;
  }, [restaurants, sortKey, sortOrder]);

  const [notifyOpen, setNotifyOpen] = useState(false);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="px-4 py-6 max-w-[1000px] mx-auto">
        {/* HERO */}
        <section className="mb-4">
          <ShopHero
            img={heroImg}
            title={title}
            onNotify={() => setNotifyOpen(true)}
            onBack={() => history.back()}
          />
        </section>

        {/* FILTER CARD */}
        <section className="mb-4">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-3">
            <ShopFilters
              sortKey={sortKey}
              setSortKey={setSortKey}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
            />
          </div>
        </section>

        {/* LIST RESTO */}
        <section>
          <h3 className="text-lg font-semibold mb-2">
            Rekomendasi Restoran Dekatmu
          </h3>
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm">
            <ShopList items={sorted} />
          </div>
        </section>
      </div>

      <NotifyModal
        open={notifyOpen}
        onClose={() => setNotifyOpen(false)}
        img={heroImg}
        title={title}
      />
    </main>
  );
}
