import React from "react";
import { Download, Sun, Moon } from "lucide-react";

const Navbar = ({ darkMode, setDarkMode }) => {
  return (
    <div>
      {/* Top scrolling banner */}
      <div className="top-banner">
        <span>🚧 Still in Progress 🚧</span>
      </div>

      <nav className="navbar">
        <div className="logo">
          <Download size={34} color="red" /> FetchVid
        </div>

        <button
          className="theme-btn"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </nav>
    </div>
  );
};

export default Navbar;
