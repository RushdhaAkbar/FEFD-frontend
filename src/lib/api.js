
// export const getProducts = async () => {
//     try {
//       const res = await fetch("http://localhost:3000/api/products", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       const data = 
//       [
//         {
//           categoryId: "1",
//           image: "/assets/products/airpods-max.png",
//           _id: "1",
//           name: "AirPods Max",
//           price: "549.00",
//           description:
//             "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, sequi?",
//         },
//         {
//           categoryId: "3",
//           image: "/assets/products/echo-dot.png",
//           _id: "2",
//           name: "Echo Dot",
//           price: "99.00",
//           description:
//             "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, sequi?",
//         },
//         {
//           categoryId: "2",
//           image: "/assets/products/pixel-buds.png",
//           _id: "3",
//           name: "Galaxy Pixel Buds",
//           price: "99.00",
//           description:
//             "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, sequi?",
//         },
//         {
//           categoryId: "1",
//           image: "/assets/products/quietcomfort.png",
//           _id: "4",
//           name: "Bose QuiteComfort",
//           price: "249.00",
//           description:
//             "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, sequi?",
//         },
//         {
//           categoryId: "3",
//           image: "/assets/products/soundlink.png",
//           _id: "5",
//           name: "Bose SoundLink",
//           price: "119.00",
//           description:
//             "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, sequi?",
//         },
//         {
//           categoryId: "5",
//           image: "/assets/products/apple-watch.png",
//           _id: "6",
//           name: "Apple Watch 9",
//           price: "699.00",
//           description:
//             "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, sequi?",
//         },
//         {
//           categoryId: "4",
//           image: "/assets/products/iphone-15.png",
//           _id: "7",
//           name: "Apple Iphone 15",
//           price: "1299.00",
//           description:
//             "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, sequi?",
//         },
//         {
//           categoryId: "4",
//           image: "/assets/products/pixel-8.png",
//           _id: "8",
//           name: "Galaxy Pixel 8",
//           price: "549.00",
//           description:
//             "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, sequi?",
//         },
//       ];
//       return data;
//     } catch (error) {
//       throw new Error("Error while loading products");
//     }
//   };

  export const getCategories = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/categories", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const categories = 
      [
        { _id: "ALL", name: "All" },
        { _id: "1", name: "Headphones" },
        { _id: "2", name: "Earbuds" },
        { _id: "3", name: "Speakers" },
        { _id: "4", name: "Mobile Phones" },
        { _id: "5", name: "Smart Watches" },
      ];
      return categories;
    } catch (error) {
      throw new Error("Error while loading categories");
    }
  };

  import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
 // Define a service using a base URL and expected endpoints
  export const Api = createApi({
    reducerPath: 'Api',
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/"}),
    endpoints: (builder) => ({
      getProducts: builder.query({
        query: () => `products`,
      }),
      getCategories: builder.query({
        query: () => `categories`,
      }),
      getCategoryProducts: builder.query({
        query: (categoryId) => categoryId === "ALL" ? `products` : `products?categoryId=${categoryId}`,
      }),
      
    }),
  })
  
  // Export hooks for usage in functional components, which are
  // auto-generated based on the defined endpoints
  export const { useGetProductsQuery,useGetCategoriesQuery,useGetCategoryProductsQuery} = Api;




  // export const getProducts = async () => {
//   try {
//     const res = await fetch("http://localhost:3000/api/products", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     const data = await res.json();
//     return data;
//   } catch (error) {
//     throw new Error("Error while loading products");
//   }
// };
     
  // export const getCategories = async () => {
  //   try {
  //     const res = await fetch("http://localhost:3000/api/categories", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     const categories = await res.json();
  //     return categories;
  //   } catch (error) {
  //     throw new Error("Error while loading categories");
  //   }
  // };
  