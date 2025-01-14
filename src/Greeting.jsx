import "./greeting.css"
function Greeting(props) {
  
  return (
    <div>
      <h1 className="greeting">Hi, {props.name}</h1>
    </div>
  );
}

export default Greeting;
