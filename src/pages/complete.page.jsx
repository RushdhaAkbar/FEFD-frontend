import { Button } from "@/components/ui/button";
import { useGetOrderQuery, useGetCheckoutSessionStatusQuery } from "@/lib/api";
import { Link, useSearchParams, Navigate } from "react-router";
import { useState, useEffect } from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function CompletePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const { data, isLoading, isError } = useGetCheckoutSessionStatusQuery(sessionId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-lg font-medium text-gray-600">Loading...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-lg font-medium text-red-600">Error</div>
      </div>
    );
  }

  if (data?.status === "open") {
    return <Navigate to="/checkout" />;
  }

  if (data?.status === "complete") {
    return (
      <section
        id="success"
        className="max-w-2xl mx-auto p-8 my-12 bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <h2 className="text-3xl font-bold mb-6 text-green-700 tracking-tight">
          Order Completed Successfully!
        </h2>
        <p className="mb-6 text-gray-600 leading-relaxed">
          We appreciate your business! A confirmation email will be sent to{" "}
          <span className="font-semibold text-gray-800">{data.customer_email}</span>.
        </p>

        <div className="mt-8 border-t border-gray-200 pt-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Order Details</h3>
          <dl className="space-y-3 text-gray-600">
            <div className="flex justify-between">
              <dt className="font-medium">Order ID:</dt>
              <dd className="font-semibold text-gray-800">{data.orderId}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="font-medium">Order Status:</dt>
              <dd className="font-semibold text-gray-800">{data.orderStatus}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="font-medium">Payment Status:</dt>
              <dd className="font-semibold text-gray-800">{data.paymentStatus}</dd>
            </div>
          </dl>
        </div>

        <div className="mt-8">
          <p className="text-gray-600">
            If you have any questions, please email{" "}
            <a
              href="mailto:orders@example.com"
              className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
            >
              orders@example.com
            </a>.
          </p>
        </div>

        <Button
          asChild
          className="mt-8 w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
        >
          <Link to="/">Return to Home</Link>
        </Button>
      </section>
    );
  }

  return null;
}

export default CompletePage;