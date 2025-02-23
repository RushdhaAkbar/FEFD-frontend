import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import HomePage from "./pages/Home/home.page";
import ShopPage from "./pages/shop.page";
import SignInPage from "./pages/sign-in.page";
import SignUpPage from "./pages/sign-up.page";
import Protected from "@/layouts/Protected";
import AdminProtected from "@/layouts/AdminProtected";
import CartPage from "./pages/cart.page";
import { store } from "@/lib/store";
import { Provider } from "react-redux";
import CheckoutPage from "./pages/checkout.page";
import { ClerkProvider } from '@clerk/clerk-react'

import AccountPage from "./pages/account.page";
import PaymentPage from "./pages/payment.page";
import CompletePage from "./pages/complete.page";
import ProductPage from "./pages/product.page";
import OrderPage from "./pages/order.page";
import AdminProductCreatePage from "./pages/admin-product-create.page";
import MainLayout from "./layouts/main.layout";
import RootLayout from "./layouts/rootLayout/root.layout";
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}
createRoot(document.getElementById("root")).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
      <Route element={<RootLayout />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
          <Route element={<Protected />}>
            <Route path="/order" element={<OrderPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/shop/cart" element={<CartPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/shop/checkout" element={<CheckoutPage />} />
            <Route path="/shop/payment" element={<PaymentPage />} />
            <Route path="/shop/complete" element={<CompletePage />} />
            <Route path="/shop/:productId" element={<ProductPage />} />
             {/* The AdminProtected layout can be used to wrap routes that needs to be logged in as admin to access */}
             <Route element={<AdminProtected />}>
                  <Route
                    path="/admin/products/create"
                    element={<AdminProductCreatePage />}
                  />
                </Route>
                </Route>
                </Route>
          </Route>
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        
      </Routes>
    </BrowserRouter>
</Provider>
</ClerkProvider>
);