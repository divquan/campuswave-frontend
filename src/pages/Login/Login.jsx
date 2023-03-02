import React from "react";
import "./Login.scss";
import image from "../../assets/logo-no-background.png";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login_container-main">
      <Link to="../" className="sidebar">
        <img src={image} alt="" />
      </Link>
      <hr style={{ height: "100%", fill: "white", margin: 0 }} />
      <div className="sidebar2">
        <div className="login_container">
          <span>This is an error messagge</span>
          <h1>Login</h1>
          <form>
            <input type="text" placeholder="username" />
            <input type="password" placeholder="password" />
            <button>Login</button>
          </form>
          <p>
            Don't have an account?
            <br />
            <Link to="/register">Register</Link>
            <hr />
            <Link to="../" style={{ color: "white" }}>
              {"<< go home"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
