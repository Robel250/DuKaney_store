// In Layout.jsx
import React from 'react';

const Layout = ({ user }) => {
  if (!user) {
    return <div>Loading...</div>; // or any loading UI
  }

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      {/* Render more user-specific content here */}
    </div>
  );
};

export default Layout;
