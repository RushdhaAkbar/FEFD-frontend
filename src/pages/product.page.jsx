import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useGetProductsQuery, useGetInventoryByProductIdQuery } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/lib/features/cartSlice";
import { useDispatch } from "react-redux";

const ProductPage = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();

  const { data: products, isLoading: productLoading, error: productError } = useGetProductsQuery();
  const { data: inventory, isLoading: inventoryLoading } = useGetInventoryByProductIdQuery(productId, { skip: !productId });

  useEffect(() => {
    if (productId) {
      console.log("Product ID from URL:", productId);
    }
  }, [productId]);

  if (productLoading) return <div className="text-center mt-10 text-lg">Loading product...</div>;
  if (productError) return <div className="text-center text-red-500 mt-10">Error loading product details</div>;

  const product = products?.find((p) => p._id === productId);

  if (!product) return <div className="text-center text-gray-500 mt-10">Product not found</div>;

  const isOutOfStock = !inventoryLoading && inventory?.quantity <= 0;

  const handleClick = () => {
    if (isOutOfStock) return; // Prevent adding to cart if out of stock
    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        description: product.description,
      })
    );
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex justify-center relative">
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-80 object-cover rounded-lg ${isOutOfStock ? "opacity-50" : ""}`}
          />
          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-white text-black text-lg font-bold px-4 py-2 border border-black">
                OUT OF STOCK
              </span>
            </div>
          )}
        </div>
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <div className="mt-4">
            <span className="text-xl font-semibold text-green-600">${product.price}</span>
          </div>
          <div className="mt-2">
            <span
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                inventory?.quantity > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}
            >
              {inventory?.quantity > 0 ? `In Stock: ${inventory.quantity}` : "Out of Stock"}
            </span>
          </div>
          <div className="mt-6">
            <Button
              className={`w-full py-2 rounded-md text-white ${
                isOutOfStock ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
              onClick={handleClick}
              disabled={isOutOfStock}
            >
              {isOutOfStock ? "Out of Stock" : "Add to Cart"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;