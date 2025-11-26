"use client";

import Image from "next/image";
import React from "react";
import { kcal } from "@/lib/recomenai/items";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDrumstickBite, faBreadSlice, faDroplet } from "@fortawesome/free-solid-svg-icons";
import { FireIcon } from "@heroicons/react/24/solid";


export default function RecoCard({ item, onTryAnother, onDone, onOrder, onAddTo }) {
  if (!item) return null;

  const calVal = kcal(item.macro.p, item.macro.c, item.macro.f);

  return (
    <section className="max-w-3xl mx-auto">
      <div className="bg-white border border-gray-100 rounded-2xl shadow-lg overflow-hidden">
      <div className="p-4">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-800 px-5 py-1 rounded-full text-sm font-semibold border border-indigo-100">
              <i className="fa-regular fa-clock" aria-hidden />
              <span>{item.meal}</span>
            </span>
          </div>

          <div className="mx-auto w-full max-w-4xl rounded-xl overflow-hidden bg-gray-200 aspect-video md:aspect-video">
            <div className="relative w-full h-full">
              <Image
                src={item.img}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(min-width:1024px) 900px, 100vw"
                priority
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-50 border-t border-gray-100 p-6 text-center">
          <h2 className="text-2xl font-extrabold mb-1">{item.title}</h2>
          <p className="text-sm text-gray-600 mb-4">{item.sub}</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">

          {/* Calories */}
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow text-center">
            <div className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center 
                            bg-orange-100 text-orange-600 shadow-inner">
              <FireIcon className="w-6 h-6" />
            </div>
            <div className="text-xs font-semibold text-gray-500">Kalori</div>
            <div className="text-lg font-extrabold">{calVal} kcal</div>
          </div>
        
          {/* Protein */}
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow text-center">
            <div className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center 
                            bg-purple-100 text-purple-600 shadow-inner">
              <FontAwesomeIcon icon={faDrumstickBite} className="w-5 h-5" />
            </div>
            <div className="text-xs font-semibold text-gray-500">Protein</div>
            <div className="text-lg font-extrabold">{item.macro.p} g</div>
          </div>
        
          {/* Carbs */}
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow text-center">
            <div className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center 
                            bg-yellow-100 text-yellow-600 shadow-inner">
              <FontAwesomeIcon icon={faBreadSlice} className="w-5 h-5" />
            </div>
            <div className="text-xs font-semibold text-gray-500">Karbo</div>
            <div className="text-lg font-extrabold">{item.macro.c} g</div>
          </div>
        
          {/* Fat */}
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow text-center">
            <div className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center 
                            bg-blue-100 text-blue-600 shadow-inner">
              <FontAwesomeIcon icon={faDroplet} className="w-5 h-5" />
            </div>
            <div className="text-xs font-semibold text-gray-500">Lemak</div>
            <div className="text-lg font-extrabold">{item.macro.f} g</div>
          </div>
        
        </div>


          <div className="text-sm text-gray-700 max-w-xl mx-auto mb-4">{item.desc}</div>

          <div className="flex gap-3 justify-between items-center">
            <button
              onClick={onTryAnother}
              className="flex-1 py-3 rounded-full bg-gray-100 font-semibold border border-gray-200 cursor-pointer"
            >
              <i className="fa-solid fa-wand-magic-sparkles mr-2" /> Try Another
            </button>

            <div className="flex gap-3">
              <button onClick={() => onAddTo?.("breakfast")} className="py-3 px-4 rounded-full bg-white border border-gray-200 cursor-pointer">
                Add
              </button>
              <button onClick={onDone} className="py-3 px-4 rounded-full bg-green-500 text-white font-bold cursor-pointer">
                <i className="fa-solid fa-check" /> Done
              </button>
            </div>
          </div>

          <button onClick={onOrder} className="mt-4 w-full rounded-xl border border-gray-300 bg-gray-200 py-3 font-extrabold cursor-pointer">
            <i className="fa-solid fa-bag-shopping mr-2 " /> Order Now
          </button>
        </div>
      </div>
    </section>
  );
}
