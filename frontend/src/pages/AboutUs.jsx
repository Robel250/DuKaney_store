import React from 'react'

function AboutUs() {
  return (
    <div style={{width:"50%", marginLeft:"25%", marginTop:"5%",  padding: '20px', border: '1px solid #ddd', borderRadius: '8px'}}>
       <h3 style={{textAlign:"center"}}>📢 <b>Welcome to the DaKaney Store Management System!</b>  </h3>
       <br />
       <br />
<p>
Our store management system is designed to help you efficiently manage inventory, communicate with staff, and handle user roles seamlessly. Whether you're an admin or a seller, our platform offers a tailored experience to meet your specific needs.  </p>

---
<br />
<br />
  <h5> 🛠️ <b>Key Features:</b></h5>
<br />
<h6> <b>1. Inventory Management:</b> </h6>
   <p>- Add, edit, and delete items with ease.  </p>
  <p> - Use a barcode scanner for quick product management. </p> 
   <p>- The barcode scanning is innovative! Trigger the scanner from your computer, use your phone to scan, and see the data instantly on your computer.  </p>

<h6><b>2. Role-Based Access:</b> </h6>
  <p> - <b>Admin Users</b>: Full access to all functionalities, including inventory management and user control.  </p>
  <p> - <b>Seller Users</b>: Limited access—sellers can view inventory but need admin approval for actions like creating or deleting items.  </p>

<h6><b>3. Email Communication:</b> </h6>
   <p>- Users can send emails directly through the system.  </p>
  <p> - All emails are sent to a designated address ( <a href="">hanibiniam25@gmail.com</a> ) for streamlined communication.  </p>

<h6><b>4. Chat System: </b> </h6>
  <p> - Communicate with all users via global chat.  </p>
  <p> - Send private messages to specific users for focused conversations.  </p>

<h6>5. User Authentication & Security:</h6>
   <p>- Register and log in securely with email verification.  </p>
  <p> - Password management tools, including reset and forgot password features.  </p>

---
<br />
<br />
 <h5>👥<b> How to Get Started:</b> </h5>
<br />
<p><b>1. Sign Up</b>: Create a new account using your email.  </p>
<p><b>2. Verify Email:</b> Check your inbox for a verification email to activate your account.  </p>
<p><b>3. Login:</b> Access the system with your verified credentials.  </p>
<p><b>4. Start Managing: </b>Depending on your role, you can either manage inventory (admins) or assist with sales (sellers).  </p>

---
<br />
<br />
<h5>🔐 <b>Security First:</b> </h5>
<br />
<p>- All passwords are securely hashed. </p> 
<p>- Only admins can authorize critical actions by entering their credentials.  </p>
<br />
---
<br />
<p>If you have any questions or need support, feel free to reach out through the built-in chat or send an email. We're here to make your store management experience smooth and efficient!  </p>
<br />
<br />

    </div>
  )
}

export default AboutUs
