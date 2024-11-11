import "./greeting.css"
function Greeting() {
  const name = "Manupa";

  return (
    <div>
      <h1 className="greeting">Hi, {name}</h1>
    </div>
  );
}

export default Greeting;
