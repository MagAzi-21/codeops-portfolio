import { createContext, useReducer, useMemo } from "react";
import PropTypes from "prop-types";
import { cartReducer } from "./cartReducer";

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  // Total is derived directly from state items on every render
  const total = state.items.reduce((sum, item) => sum + item.price, 0);

  // useMemo prevents unnecessary renders across consumer tree
  const value = useMemo(
    () => ({ items: state.items, dispatch, total }),
    [state.items, total]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};