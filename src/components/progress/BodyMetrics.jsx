'use client'

import { useState } from "react";
import BodyMetricModal from "./BodyMetricModal";

export default function BodyMetrics({
  currentWeight,
  targetWeight,
  bmi,
  bmiStatus,
  onUpdateWeight,
  onUpdateTarget
}) {
  const [openWeightModal, setOpenWeightModal] = useState(false);
  const [openTargetModal, setOpenTargetModal] = useState(false);

  const bmiColor =
    bmiStatus === "Normal"
      ? "text-green-500"
      : bmiStatus === "Overweight"
      ? "text-orange-500"
      : bmiStatus === "Obese"
      ? "text-red-500"
      : "text-blue-500";

  return (
    <>
      {/* CARD */}
      <div className="bg-white rounded-2xl p-5 shadow mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Metrik Tubuh
        </h3>

        <div className="grid grid-cols-3 gap-3 mb-4">

          {/* Current weight */}
          <div className="bg-gray-100 p-4 rounded-xl text-center shadow-sm">
            <p className="text-xs text-gray-500 mb-1">Berat Saat Ini</p>
            <span className="text-3xl font-bold">{currentWeight}</span>
            <p className="text-xs font-medium text-gray-600 mt-1">kg</p>

            <button
              onClick={() => setOpenWeightModal(true)}
              className="mt-2 bg-blue-600 text-white text-sm px-3 py-1 rounded-md"
            >
              Ubah Berat
            </button>
          </div>

          {/* Target weight */}
          <div className="bg-gray-100 p-4 rounded-xl text-center shadow-sm">
            <p className="text-xs text-gray-500 mb-1">Target Berat</p>
            <span className="text-3xl font-bold">{targetWeight}</span>
            <p className="text-xs font-medium text-gray-600 mt-1">kg</p>

            <button
              onClick={() => setOpenTargetModal(true)}
              className="mt-2 bg-gray-700 text-white text-sm px-3 py-1 rounded-md"
            >
              Ubah Target
            </button>
          </div>

          {/* BMI */}
          <div className="bg-gray-100 p-4 rounded-xl text-center shadow-sm">
            <p className="text-xs text-gray-500 mb-1">BMI</p>
            <span className="text-3xl font-bold">{bmi}</span>
            <p className={`text-xs font-medium mt-1 ${bmiColor}`}>
              {bmiStatus}
            </p>
          </div>
        </div>
      </div>

      {/* MODALS */}
      <BodyMetricModal
        open={openWeightModal}
        title="Masukkan Berat Baru"
        value={currentWeight}
        onClose={() => setOpenWeightModal(false)}
        onSave={(v) => {
          onUpdateWeight(v);
          setOpenWeightModal(false);
        }}
      />

      <BodyMetricModal
        open={openTargetModal}
        title="Masukkan Target Berat Baru"
        value={targetWeight}
        onClose={() => setOpenTargetModal(false)}
        onSave={(v) => {
          onUpdateTarget(v);
          setOpenTargetModal(false);
        }}
      />
    </>
  );
}
