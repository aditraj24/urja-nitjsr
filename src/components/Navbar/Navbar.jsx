import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const logo = "/urja-logo-white.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // 👈 to track current route

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
    } else {
      document.body.style.overflow = "";
      document.body.style.height = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.height = "";
    };
  }, [isOpen]);

  return (
    <nav className="navbar">
      <img
        src={logo}
        alt="URJA Logo"
        className={`navbar-logo ${isOpen ? "hide-logo" : ""}`}
      />

      <div className={`hamburger ${isOpen ? "open" : ""}`} onClick={toggleMenu}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        <li>
          <Link
            to="/"
            onClick={closeMenu}
            className={location.pathname === "/" ? "active" : ""}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/team"
            onClick={closeMenu}
            className={location.pathname === "/team" ? "active" : ""}
          >
            Team
          </Link>
        </li>
        <li>
          <Link
            to="/sports"
            onClick={closeMenu}
            className={location.pathname === "/sports" ? "active" : ""}
          >
            Sports
          </Link>
        </li>
        <li>
          <Link
            to="/gallery"
            onClick={closeMenu}
            className={location.pathname === "/gallery" ? "active" : ""}
          >
            Gallery
          </Link>
        </li>
        <li>
          <Link
            to="/pool"
            onClick={closeMenu}
            className={location.pathname === "/pool" ? "active" : ""}
          >
            Pool
          </Link>
        </li>
        <li>
          <Link
            to="/branch-leaderboard"
            onClick={closeMenu}
            className={location.pathname === "/branch-leaderboard" ? "active" : ""}
          >
            Branch Leaderboard
          </Link>
        </li>
        <li>
          <Link
            to="/points-table"
            onClick={closeMenu}
            className={location.pathname === "/points-table" ? "active" : ""}
          >
            Points Table
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
