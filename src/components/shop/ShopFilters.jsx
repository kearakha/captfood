// src/components/shop/ShopFilters.jsx
"use client";

import React from "react";

export default function ShopFilters({ sortKey, setSortKey, sortOrder, setSortOrder }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-4 items-center">
      {/* left: sort key */}
      <div className="flex-1 w-full">
        <label className="sr-only">Sort by</label>
        <select
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value)}
          className="w-full border rounded-full py-3 px-4 bg-white shadow-sm appearance-none"
        >
          <option value="distance">Jarak Resto</option>
          <option value="price">Termurah</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      {/* right: order - sama lebar: flex-1; batasi lebar maksimal agar tidak terlalu lebar */}
      <div className="flex-1 w-full max-w-xs">
        <label className="sr-only">Order</label>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="w-full border rounded-full py-3 px-4 bg-white shadow-sm appearance-none"
        >
          <option value="asc">Terendah → Tertinggi</option>
          <option value="desc">Tertinggi → Terendah</option>
        </select>
      </div>
    </div>
  );
}
