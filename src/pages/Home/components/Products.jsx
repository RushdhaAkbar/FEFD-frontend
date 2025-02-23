import ProductCards from "./ProductCards";
import { Separator } from "@/components/ui/separator";
import Tab from "./Tab";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useGetCategoriesQuery, useGetCategoryProductsQuery } from "../../../lib/api";
import { Skeleton } from "../../../components/ui/skeleton";

function Products() {
  const [selectedCategoryId, setSelectedCategoryId] = useState("ALL");
  const [sortOrder, setSortOrder] = useState("descending");


  const { 
    data: products = [], 
    isLoading: isProductsLoading, 
    isError: isProductsError, 
    error: productsError,
  } = useGetCategoryProductsQuery(selectedCategoryId);

  const { 
    data: categories = [], 
    isLoading: isCategoriesLoading, 
    isError: isCategoriesError, 
    error: categoriesError,
  } = useGetCategoriesQuery();

  
  // useEffect(() => {
  //   console.log("Selected Category:", selectedCategoryId);
  //   console.log("Products from API:", products);
  // }, [selectedCategoryId, products]);

 
  const sortedProducts = [...products].sort((a, b) => {
    if (sortOrder === "ascending") return a.price - b.price;
    if (sortOrder === "descending") return b.price - a.price;
    return 0;
  });

  const handleTabClick = (_id) => {
    setSelectedCategoryId(_id);
    
  };

  if (isProductsLoading || isCategoriesLoading) {
    return (
      <section className="px-8 py-8">
        <h2 className="text-4xl font-bold">Our Top Products</h2>
        <Separator className="mt-2" />
        <div className="grid grid-cols-4 gap-4 mt-4">
          <Skeleton className="h-80" />
          <Skeleton className="h-80" />
          <Skeleton className="h-80" />
          <Skeleton className="h-80" />
        </div>
      </section>
    );
  }

  if (isProductsError || isCategoriesError) {
    return (
      <section className="px-8 py-8">
        <h2 className="text-4xl font-bold">Our Top Products</h2>
        <Separator className="mt-2" />
        <p className="mt-4 text-red-500">{productsError?.message || categoriesError?.message}</p>
      </section>    
    );
  }

  return (
    <section className="px-8 py-8">
      <h2 className="text-4xl font-bold">Our Top Products</h2>
      <Separator className="mt-2" />
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {[...categories, { _id: "ALL", name: "All" }].map((category) => (
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
      <ProductCards products={sortedProducts} />
    </section>
  );
}

export default Products;
