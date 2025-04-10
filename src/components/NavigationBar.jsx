import { ShoppingCart } from "lucide-react";
import { FaHeart } from "react-icons/fa";
import { Link, useLocation } from "react-router"; 
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { useSelector } from "react-redux";

function NavigationBar() {
  const cart = useSelector((state) => state.cart.value);
  const save = useSelector((state) => state.save.value);
  const location = useLocation();

  const getCartQuantity = () => {
    let count = 0;
    cart.forEach((item) => (count += item.quantity));
    return count;
  };

  const getSaveQuantity = () => save.length;

 
  const isActive = (path) =>
    location.pathname === path
      ? "text-black border-b-2 border-black pb-1"
      : "text-gray-700";

  return (
    <nav className="flex items-center justify-between py-4 px-16 bg-white shadow-md">
      <div className="flex items-center gap-10">
        <Link className="text-3xl font-semibold text-black no-underline" to="/">
          Mebius
        </Link>
        <div className="flex items-center gap-6">
          <Link
            className={`text-base no-underline hover:text-black transition-colors ${isActive("/")}`}
            to="/"
          >
            Home
          </Link>
          <Link
            className={`text-base no-underline hover:text-black transition-colors ${isActive("/shop")}`}
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
            <Link to="/sign-in" className="text-base text-primary hover:text-primary-dark">
              Sign In
            </Link>
            <Link to="/sign-up" className="text-base text-primary hover:text-primary-dark">
              Sign Up
            </Link>
          </div>
        </SignedOut>
        <SignedIn>
          <div className="flex items-center gap-4">
            <UserButton />
            <Link to="/account" className="text-base text-gray-700 hover:text-black">
              Account
            </Link>
          </div>
        </SignedIn>
      </div>
    </nav>
  );
}

export default NavigationBar;