import { ShoppingCart } from "lucide-react";
import { FaHeart } from "react-icons/fa"; // Use only FaHeart
import { Link } from "react-router";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { useSelector } from "react-redux";

function NavigationBar() {
  const cart = useSelector((state) => state.cart.value); // gets selected states
  const save = useSelector((state) => state.save.value);

  const getCartQuantity = () => {
    let count = 0;
    cart.forEach((item) => {
      count += item.quantity;
    });
    return count;
  };

  const getSaveQuantity = () => save.length;

  return (
    <nav className="flex items-center justify-between py-4 px-16">
      <div className="flex items-center gap-10">
        <a className="text-3xl font-semibold text-black no-underline" href="/">
          Mebius
        </a>
        <div className="flex items-center gap-4">
          <a className="text-base text-black no-underline" href="/">
            Home
          </a>
          <a href="/shop">Shop</a>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div>
          <Link to="/shop/cart" className="flex items-center gap-4 relative">
            <p className="text-lg">{getCartQuantity()}</p>
            <div className="flex items-center gap-2">
              <ShoppingCart />
              Cart
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-1 cursor-pointer">
          <FaHeart
            size={20}
            color={save.length > 0 ? "red" : "gray"} // Directly use saveCount for color
          />
          Save
          <p className="text-lg">{getSaveQuantity()}</p>
        </div>

        <SignedOut>
          <div className="flex items-center gap-4">
            <Link to="/sign-in" className=" text-primary ">
              Sign In
            </Link>
            <Link to="/sign-up" className=" text-primary ">
              Sign Up
            </Link>
          </div>
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}

export default NavigationBar;
