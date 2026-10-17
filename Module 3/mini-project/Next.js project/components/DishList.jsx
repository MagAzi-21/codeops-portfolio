import DishCard from "./DishCard";

export default function DishList({ dishes }) {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {dishes.map((dish) => (
        <DishCard key={dish.id} dish={dish} />
      ))}
    </div>
  );
}