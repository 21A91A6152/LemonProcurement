 import React, { useRef } from "react";
//  import html2canvas from 'html2canvas';
//  import jsPDF from 'jspdf';
import { useLocation,  } from "react-router-dom";
import { useEffect,useState,useCallback } from "react";
 
 
const Report = (user) => {
  
    const location = useLocation();
    const [farmer,setFarmers]=useState([]);
    const [purchases, setPurchases] = useState([]);

    // Parse Query Parameters
    const queryParams = new URLSearchParams(location.search);
    const farmerName = queryParams.get("farmerName");
  // Mock Data for Farmer's Purchase History
   
  const fetchFarmerDetails = useCallback(async () => {
    if (!user.user) {
      console.warn("User is not defined!");
      return;
    }

    try {
      const response = await fetch(
        `https://lemonprocurement.onrender.com/api/reportfarmers?userId=${user.user}&farmerName=${farmerName}`
      );
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }
      const data = await response.json();
      setFarmers(data);
    } catch (error) {
      console.error("Error fetching farmers data:", error);
    }
  }, [user.user,farmerName]);

  useEffect(() => {
    fetchFarmerDetails();
    
  }, [fetchFarmerDetails]);

  const fetchPurchases = useCallback(async () => {
    if (!user.user) {
      console.warn("User is not defined!");
      return;
    }
  
    try {
      const response = await fetch(
        `https://lemonprocurement.onrender.com/api/reportpurchases?userId=${user.user}&farmerName=${farmerName}`
      );
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }
      const data = await response.json();
      setPurchases(data);
    } catch (error) {
      console.error("Error fetching farmers data:", error);
    }
  }, [user.user, farmerName]); // Add farmerName to the dependencies array
  

  useEffect(() => {
    fetchPurchases();
  }, [fetchPurchases]);

  const printRef = useRef();
  
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Print</title>
          <style>
            /* Add your styles here */
          </style>
        </head>
        <body>
          ${printRef.current.innerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();


  };
 
 
    // const generatePDF = async (divId) => {
    // const input = document.getElementById(divId);
    // if (!input) {
    //     throw new Error(`Element with id ${divId} not found`);
    // }

    // const canvas = await html2canvas(input);
    // const imgData = canvas.toDataURL('image/png');
    // const pdf = new jsPDF();
    // pdf.addImage(imgData, 'PNG', 0, 0);
    // pdf.save('download.pdf');
    // };
 

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Printable Content */}
      <div ref={printRef} id="pdfContent" className="bg-white p-4 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Farmer Purchase Report</h1>
        <div className="mb-4">
      {farmer.length > 0 ? (
        <div>
          <p className="text-gray-600">
            <span className="font-semibold">Name:</span> {farmer[0].farmerName}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Phone Number:</span>{" "}
            {farmer[0].phoneNumber}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Location:</span>{" "}
            {farmer[0].village}, {farmer[0].city}, {farmer[0].state},{" "}
            {farmer[0].country}, {farmer[0].pincode}
          </p>
        </div>
      ) : (
        <p>Loading farmer details...</p>
      )}
    </div>
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Bags</th>
              <th className="py-2 px-4 border-b">Total Price</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((record, index) => (
              <tr key={index} className="odd:bg-white even:bg-gray-100 text-center">
                <td className="py-2 px-4 border-b">{record.date}</td>
                <td className="py-2 px-4 border-b">{record.bags}</td>
                <td className="py-2 px-4 border-b">{record.TotalAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Print Button */}
      <button
        onClick={handlePrint}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-500"
      >
        Print
      </button>
     {/* <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-500" onClick={() => generatePDF('pdfContent')}>Download PDF</button>*/}
    </div>
  );
};

export default Report;
