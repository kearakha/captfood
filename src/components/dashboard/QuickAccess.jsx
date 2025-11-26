'use client';

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faSun,
  faCloudSun,
  faMoon,
  faCookie
} from "@fortawesome/free-solid-svg-icons";

export default function QuickAccess() {
  return (
    <div className="grid grid-cols-4 gap-3 mt-4">

      {/* Breakfast */}
      <Link 
        href="/add?meal=breakfast"
        className="bg-white p-4 rounded-xl shadow-sm flex flex-col items-center cursor-pointer"
      >
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-yellow-100 text-yellow-600 mb-1 shadow-inner">
          <FontAwesomeIcon icon={faSun} className="w-5 h-5" />
        </div>
        <span className="text-xs">Breakfast</span>
      </Link>

      {/* Lunch */}
      <Link
        href="/add?meal=lunch"
        className="bg-white p-4 rounded-xl shadow-sm flex flex-col items-center cursor-pointer"
      >
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-100 text-blue-600 mb-1 shadow-inner">
          <FontAwesomeIcon icon={faCloudSun} className="w-5 h-5" />
        </div>
        <span className="text-xs">Lunch</span>
      </Link>

      {/* Dinner */}
      <Link 
        href="/add?meal=dinner"
        className="bg-white p-4 rounded-xl shadow-sm flex flex-col items-center cursor-pointer"
      >
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-indigo-100 text-indigo-600 mb-1 shadow-inner">
          <FontAwesomeIcon icon={faMoon} className="w-5 h-5" />
        </div>
        <span className="text-xs">Dinner</span>
      </Link>

      {/* Snack */}
      <Link 
        href="/add?meal=snack"
        className="bg-white p-4 rounded-xl shadow-sm flex flex-col items-center cursor-pointer"
      >
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-green-100 text-green-600 mb-1 shadow-inner">
          <FontAwesomeIcon icon={faCookie} className="w-5 h-5" />
        </div>
        <span className="text-xs">Snack</span>
      </Link>

    </div>
  );
}
