// src/components/shop/ShopFilters.jsx
"use client";

const SORT_LABEL = {
  distance: "Jarak",
  price: "Harga",
  rating: "Rating",
};

export default function ShopFilters({
  sortKey,
  setSortKey,
  sortOrder,
  setSortOrder,
}) {
  const handleKeyChange = (key) => {
    setSortKey(key);
  };

  const toggleOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {/* segmented control: Jarak / Harga / Rating */}
      <div className="inline-flex rounded-full bg-gray-100 p-1">
        {["distance", "price", "rating"].map((key) => {
          const active = sortKey === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => handleKeyChange(key)}
              className={`px-4 py-1.5 text-xs sm:text-sm rounded-full font-medium transition-all
                ${
                  active
                    ? "bg-white shadow-sm text-gray-900"
                    : "text-gray-500 hover:text-gray-800"
                }`}
            >
              {SORT_LABEL[key]}
            </button>
          );
        })}
      </div>

      {/* tombol urutan */}
      <button
        type="button"
        onClick={toggleOrder}
        className="w-full sm:w-auto px-4 py-2 text-xs sm:text-sm rounded-full border border-gray-300 bg-white font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-1"
      >
        {sortOrder === "asc" ? "Terendah → Tertinggi" : "Tertinggi → Terendah"}
      </button>
    </div>
  );
}
