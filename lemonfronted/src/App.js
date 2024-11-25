import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import SignIn from "./components/login";
import { BrowserRouter,Route,Routes } from 'react-router-dom';

function App() {
 
  return (
    <div>
      <BrowserRouter>
        <Navbar   />
        <Routes>
          
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<SignIn/>}/>
           
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
 