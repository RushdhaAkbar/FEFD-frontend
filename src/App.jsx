import Hero from "./Hero";
import NavigationBar from "./NavigationBar";
import Products from "./Products";
import Paging from "./Paging";




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
