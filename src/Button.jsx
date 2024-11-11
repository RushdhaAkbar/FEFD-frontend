function Button(props){

    const handleClick=(e)=>{
        console.log(e);
        console.log("Clicked");
    }
    return(
        <button 
        type="button"
        onClick={handleClick}
        className="py-2 px-4 text-white font-medium bg-black rounded-md inline-block w-fit">
            {props.text}
        </button>
    );
}
export default Button;