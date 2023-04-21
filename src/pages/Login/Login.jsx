import React, { useContext, useEffect, useState } from "react";
import "./Login.scss";
import image from "../../assets/logo-no-background.png";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [loginBtn, setLoginBtn] = useState("Login");
  const [status, setStatus] = useState(false);
  const { login, logout, currentUser } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setStatus(true);
    if (currentUser)
      return setError(`You are logged in as ${currentUser.username}`);
    setLoginBtn("Logging in...");
    try {
      await login(inputs);
      navigate("/");
    } catch (error) {
      setError(error.response.data);
      setLoginBtn("Login");
      console.log(error);
      setStatus(true);
    }
  };
  useEffect(() => {
    setTimeout(() => setError(null), 5000);
  }, [error]);

  return (
    <div className="login_container-main">
      <div className="sidebar">
        <img onClick={() => navigate("/")} src={image} alt="" />
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
          <h1>Login</h1>
          <form>
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
            <button
              onClick={handleSubmit}
              className={
                status ? "btn-fill-large  btn-disabled" : "btn-fill-large"
              }
              disabled={status}
            >{`${loginBtn}`}</button>
          </form>
          <p>
            Don't have an account?
            <br />
            <Link to="/register">Register</Link>
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <hr style={{ width: "100%" }} />
            <Link to="../" style={{ color: "white" }}>
              {"<< go home"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
