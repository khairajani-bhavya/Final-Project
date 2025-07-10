import React from 'react';
import './Footer.css'; // Link the CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand & Description */}
        <div className="footer-section" id="about">
          <h2 className="footer-logo"> ▶ MyShowz</h2>
          <p className="footer-text">
         MyShowz is your one-stop destination for booking movie tickets with ease. Discover the latest releases, choose your favorite seats, 
         and enjoy a seamless moviegoing experience — anytime, anywhere. Trusted by thousands of movie lovers across India.
          </p>
          <div className="footer-store-buttons">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Google Play"
              className="store-badge"
            />
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="App Store"
              className="store-badge"
            />
          </div>
        </div>

        {/* Company Links */}
        <div className="footer-section">
          <h3 className="footer-heading">Company</h3>
          <ul className="footer-links">
            <li><a href="/home">Home</a></li>
            <li><a href="/about">About us</a></li>
            <li><a href="/contact">Contact us</a></li>
            <li><a href="/privacy">Privacy policy</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h3 className="footer-heading">Get in touch</h3>
          <p className="footer-text">+1-234-567-890</p>
          <p className="footer-text">contact@example.com</p>
        </div>
      </div>

      <div className="footer-bottom">
        Copyright 2025 © MyShowz. All Right Reserved.
      </div>
    </footer>
  );
};

export default Footer;
