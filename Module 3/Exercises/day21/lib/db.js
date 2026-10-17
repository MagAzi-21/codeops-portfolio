// Raw orders dataset in storage
export const orders = [
  { id: "ord_101", date: "2026-10-10", area: "Bole", item: "Special Kitfo", total: 640, status: "Delivered" },
  { id: "ord_102", date: "2026-10-10", area: "Kazanchis", item: "Doro Wat", total: 260, status: "Delivered" },
  { id: "ord_103", date: "2026-10-11", area: "Piassa", item: "Shiro Tegamino", total: 140, status: "Delivered" },
  { id: "ord_104", date: "2026-10-11", area: "Bole", item: "Sizzling Tibs", total: 560, status: "Delivered" },
  { id: "ord_105", date: "2026-10-12", area: "Kazanchis", item: "Special Kitfo", total: 320, status: "Delivered" },
  { id: "ord_106", date: "2026-10-12", area: "Bole", item: "Beyaynetu Platter", total: 180, status: "Delivered" },
  { id: "ord_107", date: "2026-10-13", area: "Piassa", item: "Doro Wat", total: 520, status: "Delivered" },
  { id: "ord_108", date: "2026-10-13", area: "Bole", item: "Special Kitfo", total: 320, status: "Delivered" },
  { id: "ord_109", date: "2026-10-14", area: "Kazanchis", item: "Sizzling Tibs", total: 280, status: "Delivered" },
  { id: "ord_110", date: "2026-10-14", area: "Bole", item: "Shiro Tegamino", total: 280, status: "Delivered" },
  { id: "ord_111", date: "2026-10-15", area: "Piassa", item: "Special Kitfo", total: 320, status: "Delivered" },
  { id: "ord_112", date: "2026-10-15", area: "Kazanchis", item: "Doro Wat", total: 260, status: "Delivered" },
];

// Exercise 1: Shape summaries strictly on the server; ship only aggregated rows to client
export async function getDashboardMetrics() {
  const areas = ["Bole", "Kazanchis", "Piassa"];
  const byArea = areas.map((area) => {
    const areaOrders = orders.filter((o) => o.area === area);
    const revenue = areaOrders.reduce((sum, o) => sum + o.total, 0);
    return { area, revenue, orderCount: areaOrders.length };
  });

  const dates = ["2026-10-10", "2026-10-11", "2026-10-12", "2026-10-13", "2026-10-14", "2026-10-15"];
  const byDate = dates.map((date) => {
    const dailyOrders = orders.filter((o) => o.date === date);
    return {
      date,
      count: dailyOrders.length,
      revenue: dailyOrders.reduce((sum, o) => sum + o.total, 0),
    };
  });

  return { byArea, byDate };
}

// Exercises 5, 6, 7: Server filtering, URL sorting, and pagination
export async function getPaginatedOrders({ sort = "date", dir = "desc", page = 1, limit = 5, empty = false }) {
  if (empty) return { rows: [], total: 0, totalPages: 0, page: 1 };

  let sorted = [...orders].sort((a, b) => {
    let aVal = a[sort];
    let bVal = b[sort];
    if (typeof aVal === "string") {
      return dir === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }
    return dir === "asc" ? aVal - bVal : bVal - aVal;
  });

  const offset = (page - 1) * limit;
  const rows = sorted.slice(offset, offset + limit);

  return {
    rows,
    total: sorted.length,
    totalPages: Math.ceil(sorted.length / limit),
    page: Number(page),
  };
}