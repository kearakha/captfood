"use client";

export default function Modal({ children, onClose, title }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-sm rounded-2xl p-6 relative">
        <button
          className="absolute top-3 right-4 text-xl"
          onClick={onClose}
        >
          ×
        </button>

        {title && (
          <h4 className="text-lg font-bold text-center mb-3">{title}</h4>
        )}

        {children}
      </div>
    </div>
  );
}
