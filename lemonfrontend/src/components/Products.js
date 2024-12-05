import React, { useState,useEffect ,useCallback} from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import {  motion } from "framer-motion";

function ProductsDashboard(user) {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
 
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: new Date().toISOString().split("T")[0], // Current system date
    uom: "KG",
    admin: user.user,
  });

 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleAddProduct = () => {
    // Create a new object with the current user as admin
    const updatedFormData = {
      ...formData,
      admin: user.user, // Use the current user value for the admin field
    };
  
    axios
      .post('https://lemonprocurement.onrender.com/api/addproducts', updatedFormData) // Use updatedFormData here
      .then((res) => {
        Swal.fire({
          title: "Success",
          text: res.data.msg,
          icon: "success",
        });
        setShowForm(false);
  
        // Optionally reset the form after successful operation
        setFormData({
          name: "",
          description: "",
          date: new Date().toISOString().split("T")[0],
          uom: "KG",
          admin: user.user, // Reset with current user value
        });
      })
      .catch((error) => {
        console.error("Error occurred during product addition:", error);
        Swal.fire({
          title: "Error",
          text: "An error occurred while adding the product. Please try again later.",
          icon: "error",
        });
      });
  };
  

 
  const fetchPosts = useCallback(() => {
    if (user.user) {
      fetch(`https://lemonprocurement.onrender.com/api/products?userId=${user.user}`)
        .then((response) => response.json())
        .then((data) => setProducts(data));
    }
  }, [user.user]);
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);


  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://lemonprocurement.onrender.com/api/productsd/${id}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error(`Failed to delete: ${response.statusText}`);
      }
  
      // Fetch updated posts after successful deletion
      fetchPosts();
    } catch (error) {
      console.error("Error deleting the product:", error.message);
      alert("Failed to delete the product. Please try again.");
    }
  };
  

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Products Dashboard</h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Add Product
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="table-auto w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">Product Name</th>
                <th className="px-4 py-2">Product Description</th>
                <th className="px-4 py-2">Create Date</th>
                <th className="px-4 py-2">UOM</th>
                <th className="px-4 py-2">Edit</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="hover:bg-gray-100 text-center"
                >
                  <td className="px-4 py-2">{product.name}</td>
                  <td className="px-4 py-2">{product.description}</td>
                  <td className="px-4 py-2">{product.date}</td>
                  <td className="px-4 py-2">{product.uom}</td>
                  <td className="px-4 py-2">
                  <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-500 text-white py-1 px-2 rounded mt-1"
                    >
                      Delete
                    </button>
                  </td>
                </motion.tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center text-gray-500 py-4">
                    No products available.
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
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 ">
              <h2 className="text-xl font-bold mb-4">Add Product</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700">Product Name  <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                    placeholder="Enter product name"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Description  <span className="text-red-500">*</span></label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                    placeholder="Enter product description"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-gray-700">Unit of Measure  <span className="text-red-500">*</span></label>
                  <select
                    name="uom"
                    value={formData.uom}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                  >
                    <option value="KG">KG</option>
                    <option value="Unit">Unit</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700">Create Date  <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="date"
                    value={formData.date}
                    disabled
                    className="w-full px-3 py-2 border rounded-lg bg-gray-100"
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setShowForm(false)}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddProduct}
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

export default ProductsDashboard;
