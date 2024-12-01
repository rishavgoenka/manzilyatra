import React, { useState } from 'react';
import axios from 'axios';
import "../Styles/Signup.css";
import Footer from "./Footer";
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [errorDescription, setErrorDescription] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setErrorDescription('');
    setSuccess(false);

    try {
      const response = await axios.post('http://localhost:8888/user/signup', {
        name,
        email,
        address,
        mobile,
        password,
      });

      if (response.status === 200 || response.status === 201) {
        setSuccess(true);
      }
    } catch (err) {
      if (err.response?.data?.message && err.response?.data?.description) {
        setError(err.response.data.message);
        setErrorDescription(err.response.data.description);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div>
      <div className="container">
        <div className="form-box register">
          {success ? (
            <div>
              <h1>Signup Successful!</h1>
              <p>
                Your account has been created.{' '}
                <span
                  className="redirect-link"
                  onClick={() => navigate('/login')}
                >
                  Click here to login.
                </span>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSignup}>
              <h1>Register</h1>
              {error && <p className="error">{error}</p>}
              {errorDescription && <p className="error-description">{errorDescription}</p>}
              <div className="input-box">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="input-box">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-box">
                <input
                  type="text"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              <div className="input-box">
                <input
                  type="text"
                  placeholder="Phone"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  required
                />
              </div>
              <div className="input-box">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn">Sign Up</button>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;