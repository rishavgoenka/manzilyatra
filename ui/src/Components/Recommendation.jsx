import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/Recommendation.css";

function Recommendation() {
  const [packages, setPackages] = useState([]);
  const [imageUrls, setImageUrls] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get("http://localhost:8888/packages");
        const limitedPackages = response.data.slice(0, 6);
        setPackages(limitedPackages);
        
        const imageUrls = {};
        for (const pkg of limitedPackages) {
          try {
            // More explicit import with error handling
            const imagePath = `../assets/${pkg.packageId}.png`;
            const imageModule = await import(/* @vite-ignore */ imagePath);
            imageUrls[pkg.packageId] = imageModule.default;
          } catch (error) {
            console.warn(`Image not found for package ${pkg.packageId}`);
            imageUrls[pkg.packageId] = "https://via.placeholder.com/300x200";
          }
        }

        setImageUrls(imageUrls);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    fetchPackages();
  }, []);

  const handlePackageClick = (pkg) => {
    navigate(`/booking/${pkg.packageId}`, {
      state: pkg,
    });
  };

  return (
    <section id="recommendation" className="recommendation">
      <div className="recommendation-container">
        <div className="title">
          <h1>Recommended Packages</h1>
          <p className="subtitle">Discover our most popular travel experiences</p>
        </div>

        <div className="recommendationBox">
          {packages.map((pkg) => (
            <div
              className="box"
              key={pkg.packageId}
              onClick={() => handlePackageClick(pkg)}
            >
              <div className="image-container">
                <div className="image-wrapper">
                  <img
                    src={imageUrls[pkg.packageId]}
                    alt={pkg.packageName}
                  />
                </div>
              </div>
              <div className="package-content">
                <div className="package-header">
                  <span className="package-id">Package #{pkg.packageId}</span>
                  <h3 className="package-name">{pkg.packageName}</h3>
                </div>
                <p className="package-description">{pkg.packageDescription}</p>
                <div className="price">
                  <span className="price-label">Cost:</span>
                  <span className="price-value">Rs. {pkg.packageCost}</span>
                </div>
                <div className="package-cta">
                  <span>Book Now</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Recommendation;