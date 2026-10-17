"use client";

import { useEffect, useRef } from "react";

export default function DishDetailModal({ dish, onClose }) {
  const closeButtonRef = useRef(null);

  // Exercise 2: Focus moves into dialog on open, Escape key closes modal
  useEffect(() => {
    closeButtonRef.current?.focus();

    function handleKeyDown(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm"
    >
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4">
        <div className="flex justify-between items-start">
          <h2 id="modal-title" className="text-xl font-black text-slate-900">
            {dish.name}
          </h2>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close dialog"
            className="touch-target p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 font-bold"
          >
            ✕
          </button>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed">{dish.description}</p>
        <p className="text-xl font-bold text-amber-700">{dish.price} ETB</p>

        <div className="border-t pt-4 flex justify-end">
          <button
            onClick={onClose}
            className="touch-target px-5 py-2.5 bg-amber-600 text-white font-bold text-xs rounded-xl hover:bg-amber-700 transition"
          >
            Close Dialog (Esc)
          </button>
        </div>
      </div>
    </div>
  );
}