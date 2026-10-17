export const mockOrders = [
  { id: "ord_1", userId: "usr_mike", item: "Special Kitfo", total: 320, status: "Active" },
  { id: "ord_2", userId: "usr_mike", item: "Doro Wat", total: 260, status: "Active" },
  { id: "ord_3", userId: "usr_almaz", item: "Shiro Tegamino", total: 140, status: "Active" },
];

export async function getOrdersFor(userId) {
  // Exercise 6: Strictly scoped to the session's userId
  return mockOrders.filter((order) => order.userId === userId);
}

export async function getOrder(orderId) {
  return mockOrders.find((order) => order.id === orderId) || null;
}

export async function cancelOrderDb(orderId) {
  const order = mockOrders.find((o) => o.id === orderId);
  if (order) {
    order.status = "Cancelled";
  }
  return order;
}