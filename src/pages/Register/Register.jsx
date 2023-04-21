import React, { useState } from "react";
import axios from "axios";
import "../Login/Login.scss";
import { Link, useNavigate } from "react-router-dom";
import image from "../../assets/logo-no-background.png";

const Register = () => {
  const [error, setError] = useState(null);
  const timeout = setTimeout(() => setError(null), 3000);
  const navigate = useNavigate();
  const [loading, setLoading] = useState("Register");
  function handleClick() {
    navigate("/");
  }

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading("Registering...");
      await axios.post(
        "https://campus-backend.onrender.com/api/auth/register",
        inputs
      );

      navigate("/login");
    } catch (error) {
      setLoading("Register");
      setError(error.response.data);
      console.log(error);
    }
  };

  return (
    <div className="login_container-main">
      <div className="sidebar">
        <img onClick={() => handleClick()} src={image} alt="" />
      </div>
      <hr style={{ height: "100%", fill: "white", margin: 0 }} />
      <div className="sidebar2">
        <div className="login_container">
          {error && (
            <div
              style={{
                textAlign: "center",
                position: "relative",
                width: "100%",
              }}
            >
              <span
                style={{
                  top: 0,
                  left: 0,
                  textAlign: "center",
                  position: "absolute",
                  width: "100%",
                }}
              >
                {error}
              </span>
            </div>
          )}
          <h1>Register</h1>
          <form>
            <input
              name="email"
              type="email"
              placeholder="email"
              onChange={handleChange}
              required={true}
            />
            <input
              name="username"
              type="text"
              placeholder="username"
              onChange={handleChange}
              required={true}
            />
            <input
              name="password"
              type="password"
              placeholder="password"
              onChange={handleChange}
              required={true}
            />
            <button className="btn-fill-large" onClick={handleSubmit}>
              {loading}
            </button>
          </form>
          <p>
            Already have an account?
            <br />
            <Link to="/login">Login</Link>
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

export default Register;
