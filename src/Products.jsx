import ProductCards from "./ProductCards";
import { Separator } from "@/components/ui/separator";
import Tab from "./Tab";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { getProducts } from "./lib/api";
import { Skeleton } from "./components/ui/skeleton";

function Products(props) {
  const [products, setProducts] = useState([]);
  const [isProductsLoading, setIsProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState({
    isError: false,
    message: "",
  });

  const categories = [
    { _id: "ALL", name: "All" },
    { _id: "1", name: "Headphones" },
    { _id: "2", name: "Earbuds" },
    { _id: "3", name: "Speakers" },
    { _id: "4", name: "Mobile Phones" },
    { _id: "5", name: "Smart Watches" },
  ];

  const [selectedCategoryId, setSelectedCategoryId] = useState("ALL");
  const [sortOrder, setSortOrder] = useState("descending");

  const filteredProducts =
    selectedCategoryId === "ALL"
      ? products
      : products.filter((product) => product.categoryId === selectedCategoryId);

  const handleTabClick = (_id) => {
    setSelectedCategoryId(_id);
  };

  const sortedProducts = filteredProducts.slice().sort((a, b) => {
    if (sortOrder === "ascending") return a.price - b.price;
    if (sortOrder === "descending") return b.price - a.price;
    return 0;
  });

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        setProductsError({ isError: true, message: error.message });
      })
      .finally(() => setIsProductsLoading(false));
  }, []);

  if (isProductsLoading) {
    return (
      <section className="px-8 py-8">
        <h2 className="text-4xl font-bold">Our Top Products</h2>
        <Separator className="mt-2" />
        <div className="mt-4 flex items-center gap-4">
          {categories.map((category) => (
            <Tab
              key={category._id}
              _id={category._id}
              selectedCategoryId={selectedCategoryId}
              name={category.name}
              onTabClick={handleTabClick}
            />
          ))}
        </div>
        <div className="grid grid-cols-4 gap-4 mt-4">
          <Skeleton className="h-80" />
          <Skeleton className="h-80" />
          <Skeleton className="h-80" />
          <Skeleton className="h-80" />
        </div>
      </section>
    );
  }

  if (productsError.isError) {
    return (
      <section className="px-8 py-8">
        <h2 className="text-4xl font-bold">Our Top Products</h2>
        <Separator className="mt-2" />
        <div className="mt-4 flex items-center gap-4">
          {categories.map((category) => (
            <Tab
              key={category._id}
              _id={category._id}
              selectedCategoryId={selectedCategoryId}
              name={category.name}
              onTabClick={handleTabClick}
            />
          ))}
        </div>
        <p className="mt-4 text-red-500">{productsError.message}</p>
      </section>
    );
  }

  return (
    <section className="px-8 py-8">
      <h2 className="text-4xl font-bold">Our Top Products</h2>
      <Separator className="mt-2" />
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {categories.map((category) => (
            <Tab
              key={category._id}
              _id={category._id}
              selectedCategoryId={selectedCategoryId}
              name={category.name}
              onTabClick={handleTabClick}
            />
          ))}
        </div>
        <div className="flex gap-4">
          <Button
            className="h-8 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-800"
            onClick={() => setSortOrder("ascending")}
          >
            Sort by Price: Ascending
          </Button>
          <Button
            className="h-8 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-800"
            onClick={() => setSortOrder("descending")}
          >
            Sort by Price: Descending
          </Button>
        </div>
      </div>
      <ProductCards handleAddToCart={props.handleAddToCart} products={sortedProducts} />
    </section>
  );
}

export default Products;
