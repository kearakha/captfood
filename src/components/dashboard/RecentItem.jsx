import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDrumstickBite, faBreadSlice, faCheese } from "@fortawesome/free-solid-svg-icons";

export default function RecentItem({ item }) {
  if (!item) return null;

  return (
    <div className="flex items-center bg-white rounded-xl p-3 shadow-sm mb-3">
      
      {/* Image */}
      <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
        <Image 
          src={item.image}
          alt={item.name}
          width={64}
          height={64}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Text */}
      <div className="flex-1 ml-4">
        <p className="text-[15px] font-semibold text-gray-800">{item.name}</p>
        <small className="text-xs text-gray-500 block">{item.meal}</small>

        <p className="text-[13px] font-medium text-gray-800 mt-1">
          {item.calories} Calories
        </p>

        {/* Nutrients */}
        <p className="text-xs text-gray-500 mt-1 flex items-center gap-4">

          <span className="flex items-center gap-1">
            <FontAwesomeIcon icon={faDrumstickBite} className="text-purple-600 w-4" />
            {item.protein}g
          </span>

          <span className="flex items-center gap-1">
            <FontAwesomeIcon icon={faBreadSlice} className="text-yellow-600 w-4" />
            {item.carb}g
          </span>

          <span className="flex items-center gap-1">
            <FontAwesomeIcon icon={faCheese} className="text-blue-600 w-4" />
            {item.fat}g
          </span>

        </p>
      </div>

      <div className="text-xs font-semibold text-blue-600 shrink-0 ml-3">
        {item.time}
      </div>

    </div>
  );
}
