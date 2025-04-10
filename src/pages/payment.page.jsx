import { Button } from "@/components/ui/button";
import { clearCart } from "@/lib/features/cartSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

function PaymentPage() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.value);

  const handlePlaceOrder = async () => {
    try {
      // Note: The order creation API (via createOrder) now handles inventory updates
      // You should already be calling this in ShippingAddressForm.jsx via useCreateOrderMutation
      // Here, we just clear the cart and show a success message
      dispatch(clearCart());
      toast.success("Order Placed Successfully");
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order. Please try again.");
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
        <Button onClick={handlePlaceOrder}>Place Order</Button>
      </div>
    </main>
  );
}

export default PaymentPage;