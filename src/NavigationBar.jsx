import { ShoppingCart } from "lucide-react";
import "./nav.css";
function NavigationBar() {
  const name ="Rushdha";
  const count = 0;
  return (
    <nav class="navbar">
    <div class="nav-left">
      <a class="brand" href="/">Mebius</a>
      <div class="nav-links">
        <a href="/">Home</a>
        <a href="/shop">Shop</a>
      </div>
    </div>
    <div class="nav-right">
      <a href="/cart" class="cart-link">
        <span class="cart-count">{count}</span>
        <div class="cart-icon">  
          <ShoppingCart />
           Cart</div>
      </a>
      <p>Hi, {name}</p>
    </div>
  </nav>
  );
}

export default NavigationBar;