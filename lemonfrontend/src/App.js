// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import Home from "./components/Home";
// import SignIn from "./components/login";
// import ProductsDashboard from "./components/Products";
// import FarmersDashboard from "./components/Farmers";
// import PurchaseDashboard from "./components/Purchase";
// import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
 
// const App = () => {
//   const isAuthenticated = localStorage.getItem("userData");

//   return (
//     <div>
//       <BrowserRouter>
//         {isAuthenticated ? (
//           <>
//             <Navbar />
//             <Routes>
//               <Route path="/" element={<Home />} />
//               <Route path="/products" element={<ProductsDashboard />} />
//               <Route path="/vendors/farmers" element={<FarmersDashboard />} />
//               <Route path="/purchase" element={<PurchaseDashboard />} />
//               <Route path="*" element={<Navigate to="/" />} /> {/* Redirect any non-authenticated routes */}
//             </Routes>
//             <Footer />
//           </>
//         ) : (
//           <Routes>
//             <Route path="/login" element={<SignIn />} />
//             <Route path="*" element={<Navigate to="/login" />} /> {/* Redirect to login for any route */}
//           </Routes>
//         )}
//       </BrowserRouter>
//     </div>
//   );
// };

// export default App;

import React, { useState,useEffect  } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import SignIn from "./components/login";
import ProductsDashboard from "./components/Products";
import FarmersDashboard from "./components/Farmers";
import PurchaseDashboard from "./components/Purchase";
import CostManager from "./components/CostManager";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

const App = () => {
  const [user, setUser] = useState("");
  useEffect(() => {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      setUser(userData);
    }
  }, []);
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem("userData"))
  );

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("userData");
    setIsAuthenticated(false); // Update the state
  };

  // Function to handle login (optional for SignIn integration)
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <div>
      <BrowserRouter>
        {isAuthenticated ? (
          <>
            <Navbar onLogout={handleLogout} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductsDashboard user={user}/>} />
              <Route path="/vendors/farmers" element={<FarmersDashboard user={user}/>} />
              <Route path="/purchase" element={<PurchaseDashboard user={user}/>} />
              <Route path="/costmanager" element={<CostManager user={user}/>} />
              <Route path="*" element={<Navigate to="/" />} /> {/* Redirect invalid routes */}
            </Routes>
            <Footer />
          </>
        ) : (
          <Routes>
            <Route path="/login" element={<SignIn onLogin={handleLogin} />} />
            <Route path="*" element={<Navigate to="/login" />} /> {/* Redirect to login */}
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
};

export default App;
