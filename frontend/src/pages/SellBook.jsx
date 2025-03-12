

import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from 'notistack';


const SellBook = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantitySold, setQuantitySold] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setQuantitySold(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const soldQuantity = Number(quantitySold);

    // Validate quantity input
    if (!soldQuantity || soldQuantity <= 0 || isNaN(soldQuantity)) {
      setError("Please enter a valid quantity greater than 0.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");
      if (!token) {
        setError("User not authenticated. Please log in.");
        setLoading(false);
        return;
      }

      const url = `https://dukaney-store-backend-1.onrender.com/items/${id}/sell`;

      const response = await axios.post(
        url,
        { quantitySold: soldQuantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      enqueueSnackbar(`Item sold successfully! Remaining stock: ${response.data.remainingStock}`,{ variant: 'success' });
      setQuantitySold(""); // Clear input after success
      navigate("/home"); // Redirect to home page
    } catch (err) {
      setError(err.response?.data?.message || "Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container p-4">
      <h2 className="mb-3">Sell Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Quantity Sold:</label>
          <input
            type="number"
            className="form-control"
            value={quantitySold}
            onChange={handleChange}
            min="1"
            required
            disabled={loading}
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" className="btn btn-primary" style={{ color: 'black', background: 'linear-gradient(to right,rgb(224, 195, 158), moccasin)' }} disabled={loading} >
          {loading ? "Processing..." : "Sell Item"}
        </button>
      </form>
    </div>
  );
};

export default SellBook;
