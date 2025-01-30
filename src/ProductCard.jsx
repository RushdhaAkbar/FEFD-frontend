import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "./lib/features/cartSlice";
import { addToSave, removeFromSave } from "./lib/features/saveSlice";

function ProductCard(props) {
  const dispatch = useDispatch();

  const savedItems = useSelector((state) => state.save.value);
  const isSaved = savedItems.some((item) => item._id === props._id);
 // Checks if the current product is already saved (returns true if found, otherwise false)
 // .some would return true or false when item id is = propsid unlike the find() that gives the entire object
 // we are checking whether it is already saved or not, so .some would be good
  const handleClick = (e) => {
    dispatch(
      addToCart({
        _id: props._id,
        name: props.name,
        price: props.price,
        image: props.image,
        description: props.description,
      })
    );
  };
  const handleSave = () => {
    if (isSaved) {
      dispatch(removeFromSave(props._id)); // Remove saved item if already saved
    } else {
      dispatch(addToSave({
        _id: props._id,
        name: props.name,
        price: props.price,
        image: props.image,
        description: props.description,
      }));
    }
  };

  return (
    <Card className="relative">
      <div className="h-80 bg-card rounded-lg p-4 relative">
        <img src={props.image} className="block w-full h-full object-cover" />
        <div 
          className="absolute top-3 right-3 cursor-pointer bg-white rounded-full p-2 shadow-md"
          onClick={handleSave}
        >
          <FaHeart 
            size={20} 
            color={isSaved ? "red" : "gray"} 
            className="transition-colors duration-300"
          />
        </div>
      </div>
      <div className="flex px-4 mt-4 items-center justify-between">
        <h2 className="text-2xl font-semibold">{props.name}</h2>
        <span className="block text-lg font-medium">${props.price}</span>
      </div>
      <div className="px-4 mt-2">
        <p className="text-sm">{props.description}</p>
      </div>
      <div className="mt-1 p-4">
        <Button className="w-full" onClick={handleClick}>
          Add To Cart
        </Button>
      </div>
    </Card>
  );
}

export default ProductCard;
