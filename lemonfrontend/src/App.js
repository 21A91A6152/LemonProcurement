// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import Home from "./components/Home";
// import SignIn from "./components/login";
// import ProductsDashboard from "./components/Products";
// import FarmersDashboard from "./components/Farmers";
// import PurchaseDashboard from "./components/Purchase";
// import { BrowserRouter,Route,Routes } from 'react-router-dom';

// function App() {
 
//   return (
//     <div>
//       <BrowserRouter>
//         <Navbar   />
//         <Routes>
          
//           <Route path="/" element={<Home/>}/>
//           <Route path="/login" element={<SignIn/>}/>
//           <Route path="/products" element={<ProductsDashboard/>}/>
//           <Route path="/vendors/farmers" element={<FarmersDashboard/>}/>
//           <Route path="/purchase" element={<PurchaseDashboard/>}/>
//         </Routes>
//         <Footer/>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;.

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import SignIn from "./components/login";
import ProductsDashboard from "./components/Products";
import FarmersDashboard from "./components/Farmers";
import PurchaseDashboard from "./components/Purchase";
import { BrowserRouter,Route,Routes ,Navigate} from 'react-router-dom';
 
 
const App = () => {
  const isAuthenticated = localStorage.getItem("userData");

  return (
    <div> 
      <BrowserRouter> 
      <Navbar></Navbar>
    <Routes>
       
      <Route
        path="/"
        element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
      />
      <Route path="/login" element={<SignIn />} />
      <Route path="/products" element={<ProductsDashboard />} />
      <Route path="/vendors/farmers" element={<FarmersDashboard />} />
      <Route path="/purchase" element={<PurchaseDashboard />} />
    </Routes>
    <Footer></Footer>
    </BrowserRouter>
    </div>
  );
};

export default App;
