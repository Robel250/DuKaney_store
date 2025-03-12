import React, { useEffect, useState } from "react";
import axios from "axios";
import BackTable from "../components/Home/BackTable";
import { Link } from "react-router-dom";
import { CiSquareInfo, CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

const SalesReport = () => {
  const [sales, setSales] = useState([]);
  const [totalSales, setTotalSales] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("https://dukaney-store-backend-1.onrender.com/sales", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setSales(response.data.sales);
        setTotalSales(response.data.totalSales);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="container p-4 ">

      <h2>Sales Report</h2>
      <p>Total Sales Today: ${totalSales}</p>
      <table className="table table-striped text-center">
        <thead>
          <tr>
            <th className="border">No</th>
            <th className="border">Item ID</th>
            <th className="border">Quantity Sold</th>
            <th className="border">Total Price</th>
            <th className="border">Time Sold</th>
           
          </tr>
        </thead>
        <tbody>
          {sales.map((sale, index) => (
            <tr key={sale._id} className="h-8">
              <td className="border">{index + 1}</td>
              <td className="border">{sale.itemId}</td>
              <td className="border">{sale.quantitySold}</td>
              <td className="border">${sale.totalPrice}</td>
              <td className="border">{new Date(sale.soldAt).toLocaleString()}</td>
              <td className="border">
               
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesReport;
