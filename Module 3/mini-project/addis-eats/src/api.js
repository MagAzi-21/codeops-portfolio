export async function fetchDishes(category, signal) {
  const res = await fetch("/dishes.json", { signal });
  if (!res.ok) {
    throw new Error("Could not load the Addis Eats menu from the server.");
  }
  const allDishes = await res.json();
  if (category === "All") {
    return allDishes;
  }
  return allDishes.filter((dish) => dish.category === category);
}