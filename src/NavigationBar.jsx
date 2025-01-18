import { ShoppingCart } from "lucide-react";
import { Link } from "react-router";
function NavigationBar(props) {
  
  return (
    <nav className="flex items-center justify-between py-4 px-16">
    <div className="flex items-center gap-10">
      <a className="text-3xl font-semibold text-black no-underline" href="/">Mebius</a>
      <div className="flex items-center gap-4">
        <a className="text-base text-black no-underline" href="/">Home</a>
        <a href="/shop">Shop</a>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <a href="/cart" className="flex items-center no-underline text-black relative ">
      <p className="text-lg">{props.cartCount}</p>
        <div className="flex items-center text-base gap-1">  
          <ShoppingCart />
           Cart</div>
      </a>
      {!props.name && (
          <div className="flex items-center gap-4">
            <Link to="/sign-in" className=" text-primary ">
              Sign In
            </Link>
            <Link to="/sign-up" className=" text-primary ">
              Sign Up
            </Link>
          </div>
        )}
        {props.name && <p>Hi, {props.name}</p>}
    </div>
  </nav>
  );
}

export default NavigationBar;