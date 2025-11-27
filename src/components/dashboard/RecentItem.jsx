"use client";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDrumstickBite,
  faBreadSlice,
  faDroplet,
} from "@fortawesome/free-solid-svg-icons";

export default function RecentItem({ item }) {
  // aman: kalau tidak ada image → null, bukan string kosong
  const thumbSrc = item?.image || null;

  return (
    <div className="flex items-center justify-between bg-white rounded-xl shadow-sm p-3 mb-3">
      <div className="flex items-center gap-3">
        {/* Thumbnail */}
        <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-gray-100">
          {thumbSrc ? (
            <Image
              src={thumbSrc}
              alt={item.name}
              width={64}
              height={64}
              className="object-cover w-full h-full"
            />
          ) : (
            // fallback kalau tidak ada foto
            <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400">
              No photo
            </div>
          )}
        </div>

        {/* Info makanan */}
        <div>
          <p className="font-semibold text-sm text-gray-900">
            {item.name}
          </p>
          <p className="text-xs text-gray-500">{item.meal}</p>

          <p className="text-xs text-gray-600 mt-1">
            {item.calories} Calories
          </p>

          <div className="flex items-center gap-3 text-[11px] text-gray-600 mt-1">
            <span className="flex items-center gap-1">
              <FontAwesomeIcon
                icon={faDrumstickBite}
                className="text-purple-500"
              />
              {item.protein}g
            </span>
            <span className="flex items-center gap-1">
              <FontAwesomeIcon
                icon={faBreadSlice}
                className="text-yellow-500"
              />
              {item.carb}g
            </span>
            <span className="flex items-center gap-1">
              <FontAwesomeIcon
                icon={faDroplet}
                className="text-blue-500"
              />
              {item.fat}g
            </span>
          </div>
        </div>
      </div>

      {/* Jam */}
      <div className="text-xs font-semibold text-blue-600">
        {item.time}
      </div>
    </div>
  );
}
