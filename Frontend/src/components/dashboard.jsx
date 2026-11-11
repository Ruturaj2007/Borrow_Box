import React from "react";
import { Link } from "react-router-dom";
import { User, Package, Plus } from "lucide-react";

const Dashboard = ({ user }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
            <User className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{user?.name || "Student"}</h1>
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
          to="/add-product"
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition"
        >
          <Plus className="w-4 h-4" />
          Add Item
        </Link>
      </div>

      

    
    </div>
  );
};

export default Dashboard;
