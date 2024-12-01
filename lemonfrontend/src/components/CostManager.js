import React, { useState, useEffect ,useCallback} from "react";
import axios from "axios";
import Swal from "sweetalert2";

const CostManager = (user) => {
  const [formData, setFormData] = useState({
    type: "Transportation Cost",
    code: "lemon",
    value: "",
    admin: user.user,
  });

  
  const [isLoading, setIsLoading] = useState(false);

  const [costs, setCosts] = useState([]);
  // Fetch saved costs from backend
  const fetchCosts = useCallback(async () => {
    if (!user.user) {
      console.warn("User is not defined!");
      return;
    }

    try {
      const response = await fetch(
        `https://lemonprocurement.onrender.com/costs?userId=${user.user}`
      );
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }
      const data = await response.json();
      setCosts(data);
    } catch (error) {
      console.error("Error fetching farmers data:", error);
    }
  }, [user.user]);

  useEffect(() => {
    fetchCosts();
  }, [fetchCosts]);




   


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const { type, value } = formData;
  
    // Validate input
    if (!value.trim()) {
      alert("Value cannot be empty");
      return;
    }
  
    // Prepare the payload with the admin field
    const updatedFormData = {
      ...formData,
      admin: user.user, // Assuming 'user.user' holds the current admin/user identifier
    };
  
    setIsLoading(true);
  
    try {
      // Make the API request to save the cost
      const response = await axios.post("https://lemonprocurement.onrender.com/addcosts", updatedFormData);
   
  
      // Update the state with the new or updated cost
      setCosts((prevCosts) => {
        const existingCostIndex = prevCosts.findIndex((cost) => cost.type === type);
  
        if (existingCostIndex !== -1) {
          // Update the existing cost
          const updatedCosts = [...prevCosts];
          updatedCosts[existingCostIndex] = { ...updatedCosts[existingCostIndex], value: response.data.value };
          return updatedCosts;
        }
  
        // Add the new cost
        return [...prevCosts, response.data];
      });
      fetchCosts()
      // Notify the user
      Swal.fire({
        title: "Success",
        text: response.data.msg,
        icon: "success",
      });
    
  
      // Reset the form field for value
      setFormData((prevFormData) => ({ ...prevFormData, value: "" }));
    } catch (error) {
      console.error("Error saving cost:", error);
  
      // Provide user feedback
      alert("An error occurred while saving the cost. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="p-6 space-y-6">
      {/* Form */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Add/Edit Cost</h2>
        <div className="space-y-4">
          <div>
            <label className="block font-medium">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded"
            >
              <option>Transportation Cost</option>
              <option>Loading Charge</option>
              <option>Commission Fee</option>
            </select>
          </div>
          <div>
            <label className="block font-medium">Code</label>
            <input
              type="text"
              name="code"
              value={formData.code}
              readOnly
              className="w-full px-4 py-2 border rounded bg-gray-100"
            />
          </div>
          <div>
            <label className="block font-medium">Value</label>
            <input
              type="text"
              name="value"
              value={formData.value}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
        </div>
        <button
          onClick={handleSave}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save"}
        </button>
      </div>

      {/* Table */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Saved Costs</h2>

            {/* Responsive Table Container */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                    <th className="border px-4 py-2 text-sm lg:text-base">Type</th>
                    <th className="border px-4 py-2 text-sm lg:text-base">Code</th>
                    <th className="border px-4 py-2 text-sm lg:text-base">Value</th>
                    </tr>
                </thead>
                <tbody>
                    {costs.length > 0 ? (
                    costs.map((cost) => (
                        <tr key={cost.type} className="hover:bg-gray-50">
                        <td className="border px-4 py-2 text-sm lg:text-base">{cost.type}</td>
                        <td className="border px-4 py-2 text-sm lg:text-base">{cost.code}</td>
                        <td className="border px-4 py-2 text-sm lg:text-base">{cost.value}</td>
                        </tr>
                    ))
                    ) : (
                    <tr>
                        <td colSpan="3" className="text-center py-4 text-sm lg:text-base">
                        No costs added yet.
                        </td>
                    </tr>
                    )}
                </tbody>
                </table>
            </div>
            </div>

    </div>
  );
};

export default CostManager;
