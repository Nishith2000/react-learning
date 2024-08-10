import { createContext, useReducer } from "react";

export const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

function cartReducer(state, action) {
  let existingCartItemIndex;
  let updatedItems;
  switch (action.type) {
    case "ADD_ITEM":
      existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );
      updatedItems = [...state.items];
      if (existingCartItemIndex !== -1) {
        const existingItem = state.items[existingCartItemIndex];
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems.push({ ...action.item, quantity: 1 });
      }
      return {
        ...state,
        items: updatedItems,
      };
    case "REMOVE_ITEM":
      existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.id
      );
      if (existingCartItemIndex !== -1) {
        updatedItems = [...state.items];
        const newQuantity = updatedItems[existingCartItemIndex].quantity - 1;
        if (newQuantity === 0) {
          updatedItems.splice(existingCartItemIndex, 1);
        } else {
          const updatedItem = {
            ...updatedItems[existingCartItemIndex],
            quantity: newQuantity,
          };
          updatedItems[existingCartItemIndex] = updatedItem;
        }
      }
      return {
        ...state,
        items: updatedItems,
      };
    case "CLEAR_CART":
      return { ...state, items: [] };
  }
}

export function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, {
    items: [],
  });
  function addItem(item) {
    dispatchCartAction({
      type: "ADD_ITEM",
      item,
    });
  }
  function removeItem(id) {
    dispatchCartAction({
      type: "REMOVE_ITEM",
      id,
    });
  }
  function clearCart() {
    dispatchCartAction({
      type: "CLEAR_CART",
    });
  }
  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart
  };
  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}
