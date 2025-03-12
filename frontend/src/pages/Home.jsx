

import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { CiSquarePlus } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import BookTable from "../components/Home/BookTable";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { FaHome, FaUser, FaEnvelope, FaCog, FaInfoCircle } from "react-icons/fa";
import './Sidebar.css';
import { IoScan } from "react-icons/io5";
import { LuScanBarcode } from "react-icons/lu";

function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const usernameLocal = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  if (!usernameLocal) {
    navigate("/");
    return null;
  }

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
    if (!token) {
      setError("Authorization token is missing");
      setLoading(false);
      return;
    }

    axios
      .get("http://localhost:4444/items", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setItems(response.data.data || response.data); // Handle both response types
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          setError(`Error: ${error.response.status} - ${error.response.data.message}`);
        } else if (error.request) {
          setError("No response from the server");
        } else {
          setError(`Error: ${error.message}`);
        }
      });
  }, [token]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-danger">{error}</div>;

  return (
    <div >
   <Link to="/sell-multiple">
        <LuScanBarcode  style={{position:"fixed",
           width:"5%", 
           height:"5%",
           color:"rgba(0, 0, 0, 0.7)",
           marginLeft:"93%",
           marginTop:"660px"

           
           }}/>
        </Link>
        <h1 className="display-4 mt-5" style={{position:"fixed", marginLeft:"40%"}}>Items List</h1>
      {/* Main Content */}
      <div className="container p-4" style={{ flex: 1 }}>
        <div className="d-flex justify-content-between align-items-center">
         
        
          {/* <span className="mx-2">Welcome, {usernameLocal}!</span> */}
     
        </div>
    
        {/* <BookTable items={items} /> */}
        <div className="book-table-container" >
        <BookTable items={items}  />
      </div>
      
       
       
      </div>
    </div>
  );
}

export default Home;
