import { ShoppingCart } from "lucide-react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { useSelector } from "react-redux";

function NavigationBar() {
  const cart = useSelector((state) => state.cart.value); // Cart items from Redux
  const save = useSelector((state) => state.save.value); // Saved items from Redux

  const getCartQuantity = () => {
    let count = 0;
    cart.forEach((item) => {
      count += item.quantity;
    });
    return count;
  };

  const getSaveQuantity = () => save.length;

  return (
    <nav className="flex items-center justify-between py-4 px-16 bg-white shadow-md">
     
      <div className="flex items-center gap-10">
        <Link className="text-3xl font-semibold text-black no-underline" to="/">
          Mebius
        </Link>
        <div className="flex items-center gap-6">
          <Link
            className="text-base text-black no-underline hover:text-gray-700 transition-colors"
            to="/"
          >
            Home
          </Link>
          <Link
            className="text-base text-black no-underline hover:text-gray-700 transition-colors"
            to="/shop"
          >
            Shop
          </Link>
        </div>
      </div>

      
      <div className="flex items-center gap-6">
       
        <Link to="/shop/cart" className="relative flex items-center gap-2 group">
          <ShoppingCart
            size={24}
            className="text-gray-700 group-hover:text-black transition-colors"
          />
          <span className="hidden md:inline text-base text-gray-700 group-hover:text-black">
            Cart
          </span>
          {getCartQuantity() > 0 && (
            <span className="absolute -top-2 -right-2 md:right-8 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
              {getCartQuantity()}
            </span>
          )}
        </Link>

      
        <Link to="/saved" className="relative flex items-center gap-2 group">
          <FaHeart
            size={24}
            color={save.length > 0 ? "red" : "gray"}
            className="group-hover:scale-105 transition-transform"
          />
          <span className="hidden md:inline text-base text-gray-700 group-hover:text-black">
            Save
          </span>
          
         
        </Link>

        
        <SignedOut>
          <div className="flex items-center gap-4">
            <Link
              to="/sign-in"
              className="text-base text-primary hover:text-primary-dark transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/sign-up"
              className="text-base text-primary hover:text-primary-dark transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </SignedOut>

        <SignedIn>
          <div className="flex items-center gap-4">
            <UserButton />
            <Link
              to="/account"
              className="text-base text-gray-700 hover:text-black transition-colors"
            >
              Account
            </Link>
          </div>
        </SignedIn>
      </div>
    </nav>
  );
}

export default NavigationBar;