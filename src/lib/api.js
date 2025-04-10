
  import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
 // Define a service using a base URL and expected endpoints
   const BASE_URL = import.meta.env.VITE_BASE_URL;
  export const Api = createApi({
    reducerPath: "Api",
    baseQuery: fetchBaseQuery({
      baseUrl: `${BASE_URL}/api/`,
      prepareHeaders: async (headers, { getState }) => {
        return new Promise((resolve) => {
          async function checkToken() {
            const clerk = window.Clerk;
            if (clerk) {
              const token = await clerk.session?.getToken();
              headers.set("Authorization", `Bearer ${token}`);
              resolve(headers);
            } else {
              setTimeout(checkToken, 500); // try again in 500ms
            }
          }
          checkToken();
        });
      },
    }),
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
      getOrder: builder.query({
        query: (id) => `orders/${id}`,
      }),
      getUserOrders: builder.query({
        query: (userId) => `orders/user/${userId}`,
      }),
      createOrder: builder.mutation({
        query: (body) => ({
          url: `orders`,
          method: "POST",
          body,
        }),
      }), 
      createProduct: builder.mutation({
        query: (body) => ({
          url: `products`,
          method: "POST",
          body,
        }),
      }),
      getInventoryByProductId: builder.query({
        query: (productId) => `inventories?productId=${productId}`,
      }),
      createCheckoutSession: builder.mutation({
        query: () => ({
          url: `payments/create-checkout-session`,
          method: "POST",
        }),
      }),
      getCheckoutSessionStatus: builder.query({
        query: (sessionId) => `payments/session-status?session_id=${sessionId}`,
      }),
   
    }),
  })
  
  // Export hooks for usage in functional components, which are
  // auto-generated based on the defined endpoints
  export const { 
    useGetProductsQuery,
    useGetCategoriesQuery,
    useGetCategoryProductsQuery,
    useCreateOrderMutation,
    useCreateProductMutation,
    useGetOrderQuery,
    useGetUserOrdersQuery,
    useGetInventoryByProductIdQuery,
    useCreateCheckoutSessionMutation,
    useGetCheckoutSessionStatusQuery,
  } = Api;




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
  