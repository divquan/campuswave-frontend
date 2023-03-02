import React from "react";
import "./Login.scss";
import image from "../../assets/logo-no-background.png";
import { Link } from "react-router-dom";
const Login = () => {
  return (
    <div className="login_container-main">
      <div className="sidebar">
        <img src={image} alt="" />
      </div>
      <hr style={{ height: "100%", fill: "white", margin: 0 }} />
      <div className="sidebar2">
        <div className="login_container">
          <h1>Login</h1>
          <form>
            <input type="text" placeholder="username" />
            <input type="password" placeholder="password" />
            <button>Login</button>
          </form>
          <span>This is an error messagge</span>
          <p>
            Don't have an account?
            <br />
            <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
