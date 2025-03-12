import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUser, FaLock, FaEnvelope, FaLockOpen } from "react-icons/fa";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSignup = () => {
    axios
      .post("https://dukaney-store-backend-1.onrender.com/user/signup", { username, email, password })
      .then(() => {
        enqueueSnackbar("Sign up successful", { variant: "success",autoHideDuration: 1000, });
        navigate("/");
      })
      .catch((error) => {
        enqueueSnackbar("Sign up failed", { variant: "error" ,autoHideDuration: 1000,});
        console.log(error);
      });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
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
          background: "linear-gradient(-55deg, black 55%, moccasin 56%)",
          color: "white",
          borderRadius: "10px",
          boxShadow: "0 0 15px moccasin",
          overflow: "hidden",
        }}
      >
        {/* Left Section (Welcome Message) */}
        <div
          className="w-50 d-flex flex-column justify-content-center text-center"
          style={{
            position: "relative",
            width: "50%",
            height: "100%",
            padding: "20px",
          }}
        >
          <h3 className="text-black" style={{marginRight:"35px"}}>WELCOME!</h3>
          <p className="text-black" style={{marginRight:"35px"}}>Create an account and start your journey today!</p>
        </div>

        {/* Right Section (Sign Up Form) */}
        <div className="w-50 p-4">
          <h2 className="mb-3 text-white text-center">Sign Up</h2>

          {/* Username Field */}
          <div className="input-container">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-field"
              required
            />
            <label className={`input-label ${username ? "filled" : ""}`}>Username</label>
            <FaUser className="input-icon" />
          </div>

          {/* Email Field */}
          <div className="input-container">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              required
            />
            <label className={`input-label ${email ? "filled" : ""}`}>Email</label>
            <FaEnvelope className="input-icon" />
          </div>

          {/* Password Field */}
          <div className="input-container">
            <input
              type={passwordVisible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              required
            />
            <label className={`input-label ${password ? "filled" : ""}`}>Password</label>
            
            <button type="button" onClick={togglePasswordVisibility} className="password-toggle">
              {passwordVisible ? <FaLockOpen /> : <FaLock />}
            </button>
          </div>

          <button
            className="btn w-100"
            style={{
              background: "linear-gradient(to right,rgb(224, 195, 158), moccasin)",
              color: "white",
              fontWeight: "bold",
              padding: "5px",
              borderRadius: "30px",
              border: "none",
              transition: "0.3s",
            }}
            onClick={handleSignup}
          >
            Sign Up 🔑
          </button>

          <div className="text-center mt-3">
            <p className="text-light">
              Already have an account? <Link to="/" className="text-info">Login</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Custom CSS for Input Fields & Password Toggle */}
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
          padding: 7px;
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
          color: moccasin;
        }

        .input-icon {
          position: absolute;
          right: 10px;
          color:moccasin;
          font-size: 18px;
        }

        .password-toggle {
          position: absolute;
          right: 10px;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
          color:moccasin;
          font-size: 18px;
        }
        `}
      </style>
    </div>
  );
};

export default SignUp;
