import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetUserOrdersQuery } from "@/lib/api"; 
import { useUser } from "@clerk/clerk-react";

export default function OrderPage() {
  const { user, isLoaded } = useUser();
  const userId = user?.id;
  if (!isLoaded) return <div className="text-center">Loading...</div>;
  if (!user) return <div className="text-center">Please log in</div>;

  const { data, isLoading, error } = useGetUserOrdersQuery(userId); 

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center">Failed to load orders</div>;
  }

  if (!data || data.length === 0) {
    return <p className="text-center text-gray-500">You have no orders yet</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Orders</h1>
      <div className="grid gap-8 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            {data.map((order) => (
              <div key={order._id} className="flex flex-col p-4 border rounded-lg">
                <h3 className="font-semibold text-lg">Order ID: {order._id}</h3>
                <p className="text-sm text-gray-500">Status: {order.paymentStatus}</p>
                <div className="mt-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 py-2 border-b">
                      <div className="relative w-24 h-24">
                        <img
                          src={item.product.image || "/placeholder.svg"}
                          alt={item.product.name}
                          className="object-contain"
                        />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-semibold">{item.product.name}</h4>
                        <p className="text-sm text-gray-500">{item.product.description}</p>
                        <p className="font-bold mt-2">${item.product.price}</p>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
