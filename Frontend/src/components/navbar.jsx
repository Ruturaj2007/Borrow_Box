import React from "react";
import { Link } from "react-router-dom";
import { Box, Plus, LayoutDashboard, User, LogOut } from "lucide-react"; 


const Navbar = ({user, onLogout }) => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-indigo-600">
            <Box className="w-6 h-6" />
            <span>BorrowBox</span>
          </Link>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link to="/" className="text-gray-600 hover:text-indigo-600 text-sm font-medium">
                  Browse
                </Link>
                <Link
                  to="/addproduct"
                  className="flex items-center gap-1 text-gray-600 hover:text-indigo-600 text-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  List Item
                </Link>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-1 text-gray-600 hover:text-indigo-600 text-sm font-medium"
                >
                <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>

                <div className="flex items-center gap-2 bg-indigo-50 px-3 py-1.5 rounded-full">
                  <User className="w-4 h-4 text-indigo-600" />
                  <span className="text-sm font-medium text-indigo-700">{user.name}</span>
                </div>

                <button
                  onClick={onLogout}
                  className="flex items-center gap-1 text-red-500 hover:text-red-700 text-sm font-medium cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-indigo-600 text-sm font-medium"
                >
                  Login
                  </Link>
                  
                <Link
                  to="/register"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
                >
                  Register
                  </Link>

                
                  
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;