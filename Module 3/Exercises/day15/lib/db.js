export const dishes = [
  {
    id: "kitfo",
    name: "Special Kitfo",
    price: 320,
    category: "Main",
    spicy: true,
    description: "Minced beef seasoned with mitmita and niter kibbeh, served with ayib.",
  },
  {
    id: "doro-wat",
    name: "Doro Wat",
    price: 260,
    category: "Main",
    spicy: true,
    description: "Slow-simmered chicken drumstick in rich berbere stew with hard-boiled egg.",
  },
  {
    id: "shiro",
    name: "Shiro Tegamino",
    price: 140,
    category: "Vegan",
    spicy: false,
    description: "Slow-cooked chickpea flour stew served bubbling in a clay pot.",
  },
  {
    id: "tibs",
    name: "Sizzling Beef Tibs",
    price: 280,
    category: "Main",
    spicy: true,
    description: "Cubed beef pan-seared with rosemary, red onions, garlic, and jalapeños.",
  },
];

export const orders = [];

export async function getDishes() {
  return dishes;
}

export async function getDish(id) {
  return dishes.find((d) => d.id === id) || null;
}

export async function createOrder(data) {
  const newOrder = {
    id: `ord_${Date.now()}`,
    userId: "usr_mike", // Simulated active session owner
    status: "active",
    createdAt: new Date().toISOString(),
    ...data,
  };
  orders.push(newOrder);
  return newOrder;
}

export async function getOrder(orderId) {
  return orders.find((o) => o.id === orderId) || null;
}

export async function cancelOrderDb(orderId) {
  const order = orders.find((o) => o.id === orderId);
  if (order) {
    order.status = "cancelled";
  }
  return order;
}

export async function getSession() {
  return { id: "usr_mike", role: "customer" };
}