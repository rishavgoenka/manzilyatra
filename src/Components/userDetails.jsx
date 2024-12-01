import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/userDetails.css';

function UserDetails() {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
    userId: '',
    lastLogin: ''
  });

  // Format date function
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).replace(',', ' ');
    } catch (error) {
      return 'Invalid Date';
    }
  };

  useEffect(() => {
    // Retrieve user details from local storage
    setUserDetails({
      name: localStorage.getItem('name') || 'Not Available',
      email: localStorage.getItem('email') || 'Not Available',
      mobile: localStorage.getItem('mobile') || 'Not Available',
      address: localStorage.getItem('address') || 'Not Available',
      userId: localStorage.getItem('userId') || 'Not Available',
      lastLogin: localStorage.getItem('sessionStartTime') 
        ? formatDate(localStorage.getItem('sessionStartTime')) 
        : 'Not Available'
    });
  }, []);

  return (
    <div className="user-details-container">
      <div className="user-details-card">
        <div className="user-details-header">
          <div className="user-avatar">
            {userDetails.name.charAt(0).toUpperCase()}
          </div>
          <h1>{userDetails.name}</h1>
          <p className="user-email">{userDetails.email}</p>
        </div>

        <div className="user-details-content">
          <div className="details-grid">
            <div className="detail-item">
              <i className="icon">👤</i>
              <div>
                <h3>Full Name</h3>
                <p>{userDetails.name}</p>
              </div>
            </div>

            <div className="detail-item">
              <i className="icon">📧</i>
              <div>
                <h3>Email Address</h3>
                <p>{userDetails.email}</p>
              </div>
            </div>

            <div className="detail-item">
              <i className="icon">📱</i>
              <div>
                <h3>Mobile Number</h3>
                <p>{userDetails.mobile}</p>
              </div>
            </div>

            <div className="detail-item">
              <i className="icon">🏠</i>
              <div>
                <h3>Address</h3>
                <p>{userDetails.address}</p>
              </div>
            </div>

            <div className="detail-item">
              <i className="icon">🆔</i>
              <div>
                <h3>User ID</h3>
                <p>{userDetails.userId}</p>
              </div>
            </div>

            <div className="detail-item">
              <i className="icon">🕒</i>
              <div>
                <h3>Last Login</h3>
                <p>{userDetails.lastLogin}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="user-details-actions">
          <Link to="/" className="action-button edit-profile">
            Back to Home Page
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;