import { Link } from "react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../../lib/features/cartSlice";
import { addToSave, removeFromSave } from "../../../lib/features/saveSlice";
import { toast } from "sonner";
import { useGetInventoryByProductIdQuery } from "../../../lib/api";

function ProductCard(props) {
  const dispatch = useDispatch();
  const savedItems = useSelector((state) => state.save.value);
  const cartItems = useSelector((state) => state.cart.value);
  const isSaved = savedItems.some((item) => item._id === props._id);
  const isInCart = cartItems.some((item) => item.product?._id === props._id);

  // Fetch inventory for this product
  const { data: inventory, isLoading: inventoryLoading } = useGetInventoryByProductIdQuery(props._id);

  const isOutOfStock = !inventoryLoading && inventory?.quantity <= 0;

  const handleClick = () => {
    if (isOutOfStock) return; // Prevent adding to cart if out of stock
    dispatch(
      addToCart({
        _id: props._id,
        name: props.name,
        price: props.price,
        image: props.image,
        description: props.description,
      })
    );
    toast.success("Item added to cart");
  };

  const handleSave = () => {
    if (isSaved) {
      dispatch(removeFromSave(props._id));
      toast.success("Item removed from wishlist");
    } else {
      dispatch(addToSave({
        _id: props._id,
        name: props.name,
        price: props.price,
        image: props.image,
        description: props.description,
      }));
      toast.success("Item saved to wishlist");
    }
  };

  return (
    <Card
      className={`relative group transition-all duration-300 hover:shadow-lg border ${
        isInCart ? "border-green-500 border-2" : "border-gray-200"
      }`}
      style={isInCart ? { border: "2px solid green" } : {}}
    >
      <Link to={`/shop/${props._id}`}>
        <div className="h-80 bg-card rounded-lg p-4 relative cursor-pointer">
          <img
            src={props.image}
            className={`block w-full h-full object-cover ${isOutOfStock ? "opacity-50" : ""}`}
          />
          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-white text-black text-lg font-bold px-4 py-2 border border-black">
                OUT OF STOCK
              </span>
            </div>
          )}
          <div
            className="absolute top-3 right-3 cursor-pointer bg-white rounded-full p-2 shadow-md hover:scale-110 transition-transform"
            onClick={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            <FaHeart
              size={20}
              color={isSaved ? "red" : "gray"}
              className="transition-colors duration-300"
            />
          </div>
        </div>
      </Link>
      <div className="flex px-4 mt-4 items-center justify-between">
        <h2 className="text-2xl font-semibold">{props.name}</h2>
        <span className="block text-lg font-medium">${props.price}</span>
      </div>
      <div className="px-4 mt-2">
        <p className="text-sm">{props.description}</p>
      </div>
      <div className="mt-1 p-4">
        <Button
          className={`w-full transition-colors duration-300 ${
            isInCart
              ? "bg-green-500 hover:bg-green-600 text-white"
              : isOutOfStock
              ? "bg-gray-400 cursor-not-allowed text-white"
              : "bg-primary hover:bg-primary-dark"
          }`}
          onClick={handleClick}
          disabled={isOutOfStock}
        >
          {isInCart ? "In Cart" : isOutOfStock ? "Out of Stock" : "Add To Cart"}
        </Button>
      </div>
    </Card>
  );
}

export default ProductCard;