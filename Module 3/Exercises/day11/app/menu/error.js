"use client";

export default function Error({ error, reset }) {
  return (
    <div className="p-4 bg-red-50 border border-red-200 rounded">
      <h3 className="text-red-700 font-bold mb-1">Failed to load menu</h3>
      <p className="text-red-600 text-sm mb-3">{error.message || "An error occurred"}</p>
      <button onClick={() => reset()} className="px-3 py-1 bg-red-600 text-white rounded text-sm">
        Retry
      </button>
    </div>
  );
}