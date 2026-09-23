// Exercise 4: Header component
function Header() {
  return (
    <header>
      <h1>Addis Eats</h1>
      <p>Order great food across Addis.</p>
    </header>
  );
}

// Exercise 3: Dish component with name and price props via destructuring
function Dish({ name, price }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", margin: "8px 0", borderRadius: "6px" }}>
      <h3>{name}</h3>
      <p>{price} ETB</p>
    </div>
  );
}

// Exercise 5: Array of dishes
const dishes = [
  { id: 1, name: "Doro Wat", price: 240 },
  { id: 2, name: "Shiro", price: 120 },
  { id: 3, name: "Tibs", price: 280 },
];

// Exercise 2 & Composition: Return custom heading and map list with unique keys
function App() {
  return (
    <div style={{ maxWidth: "500px", margin: "30px auto", fontFamily: "sans-serif" }}>
      <Header />
      <main>
        {dishes.map((dish) => (
          <Dish key={dish.id} name={dish.name} price={dish.price} />
        ))}
      </main>
    </div>
  );
}

export default App;