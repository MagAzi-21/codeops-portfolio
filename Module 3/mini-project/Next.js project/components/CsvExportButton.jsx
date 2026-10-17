"use client";

export default function CsvExportButton({ data, filename = "orders.csv" }) {
  function formatCsvCell(val) {
    const s = String(val ?? "");
    // Quote fields containing commas, quotes, or newlines, doubling existing quotes[cite: 57, 58]
    if (/[",\n\r]/.test(s)) {
      return `"${s.replace(/"/g, '""')}"`;
    }
    return s;
  }

  function handleDownloadCsv() {
    if (!data || data.length === 0) return;

    // Build headers from object keys
    const headers = ["id", "customer", "date", "area", "item", "total", "status", "notes"];
    const headerRow = headers.map(formatCsvCell).join(",");
    const bodyRows = data.map((row) =>
      headers.map((h) => formatCsvCell(row[h])).join(",")
    );

    const csvContent = [headerRow, ...bodyRows].join("\r\n");

    // Client-side Blob creation with memory cleanup[cite: 57]
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Revoke object URL immediately to release browser memory[cite: 57]
    URL.revokeObjectURL(url);
  }

  return (
    <button
      onClick={handleDownloadCsv}
      className="px-3.5 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition"
    >
      Download Orders CSV (Escaped)
    </button>
  );
}