"use client";

export default function Error({ error, reset }) {
  return (
    <div className="p-6 bg-red-50 border border-red-200 rounded-xl">
      <h3 className="text-lg font-bold text-red-700 mb-1">
        Failed to load Addis Eats menu
      </h3>
      <p className="text-xs text-red-600 mb-4">
        {error?.message || "An unexpected error occurred while loading this segment."}
      </p>
      <button
        onClick={() => reset()}
        className="px-3.5 py-1.5 bg-red-600 text-white text-xs font-bold rounded hover:bg-red-700"
      >
        Try Again
      </button>
    </div>
  );
}