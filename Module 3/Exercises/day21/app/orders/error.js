"use client";

export default function Error({ error, reset }) {
  return (
    <div className="p-8 border border-red-200 bg-red-50 rounded-2xl text-center space-y-3">
      <h3 className="font-bold text-red-700 text-base">Failed to load order history</h3>
      <p className="text-xs text-red-600">{error?.message || "A network or server error prevented loading."}</p>
      <button
        onClick={() => reset()}
        className="px-4 py-1.5 bg-red-600 text-white text-xs font-bold rounded-lg hover:bg-red-700 transition"
      >
        Retry Loading
      </button>
    </div>
  );
}