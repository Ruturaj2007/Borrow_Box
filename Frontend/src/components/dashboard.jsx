import React from "react";
import { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { User, Box, Plus } from "lucide-react";

const PORT = import.meta.env.VITE_PORT;
const API_URL = `http://localhost:${PORT}/api`;

const Dashboard = ({ user }) => {
  const [myProducts, setMyProducts] = useState([]);
  const [myBorrows, setMyBorrows] = useState([]);
  const [myLendings, setMyLendings] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const productsRes = await fetch(`${API_URL}/myproducts`, {
        credentials: "include",
      });

      const borrowsRes = await fetch(`${API_URL}/myborrows`, {
        credentials: "include",
      });

      const lendingsRes = await fetch(`${API_URL}/mylendings`, {
        credentials: "include",
      });

      const products = await productsRes.json();
      const borrows = await borrowsRes.json();
      const lendings = await lendingsRes.json();

      setMyProducts(products);
      setMyBorrows(borrows);
      setMyLendings(lendings);
    } catch (err) {
      console.error("Failed to fetch dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
            <User className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {user?.name || "Student"}
            </h1>
            <p className="text-gray-500">{user?.email}</p>
            {user?.enrollmentId && (
              <span className="inline-block mt-2 text-xs font-semibold bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md">
                URN: {user.enrollmentId}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Your Listed Items</h2>
        <Link
          to="/addproduct"
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition"
        >
          <Plus className="w-4 h-4" />
          Add Item
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-400 mb-10">
          Loading your listed items...
        </div>
      ) : !Array.isArray(myProducts) || myProducts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center text-gray-500 mb-10">
          <Box className="w-10 h-10 mx-auto mb-2 text-gray-300" />
          <p>You haven&apos;t listed any items on BorrowBox yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {myProducts.map((product) => {
            const coverImage =
              product.images?.find((img) => img.thumbNail)?.url ||
              product.images?.[0]?.url;
            
            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm flex flex-col"
              >
                <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
                  {coverImage ? (
                    <img
                      src={coverImage}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <Box className="w-12 h-12" />
                    </div>
                  )}
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
                        {product.category}
                      </span>
                      <span
                        className={`text-xs font-medium px-2.5 py-0.5 rounded-full bg-green-500 ${
                          product.isAvailable
                        
                        }`}
                      >
                        {product.isAvailable ? "Available" : "Borrowed"}
                      </span>
                    </div>

                    <h3 className="font-semibold text-gray-900 line-clamp-1">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {product.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                    <span>Condition: {product.condition}</span>
                    <span>Max {product.maxBorrowDays} days</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          Your Borrowed Products
        </h2>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-400">
          Loading your borrowed products...
        </div>
      )  : !Array.isArray(myBorrows) || myBorrows.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center text-gray-500">
          <Box className="w-10 h-10 mx-auto mb-2 text-gray-300" />
          <p>not borrowed any product.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {myBorrows.map((borrow) => {
            const product = borrow.product;
            const coverImage =
              product?.images?.find((img) => img.thumbNail)?.url ||
              product?.images?.[0]?.url;

            return (
              <div
                key={borrow.id}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm flex flex-col"
              >
                <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
                  {coverImage ? (
                    <img
                      src={coverImage}
                      alt={product?.title || "Borrowed item"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <Box className="w-12 h-12" />
                    </div>
                  )}
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
                        {product?.category || "Item"}
                      </span>
                      <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700">
                        {borrow.status}
                      </span>
                    </div>

                    <h3 className="font-semibold text-gray-900 line-clamp-1">
                      {product?.title || "Untitled Item"}
                    </h3>
                    {borrow.owner?.name && (
                      <p className="text-sm text-gray-500 mt-1">
                        Owner: {borrow.owner.name}
                      </p>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                    <span>
                      Borrowed:{" "}
                      {new Date(borrow.borrowDate).toLocaleDateString()}
                    </span>
                    <span>
                      Due:{" "}
                      {new Date(borrow.returnDeadline).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
