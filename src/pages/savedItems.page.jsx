import { useSelector, useDispatch } from "react-redux";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router";
import { removeFromSave } from "@/lib/features/saveSlice";
import { addToCart } from "@/lib/features/cartSlice";

function SavedItemsPage() {
  const savedItems = useSelector((state) => state.save.value);
  const dispatch = useDispatch();
  

  const handleRemoveSave = (id) => {
    dispatch(removeFromSave(id));

  };

  const handleAddToCart = (item) => {
    dispatch(addToCart({
      _id: item._id,
      name: item.name,
      price: item.price,
      image: item.image,
      description: item.description,
    }));
  };

  if (savedItems.length === 0) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Saved Items</h1>
        <p className="text-lg">You haven't saved any items yet.</p>
        <Link to="/shop">
          <Button className="mt-4">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Saved Items</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {savedItems.map((item) => (
          <Card key={item._id} className="relative">
            <Link to={`/shop/${item._id}`}>
              <div className="h-80 bg-card rounded-lg p-4 relative cursor-pointer">
                <img src={item.image} className="block w-full h-full object-cover" />
                <div 
                  className="absolute top-3 right-3 cursor-pointer bg-white rounded-full p-2 shadow-md"
                  onClick={(e) => {
                    e.preventDefault();
                    handleRemoveSave(item._id);
                  }}
                >
                  <FaHeart 
                    size={20} 
                    color="red"
                    className="transition-colors duration-300"
                  />
                </div>
              </div>
            </Link>
            <div className="flex px-4 mt-4 items-center justify-between">
              <h2 className="text-2xl font-semibold">{item.name}</h2>
              <span className="block text-lg font-medium">${item.price}</span>
            </div>
            <div className="px-4 mt-2">
              <p className="text-sm">{item.description}</p>
            </div>
            <div className="mt-1 p-4">
              <Button 
                className="w-full" 
                onClick={() => handleAddToCart(item)}
              >
                Add To Cart
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default SavedItemsPage;