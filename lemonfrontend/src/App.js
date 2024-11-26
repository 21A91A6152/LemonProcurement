import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import SignIn from "./components/login";
import ProductsDashboard from "./components/Products";
import FarmersDashboard from "./components/Farmers";
import PurchaseDashboard from "./components/Purchase";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

const App = () => {
  const isAuthenticated = localStorage.getItem("userData");

  return (
    <div>
      <BrowserRouter>
        {isAuthenticated ? (
          <>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductsDashboard />} />
              <Route path="/vendors/farmers" element={<FarmersDashboard />} />
              <Route path="/purchase" element={<PurchaseDashboard />} />
              <Route path="*" element={<Navigate to="/" />} /> {/* Redirect any non-authenticated routes */}
            </Routes>
            <Footer />
          </>
        ) : (
          <Routes>
            <Route path="/login" element={<SignIn />} />
            <Route path="*" element={<Navigate to="/login" />} /> {/* Redirect to login for any route */}
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
};

export default App;
