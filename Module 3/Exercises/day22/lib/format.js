// Exercise 6: Reusable formatters with explicit Africa/Addis_Ababa timezone to prevent hydration mismatches
export const etb = new Intl.NumberFormat("en-ET", {
  style: "currency",
  currency: "ETB",
  maximumFractionDigits: 0,
});

export const when = new Intl.DateTimeFormat("en-ET", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Africa/Addis_Ababa", // EAT, UTC+3
});

export const relativeTime = (minutes) =>
  new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(
    minutes,
    "minute"
  );