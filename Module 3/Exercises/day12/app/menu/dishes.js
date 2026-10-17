export const dishes = [
  { id: "doro-wat", name: "Doro Wat", price: 240, category: "Main", desc: "Spicy chicken stew with hard-boiled egg." },
  { id: "shiro", name: "Shiro Tegamino", price: 120, category: "Vegan", desc: "Simmered chickpea flour stew." },
  { id: "tibs", name: "Special Tibs", price: 280, category: "Main", desc: "Sautéed marinated beef chunks." },
  { id: "beyaynetu", name: "Beyaynetu Platter", price: 180, category: "Vegan", desc: "Assorted fasting vegetable dishes." },
];

export async function getDishes() {
  return dishes;
}

export async function getDish(id) {
  return dishes.find((d) => d.id === id);
}