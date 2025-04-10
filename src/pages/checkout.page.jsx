import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import ShippingAddressForm from "@/components/ShippingAddressForm";

function CheckoutPage() {
  const cart = useSelector((state) => state.cart.value);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  ).toFixed(2);

  return (
    <main className="px-8 py-12 min-h-screen bg-gradient-to-b">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Checkout</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
      
        <div className="md:col-span-2">
          <div className="mt-4">
            <h3 className="text-xl font-semibold text-white bg-black py-3 px-6 rounded-t-lg">
              Enter Shipping Address
            </h3>
            <div className="mt-0">
              <ShippingAddressForm cart={cart} />
            </div>
          </div>
        </div>

      
        <div className="md:col-span-1">
          <div className="mt-4">
            <h3 className="text-xl font-semibold text-white bg-black py-3 px-6 rounded-t-lg">
              Order Summary
            </h3>
            <div className="mt-0 border rounded-b-lg p-6 bg-white shadow-lg">
              {cart.length === 0 ? (
                <p className="text-gray-600">Your cart is empty.</p>
              ) : (
                <>
               
                  {cart.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 py-4 border-b last:border-b-0"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-md transition-transform hover:scale-105"
                      />
                      <div className="flex-1">
                        <p className="text-lg font-medium text-gray-900">
                          {item.product.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="text-lg font-medium text-gray-900">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                 
                  <div className="mt-6 space-y-3">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>${subtotal}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span className="text-green-600">Free</span>
                    </div>
                    <div className="flex justify-between text-xl font-semibold text-gray-900 border-t pt-3">
                      <span>Total</span>
                      <span>${subtotal}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CheckoutPage;