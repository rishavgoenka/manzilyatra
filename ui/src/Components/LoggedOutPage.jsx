import React from 'react';
import { Link } from 'react-router-dom';
import "../Styles/Logout.css"; // Import the same CSS for consistent styling

const LoggedOutPage = () => {
  return (
    <div className="container">
      <h1>Logged Out Successfully</h1>
      <p className="success-message">You have been logged out.</p>
      <Link to="/login">
        <button className="btn">Sign In</button>
      </Link>
    </div>
  );
};

export default LoggedOutPage;