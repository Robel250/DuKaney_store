import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const ResetPasswordCard = () => {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');

  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const receivedToken = queryParams.get('token');
    console.log('Token from URL:', receivedToken);
    // Debug line
    setToken(receivedToken);
}, [location]);


const handleSubmit = async (e) => {
  e.preventDefault();
  console.log('Token before request:', token); // Check if the token is set
  console.log('Request Data:', { token, newPassword });

  try {
      const response = await axios.post('http://localhost:4444/user/reset-password', {
          token,
          newPassword
      });
      console.log('Server Response:', response.data); // Debug server response
      setMessage('Password reset successful');
  } catch (error) {
      console.error('Error:', error.response?.data); // Show error details
      setMessage('Error resetting password, please try again.');
  }
};



  return (
    <div className="card" style={{ maxWidth: '400px', margin: '50px auto' }}>
      <div className="card-body">
        <h5 className="card-title text-center">Reset Password</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Reset Password</button>
        </form>
        {message && <p className="mt-3 text-center">{message}</p>}
      </div>
    </div>
  );
};

export default ResetPasswordCard;
