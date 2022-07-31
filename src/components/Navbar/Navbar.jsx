import React from 'react';
import "./styles/navbar.css";
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isNavExpanded, setIsNavExpanded] = React.useState(false);

  return (
    <nav className="navigation">
      <Link to="/" className="brand-logo">
        <img src="https://www.pinclipart.com/picdir/middle/86-862588_book-fair-clip-art.png" style={{width: 60, height: 50}}></img>
      </Link>
      <button
        className="hamburger"
        id="hamburger"
        role="expandNavbar"
        onClick={() => {
          setIsNavExpanded(!isNavExpanded);
        }}
      >
        {/* icon from Heroicons.com */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="white"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div
        className={
          isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
        }
      >
        <ul>
          <li>
            <Link id="add" to='/add' onClick={() => {
          setIsNavExpanded(!isNavExpanded);
        }}>Add Booking</Link>
          </li><br />
          <li>
            <Link id="update" to='/update' onClick={() => {
          setIsNavExpanded(!isNavExpanded);
        }}>Update Booking</Link>
          </li><br />
          <li>
            <Link id="delete" to='/delete' onClick={() => {
          setIsNavExpanded(!isNavExpanded);
        }}>Delete Booking</Link>
          </li><br />
        </ul>
      </div>
    </nav>
  );
}
