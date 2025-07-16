import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Classes from "../Styles/Hero.module.css";
import Banner from "../assets/hero.png";

function Hero() {
  const [modal, setModal] = useState(false);
  const [routeFrom, setRouteFrom] = useState("");
  const [routeTo, setRouteTo] = useState("");
  const [dateOfJourney, setDateOfJourney] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const authKey = localStorage.getItem("authKey");

    if (!authKey) {
      alert("Please login to make a booking.");
      return;
    }

    const userId = localStorage.getItem("userId");

    const formattedDateOfJourney = new Date(dateOfJourney).toISOString();

    const requestBody = {
      dateOfJourney: formattedDateOfJourney,
      routeFrom,
      routeTo,
      userId,
    };

    try {
      const response = await fetch("http://localhost:8888/routes/bookRoute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data = await response.json();
        const { routeId, dateOfJourney, routefrom, routeTo } = data;

        localStorage.setItem("routeId", routeId);
        localStorage.setItem("dateOfJourney", dateOfJourney);
        localStorage.setItem("routeFrom", routefrom);
        localStorage.setItem("routeTo", routeTo);

        setModal(true);

        setTimeout(() => {
          navigate("/routeBooking");
        }, 3000);
      } else {
        console.error("Failed to book route");
        alert("Booking failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during booking:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <div className={!modal && Classes.open}>
        <div className={Classes.modalContainer}>
          <h5>Redirecting to booking page...</h5>
        </div>
      </div>

      <section id="hero" className={Classes.heroContainer}>
        <div className={Classes.heroimage}>
          <img src={Banner} alt="Travel Banner" />
        </div>

        <div className={Classes.content}>
          <div className={Classes.title}>
            <h1>
              Travel & Explore With{" "}
              <span className={Classes.nickName}>ManzilYatra</span>
            </h1>
            <p>
              Save at least 15% on stays worldwide, from relaxing retreats to
              off-grid adventures
            </p>
          </div>

          <div className={Classes.bookingContainer}>
            <div className={Classes.search}>
              <label>From</label>
              <input
                type="text"
                placeholder="Enter departure location"
                value={routeFrom}
                onChange={(e) => setRouteFrom(e.target.value)}
              />
            </div>

            <div className={Classes.search}>
              <label>To</label>
              <input
                type="text"
                placeholder="Enter destination"
                value={routeTo}
                onChange={(e) => setRouteTo(e.target.value)}
              />
            </div>

            <div className={Classes.search}>
              <label>Date of Journey</label>
              <input
                type="date"
                value={dateOfJourney}
                onChange={(e) => setDateOfJourney(e.target.value)}
              />
            </div>

            <button onClick={handleSubmit}>Book Now</button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;