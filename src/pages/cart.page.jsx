import { useSelector, useDispatch } from "react-redux";
import {  Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { removeFromCart } from "@/lib/features/cartSlice";

import { Link } from "react-router";
export default function CartPage() {
  const cartItems = useSelector((state) => state.cart.value);
  
  const dispatch = useDispatch();

  const removeItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const total = cartItems.reduce(
    (sum, item) => sum + Number.parseFloat(item.product.price) * item.quantity,
    0
  );
// number.parseFloat converts the price from string to number
//.reduce() is a callback function that gets and stores one product item from the array
//It multiplies each item's price by its quantity and sums them up.
//Initial value is 0 to start the accumulation.
//sum is total sum stored and item is the currently clicked cart item 
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Cart Items</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              {cartItems.map((item) => (
                <div key={item.product._id} className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="relative w-24 h-24">
                    <img
                      src={item.product.image || "/placeholder.svg"}
                      alt={item.product.name}
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold">{item.product.name}</h3>
                    <p className="text-sm text-gray-500">{item.product.description}</p>
                    <p className="font-bold mt-2">${item.product.price}</p>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                  <Button variant="destructive" size="icon" onClick={() => removeItem(item.product._id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter>
            <Button asChild className="w-full">
              <Link to="/shop/checkout">Proceed to Checkout</Link>   
            </Button>
              
            </CardFooter>

          </Card>
        </div>
      )}
    </div>
  );
}
