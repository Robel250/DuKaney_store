import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUser, FaLock, FaLockOpen } from "react-icons/fa";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState(""); // State for forgot password email
  const [showForgotPassword, setShowForgotPassword] = useState(false); // Toggle forgot password modal
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogin = () => {
    axios
      .post("http://localhost:4444/user/signin", { username, password })
      .then((response) => {
        const { username } = response.data;
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", response.data.username);
        enqueueSnackbar("Login successful", { variant: "success",autoHideDuration: 1000, });
        navigate("/dashboard", { state: { username } });
        console.log('Login successful:', response.data);
      })
      .catch((error) => {
        enqueueSnackbar("Login failed", { variant: "error" ,autoHideDuration: 1000,});
        console.error('Login error:', error.response?.data?.message || error.message);
      });
  };

  const forgotPasswordHandler = () => {
    axios
      .post("http://localhost:4444/user/forgot-password", { email })
      .then(() => {
        enqueueSnackbar("Reset link sent to email", { variant: "success" ,autoHideDuration: 1000,});
        setShowForgotPassword(false); // Close modal after submission
      })
      .catch((error) => {
        enqueueSnackbar("Failed to send reset link", { variant: "error" ,autoHideDuration: 1000,});
        console.log(error);
      });
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#0d1117" }}
    >
      <div
        className="card p-4 border-0 d-flex flex-row align-items-center"
        style={{
          width: "600px",
          height: "350px",
          background: "linear-gradient(55deg, black 55%,moccasin 56%)",
          color: "white",
          borderRadius: "10px",
          boxShadow: "0 0 15px moccasin",
          overflow: "hidden",
        }}
      >
        {/* Left Section (Login Form) */}
        <div className="w-50 p-4">
          <h2 className="mb-4 text-white">Login</h2>

          {/* Username Field */}
          <div className="input-container">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-field"
              required
              style={{border:"moccasin"}}
            />
            <label className={`input-label ${username ? "filled" : ""}`}>
              Username
            </label>
            <FaUser className="input-icon"  style={{color:"moccasin"}} />
          </div>

          {/* Password Field with Toggle */}
          <div className="input-container">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              required
            />
            <label className={`input-label ${password ? "filled" : ""}`}>
              Password
            </label>
            <span className="input-icon" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaLockOpen style={{color:"moccasin"}} /> : <FaLock  style={{color:"moccasin"}}/>}
            </span>
          </div>

       

          <button
            className="btn w-100"
            style={{
              background: "linear-gradient(to right,rgb(224, 195, 158), moccasin)",
              color: "",
              fontWeight: "bold",
              padding: "10px",
              borderRadius: "30px",
              border: "none",
              transition: "0.3s",
              
            }}
            onClick={handleLogin}
          >
            Login 🔑
          </button>

          <div className="text-center mt-3">
            <p className="text-light">
              Don't have an account?{" "}
              <Link to="/signup" className="text-info">
                SignUp
              </Link>
                 {/* Forgot Password Button */}
          <div className="text-right">
            <button
              className="btn btn-link text-info p-0"
              onClick={() => setShowForgotPassword(true)}
              style={{color:"moccasin"}}
            >
              Forgot Password?
            </button>
          </div>
            </p>
          </div>
        </div>

        {/* Right Section (Welcome Message) */}
        <div
          className="w-50 d-flex flex-column justify-content-center text-center"
          style={{
            position: "relative",
            width: "50%",
            height: "100%",
            padding: "20px",
          }}
        >
          <h3 className="text-black" style={{paddingLeft:"20px"}}> WELCOME BACK!</h3>
          <p className="">
           
          </p>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="forgot-password-modal">
          <div className="modal-content">
            <h3>Forgot Password?</h3>
            <p>Enter your email to receive a password reset link.</p>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="btn  mt-3"   style={{
              background: "linear-gradient(to right,rgb(224, 195, 158), moccasin )",
              color: "",
              fontWeight: "bold",
              padding: "10px",
              
              border: "none",
              transition: "0.3s",
            }} onClick={forgotPasswordHandler}>
              Send Reset Link
            </button>
            <button className="btn btn-secondary mt-2"   style={{
             
              color: "white",
              fontWeight: "bold",
              padding: "10px",
            
              border: "none",
              transition: "0.3s",
            }} onClick={() => setShowForgotPassword(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Custom CSS */}
      <style>
        {`
        .input-container {
          position: relative;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          border-bottom: 2px solid #008080;
        }

        .input-field {
          width: 100%;
          padding: 10px;
          background: transparent;
          border: none;
          outline: none;
          color: white;
          font-size: 16px;
        }

        .input-label {
          position: absolute;
          left: 10px;
          top: 50%;
          transform: translateY(-50%);
          color: #aaa;
          font-size: 16px;
          transition: all 0.3s ease;
          pointer-events: none;
        }

        .input-field:focus + .input-label,
        .filled {
          top: 5px;
          font-size: 12px;
          color: #00b8b8;
        }

        .input-icon {
          position: absolute;
          right: 10px;
          color: #00b8b8;
          font-size: 18px;
          cursor: pointer;
        }

        .forgot-password-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-content {
          background: white;
          padding: 20px;
          border-radius: 10px;
          text-align: center;
          width: 300px;
        }

        .modal-content h3 {
          margin-bottom: 15px;
        }

        .modal-content input {
          width: 100%;
          padding: 8px;
          margin-top: 10px;
        }

        .modal-content button {
          width: 100%;
          padding: 10px;
          margin-top: 10px;
        }
        `}
      </style>
    </div>
  );
};

export default Login;

