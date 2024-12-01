import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Navbar = ({ onLogout }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("John Doe"); // Example user name
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout(); // Trigger the parent App's logout handler
    navigate("/login");
  };

  useEffect(() => {
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      setIsLoggedIn(true);
      setUser(userData);
    }
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav className="bg-green-500 text-white shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center py-3">
        {/* Logo */}
        <div className="text-xl font-bold">
          <h3>Lemon Procurement</h3>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 items-center">
          <li className="hover:text-gray-200 cursor-pointer">
            <Link to="/" className="hover:text-black cursor-pointer">Home</Link>
          </li>
          <li className="hover:text-gray-200 cursor-pointer">
            <Link to="/products" className="hover:text-black cursor-pointer">Products</Link>
          </li>
          <li className="hover:text-gray-200 cursor-pointer">
            <Link to="/vendors/farmers" className="hover:text-black cursor-pointer">Farmers</Link>
          </li>
          <li className="hover:text-gray-200 cursor-pointer">
            <Link to="/purchase" className="hover:text-black cursor-pointer">Purchase</Link>
          </li>
          <li className="hover:text-gray-200 cursor-pointer">
            <Link to="/costmanager" className="hover:text-black cursor-pointer">Charges</Link>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <span className="font-medium">{user}</span>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-white text-green-500 rounded hover:bg-green-100 transition"
                >
                  Logout <i className="fa-solid fa-right-from-bracket"></i>
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login">
                <button className="px-4 py-2 bg-white text-green-500 rounded hover:bg-green-100 transition">
                  Sign In / Log In
                </button>
              </Link>
            </li>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
      </div>

      {/* Overlay and Sidebar for Mobile */}
      {isSidebarOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-10"
            onClick={toggleSidebar}
          ></div>

          {/* Sidebar */}
          <div className="absolute top-0 left-0 w-3/4 bg-green-700 md:hidden z-20 h-full">
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-xl font-bold">Lemon Procurement</span>
              <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
                <i className="fa-solid fa-times"></i>
              </button>
            </div>
            <ul className="flex flex-col space-y-4 px-4 py-6">
              <li>
                <Link to="/" className="hover:text-gray-200 cursor-pointer" onClick={toggleSidebar}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-gray-200 cursor-pointer" onClick={toggleSidebar}>
                  Products
                </Link>
              </li>
              <li>
                <Link to="/vendors/farmers" className="hover:text-gray-200 cursor-pointer" onClick={toggleSidebar}>
                  Farmers
                </Link>
              </li>
              <li>
                <Link to="/purchase" className="hover:text-gray-200 cursor-pointer" onClick={toggleSidebar}>
                  Purchase
                </Link>
              </li>
              <li>
                <Link to="/costmanager" className="hover:text-gray-200 cursor-pointer" onClick={toggleSidebar}>
                  Charges
                </Link>
              </li>
               
              {isLoggedIn ? (
                <>
                  <li className="font-medium text-lg">{user}</li>
                  <li>
                    <button
                      onClick={() => {
                        handleLogout();
                        toggleSidebar();
                      }}
                      className="w-full px-4 py-2 bg-white text-green-500 rounded hover:bg-green-100 transition"
                    >
                      Logout <i className="fa-solid fa-right-from-bracket"></i>
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link to="/login" onClick={toggleSidebar}>
                    <button className="w-full px-4 py-2 bg-white text-green-500 rounded hover:bg-green-100 transition">
                      Sign In / Log In
                    </button>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
