"use client";

export default function CsvExportButton({ data, filename = "orders.csv" }) {
  function formatCsvCell(val) {
    const s = String(val ?? "");
    // Exercise 7: Quote cells containing commas, quotes, or newlines, doubling existing quotes
    if (/[",\n\r]/.test(s)) {
      return `"${s.replace(/"/g, '""')}"`;
    }
    return s;
  }

  function handleDownloadCsv() {
    if (!data || data.length === 0) return;

    const headers = Object.keys(data[0]);
    const headerRow = headers.map(formatCsvCell).join(",");
    const bodyRows = data.map((row) =>
      headers.map((h) => formatCsvCell(row[h])).join(",")
    );

    const csvContent = [headerRow, ...bodyRows].join("\r\n");

    // Build Blob, create object URL, trigger anchor click, and revoke
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Release memory immediately
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