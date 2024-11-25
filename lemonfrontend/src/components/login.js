import  { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function SignIn() {
    const [formData, setFormData] = useState({
        'username': '',
        'email': '',
        'password': '',
        'phone': '',
    });
    const [formDataL,setFormdataL]=useState({
        'email':'',
        'password':'',
    }) 
    const [currentView, setCurrentView] = useState('login');

     

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://lemonprocurement.onrender.com/login', {formDataL });
            const { msg, email } = response.data;

            if (msg === "login successful") {
                Swal.fire({
                    position: "middle",
                    icon: "success",
                    title: "Login successful ...!",
                    showConfirmButton: false,
                    timer: 1500
                });
                localStorage.setItem('userData', JSON.stringify(email.email));
                window.location.href = '/';
            } else {
                Swal.fire({
                    title: "Login unsuccessful!",
                    text: "Check details and login!",
                    icon: "error"
                });
            }
        } catch (error) {
            console.error("Error occurred while logging in:", error);
            Swal.fire({
                title: "Error",
                text: "An error occurred while logging in. Please try again later.",
                icon: "error"
            });
        }
    };

    const handleSignupSubmit = (e) => {
        e.preventDefault();
        
        axios.post('https://lemonprocurement.onrender.com/signup', {formData})
            .then((res) => {
                Swal.fire({
                    title: "Success",
                    text: res.data.msg,
                    icon: "success"
                });
                setCurrentView('login')
            })
            .catch((error) => {
                console.error("Error occurred during signup:", error);
                Swal.fire({
                    title: "Error",
                    text: "An error occurred while signing up. Please try again later.",
                    icon: "error"
                });
            });
    };

    return (
        <div className="container mx-auto px-4 py-6">
            {currentView === 'login' && (
                <div className="max-w-md mx-auto bg-gradient-to-br from-white to-gray-50 shadow-lg rounded-lg overflow-hidden p-8 md:p-12">
                <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
                  Login to Your Account
                </h1>
                <div className="space-y-5">
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                    onChange={(e) => setFormdataL({ ...formDataL, email: e.target.value })}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                    onChange={(e) => setFormdataL({ ...formDataL, password: e.target.value })}
                  />
                </div>
                <div className="mt-4">
                  <button
                    onClick={() => setCurrentView("forgot")}
                    className="text-green-500 hover:text-green-600 font-medium hover:underline"
                  >
                    Forgotten password?
                  </button>
                </div>
                <div className="mt-8">
                  <button
                    type="button"
                    className="w-full bg-green-500 text-white font-bold p-3 rounded-lg shadow-lg hover:bg-green-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                    onClick={handleLoginSubmit}
                  >
                    Login
                  </button>
                </div>
                <p className="mt-6 text-center text-gray-600">
                  Not registered yet?{" "}
                  <button
                    onClick={() => setCurrentView("signup")}
                    className="text-green-500 hover:text-green-600 font-medium hover:underline"
                  >
                    Create an account
                  </button>
                </p>
              </div>
              
              
            )}

            {currentView === 'signup' && (
               <div className="max-w-md mx-auto bg-gradient-to-br from-white to-gray-50 shadow-lg rounded-lg overflow-hidden p-8 md:p-12">
               <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
                 Create Your Account
               </h1>
               <div className="space-y-5">
                 <div className="grid md:grid-cols-2 gap-4">
                   <input
                     type="text"
                     placeholder="User Name"
                     className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                     onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                   />
                    
                 </div>
                 <input
                   type="email"
                   placeholder="Email Address"
                   className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                 />
                 <input
                   type="text"
                   placeholder="Phone Number"
                   className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                   onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                 />
                 <input
                   type="password"
                   placeholder="Password"
                   className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                   onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                 />
               </div>
               <div className="mt-8">
                 <button
                   type="button"
                   className="w-full bg-green-500 text-white font-bold p-3 rounded-lg shadow-lg hover:bg-green-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                   onClick={handleSignupSubmit}
                 >
                   Create Your Account
                 </button>
               </div>
               <p className="mt-6 text-center text-gray-600">
                 Already have an account?{" "}
                 <button
                   onClick={() => setCurrentView("login")}
                   className="text-green-500 hover:text-green-600 font-medium hover:underline"
                 >
                   Log In
                 </button>
               </p>
             </div>
             
           
            )}

            {currentView === 'forgot' && (
                <div className="text-center text-white">Forgot Password</div>
            )}
        </div>
    );
}

export default SignIn;
