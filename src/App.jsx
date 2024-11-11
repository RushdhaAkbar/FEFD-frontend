import Hero from "./Hero";
import NavigationBar from "./NavigationBar";
import Button from "./Button";
import Greeting from "./Greeting";

function App() {
  const name ="Rushdha";
  const count = 0;
  return (
    <div>
      <NavigationBar name={name} count={count} />
      <Hero />
      <div className="p-4">
        <Button text="Buy now" />
        
      </div>
      
    </div>
  );
}

export default App;
