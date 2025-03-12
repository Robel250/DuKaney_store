
import React from 'react';
import { CiSquareInfo, CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';
import './BookTable.css'; 
import logo from "../Home/store-logo.png"; 
const BookTable = ({ items }) => {
  return (
    <div className="book-table-container" style={{marginLeft:"100%", marginTop:"100px", overflow:"-moz-hidden-unscrollable"}}>
      {items.map((item) => (
        <div key={item._id} className="container m-4">
          <div className="card" style={{}}>
            <div className="logo">
              <span className="circle c1"></span>
              <span className="circle c2"></span>
              <span className="circle c3"></span>
              <span className="circle c4"></span>
              <span className="circle c5">
               <img
                             src={logo}
                             alt="Store Logo"
                             style={{ height: "40px", width: "40px", marginTop: "5px" }}
                           />
              </span>
            </div>
            <div className="glass"   style={{
      transformStyle: 'preserve-3d',
      position: 'absolute',
      inset: '8px',
      backgroundImage: `linear-gradient(#ffffff59, #ffffffd0), url(${item.image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '55px',
      borderTopRightRadius: '100%',
      borderLeft: '1px solid #fff',
      borderBottom: '1px solid white',
      transition: '0.5s ease-in-out',
      transform: 'translate3d(0, 0, 25px)',
  }}>
              <div className="content">
              
                <h1 style={{marginTop:"60px ", color:"#00c37b"}}>{item.name}</h1>
                <p> </p>
              </div>
              <div className="footer">
                <div className="social"> 
                  <span className="social_icons">
                    <Link to={`/items/details/${item._id}`} className="hover:text-blue-600 transition-colors duration-200 details">
                      <CiSquareInfo />
                    </Link>
                  </span>
                  <span className="social_icons">
                    <Link to={`/items/edit/${item._id}`} className="hover:text-green-600 transition-colors duration-200 edit">
                      <CiEdit />
                    </Link>
                  </span>
                  <span className="social_icons">
                    <Link to={`/items/delete/${item._id}`} className="hover:text-red-600 transition-colors duration-200 delete">
                      <MdDelete />
                    </Link>
                  </span>
                </div>
                <div className="link">
                  Read More
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookTable;
