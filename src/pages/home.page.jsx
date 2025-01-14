import Hero from "../Hero";
import NavigationBar from "../NavigationBar";
import Products from "../Products";

function HomePage() {
  const name = null;
  //const name = "Rushdha"
  const cartCount = 2;

  return (
    <div>
      <NavigationBar name={name} cartCount={cartCount} />
      <Hero />
      <Products />
    </div>
  );
}

export default HomePage;