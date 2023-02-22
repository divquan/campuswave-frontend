import React from "react";
import logo from "../../assets/logo-no-background.png";
import "./Footer.scss";

const Footer = () => {
  return (
    <div className="footer-container">
      <div href="/" className="footer_logo">
        <img src={logo} alt="" />
      </div>
      <p>Made with ❤️ in Ghana! </p>
    </div>
  );
};

export default Footer;
