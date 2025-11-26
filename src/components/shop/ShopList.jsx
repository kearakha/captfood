// src/components/shop/ShopList.jsx
"use client";

import React from "react";
import Image from "next/image";

function ShopListInner({ items }) {
  if (!items || items.length === 0) {
    return <div className="text-gray-500">Tidak ada restoran</div>;
  }

  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => (
        <div key={item.id} className="flex gap-3 bg-white rounded-xl p-3 shadow border border-gray-200">
          {/* image container: use fill + sizes or numeric width/height */}
          <div className="relative w-24 h-16 rounded-lg overflow-hidden bg-gray-200 shrink-0">
            <Image
              src={item.img}
              alt={item.name}
              fill
              sizes="96px"
              className="object-cover"
            />
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <p className="font-bold text-sm">{item.name}</p>
            <p className="text-xs text-gray-600">
              {item.dist} • {item.price} • {item.eta}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

// memo for perf; shallow compare props (good enough for items array identity)
export default React.memo(ShopListInner);
