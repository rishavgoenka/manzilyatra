import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Classes from "../Styles/NavBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose, faChevronDown, faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [userType, setUserType] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Close menu when navigation occurs
  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    navigate("/logout");
    // Close menus
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  // Check if the user is logged in and set the name and type accordingly
  useEffect(() => {
    const authKey = localStorage.getItem("authKey");
    const name = localStorage.getItem("name");
    const type = localStorage.getItem("userType");

    if (authKey && name) {
      setUserName(name);
      setUserType(type);
    }
  }, []);

  return (
    <div className={Classes.NavbarContainer}>
      <nav className={Classes.Navbar}>
        <div className={Classes.brand}>
          {/* Logo */}
          <h1 className={Classes.NavLogo} onClick={() => {
            navigate("/"); // Navigate to the home page
            window.location.reload(); // Reload the page
          }}>
            Manzil<span>Yatra</span>
          </h1>

          {/* User Name Section (Only if logged in) */}
          {userName && (
            <div 
              className={Classes.userGreeting}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className={Classes.userName}>
                {userName} <FontAwesomeIcon icon={faChevronDown} />
              </span>
              
              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className={Classes.dropdownMenu}>
                  <ul>
                    <li onClick={() => handleNavigation("/userDetails")}>
                      <FontAwesomeIcon icon={faUser} /> My Details
                    </li>
                    {userType === 'User' && (
                      <li onClick={() => handleNavigation("/userBookings")}>
                        <FontAwesomeIcon icon={faUser} /> My Bookings
                      </li>
                    )}
                    {userType === 'admin' && (
                      <li onClick={() => handleNavigation("/adminManage")}>
                        <FontAwesomeIcon icon={faUser} /> Manage
                      </li>
                    )}
                    <li onClick={handleLogout}>
                      <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Hamburger Menu */}
          <div className={Classes.hamburger} onClick={toggleMenu}>
            {isMenuOpen ? (
              <FontAwesomeIcon icon={faClose} className={Classes.menuIcon} />
            ) : (
              <FontAwesomeIcon className={Classes.menuIcon} icon={faBars} />
            )}
          </div>
        </div>
      </nav>

      {/* Expanded Menu */}
      {isMenuOpen && (
        <div className={Classes.expandedMenu}>
          <div className={Classes.menuContent}>
            <div className={Classes.navigationSection}>
              <h3>Navigation</h3>
              <ul>
                <li onClick={() => {
                  document.querySelector('#service')?.scrollIntoView({ behavior: 'smooth' });
                  setIsMenuOpen(false);
                }}>
                  Services
                </li>
                <li onClick={() => {
                  document.querySelector('#recommendation')?.scrollIntoView({ behavior: 'smooth' });
                  setIsMenuOpen(false);
                }}>
                  Places
                </li>
                <li onClick={() => {
                  document.querySelector('#testimonials')?.scrollIntoView({ behavior: 'smooth' });
                  setIsMenuOpen(false);
                }}>
                  Testimonials
                </li>
              </ul>
            </div>

            <div className={Classes.authSection}>
              <h3>Account</h3>
              {!userName && (
                <button 
                  className={Classes.loginButton} 
                  onClick={() => handleNavigation("/login")}
                >
                  Login/Signup
                </button>
              )}
              {userName && (
                <div className={Classes.mobileUserOptions}>
                  <button 
                    onClick={() => handleNavigation("/userDetails")}
                    className={Classes.mobileUserButton}
                  >
                    <FontAwesomeIcon icon={faUser} /> My Details
                  </button>
                  {userType === 'User' && (
                    <button 
                      onClick={() => handleNavigation("/userBookings")}
                      className={Classes.mobileUserButton}
                    >
                      <FontAwesomeIcon icon={faUser} /> My Bookings
                    </button>
                  )}
                  {userType === 'admin' && (
                    <button 
                      onClick={() => handleNavigation("/adminManage")}
                      className={Classes.mobileUserButton}
                    >
                      <FontAwesomeIcon icon={faUser} /> Manage
                    </button>
                  )}
                  <button 
                    className={Classes.logoutButton} 
                    onClick={handleLogout}
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavBar;