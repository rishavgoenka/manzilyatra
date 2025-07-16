import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../Styles/Booking.css";

const BookingPage = () => {
  const location = useLocation();
  const { packageId, imageUrl, packageName, packageDescription, packageCost } = location.state || {};
  const [bookingTitle, setBookingTitle] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [packageImage, setPackageImage] = useState(null);
  const navigate = useNavigate();

  // Dynamically import package image
  useEffect(() => {
    const importPackageImage = async () => {
      try {
        // Dynamically import the image based on packageId
        const image = await import(`../assets/${packageId}.png`);
        setPackageImage(image.default);
      } catch (error) {
        console.error('Error importing package image:', error);
        // Fallback to the provided imageUrl or placeholder
        setPackageImage(imageUrl || "https://via.placeholder.com/400x300");
      }
    };

    if (packageId) {
      importPackageImage();
    }
  }, [packageId, imageUrl]);

  const handleBooking = () => {
    // Clear previous messages
    setMessage({ text: '', type: '' });

    // Validate booking title
    if (!bookingTitle.trim()) {
      setMessage({
        text: 'Please enter a booking title.',
        type: 'error'
      });
      return;
    }

    const userId = localStorage.getItem('userId');
    const authKey = localStorage.getItem('authKey');

    // Check if user is logged in
    if (!authKey) {
      setMessage({
        text: 'Please log in to make a booking.',
        type: 'error'
      });
      return;
    }

    // Prepare booking data
    const bookingData = {
      bookingId: parseInt(userId, 10),
      bookingTitle,
      bookingType: 'Package',
      date: new Date().toISOString(),
      description: `Booking for Rs. {packageName}`,
      users: [
        {
          address: '',
          email: '',
          mobile: '',
          name: '',
          password: '',
          userId: parseInt(userId, 10),
        },
      ],
    };

    // Send booking request
    axios.post(`http://localhost:8888/booking/book?pkgId=${packageId}`, bookingData)
      .then(() => {
        localStorage.setItem('packageId', packageId);
        localStorage.setItem('packageName', packageName);
        localStorage.setItem('packageCost', packageCost);
        setMessage({
          text: 'Booking successful! Redirecting to home page...',
          type: 'success'
        });
        // Redirect after a short delay to show success message
        setTimeout(() => navigate('/'), 2000);
      })
      .catch(err => {
        console.error('Error creating booking:', err);
        setMessage({
          text: 'Booking failed. Please try again.',
          type: 'error'
        });
      });
  };

  return (
    <div className="booking-container">
      <div className="booking-left">
        <img 
          src={packageImage || "https://via.placeholder.com/400x300"} 
          alt={packageName} 
          className="package-image" 
        />
        <div className="package-details">
          <h1>{packageName}</h1>
          <p>{packageDescription}</p>
          <p><strong>Package ID:</strong> {packageId}</p>
          <p><strong>Cost:</strong> Rs. {packageCost}</p>
        </div>
      </div>

      <div className="booking-right">
        <form onSubmit={(e) => e.preventDefault()}>
          <h2>Book This Package</h2>
          
          {/* Message Display Area */}
          {message.text && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
          )}

          <div className="input-box">
            <input 
              type="text" 
              placeholder="Enter Booking Title" 
              value={bookingTitle}
              onChange={(e) => setBookingTitle(e.target.value)}
              required
            />
          </div>
          <button 
            className="btn" 
            onClick={handleBooking}
            disabled={!bookingTitle.trim()}
          >
            Book Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;