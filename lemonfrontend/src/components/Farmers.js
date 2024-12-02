import React, { useState,useEffect,useCallback } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function FarmersDashboard(user) {
  const navigate = useNavigate();
  const [farmers, setFarmers] = useState([]);
  const [showForm, setShowForm] = useState(false);
 
  const [formData, setFormData] = useState({
    firstName: "",
    surName: "",
    phoneNumber: "",
    village: "",
    city: "",
    state: "Andhra Pradesh", // Default dropdown value
    country: "India", // Default dropdown value
    pincode: "",
    admin:'john'
  });
  const [errors, setErrors] = useState({});

  

  const validateForm = () => {
    let validationErrors = {};

    if (!formData.firstName.trim()) validationErrors.firstName = "Name is required.";
    if (!formData.surName.trim()) validationErrors.surName = "Sur Name is required.";
    if (!formData.phoneNumber.match(/^\d{10}$/)) validationErrors.phoneNumber = "Phone Number must be 10 digits.";
    if (!formData.village.trim()) validationErrors.village = "Village is required.";
    if (!formData.city.trim()) validationErrors.city = "City is required.";
    if (!formData.state) validationErrors.state = "State is required.";
    if (!formData.country) validationErrors.country = "Country is required.";
    if (!formData.pincode.match(/^\d{6}$/)) validationErrors.pincode = "Pincode must be 6 digits.";

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0; // Return true if no errors
  };

 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddFarmer = () => {
    const updatedFormData = {
      ...formData,
      admin: user.user, // Use the current user value for the admin field
    };
  
    if (validateForm()) {
      // Only reset formData after successful validation and submission
      axios
        .post('https://lemonprocurement.onrender.com/api/addfarmers', updatedFormData)
        .then((res) => {
          Swal.fire({
            title: "Success",
            text: res.data.msg,
            icon: "success",
          });
          setShowForm(false);
          setFormData({
            firstName: "",
            surName: "",
            phoneNumber: "",
            village: "",
            city: "",
            state: "Andhra Pradesh",
            country: "India",
            pincode: "",
            admin: user.user,
          });
          fetchFarmers();
        })
        .catch((error) => {
          console.error("Error occurred during signup:", error);
          Swal.fire({
            title: "Error",
            text: "An error occurred while signing up. Please try again later.",
            icon: "error",
          });
        });
    }
  };
  

  // const handleAddFarmer = () => {
  //   const updatedFormData = {
  //       ...formData,
  //       admin: user.user, // Use the current user value for the admin field
  //     };
   
  //   setFormData({
  //     firstName: "",
  //     surName: "",
  //     phoneNumber: "",
  //     village: "",
  //     city: "",
  //     state: "Andhra Pradesh",
  //     country: "India",
  //     pincode: "",
  //     admin:user.user,
  //   });
  //   if(validateForm()){
  //   axios.post('https://lemonprocurement.onrender.com/api/addfarmers',updatedFormData)
  //           .then((res) => {
  //               Swal.fire({
  //                   title: "Success",
  //                   text: res.data.msg,
  //                   icon: "success"
  //               });
  //               setShowForm(false);
  //               fetchFarmers()
  //           })
  //           .catch((error) => {
  //               console.error("Error occurred during signup:", error);
  //               Swal.fire({
  //                   title: "Error",
  //                   text: "An error occurred while signing up. Please try again later.",
  //                   icon: "error"
  //               });
  //           });
  //         }
  // };
 
  const fetchFarmers = useCallback(async () => {
    if (!user.user) {
      console.warn('User is not defined!');
      return;
    }
  
    try {
      const response = await fetch(`https://lemonprocurement.onrender.com/api/farmers?userId=${user.user}`);
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }
      const data = await response.json();
      setFarmers(data);
    } catch (error) {
      console.error('Error fetching farmers data:', error);
    }
  }, [user.user]);
  
  useEffect(() => {
    fetchFarmers();
  }, [fetchFarmers]);
  


   

  
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://lemonprocurement.onrender.com/api/farmersd/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to delete: ${response.statusText}`);
      }
  
      // Fetch updated farmers after successful deletion
      fetchFarmers();
    } catch (error) {
      console.error("Error deleting the farmer:", error.message);
      alert("Failed to delete the farmer. Please try again.");
    }
  };
  
  const handleFarmerClick = (farmerName) => {
    navigate(`/report?farmerName=${encodeURIComponent(farmerName)}`);
  };
   
  

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Farmers Dashboard</h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Add Farmer
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="table-auto w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">Farmer Name</th>
                <th className="px-4 py-2">Phone Number</th>
                <th className="px-4 py-2">Village</th>
                <th className="px-4 py-2">City</th>
                <th className="px-4 py-2">State</th>
                <th className="px-4 py-2">Country</th>
                <th className="px-4 py-2">Edit</th>
              </tr>
            </thead>
            <tbody>
              {farmers.map((farmer, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="hover:bg-gray-100 text-center"
                >
                  <td className="px-4 py-2" onClick={() => handleFarmerClick(farmer.farmerName)}>{farmer.farmerName}</td>
                  <td className="px-4 py-2">{farmer.phoneNumber}</td>
                  <td className="px-4 py-2">{farmer.village}</td>
                  <td className="px-4 py-2">{farmer.city}</td>
                  <td className="px-4 py-2">{farmer.state}</td>
                  <td className="px-4 py-2">{farmer.country}</td>
                  <td className="px-4 py-2">
               
                    <button
                      onClick={() => handleDelete(farmer._id)}
                      className="bg-red-500 text-white py-1 px-2 rounded mt-1"
                    >
                      Delete
                    </button>
                  </td>
                </motion.tr>
              ))}
              {farmers.length === 0 && (
                <tr>
                  <td colSpan="9" className="text-center text-gray-500 py-4">
                    No farmers available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {showForm && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
          >
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                <h2 className="text-xl font-bold mb-4">Add Farmer</h2>
                <div className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="relative">
                      <input
                        type="text"
                        name="firstName"
                        placeholder="Name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                      {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        name="surName"
                        placeholder="Sur Name"
                        value={formData.surName}
                        onChange={handleInputChange}
                        className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                      {errors.surName && <p className="text-red-500 text-sm">{errors.surName}</p>}
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      name="phoneNumber"
                      placeholder="Phone Number"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="relative">
                      <input
                        type="text"
                        name="village"
                        placeholder="Village"
                        value={formData.village}
                        onChange={handleInputChange}
                        className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                      {errors.village && <p className="text-red-500 text-sm">{errors.village}</p>}
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                      {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="relative">
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
                      >
                        <option value="">Select State</option>
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Karnataka">Karnataka</option>
                      </select>
                      {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
                    </div>
                    <div className="relative">
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
                      >
                        <option value="">Select Country</option>
                        <option value="India">India</option>
                        <option value="USA">USA</option>
                        <option value="Canada">Canada</option>
                      </select>
                      {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      name="pincode"
                      placeholder="Pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    {errors.pincode && <p className="text-red-500 text-sm">{errors.pincode}</p>}
                  </div>
                  <div className="flex justify-end space-x-4">
                    <button
                      onClick={() => setShowForm(false)}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddFarmer}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default FarmersDashboard;

