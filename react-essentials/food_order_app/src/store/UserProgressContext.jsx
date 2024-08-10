import { createContext, useState } from "react";

export const UserProgressContext = createContext({
  progress: "", // cart or checkout
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
});

export function UserProgressContextProvider({ children }) {
  const [userProgress, setUserProgress] = useState("");

  function showCheckout() {
    setUserProgress("checkout");
  }

  function showCart() {
    setUserProgress("cart");
  }

  function hideCart() {
    setUserProgress("");
  }

  function hideCheckout() {
    setUserProgress("");
  }

  const cartContext = {
    progress: userProgress,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout,
  };
  return (
    <UserProgressContext.Provider value={cartContext}>
      {children}
    </UserProgressContext.Provider>
  );
}
