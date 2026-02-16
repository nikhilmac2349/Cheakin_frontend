import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const usser = localStorage.getItem("userlogin");

  useEffect(()=>{
    if(!usser) setIsLoggedIn(false);
    else setIsLoggedIn(true)
  } , [usser])

  const [showMenu, setShowMenu] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    const syncLogin = () => {
      setIsLoggedIn(Boolean(localStorage.getItem("userlogin")));
    };

    window.addEventListener("storage", syncLogin);
    window.addEventListener("visibilitychange", syncLogin);

    return () => {
      window.removeEventListener("storage", syncLogin);
      window.removeEventListener("visibilitychange", syncLogin);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleLogout() {
    localStorage.removeItem("userlogin");
    setIsLoggedIn(false);
    setShowMenu(false);
    navigate("/login");
  }

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => navigate("/")}>
        Dashboard
      </div>

      <div className="nav-items">
        <span onClick={() => navigate("/")}>Home</span>
        <span onClick={() => navigate("/dashboard")}>Dashboard</span>
        <span onClick={() => navigate("/about")}>About</span>
        <span onClick={() => navigate("/contact")}>Contact</span>

        {!isLoggedIn ? (
          <div className="login-btn" onClick={() => navigate("/login")}>
            Login
          </div>
        ) : (
          <div className="user-wrapper" ref={menuRef}>
            <div
              className="user-icon"
              onClick={() => setShowMenu(prev => !prev)}
            >
              👤
            </div>

            {showMenu && (
              <div className="user-menu">
                <div onClick={() => navigate("/profile")}>Profile</div>
                <div onClick={handleLogout}>Logout</div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

