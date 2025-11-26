"use client";

import { useState, useMemo } from "react";
import ShopHero from "@/components/shop/ShopHero";
import ShopList from "@/components/shop/ShopList"; // yang sudah ada
import ShopFilters from "@/components/shop/ShopFilters";
import NotifyModal from "@/components/shop/NotifyModal";
import generateDummy from "@/lib/shop/generateDummy";

export default function ShopPage() {
  // lazy read sessionStorage once — safe because "use client"
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

  // filter/sort state
  const [sortKey, setSortKey] = useState("distance"); // 'distance' | 'price' | 'rating'
  const [sortOrder, setSortOrder] = useState("asc"); // 'asc' | 'desc'

  const sorted = useMemo(() => {
    if (!restaurants) return [];
    // create numeric values we can sort by: distance (m), price (low), rating
    const parseDistance = (d) => {
      if (!d) return Infinity;
      const m = String(d).match(/(\d+(\.\d+)?)/);
      return m ? Number(m[0]) : Infinity;
    };
    const parsePriceLow = (p) => {
      if (!p) return Infinity;
      // assume format "9–21 ribu" or "9-21 ribu"
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

  // notify modal open state
  const [notifyOpen, setNotifyOpen] = useState(false);

  return (
    <div className="px-4 py-6 max-w-[1000px] mx-auto">
      <ShopHero
        img={heroImg}
        onNotify={() => setNotifyOpen(true)}
        onBack={() => history.back()}
      />

      <ShopFilters
        sortKey={sortKey}
        setSortKey={setSortKey}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

      <div className="mt-4">
        <ShopList items={sorted} />
      </div>

      <NotifyModal open={notifyOpen} onClose={() => setNotifyOpen(false)} img={heroImg} title={title} />
    </div>
  );
}
