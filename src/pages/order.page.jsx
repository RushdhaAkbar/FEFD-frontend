import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetUserOrdersQuery } from "@/lib/api"; 
import { useUser } from "@clerk/clerk-react";

export default function OrderPage() {
  const { user, isLoaded } = useUser();
  const userId = user?.id;

  const { data, isLoading, error } = useGetUserOrdersQuery(userId, { skip: !userId });

  if (!isLoaded) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-lg font-medium text-gray-600">Loading...</div>
    </div>
  );
  if (!user) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-lg font-medium text-gray-600">Please log in</div>
    </div>
  );
  if (isLoading) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-lg font-medium text-gray-600">Loading...</div>
    </div>
  );
  if (error) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <p className="text-lg font-medium text-gray-500">You have no orders yet</p>
    </div>
  );
  if (!data || data.length === 0) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <p className="text-lg font-medium text-gray-500">You have no orders yet</p>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-gray-800 mb-10 tracking-tight text-center">Your Orders</h1>
      <div className="grid gap-8 md:grid-cols-3">
        <Card className="md:col-span-2 bg-white rounded-xl shadow-lg border border-gray-100">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold text-gray-800">Order Details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            {data.map((order) => (
              <div key={order._id} className="flex flex-col p-6 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-xl text-gray-800">Order ID: {order._id}</h3>
                  <p className="text-sm font-medium text-gray-600">Status: {order.paymentStatus}</p>
                </div>
                <div>
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-6 py-4 border-b border-gray-200 last:border-b-0">
                      <div className="relative w-24 h-24 flex-shrink-0">
                        <img
                          src={item.product.image || "/placeholder.svg"}
                          alt={item.product.name}
                          className="object-contain w-full h-full rounded-md"
                        />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-semibold text-lg text-gray-800">{item.product.name}</h4>
                        <p className="text-sm text-gray-500 line-clamp-2">{item.product.description}</p>
                        <div className="flex justify-between items-center mt-2">
                          <p className="font-bold text-gray-900">${item.product.price}</p>
                          <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                        </div>
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