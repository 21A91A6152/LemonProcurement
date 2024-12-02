import React, { useState, useEffect, useCallback } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
 
const PurchaseDashboard = (user) => {
  const navigate = useNavigate();
  const [farmers, setFarmers] = useState([]);
  const [purchases, setPurchases] = useState([]);
 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPurchase, setNewPurchase] = useState({
    farmerName: "",
    phone: "",
    qty: "",
    bags:"",
    grade:"A",
    transportationcost:"",
    loadingcost: "",
    commisionfee:"",
    costPrice: "",
    date: new Date().toISOString().split("T")[0], // System date in yyyy-mm-dd
    product: "Lemon",
    admin: "",
  });
 
  
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
  
    if (!newPurchase.farmerName) newErrors.farmerName = "Farmer name is required.";
    if (!newPurchase.qty || newPurchase.qty <= 0) newErrors.qty = "Quantity must be greater than 0.";
    if (!newPurchase.bags || newPurchase.bags <= 0) newErrors.bags = "Bags must be greater than 0.";
    if (!newPurchase.costPrice || newPurchase.costPrice <= 0) newErrors.costPrice = "Cost price must be greater than 0.";
    if (!newPurchase.grade || newPurchase.grade <= 0) newErrors.grade = "Grade is required.";
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const fetchPosts = useCallback(async () => {
    if (!user.user) {
      console.warn("User is not defined!");
      return;
    }

    try {
      const response = await fetch(
        `https://lemonprocurement.onrender.com/api/farmers?userId=${user.user}`
      );
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }
      const data = await response.json();
      setFarmers(data);
    } catch (error) {
      console.error("Error fetching farmers data:", error);
    }
  }, [user.user]);

  useEffect(() => {
    fetchPosts();
    
  }, [fetchPosts]);
   // Fetch costs data
   const fetchCosts = useCallback(async () => {
    if (!user.user) {
      console.warn("User is not defined!");
      return;
    }
    try {
      const response = await axios.get(`https://lemonprocurement.onrender.com/costs?userId=${user.user}`);

      // Set default costs in newPurchase
      const defaultCosts = response.data.reduce(
        (acc, cost) => {
          if (cost.type === "Transportation Cost") acc.transportationcost = cost.value;
          if (cost.type === "Loading Charge") acc.loadingcost = cost.value;
          if (cost.type === "Commission Fee") acc.commisionfee = cost.value;
          return acc;
        },
        { transportationcost: "", loadingcost: "", commisionfee: "" }
      );
      setNewPurchase((prev) => ({ ...prev, ...defaultCosts }));
    } catch (error) {
      console.error("Error fetching costs data:", error);
    }
  }, [user.user]);

  useEffect(() => {
    fetchCosts();
  }, [fetchCosts]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPurchase({ ...newPurchase, [name]: value });
  };

  const handleFarmerChange = (e) => {
    const selectedFarmer = farmers.find(
      (farmer) => `${farmer.farmerName} ` === e.target.value
    );
  
    // Set farmerName and phone fields in the state
    setNewPurchase((prevPurchase) => ({
      ...prevPurchase,
      farmerName: selectedFarmer ? `${selectedFarmer.farmerName}  ` : "",
      phone: selectedFarmer ? `+91${selectedFarmer.phoneNumber}` : "",  // Format phone number with +91
    }));
  };
  

  const handleAddPurchase = async () => {
  // Check if required fields are empty
   

  // Check if the user is logged in
  if (!user.user) {
    Swal.fire({
      title: "Error",
      text: "User data is not available. Please log in first.",
      icon: "error",
    });
    return;
  }

  // Prepare the purchase data
  const purchaseData = {
    ...newPurchase,
    admin: user.user,
  };

  try {
    // Assuming `validateForm()` is a function to validate the `newPurchase` fields
    if (validateForm(newPurchase)) {
      const response = await axios.post(
        "https://lemonprocurement.onrender.com/api/addpurchases",
        purchaseData
      );

      // Show success message
      Swal.fire({
        title: "Success",
        text: response.data.msg,
        icon: "success",
      });

      // Fetch updated purchases list
      fetchpurchases();

      // Reset the form after successful submission
      setNewPurchase({
        farmerName: "",
        phone: "",
        qty: "",
        bags: "",
        costPrice: "",
        grade:"",
        date: new Date().toISOString().split("T")[0],
        product: "Lemon",
        admin: user.user,
      });

      // Close the modal
      setIsModalOpen(false);
    }
  } catch (error) {
    console.error("Error adding purchase:", error);

    // Show error message
    Swal.fire({
      title: "Error",
      text: "An error occurred while adding the purchase. Please try again later.",
      icon: "error",
    });
  }
};


  const fetchpurchases = useCallback(async () => {
    if (!user.user) {
      console.warn("User is not defined!");
      return;
    }

    try {
      const response = await fetch(
        `https://lemonprocurement.onrender.com/api/purchases?userId=${user.user}`
      );
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }
      const data = await response.json();
      setPurchases(data);
    } catch (error) {
      console.error("Error fetching farmers data:", error);
    }
  }, [user.user]);

  useEffect(() => {
    fetchpurchases();
  }, [fetchpurchases]);

  
  const handleDelete = async (id) => {
    try {
      // Make a DELETE request to the backend
      const response = await fetch(`https://lemonprocurement.onrender.com/api/purchased/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
  
      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`Failed to delete: ${response.status} ${response.statusText}`);
      }
   
  
      // Fetch the updated list of purchases
      fetchpurchases();
    } catch (error) {
      // Log the error to the console for debugging
      console.error("Error deleting the purchase:", error.message);
  
      // Display an error alert to the user
      alert("Failed to delete the purchase. Please try again later.");
    }
  };

  const handleFarmerClick = (farmerName) => {
    navigate(`/report?farmerName=${encodeURIComponent(farmerName)}`);
  };
   
  

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Sales Dashboard</h1>

      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 transition"
      >
        Add Purchase
      </button>

        {/* Purchases Table */}
        <div className="mt-6 overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead className="bg-green-500 text-white">
            <tr>
              <th className="px-2 py-2 text-left">Farmer Name</th>
              <th className="px-2 py-2 text-left">Qty</th>
              <th className="px-2 py-2 text-left">Bags</th>
              <th className="px-2 py-2 text-left">Grade</th>
              <th className="px-2 py-2 text-left">Cost Price(&#8377;)</th>
              <th className="px-2 py-2 text-left">Amount(&#8377;)</th>
              <th className="px-2 py-2 text-left">Date</th>
              <th className="px-2 py-2 text-left">Product</th>
              <th className="px-2 py-2 text-left">Edit</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((purchase, index) => (
              <motion.tr
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="hover:bg-gray-100"
                >
                <td className="px-2 py-2"  onClick={() => handleFarmerClick(purchase.farmerName)}>{purchase.farmerName}</td>
                <td className="px-2 py-2">{purchase.qty}</td>
                <td className="px-2 py-2">{purchase.bags}</td>
                <td className="px-2 py-2">{purchase.grade}</td>
                <td className="px-2 py-2">&#8377;{purchase.costPrice}</td>
                <td className="px-2 py-2">&#8377;{purchase.TotalAmount}</td>
                <td className="px-2 py-2">{purchase.date}</td>
                <td className="px-2 py-2">{purchase.product}</td>
                <button
                      onClick={() => handleDelete(purchase._id)}
                      className="bg-red-500 text-white py-1 px-2 rounded mt-1"
                    >
                      Delete
                    </button>
              </motion.tr>
            ))}
            {purchases.length === 0 && (
              <tr>
                <td colSpan="5" className="px-4 py-2 text-center text-gray-500">
                  No purchases added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
        <div
          className="bg-white w-full max-w-lg p-6 rounded shadow-lg overflow-y-auto"
          style={{ maxHeight: "90vh" }} // Added max-height for scrollable content
        >
          <h2 className="text-xl font-bold mb-4">Add Purchase</h2>
      
          {/* Form */}
          <div className="space-y-4">
            <div>
              <label className="block font-medium">
                Farmer Name <span className="text-red-500">*</span>
              </label>
              <select
                name="farmerName"
                value={newPurchase.farmerName}
                onChange={handleFarmerChange}
                className={`w-full px-4 py-2 border rounded ${
                  errors.farmerName ? "border-red-500" : ""
                }`}
              >
                <option value="" disabled>
                  Select Farmer
                </option>
                {farmers.map((farmer) => (
                  <option
                    key={farmer.id}
                    value={`${farmer.farmerName} `}
                  >
                    {farmer.farmerName}  
                  </option>
                ))}
              </select>
              {errors.farmerName && (
                <p className="text-red-500 text-sm">{errors.farmerName}</p>
              )}
            </div>
      
            <div>
              <label className="block font-medium">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="phone"
                value={newPurchase.phone}
                readOnly
                className="w-full px-4 py-2 border rounded bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block font-medium">
                Bags <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="bags"
                value={newPurchase.bags}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded ${
                  errors.bags ? "border-red-500" : ""
                }`}
                required
              />
              {errors.bags && <p className="text-red-500 text-sm">{errors.bags}</p>}
            </div>

            <div>
              <label className="block font-medium">
                Qty <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="qty"
                value={newPurchase.qty}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded ${
                  errors.qty ? "border-red-500" : ""
                }`}
                required
              />
              {errors.qty && <p className="text-red-500 text-sm">{errors.qty}</p>}
            </div>
                    
      
            <div>
              <label className="block font-medium">
                Cost Price <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="costPrice"
                value={newPurchase.costPrice}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded ${
                  errors.costPrice ? "border-red-500" : ""
                }`}
                required
              />
              {errors.costPrice && (
                <p className="text-red-500 text-sm">{errors.costPrice}</p>
              )}
            </div>

            <div>
              <label className="block font-medium">
                Grade <span className="text-red-500">*</span>
              </label>
              <select
                name="grade"
                value={newPurchase.grade || ""} // Ensure `grade` is initialized
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded ${
                  errors.grade ? "border-red-500" : ""
                }`}
                required
              >
                <option value="" disabled>
                  Select Grade
                </option>
                <option value="A">A</option>
                <option value="B">B</option>
              </select>
              {errors.grade && <p className="text-red-500 text-sm">{errors.grade}</p>}
            </div>

            

            <div>
              <label className="block font-medium">Transportation Cost</label>
              <input
                type="text"
                value={newPurchase.transportationcost}
                readOnly
                className="w-full px-4 py-2 border rounded bg-gray-100"
              />
            </div>

            <div>
              <label className="block font-medium">Loading Charge</label>
              <input
                type="text"
                value={newPurchase.loadingcost}
                readOnly
                className="w-full px-4 py-2 border rounded bg-gray-100"
              />
            </div>

            <div>
              <label className="block font-medium">Commission Fee</label>
              <input
                type="text"
                value={newPurchase.commisionfee}
                readOnly
                className="w-full px-4 py-2 border rounded bg-gray-100"
              />
            </div>

       
      
            <div>
              <label className="block font-medium">
                Date <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="date"
                value={newPurchase.date}
                readOnly
                className="w-full px-4 py-2 border rounded bg-gray-100 cursor-not-allowed"
              />
            </div>
      
            <div>
              <label className="block font-medium">
                Product <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="product"
                value={newPurchase.product}
                readOnly
                className="w-full px-4 py-2 border rounded bg-gray-100 cursor-not-allowed"
              />
            </div>
          </div>
      
          {/* Buttons */}
          <div className="mt-6 flex justify-end space-x-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleAddPurchase}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              Add
            </button>
          </div>
        </div>
      </div>
      
      )}
    </div>
  );
};

export default PurchaseDashboard;
