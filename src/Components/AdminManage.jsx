import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "../Styles/AdminManage.module.css";
import { Trash2, BookOpen, PlusCircle } from 'lucide-react';

function AdminManage() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [packageData, setPackageData] = useState({
    packageId: '',
    packageName: '',
    packageCost: '',
    packageDescription: ''
  });
  const [packageImage, setPackageImage] = useState(null); // You can manage this state to reset the file input
  const navigate = useNavigate();

  // Format date to DD/MM/YYYY
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Fetch bookings function
  const fetchBookings = async () => {
    const authKey = localStorage.getItem('authKey');
    const userType = localStorage.getItem('userType');

    if (!authKey || userType !== 'admin') {
      alert('Unauthorized. Please login as an admin.');
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8888/booking/showAllBooking?authKey=${authKey}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok && response.status !== 302) {
        const errorText = await response.text();
        // throw new Error(`Failed to fetch bookings: ${errorText || response.statusText}`);
        throw new Error(`No bookings available`);
      }

      const data = await response.json();
      const bookingsArray = Array.isArray(data) ? data : [data];
      const transformedBookings = bookingsArray.map(booking => ({
        bookingId: booking.bookingId,
        bookingTitle: booking.bookingTitle || booking.description?.replace('{packageName}', 'Unknown Package'),
        date: formatDate(booking.date),
        bookedBy: booking.users?.[0]?.name || 'Unknown',
      }));

      setBookings(transformedBookings);
      setIsLoading(false);
    } catch (err) {
      console.error('Booking fetch error:', err);
      setError(err.message);
      setIsLoading(false);
    }
  };

  // Handle delete booking
  const handleDeleteBooking = async (bookingId) => {
    const authKey = localStorage.getItem('authKey');

    try {
      const response = await fetch(`http://localhost:8888/booking/cancel?bookingId=${bookingId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to cancel booking: ${errorText || response.statusText}`);
      }

      alert('Booking deleted successfully');
      fetchBookings(); // Refresh bookings
    } catch (error) {
      console.error('Delete booking error:', error);
      alert(`Failed to delete booking: ${error.message}`);
    }
  };

  // Handle package input changes
  const handlePackageInputChange = (e) => {
    const { name, value } = e.target;
    setPackageData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // // Handle package image upload
  // const handleImageUpload = (e) => {
  //   const file = e.target.files[0];
  //   setPackageImage(file); // React manages the image state
  // };

  // Handle package creation
  const handleCreatePackage = async (e) => {
    e.preventDefault();
    const authKey = localStorage.getItem('authKey');

    if (!packageData.packageId || !packageData.packageName || 
        !packageData.packageCost || !packageData.packageDescription) {
      alert('Please fill in all package details');
      return;
    }

    try {
      const packagePayload = {
        hotelDetails: [
          {
            address: "string",
            hotelDescription: "string",
            hotelId: 0,
            hotelName: "string",
            hotelType: "string",
            rent: 0,
            status: "string"
          }
        ],
        packageCost: parseFloat(packageData.packageCost),
        packageDescription: packageData.packageDescription.trim(),
        packageId: parseInt(packageData.packageId),
        packageName: packageData.packageName.trim(),
        packageType: "BASE",
        paymentDetails: "string"
      };

      const response = await fetch(
        `http://localhost:8888/packages/createPackage?Authentication%20Key=${encodeURIComponent(authKey)}`, 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(packagePayload)
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create package: ${errorText || response.statusText}`);
      }

      alert('Package added successfully');
      setPackageData({
        packageId: '',
        packageName: '',
        packageCost: '',
        packageDescription: ''
      });
      setPackageImage(null); // Reset the image file state
      // Optionally, reset image input if needed:
      // setFileInputKey(prevKey => prevKey + 1); // This forces a re-render of the file input
    } catch (error) {
      console.error('Package creation error:', error);
      alert(`Failed to add package: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [navigate]);

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.adminManageContainer}>
      {/* Package Creation Section */}
      <div className={styles.packageCreateSection}>
        <h2>Add New Package</h2>
        <form onSubmit={handleCreatePackage}>
          <input
            type="text"
            name="packageId"
            placeholder="Package ID"
            value={packageData.packageId}
            onChange={handlePackageInputChange}
          />
          <input
            type="text"
            name="packageName"
            placeholder="Package Name"
            value={packageData.packageName}
            onChange={handlePackageInputChange}
          />
          <input
            type="number"
            name="packageCost"
            placeholder="Package Cost"
            value={packageData.packageCost}
            onChange={handlePackageInputChange}
          />
          <input
            type="text"
            name="packageDescription"
            placeholder="Package Description"
            value={packageData.packageDescription}
            onChange={handlePackageInputChange}
          />
          {/* <input
            type="file"
            id="packageImageUpload"
            accept="image/*"
            onChange={handleImageUpload}
          /> */}
          <button type="submit">Add Package</button>
        </form>
      </div>

      {/* Bookings Table or No Bookings Message */}
      <div className={styles.bookingsTableSection}>
        <h2>Manage Bookings</h2>
        {error ? (
          <div className={styles.errorContainer}>
            <h3>Error: {error}</h3>
            <button onClick={() => { fetchBookings(); window.location.reload(); }}>Retry</button>
          </div>
        ) : bookings.length === 0 ? (
          <div className={styles.noBookingsContainer}>
            <h3>No bookings available...</h3>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Booking Title</th>
                <th>Booking Date</th>
                <th>Booked By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(booking => (
                <tr key={booking.bookingId}>
                  <td>{booking.bookingId}</td>
                  <td>{booking.bookingTitle}</td>
                  <td>{booking.date}</td>
                  <td>{booking.bookedBy}</td>
                  <td>
                    <button onClick={() => handleDeleteBooking(booking.bookingId)}>
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default AdminManage;