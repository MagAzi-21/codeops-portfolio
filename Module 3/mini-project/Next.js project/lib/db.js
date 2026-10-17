export const dishes = [
  {
    id: "kitfo",
    name: "Special Kitfo",
    price: 320,
    category: "Main",
    spicy: true,
    description: "Minced beef seasoned with mitmita and niter kibbeh, served with ayib and gomen.",
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947",
    altText: "Traditional Ethiopian Kitfo seasoned with mitmita and herbal butter",
  },
  {
    id: "doro-wat",
    name: "Doro Wat",
    price: 260,
    category: "Main",
    spicy: true,
    description: "Slow-simmered chicken drumstick in rich berbere sauce with hard-boiled egg.",
    imageUrl: "https://images.unsplash.com/photo-1512058564366-18510be2db19",
    altText: "Spicy traditional Doro Wat chicken stew with hard-boiled egg",
  },
  {
    id: "shiro",
    name: "Shiro Tegamino",
    price: 140,
    category: "Vegan",
    spicy: false,
    description: "Seasoned ground chickpea stew simmered in a clay pot, served piping hot.",
    imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
    altText: "Bubbling hot Shiro Tegamino served in a clay pot",
  },
  {
    id: "tibs",
    name: "Sizzling Beef Tibs",
    price: 280,
    category: "Main",
    spicy: true,
    description: "Pan-seared cubed beef with fresh rosemary, red onions, garlic, and jalapeños.",
    imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    altText: "Sautéed sizzling beef tibs with rosemary and jalapeño peppers",
  },
];

// Orders equipped with coordinates [lat, lng], address details, and test strings for CSV escaping[cite: 54, 57]
export const orders = [
  {
    id: "ord_101",
    userId: "usr_mike",
    customer: "Mike",
    date: "2026-10-10",
    placedAt: "2026-10-10T14:30:00Z",
    area: "Bole",
    address: "Bole Rwanda, near Friendship Mall, Addis Ababa",
    item: 'Special "Gursha" Kitfo', // Quote test for CSV[cite: 57, 58]
    notes: "Ring bell.\nLeave with guard.", // Newline test for CSV[cite: 57, 58]
    total: 640,
    status: "Courier Picked Up",
    etaMinutes: 12,
    destination: [8.995, 38.7896], // [lat, lng] Bole[cite: 54]
    courier: [8.9892, 38.7831],
    updatedAt: "Just now",
  },
  {
    id: "ord_102",
    userId: "usr_mike",
    customer: "Mike",
    date: "2026-10-10",
    placedAt: "2026-10-10T15:00:00Z",
    area: "Kazanchis, Kirkos", // Comma test for CSV[cite: 57, 58]
    address: "Kazanchis, behind UNECA",
    item: "Doro Wat",
    notes: "Include extra injera",
    total: 260,
    status: "Delivered",
    etaMinutes: 0,
    destination: [9.0175, 38.7667],
    courier: [9.0175, 38.7667],
    updatedAt: "5 mins ago",
  },
  {
    id: "ord_103",
    userId: "usr_almaz",
    customer: "Almaz",
    date: "2026-10-11",
    placedAt: "2026-10-11T12:00:00Z",
    area: "Piassa",
    address: "Piassa, near Arada Post Office",
    item: "Shiro Tegamino",
    notes: "Fasting preparation",
    total: 140,
    status: "Delivered",
    etaMinutes: 0,
    destination: [9.0345, 38.7525],
    courier: [9.0345, 38.7525],
    updatedAt: "10 mins ago",
  },
];

export async function getDishes() {
  return dishes;
}

export async function getDish(id) {
  return dishes.find((d) => d.id === id) || null;
}

export async function createOrder(data) {
  const newOrder = {
    id: `ord_${Date.now()}`,
    date: new Date().toISOString().split("T")[0],
    placedAt: new Date().toISOString(),
    area: "Bole",
    address: "Addis Ababa",
    etaMinutes: 20,
    status: "Kitchen Preparing",
    destination: [8.995, 38.7896],
    courier: [8.991, 38.785],
    updatedAt: new Date().toLocaleTimeString(),
    ...data,
  };
  orders.push(newOrder);
  return newOrder;
}

export async function getOrder(orderId) {
  return orders.find((o) => o.id === orderId) || null;
}

export async function getOrdersFor(userId) {
  return orders.filter((o) => o.userId === userId);
}

export async function cancelOrderDb(orderId) {
  const order = orders.find((o) => o.id === orderId);
  if (order) {
    order.status = "Cancelled";
  }
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

export async function getDashboardMetrics() {
  const areas = ["Bole", "Kazanchis", "Piassa"];
  const byArea = areas.map((area) => {
    const areaOrders = orders.filter((o) => o.area.startsWith(area));
    const revenue = areaOrders.reduce((sum, o) => sum + o.total, 0);
    return { area, revenue, orderCount: areaOrders.length };
  });

  const dates = ["2026-10-10", "2026-10-11"];
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

export async function getPaginatedOrdersForUser(userId, { sort = "date", dir = "desc", page = 1, limit = 4, empty = false }) {
  if (empty) return { rows: [], total: 0, totalPages: 0, page: 1 };

  const userOrders = orders.filter((o) => o.userId === userId);

  let sorted = [...userOrders].sort((a, b) => {
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