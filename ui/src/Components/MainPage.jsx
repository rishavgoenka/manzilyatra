import React, { useEffect, useState } from "react";
import Hero from "./Hero";
import Service from "./Service";
import Recommendation from "./Recommendation";
import Testimonials from "./Testimonials";
import Footer from "./Footer";
import "../Styles/MainPage.css";

function MainPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    const authKey = localStorage.getItem("authKey");
    const name = localStorage.getItem("name");

    if (authKey) {
      setIsLoggedIn(true);
      setFirstName(name ? name.split(" ")[0] : "User");
    }
  }, []);

  return (
    <div className="main-page-container">
      {isLoggedIn && (
        <div className="user-greeting">
          <h2>Hello, {firstName}!</h2>
        </div>
      )}
      <Hero />
      <Recommendation />
      <Service />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default MainPage;