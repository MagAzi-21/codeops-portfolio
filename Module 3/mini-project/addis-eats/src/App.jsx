import Header from "./Header";
import Menu from "./Menu";
import { CartProvider } from "./CartProvider";
import "./App.css";

function App() {
  return (
    <CartProvider>
      <div className="container">
        <Header />
        <Menu />
      </div>
    </CartProvider>
  );
}

export default App;