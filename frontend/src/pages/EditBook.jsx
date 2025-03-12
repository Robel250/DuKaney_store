import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import BackTable from '../components/Home/BackTable';
import BarcodeScannerComponent from "react-qr-barcode-scanner";

const EditBook = () => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [barcode, setBarcode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      setErrorMessage("Unauthorized: No token found. Please log in.");
      return;
    }
    setLoading(true);
    axios
      .get(`https://dukaney-store-backend-1.onrender.com/items/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.status === 200) {
          const { name, quantity, price, expiryDate, barcode } = response.data;
          setName(name || '');
          setQuantity(quantity ? quantity.toString() : '');
          setPrice(price ? price.toString() : '');
          setExpiryDate(expiryDate ? expiryDate.split('T')[0] : '');
          setBarcode(barcode || '');
        } else {
          setErrorMessage("Item not found.");
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setErrorMessage("Item not found. It may have been deleted.");
        } else {
          console.error("Error fetching item data:", error);
          setErrorMessage("Failed to load item details. Please try again.");
        }
      })
      .finally(() => setLoading(false));
  }, [id, token]);

  const handleEditBook = () => {
    if (!name.trim() || !quantity || !price || !expiryDate || !barcode) {
      setErrorMessage("All fields are required.");
      return;
    }
    if (isNaN(quantity) || isNaN(price) || Number(quantity) <= 0 || Number(price) < 0) {
      setErrorMessage("Quantity and Price must be valid numbers.");
      return;
    }
    if (!token) {
      setErrorMessage("Unauthorized: No token found. Please log in.");
      return;
    }
    setLoading(true);
    const data = {
      name,
      quantity: Number(quantity),
      price: Number(price),
      expiryDate: new Date(expiryDate).toISOString(),
      barcode,
    };
    axios
      .put(`https://dukaney-store-backend-1.onrender.com/items/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setErrorMessage('');
        navigate('/home');
      })
      .catch((error) => {
        console.error("Error updating item data:", error);
        setErrorMessage("Failed to update item details. Please try again.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="p-4 card" style={{ width: "60%", marginLeft: "25%" }}>
      <BackTable />
      <h1 className="my-4">Edit Item</h1>

      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {loading && <div className="alert alert-info">Loading...</div>}

      <div className="my-4">
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control"
          placeholder="Enter Item Name"
          disabled={loading}
          style={{ borderColor: '#00b8b8', boxShadow: "5px 5px rgb(224, 195, 158)" }}
        />
      </div>

      <div className="my-4">
        <label>Quantity</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="form-control"
          placeholder="Enter quantity"
          min="1"
          disabled={loading}
          style={{ borderColor: '#00b8b8', boxShadow: "5px 5px rgb(224, 195, 158)" }}
        />
      </div>

      <div className="my-4">
        <label>Price</label>
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="form-control"
          placeholder="Enter price"
          min="0"
          disabled={loading}
          style={{ borderColor: '#00b8b8', boxShadow: "5px 5px rgb(224, 195, 158)" }}
        />
      </div>

      <div className="my-4">
        <label>Expiry Date</label>
        <input
          type="date"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          className="form-control"
          disabled={loading}
          style={{ borderColor: '#00b8b8', boxShadow: "5px 5px rgb(224, 195, 158)" }}
        />
      </div>

      <div className="my-4">
        <label>Scan Barcode</label>
        <BarcodeScannerComponent
          onUpdate={(err, result) => {
            if (result) {
              setBarcode(result.text);
            }
          }}
        />
        <p>Scanned Barcode: <strong>{barcode}</strong></p>
      </div>

      <button 
        className="btn" 
        onClick={handleEditBook} 
        disabled={loading} 
        style={{ 
          color: "black", 
          background: "linear-gradient(to right,rgb(224, 195, 158), moccasin)", 
          padding: '10px 20px', 
          borderRadius: '5px' 
        }}>
        {loading ? 'Saving...' : 'Save'}
      </button>
    </div>
  );
};

export default EditBook;
