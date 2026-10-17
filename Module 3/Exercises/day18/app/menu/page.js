import DishCard from "@/components/DishCard";

const DISHES = [
  {
    id: "kitfo",
    name: "Special Kitfo",
    price: 320,
    spicy: true,
    description: "Minced lean beef seasoned with mitmita, niter kibbeh, and served with homemade ayib.",
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947",
    altText: "Traditional Kitfo with seasoned butter and cottage cheese",
  },
  {
    id: "doro-wat",
    name: "Doro Wat",
    price: 260,
    spicy: true,
    description: "Slow-simmered chicken drumstick cooked in fragrant berbere sauce with hard-boiled egg.",
    imageUrl: "https://images.unsplash.com/photo-1512058564366-18510be2db19",
    altText: "Spicy Doro Wat chicken stew with boiled egg",
  },
  {
    id: "shiro",
    name: "Shiro Tegamino",
    price: 140,
    spicy: false,
    description: "Rich roasted chickpea flour stew simmered with garlic, served bubbling in a clay vessel.",
    imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
    altText: "Shiro tegamino simmering in traditional clay pot",
  },
  {
    id: "tibs",
    name: "Sizzling Beef Tibs",
    price: 280,
    spicy: true,
    description: "Tender beef chunks pan-seared with rosemary, red onion slices, and green peppers.",
    imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    altText: "Sautéed beef tibs garnished with rosemary sprigs",
  },
];

export default function MenuPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Optimized Menu Catalog</h2>
        <p className="text-xs text-slate-500">
          All images served in WebP/AVIF with automated srcset generation and layout reservation.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {DISHES.map((dish) => (
          <DishCard key={dish.id} dish={dish} />
        ))}
      </div>
    </div>
  );
}