export const dishes = [
  { id: "kitfo", name: "Special Kitfo", price: 320, category: "Main" },
  { id: "doro-wat", name: "Doro Wat", price: 260, category: "Main" },
  { id: "shiro", name: "Shiro Tegamino", price: 140, category: "Vegan" },
  { id: "tibs", name: "Sizzling Beef Tibs", price: 280, category: "Main" },
  { id: "beyaynetu", name: "Beyaynetu Platter", price: 180, category: "Vegan" },
  { id: "gomen", name: "Gomen Besiga", price: 220, category: "Main" },
];

export const orders = [
  {
    id: "ord_101",
    customer: "Almaz",
    item: "Doro Wat",
    total: 260,
    status: "Kitchen Preparing",
    updatedAt: new Date().toISOString(),
  },
];

export async function getOrder(id) {
  const order = orders.find((o) => o.id === id);
  if (!order) return null;

  // Cycle through live statuses on subsequent fetches to demonstrate polling
  const statuses = ["Kitchen Preparing", "Driver Dispatched", "Delivered"];
  const currentIndex = statuses.indexOf(order.status);
  if (currentIndex !== -1 && currentIndex < statuses.length - 1) {
    order.status = statuses[currentIndex + 1];
  }
  order.updatedAt = new Date().toLocaleTimeString();
  return order;
}

export async function searchDishes(query, page = 1, limit = 2) {
  let filtered = dishes;
  if (query) {
    filtered = dishes.filter((d) =>
      d.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + limit);

  return {
    items: paginated,
    total: filtered.length,
    page: Number(page),
    totalPages: Math.ceil(filtered.length / limit),
  };
}