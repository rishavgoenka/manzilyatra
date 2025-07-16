import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/Logout.css"; 

const Logout = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(""); // To show a message on successful logout

  useEffect(() => {
    // Retrieve the authKey from localStorage before removing it
    const authKey = localStorage.getItem('authKey');

    if (authKey) {
      // Send logout request to the backend with authKey as a query parameter
      axios
        .post(`http://localhost:8888/user/logout?key=${authKey}`) // Correct query parameter 'key'
        .then((response) => {
          console.log(response.data);

          // Remove authKey from localStorage after successful logout
          localStorage.clear();

          // Show logout success message
          setMessage("You have been logged out successfully.");

          // Redirect to login page after a short delay (optional)
        //   setTimeout(() => {
        //     navigate("/login");
        //   }, 2000); // Delay before redirecting to login
        })
        // .catch((error) => {
        //   console.error('Logout error:', error);
        //   setMessage("There was an error logging out.");
        // });
    } 
    else {
      // If no authKey is found in localStorage, show an error message
      setMessage("You are already logged out.");
    }
  }, [navigate]);

  return (
    <div className="container">
      <h1>{message}</h1>
      <br></br>
      {/* You can add a button to redirect to login manually if needed */}
      {message && (
        <button
        onClick={() => {
          navigate("/login"); // Navigate to the login page
          window.location.reload(); // Reload the page
        }}
        className="btnL"
      >
        Go to Login Page
      </button>
      )}
    </div>
  );
};

export default Logout;
