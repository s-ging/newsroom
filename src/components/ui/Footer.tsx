// Footer.jsx
import React from 'react';
import './Footer.css';
import SocialIcon from './SocialIcon'

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      {/* Top divider */}
      <div className="footer-divider gray" />
      
      <div className="footer-container">
        {/* Logo and main content */}
        <div className="footer-top">
          <a href="/" className="footer-logo">
            <img 
              src="https://cdn.prod.website-files.com/64b55c025f5ac9325be4bb24/64b56139c31d22c33d88fed2_ACN%20logo.png" 
              loading="lazy" 
              alt="ACN Newswire logo" 
            />
          </a>

          {/* Link grid */}
          <div className="footer-grid">
            <div className="footer-column-wrap">

              {/* About Column */}
              <div className="footer-column">
                <a href="#" className="footer-column-header">About</a>
                <div className="footer-link-container">
                  <a href="#" className="footer-link">Corporate</a>
                  <a href="#" className="footer-link">Services</a>
                  <a href="#" className="footer-link">Partners</a>
                  <a href="#" className="footer-link">Contact</a>
                  <a href="#" className="footer-link">Media Kit</a>
                </div>
              </div>

              {/* Terms Column */}
              <div className="footer-column">
                <a href="#" className="footer-column-header">Terms</a>
                <div className="footer-link-container">
                  <a href="#" className="footer-link">Privacy Policy</a>
                  <a href="#" className="footer-link">Terms of Use</a>
                  <a href="#" className="footer-link">Cookies Policy</a>
                  <a href="#" className="footer-link">Disclaimer</a>
                </div>
              </div>

            </div>

            <div className="footer-column-wrap">
              {/* Research Column */}
              <div className="footer-column">
                <a href="#" className="footer-column-header">Research</a>
                <div className="footer-link-container">
                  <a href="#" className="footer-link">Company</a>
                  <a href="#" className="footer-link">Region</a>
                  <a href="#" className="footer-link">Sector</a>
                  <a href="#" className="footer-link">Industry</a>
                  <a href="#" className="footer-link">Language</a>
                </div>
              </div>
              {/* Participate Column */}
              <div className="footer-column">
                <a href="#" className="footer-column-header">Participate</a>
                <div className="footer-link-container">
                  <a href="#" className="footer-link">Register</a>
                  <a href="#" className="footer-link">Login</a>
                  <a href="#" className="footer-link">FAQ</a>
                  <a href="#" className="footer-link">Support</a>
                  <a href="#" className="footer-link">ACN RSS</a>
                </div>
              </div>
            </div>

            {/* Follow Us Column - with two columns inside */}
            <div className="footer-column">
              <a href="#" className="footer-column-header">Follow Us</a>
              <div className="footer-link-container">
                <div className="footer-row">
                  <div className="footer-link-wrap"> 
                    <SocialIcon platform="facebook" className="footer-icon" />
                    <a href="#" className="footer-link">Facebook</a>
                  </div>

                  <div className="footer-link-wrap"> 
                    <SocialIcon platform="linkedin" className="footer-icon" />
                    <a href="#" className="footer-link">LinkedIn</a>
                  </div>

                  <div className="footer-link-wrap"> 
                    <SocialIcon platform="x" className="footer-icon" />
                    <a href="#" className="footer-link">X (Twitter)</a>
                  </div>

                  <div className="footer-link-wrap"> 
                    <SocialIcon platform="stocktwits" className="footer-icon" />
                    <a href="#" className="footer-link">Stock Twits</a>
                  </div>

                  <div className="footer-link-wrap"> 
                    <SocialIcon platform="pinterest" className="footer-icon" />
                    <a href="#" className="footer-link">Pinterest</a>
                  </div>

                  <div className="footer-link-wrap"> 
                    <SocialIcon platform="reddit" className="footer-icon" />
                    <a href="#" className="footer-link">Reddit</a>
                  </div>

                  <div className="footer-link-wrap"> 
                    <SocialIcon platform="instagram" className="footer-icon" />
                    <a href="#" className="footer-link">Instagram</a>
                  </div>

                  <div className="footer-link-wrap"> 
                    <SocialIcon platform="telegram" className="footer-icon" />
                    <a href="#" className="footer-link">Telegram</a>
                  </div>

                  <div className="footer-link-wrap"> 
                    <SocialIcon platform="tumblr" className="footer-icon" />
                    <a href="#" className="footer-link">Tumblr</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blue divider */}
      <div className="footer-divider blue" />

      {/* Copyright */}
      <div className="footer-copyright">
        <div className="footer-link" style={{ fontSize: '12px' }}>
          Copyright © {currentYear} ACN Newswire. All rights reserved.
        </div>
      </div>

    </footer>
  );
};

export default Footer;