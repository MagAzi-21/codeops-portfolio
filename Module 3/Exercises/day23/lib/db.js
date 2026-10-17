export const dishes = [
  {
    id: "doro-wat",
    name: "Doro Wat",
    price: 260,
    category: "Main",
    spicy: true,
    description: "Slow-simmered chicken drumstick in berbere sauce with hard-boiled egg.",
    imageUrl: "https://images.unsplash.com/photo-1512058564366-18510be2db19",
  },
  {
    id: "kitfo",
    name: "Special Kitfo",
    price: 320,
    category: "Main",
    spicy: true,
    description: "Minced beef seasoned with mitmita and niter kibbeh, served with ayib and gomen.",
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947",
  },
];

export const orders = [];

export async function createOrder(data) {
  // Artificial delay to demonstrate pending button disabling and double-submit prevention
  await new Promise((res) => setTimeout(res, 1200));

  const order = {
    id: `ord_${Date.now()}`,
    createdAt: new Date().toISOString(),
    ...data,
  };
  orders.push(order);
  return order;
}