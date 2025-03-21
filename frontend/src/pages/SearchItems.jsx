import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CiSquareInfo, CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import logo from "../assets/store-logo.png";

const SearchItems = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    // Retrieve the token from localStorage (or wherever it's stored)
    const token = localStorage.getItem("token"); // Adjust as necessary

    try {
      // Add the token to the headers
      const response = await axios.get(`https://dukaney-store-backend-1.onrender.com/items/search/${searchTerm}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token here
        },
      });
      setItems(response.data.data); // Set the search result data
      setError(null); // Clear any previous errors
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("No items found with that name");
      } else {
        setError("Server error, please try again later");
      }
      setItems([]); // Clear previous search results
    }
  };

  return (
    <div className="d-flex justify-content-center mt-4" style={{ width: "60%", marginLeft: "25%" }}>
      <div style={{ width: '40rem', padding: '20px' }}>
        <h2 className='text-center mb-4'>Search Items</h2>
        
        <form onSubmit={handleSearch}>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Enter item name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '10px', 
                borderColor: '#00b8b8', 
                boxShadow: "5px 5px rgb(224, 195, 158)",
                borderRadius: '5px'
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              background: "linear-gradient(to right,rgb(224, 195, 158), moccasin)",
              color: 'black',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Search
          </button>
        </form>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {items.length > 0 && (
          <div className="search-results">
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
        )}
      </div>
    </div>
  );
};

export default SearchItems;
