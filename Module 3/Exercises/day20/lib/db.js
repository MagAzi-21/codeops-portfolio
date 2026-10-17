export const dishes = [
  {
    id: "kitfo",
    name: "Special Kitfo",
    price: 320,
    category: "Main",
    spicy: true,
    description: "Minced beef seasoned with mitmita and herbal niter kibbeh, served with ayib.",
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947",
  },
  {
    id: "doro-wat",
    name: "Doro Wat",
    price: 260,
    category: "Main",
    spicy: true,
    description: "Slow-simmered spicy chicken drumstick in berbere stew with hard-boiled egg.",
    imageUrl: "https://images.unsplash.com/photo-1512058564366-18510be2db19",
  },
  {
    id: "shiro",
    name: "Shiro Tegamino",
    price: 140,
    category: "Vegan",
    spicy: false,
    description: "Ground chickpea flour simmered with garlic, served boiling in a clay pot.",
    imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
  },
  {
    id: "tibs",
    name: "Sizzling Beef Tibs",
    price: 280,
    category: "Main",
    spicy: true,
    description: "Tender cubed beef sautéed with fresh rosemary, red onions, and jalapeños.",
    imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
  },
];

export const orders = [
  {
    id: "ord_812",
    userId: "usr_mike",
    item: "Special Kitfo",
    total: 320,
    status: "Kitchen Preparing",
    updatedAt: "Just now",
  },
  {
    id: "ord_990",
    userId: "usr_almaz",
    item: "Shiro Tegamino",
    total: 140,
    status: "Driver Dispatched",
    updatedAt: "5 mins ago",
  },
];

export async function getDishes() {
  return dishes;
}

export async function getDish(id) {
  return dishes.find((d) => d.id === id) || null;
}

export async function getOrder(id) {
  const order = orders.find((o) => o.id === id);
  if (!order) return null;

  // Cycle status on poll
  const seq = ["Kitchen Preparing", "Driver Dispatched", "Delivered"];
  const idx = seq.indexOf(order.status);
  if (idx !== -1 && idx < seq.length - 1) {
    order.status = seq[idx + 1];
  }
  order.updatedAt = new Date().toLocaleTimeString();
  return order;
}

// Scoped queries: Never allows query by requested client id
export async function getOrdersFor(userId) {
  return orders.filter((o) => o.userId === userId);
}

export async function cancelOrderDb(orderId) {
  const order = orders.find((o) => o.id === orderId);
  if (order) order.status = "Cancelled";
  return order;
}

export async function searchDishes(query) {
  if (!query) return [];
  return dishes.filter((d) =>
    d.name.toLowerCase().includes(query.toLowerCase())
  );
}