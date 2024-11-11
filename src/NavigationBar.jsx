import { ShoppingCart } from "lucide-react";
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
        <span className="text-base mx-2">{props.count}</span>
        <div className="flex items-center text-base gap-1">  
          <ShoppingCart />
           Cart</div>
      </a>
      {props.name ? (
          <p className="text-base text-black">Hi, {props.name}</p>
        ) : (
          <div>
            <a href="/" className="text-base text-black">Sign In &nbsp; </a> 
            <a href="/" className="text-base text-black">Sign Up</a>
          </div>
        )}
    </div>
  </nav>
  );
}

export default NavigationBar;