import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Classes from '../Styles/RouteBooked.module.css';

function routeBooked() {
  const [bookingDetails, setBookingDetails] = useState({
    routeFrom: '',
    routeTo: '',
    dateOfJourney: '',
    bookingId: ''
  });
  const [userDetails, setUserDetails] = useState({
    userId: '',
    name: '',
    email: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve booking details from localStorage
    const storedBookingDetails = localStorage.getItem('bookingDetails');
    const userId = localStorage.getItem('userId');
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');

    if (storedBookingDetails) {
      const parsedBookingDetails = JSON.parse(storedBookingDetails);
      setBookingDetails(parsedBookingDetails);
    }

    // Set user details
    setUserDetails({
      userId: userId || 'N/A',
      name: name || 'N/A',
      email: email || 'N/A'
    });
  }, []);

  const handleBackToHome = () => {
    // Clear booking details from localStorage if needed
    localStorage.removeItem('bookingDetails');
    navigate('/');
  };

  return (
    <div className={Classes.routeBookedContainer}>
      <div className={Classes.successMessage}>
        <h1>Route Booked Successfully!</h1>
        
        <div className={Classes.bookingConfirmation}>
          <div className={Classes.userDetails}>
            <h2>Passenger Details</h2>
            <p><strong>User ID:</strong> {userDetails.userId}</p>
            <p><strong>Name:</strong> {userDetails.name}</p>
            <p><strong>Email:</strong> {userDetails.email}</p>
          </div>

          <div className={Classes.routeDetails}>
            <h2>Journey Details</h2>
            <div className={Classes.routePath}>
                <span>{localStorage.getItem('routeFrom')}</span>
                <span className={Classes.arrow}>➔</span>
                <span>{localStorage.getItem('routeTo')}</span>
            </div>
            <p><strong>Date:</strong> {localStorage.getItem('dateOfJourney')}</p>
            {bookingDetails.bookingId && (
                <p><strong>Booking ID:</strong> {bookingDetails.bookingId}</p>
            )}
            </div>
        </div>

        <div className={Classes.actions}>
          <button onClick={handleBackToHome}>Back to Home</button>
        </div>
      </div>
    </div>
  );
}

export default routeBooked;