import { Button } from "@/components/ui/button";
import { clearCart } from "@/lib/features/cartSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { useUpdateInventoryMutation } from "@/lib/api";

function PaymentPage() {
 const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.value);
 
  const [updateInventory] = useUpdateInventoryMutation();

  const handlePlaceOrder = async () => {
    try {
     
      dispatch(clearCart());
      toast.success("Order Placed Successfully");
  
      
      const items = cart.map((item) => ({
        productId: item.product._id,
        quantity: item.quantity,
      }));
  
      console.log("Updating Inventory with:", items);
  
      // Update inventory with a single API call
      await updateInventory(items).unwrap();
  
      toast.success("Inventory Updated Successfully");
    } catch (error) {
      console.error("Inventory Update Error:", error);
      toast.error("Failed to update inventory. Please try again.");
    }
  };

  return (
    <main className="px-8">
      <h2 className="text-4xl font-bold">Review Your Order</h2>
    
      <div className="mt-2">
        {cart.map((item, index) => (
          <div key={index}>
            <p>{item.product.name}</p>
            <p>{item.product.price}</p>
            <p>{item.quantity}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-4">
        <p>
          Total Price: $
          {cart.reduce(
            (acc, item) => acc + item.product.price * item.quantity,
            0
          )}
        </p>
      </div>

      <div className="mt-4">
        <Button onClick={handlePlaceOrder}>
          Place Order
        </Button>
      </div>
    </main>
  );
}

export default PaymentPage;
