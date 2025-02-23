import Hero from "./pages/Home/components/Hero";
import NavigationBar from "./components/NavigationBar";
import Products from "./pages/Home/components/Products";
import Paging from "./Paging";
import Greeting from "./Greeting";



function App() {
  const name ="Rushdha";
  const count = 0;
  return (
    <div>
      
      <NavigationBar name={name} count={count} />
      <Hero />
      <Products/> 
      <Paging/>
    </div>
  );
}

export default App;
