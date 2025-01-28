import { useState } from "react";
import Hero from "../Hero";
import NavigationBar from "../NavigationBar";
import Products from "../Products";
import { useSelector } from "react-redux";

function HomePage() {
  const name = null;
  //const name = "Rushdha"
  //const cartCount = 2;
//  const [cart,setCart]=useState([]);
 
//  const handleAddToCart = (product) => {
//   const foundItem = cart.find((item) => item.product._id === product._id);
//   if (foundItem) {
//     setCart(
//       cart.map((cartItem) =>
//         cartItem.product._id === product._id
//           ? { ...cartItem, quantity: cartItem.quantity + 1 }
//           : cartItem
//       )
//     );
//     return;
//   }
//   setCart([...cart, { product: product, quantity: 1 }]);
// };
const cart = useSelector((state)=>state.cart.value); // gets selected states

const getCartQuantity = () => {
  let count = 0;
  cart.forEach((item) => {
    count += item.quantity;
  });
  return count;
};
  return (
    <div>
     <NavigationBar name={name} cartCount={getCartQuantity()} />
      <Hero />
      <Products/>
     {/*<Products handleAddToCart={handleAddToCart} />*/}
    </div>
  );
}

export default HomePage;