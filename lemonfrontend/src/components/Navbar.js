import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("John Doe"); // Example user name
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userData");
    setIsLoggedIn(false);
    setUser(null);
    navigate("/");
  };

  useEffect(() => {
    const userDataString = localStorage.getItem('userData');
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
            <li className="hover:text-gray-200 cursor-pointer"><Link to={'./'} className="hover:text-black cursor-pointer">Home</Link> </li>
            <li className="hover:text-gray-200 cursor-pointer"><Link to={'./'} className="hover:text-black cursor-pointer">About</Link></li>
            <li className="hover:text-gray-200 cursor-pointer"><Link to={'./'} className="hover:text-black cursor-pointer">Feature</Link></li>
            <li className="hover:text-gray-200 cursor-pointer"><Link to={'./'} className="hover:text-black cursor-pointer">Contact</Link></li>
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

      {/* Sidebar for Mobile */}
      {isSidebarOpen && (
        <div className="absolute top-0 left-0 w-full bg-green-700 md:hidden z-10">
          <div><span className="text-xl font-bold px-5"> Lemon Procurement</span> <span className="px-3"><button onClick={toggleSidebar} className="text-2xl focus:outline-none">
            <i className="fa-solid fa-bars"></i>
          </button>
        </span></div>
          <ul className="flex flex-col space-y-4 px-4 py-6">
            <li className="hover:text-black cursor-pointer text-center"><Link to={'./'}>Home</Link> </li>
            <li className="hover:text-black cursor-pointer text-center"><Link to={'./'}>About</Link></li>
            <li className="hover:text-black cursor-pointer text-center"><Link to={'./'}>Feature</Link></li>
            <li className="hover:text-black cursor-pointer text-center"><Link to={'./'}>Contact</Link></li>
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
      )}
    </nav>
  );
};

export default Navbar;
