import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import MainPage from "./Components/MainPage";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import Logout from "./Components/Logout"; // Logout page
import BookingPage from "./Components/BookingPage"; // Booking Page Component
import RouteBooked from "./Components/routeBooked";
import UserBookings from "./Components/userBookings"; // User Bookings Component
import UserDetails from './Components/userDetails';
import AdminManage from "./Components/AdminManage";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<MainPage />} /> {/* Main page route */}
        <Route path="/login" element={<Login />} /> {/* Login page route */}
        <Route path="/signup" element={<SignUp />} /> {/* SignUp page route */}
        <Route path="/logout" element={<Logout />} /> {/* Logout route */}
        <Route path="/booking/:pkgId" element={<BookingPage />} /> {/* Booking page route */}
        <Route path="/routeBooking" element={<RouteBooked />} /> {/* Route booking route */}
        <Route path="/userBookings" element={<UserBookings />} /> {/* User Bookings route */}
        <Route path="/userDetails" element={<UserDetails />} />
        <Route path="/adminManage" element={<AdminManage />} />

      </Routes>
    </Router>
  );
}

export default App;