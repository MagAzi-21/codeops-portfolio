import Header from "./Header";
import Menu from "./Menu";
import { menu } from "./data";
import "./App.css";

function App() {
  const activeCategory = "Main";

  return (
    <div className="container">
      <Header />
      <h2>Category: {activeCategory}</h2>
      <Menu dishes={menu} category={activeCategory} />
    </div>
  );
}

export default App;