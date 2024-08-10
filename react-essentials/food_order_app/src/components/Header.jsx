import { useContext } from "react";
import logoImg from "../assets/logo.jpg";
import Button from "./UI/Button";
import { CartContext } from "../store/CartContext";
import { UserProgressContext } from "../store/UserProgressContext";

export default function Header() {
  const { items } = useContext(CartContext);
  const { showCart } = useContext(UserProgressContext);

  let totalItemsInCart = 0;
  for (const item of items) {
    totalItemsInCart += item.quantity ?? 0;
  }
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="food-palace-logo" />
        <h1>Food Palace</h1>
      </div>
      <nav>
        <Button onClick={showCart} textOnly on>
          Cart ({totalItemsInCart})
        </Button>
      </nav>
    </header>
  );
}
