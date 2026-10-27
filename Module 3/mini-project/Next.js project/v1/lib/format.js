// Build each formatter once to avoid constructor overhead and hydration mismatches[cite: 56]
export const etb = new Intl.NumberFormat("en-ET", {
  style: "currency",
  currency: "ETB",
  maximumFractionDigits: 0,
});

export const when = new Intl.DateTimeFormat("en-ET", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Africa/Addis_Ababa", // EAT, UTC+3[cite: 56]
});

export const relativeTime = (minutes) =>
  new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(
    minutes,
    "minute"
  );