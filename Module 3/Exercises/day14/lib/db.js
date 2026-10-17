export const dishes = [
  { id: "kitfo", name: "Special Kitfo", price: 320, category: "Main" },
  { id: "doro-wat", name: "Doro Wat", price: 260, category: "Main" },
  { id: "shiro", name: "Shiro Tegamino", price: 140, category: "Vegan" },
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
  // Simulated authenticated user session
  return { id: "usr_mike", role: "customer" };
}