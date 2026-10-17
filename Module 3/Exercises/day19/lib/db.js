export const dishes = [
  {
    id: "kitfo",
    name: "Special Kitfo",
    price: 320,
    category: "Main",
    spicy: true,
    description: "Minced lean beef seasoned with spicy mitmita and herbal niter kibbeh, served with fresh ayib and gomen.",
  },
  {
    id: "doro-wat",
    name: "Doro Wat",
    price: 260,
    category: "Main",
    spicy: true,
    description: "Slow-simmered chicken stew cooked in aromatic berbere sauce, served with a hard-boiled egg.",
  },
  {
    id: "shiro",
    name: "Shiro Tegamino",
    price: 140,
    category: "Vegan",
    spicy: false,
    description: "Rich ground chickpea stew simmered with garlic and onions, served boiling in an authentic clay pot.",
  },
  {
    id: "tibs",
    name: "Sizzling Beef Tibs",
    price: 280,
    category: "Main",
    spicy: true,
    description: "Pan-seared cubed beef sautéed with fresh rosemary, sliced red onions, garlic, and green jalapeños.",
  },
];

export async function getDishes() {
  return dishes;
}

export async function getDish(id) {
  return dishes.find((d) => d.id === id) || null;
}