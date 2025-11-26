'use client'

export default function BodyMetricModal({
  open,
  title,
  value,
  onClose,
  onSave
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-xl w-80 shadow-xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute right-3 top-2 text-gray-400 text-xl"
          onClick={onClose}
        >
          ×
        </button>

        <h2 className="text-lg font-semibold text-gray-800 mb-3 text-center">
          {title}
        </h2>

        <input
          type="number"
          defaultValue={value}
          step="0.1"
          className="w-full border rounded-md px-3 py-2 text-center text-lg"
          id="modal-input"
        />

        <button
          onClick={() => {
            const inputValue = parseFloat(
              document.getElementById("modal-input").value
            );
            onSave(inputValue);
          }}
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md mt-4"
        >
          Simpan
        </button>
      </div>
    </div>
  );
}
