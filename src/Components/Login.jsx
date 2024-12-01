import React, { useState } from 'react';
import axios from 'axios';
import "../Styles/Login.css";
import Footer from "./Footer";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // Initialize navigate hook

  // Handle Login Submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      const response = await axios.post('http://localhost:8888/user/login', {
        email: username,
        password: password,
      });
  
      if (response.status === 200) {
        const { authKey } = response.data;  // Extract authKey from the login response

        // Fetch user details using the email provided during login
        const userDetailsResponse = await axios.post('http://localhost:8888/user/details', {
          email: username, // Use the email entered by the user
        });

        if (userDetailsResponse.status === 200) {
          // Store both the auth key and user details in localStorage
          const { userId, email, name, mobile, address, userType, sessionStartTime } = userDetailsResponse.data;

          localStorage.setItem('authKey', authKey);
          localStorage.setItem('userId', userId);
          localStorage.setItem('email', email);
          localStorage.setItem('name', name);
          localStorage.setItem('mobile', mobile);
          localStorage.setItem('address', address);
          localStorage.setItem('userType', userType);
          localStorage.setItem('sessionStartTime', new Date().toISOString());

          setSuccess('Login successful!, redirecting to home page....');
          // Redirect to main page after successful login
          setTimeout(() => {
            navigate('/'); 
            window.location.reload();
          }, 4000);
        } else {
          setError('Failed to retrieve user details.');
        }
      }
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message); // Display backend error
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };
  

  // Navigate to the /signup page when Register button is clicked
  const goToSignup = () => {
    navigate('/signup'); // Redirect to /signup route
  };

  return (
    <div>
      <div className="container">
        <div className="form-box login">
          <form onSubmit={handleLogin}>
            <h1>Login</h1>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            <div className="input-box">
              <input
                type="text"
                placeholder="Email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <i className="bx bxs-user"></i>
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <i className="bx bxs-lock-alt"></i>
            </div>
            <button type="submit" className="btn">
              Login
            </button>
          </form>
        </div>

        <div className="toggle-box">
          <div className="toggle-panel toggle-left">
            <h1>Hello, Welcome!</h1>
            <p>Don't have an account?</p>
            <button className="btn register-btn" onClick={goToSignup}>
              Signup
            </button>
          </div>

          <div className="toggle-panel toggle-right">
            <h1>Welcome Back!</h1>
            <p>Already have an account?</p>
            <button className="btn login-btn">Login</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;