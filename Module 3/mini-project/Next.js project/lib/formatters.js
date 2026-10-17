// Native Intl formatting avoids heavy client date/number libraries[cite: 50]
export const formatETB = (val) =>
  new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 0,
  }).format(val);

export const formatDate = (dateStr) =>
  new Intl.DateTimeFormat("en-ET", {
    month: "short",
    day: "numeric",
  }).format(new Date(dateStr));