import React, { useContext, useState } from "react";
import "./Navbar.scss";
import logo from "../../assets/logo-no-background.png";
import { categories } from "../../Data";
import { MdClose, MdMenu } from "react-icons/md";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import UserLink from "./UserLink";

const Navbar = () => {
  const [toogle, setToogle] = useState(false);
  const { logout, currentUser } = useContext(AuthContext);

  return (
    <>
      <div className="navbar_container">
        <Link to="/" className="navbar_logo">
          <img src={logo} alt="" />
        </Link>
        <div className="navbar_links">
          <div className="links-sub_1">
            {categories.map((category, index) => (
              <Link className="link" key={index} to={`/?cat=${category.link}`}>
                {category.name}
              </Link>
            ))}
          </div>
          <div className="links-sub_2">
            {currentUser ? (
              <>
                <Link to="/write" className="btn-outline writebtn">
                  Write
                </Link>
                <UserLink />
              </>
            ) : (
              <Link className="loginLink" to="/login">
                Login <i>to write</i>
              </Link>
            )}
            {toogle ? (
              <MdClose
                className="toogle"
                style={{
                  zIndex: 15,
                  position: "relative",
                  backgroundColor: "rgba(0, 0,0,0,)",
                }}
                size={32}
                onClick={() => setToogle((init) => !init)}
              />
            ) : (
              <MdMenu
                style={{
                  zIndex: 15,
                  position: "relative",
                  backgroundColor: "rgba(0, 0,0,0,)",
                }}
                size={32}
                className="toogle"
                onClick={() => setToogle((init) => !init)}
              />
            )}
          </div>
        </div>
        {
          //menu for mobile and some tablet screens
          toogle && (
            <div
              className="mobile-menu-modal"
              onClick={(e) => {
                e.target.className === "mobile-menu-modal" && setToogle(false);
              }}
            >
              <div className="menu">
                {categories.map((category, index) => (
                  <Link
                    key={index}
                    className="mobile-menu-items"
                    to={`/?cat=${category.link}`}
                    onClick={() => setToogle((init) => !init)}
                  >
                    {category.name}
                  </Link>
                ))}
                <hr style={{ width: "90%", margin: "2rem 0" }} />
                <div className="mobile-menu-subitems">
                  {currentUser ? (
                    <>
                      <Link to="/write" className="btn-outline">
                        Write
                      </Link>
                    </>
                  ) : (
                    <Link className="btn-outline" to="/login">
                      Login <i>to write</i>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )
        }
      </div>
      <ErrorMessage></ErrorMessage>
    </>
  );
};

export default Navbar;
