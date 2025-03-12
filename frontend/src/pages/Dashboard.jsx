import React from 'react';
import logo from "../assets/Deachbord .png"; 

const Dashboard = () => {
  return (
   <div>
    <div style={{ marginLeft:"10%", color:"rgba(0, 0, 0, 0.7)",marginTop:"200px", textAlign:"center" ,width:"60%", position:"fixed"}}>
      <h3 style={{color:""}}><b>Welcome to</b></h3>
      <p>our smart store management system</p><p>efficient inventory tracking, seamless barcode scanning,</p><p> and secure access control, all in one place! 🚀

</p>
    </div>
   <img
                src={logo}
                alt="Store Logo"
                style={{ height: "50%", width: "60%", 
                  marginTop: "10%",
                  marginLeft:"50%",
                  position:"fixed"

                 }}
              />
              
   </div>
  );
};

export default Dashboard;
