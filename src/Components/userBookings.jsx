import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/userBookings.css";

function UserBookings() {
  const [packageDetails, setPackageDetails] = useState({
    packageName: "",
    packageId: "",
    packageCost: ""
  });

  const [routeDetails, setRouteDetails] = useState({
    routeId: "",
    routeFrom: "",
    routeTo: "",
    dateOfJourney: ""
  });

  useEffect(() => {
    // Retrieve package details from local storage
    setPackageDetails({
      packageName: localStorage.getItem("packageName") || "N/A",
      packageId: localStorage.getItem("packageId") || "N/A",
      packageCost: localStorage.getItem("packageCost") || "N/A"
    });

    // Retrieve route details from local storage
    setRouteDetails({
      routeId: localStorage.getItem("routeId") || "N/A",
      routeFrom: localStorage.getItem("routeFrom") || "N/A",
      routeTo: localStorage.getItem("routeTo") || "N/A",
      dateOfJourney: localStorage.getItem("dateOfJourney") || "N/A"
    });
  }, []);

  return (
    <div className="bookings-container">
      <div className="bookings-wrapper">
        <div className="column package-bookings">
          <h2>My Package Bookings</h2>
          {packageDetails.packageName !== "N/A" ? (
            <>
              <div className="booking-detail">
                <strong>Package Name:</strong>
                <span>{packageDetails.packageName}</span>
              </div>
              <div className="booking-detail">
                <strong>Package ID:</strong>
                <span>{packageDetails.packageId}</span>
              </div>
              <div className="booking-detail">
                <strong>Cost:</strong>
                <span>₹{packageDetails.packageCost}</span>
              </div>
            </>
          ) : (
            <div className="no-bookings">
              <p>No package bookings found.</p>
              <Link to="/" className="booking-link">
                Book a Package
              </Link>
            </div>
          )}
        </div>

        <div className="column route-bookings">
          <h2>My Route Bookings</h2>
          {routeDetails.routeId !== "N/A" ? (
            <>
              <div className="booking-detail">
                <strong>Route ID:</strong>
                <span>{routeDetails.routeId}</span>
              </div>
              <div className="booking-detail">
                <strong>From:</strong>
                <span>{routeDetails.routeFrom}</span>
              </div>
              <div className="booking-detail">
                <strong>To:</strong>
                <span>{routeDetails.routeTo}</span>
              </div>
              <div className="booking-detail">
                <strong>Date:</strong>
                <span>{routeDetails.dateOfJourney}</span>
              </div>
            </>
          ) : (
            <div className="no-bookings">
              <p>No route bookings found.</p>
              <Link to="/" className="booking-link">
                Book a Route
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserBookings;