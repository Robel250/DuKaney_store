import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/store-logo.png"; 
import {  FaHome, FaEnvelope, FaCog, FaPowerOff } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { FaFileAlt } from "react-icons/fa";
import { MdProductionQuantityLimits } from "react-icons/md";
import { LuScanBarcode } from "react-icons/lu";
import { FaSearch } from "react-icons/fa";

const AddProduct = () => {
  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
    
  };
  
  return (
    <div className="min-h-screen bg-gray-80">
      <div
        style={{
          width: "55%",
          height: "70%",
          borderRadius: "5%",
          marginTop: "-10%",
          marginLeft: "50%",
          background: "moccasin",
          position: "fixed",
          zIndex: "-1",
          transform: "rotate(55deg)",
        }}
      ></div>

      {/*  Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "moccasin",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          padding: "px",
          zIndex: 10,
        }}
      >
        <span className="font-bold text-lg flex items-center mt-1" style={{paddingLeft:"40px"}}>
          <h5 style={{fontFamily:"-moz-initial"}}>
            <img
              src={logo}
              alt="Store Logo"
              style={{ height: "30px", width: "30px", marginTop: "5px" }}
            />
           DuKaney
          </h5>
        </span>
        <div>
          {/* <input
            type="text"
            placeholder="Search"
            style={{
              borderRadius: "10px",
              marginTop: "7px",
            }}
          /> */}
       <Link to="/search/:name" style={{paddingRight:"10px",color:"black", }}><FaSearch style={{marginTop:"12px"}}/></Link>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav
        className="nav-bar"
        style={{
          background: "rgba(255, 255, 255, 0.88)",
          color: "white",
          display: "flex",
          justifyContent: "center",
          padding: "10px",
          boxShadow: "0px 3px 15px 3px rgba(0, 0, 0, 0.3)",
          position: "fixed",
          top: "60px",
          left: 0,
          width: "100%",
          zIndex: 9,
        }}
      >

        <div>
        <Link to="/aboutus" style={{ textDecoration: "none", color: "rgba(0, 0, 0, 0.65)", fontWeight: "bold", marginRight: "15px" }}>About</Link>
          <Link to="/contact" style={{ textDecoration: "none", color: "rgba(0, 0, 0, 0.65)", fontWeight: "bold", marginRight: "15px" }}>Contact_us</Link>
         
       
          <Link to="/product-log" style={{ textDecoration: "none", color: "rgba(0, 0, 0, 0.65)", fontWeight: "bold", marginRight: "3px" }}>Product Log</Link>
         
        </div>
        <FaPowerOff onClick={handleLogOut} style={{ cursor: "pointer", color:"black", marginLeft:"97%",marginTop:"0.3%", position:"fixed",  }} />
      </nav>

      <div style={{ paddingTop: "100px" }}></div>

      {/* Sidebar at the end */}
      <div className="sidebar" style={{zIndex:"1"}}>
        <div className="logo"><b>Menu</b> </div>
        <ul className="sidebar-nav mt-5">
          <Link to={"/dashboard"} style={{textDecoration:"none"}}>
          <li className="nav-item">
            <FaHome style={{color:"rgba(0, 0, 0, 0.7)"}}/>
            <span style={{marginLeft:"10%", color:"rgba(0, 0, 0, 0.7)"}}>Home</span>
          </li>
          </Link>
          <Link to={"/home"} style={{textDecoration:"none"}}>
          <li className="nav-item">
            
            <MdProductionQuantityLimits style={{color:"rgba(0, 0, 0, 0.7)"}} />
            <span style={{marginLeft:"10%",color:"rgba(0, 0, 0, 0.7)"}}>Product</span>
          </li>
          </Link>
          <Link to="/items/create" style={{textDecoration:"none"}}>
            <li className="nav-item">
              <IoIosAddCircle style={{color:"rgba(0, 0, 0, 0.7)"}} />
              <span style={{marginLeft:"10%" ,color:"rgba(0, 0, 0, 0.7)"}}>Create</span>
            </li>
          </Link>
          <Link to="/sales-report" style={{textDecoration:"none"}}>
          <li className="nav-item">
         
            <FaFileAlt style={{color:"rgba(0, 0, 0, 0.7)"}}/>
            <span style={{marginLeft:"10%" ,color:"rgba(0, 0, 0, 0.7)"}}>Report</span>
          </li>
          </Link><Link to="/sell-multiple" style={{textDecoration:"none"}}>
          <li className="nav-item">
         
            <LuScanBarcode style={{color:"rgba(0, 0, 0, 0.7)"}}/>
            <span style={{marginLeft:"10%",color:"rgba(0, 0, 0, 0.7)"}}>Sell</span>
          </li>
          </Link>
          <Link to="/chat" style={{textDecoration:"none"}}>
          <li className="nav-item">
            <FaEnvelope style={{color:"rgba(0, 0, 0, 0.7)"}}/>
            <span style={{marginLeft:"10%",color:"rgba(0, 0, 0, 0.7)"}}>Messages</span>
          </li>
          </Link> <Link to={"/PendingSellers"}style={{textDecoration:"none"}}>
          <li className="nav-item">
            <FaCog style={{color:"rgba(0, 0, 0, 0.7)"}}/>
            <span style={{marginLeft:"10%",color:"rgba(0, 0, 0, 0.7)"}}>Settings</span>
          </li></Link>
        </ul>
      </div>
    </div>
  );
};

export default AddProduct;
