import React, { useContext, useState } from "react";
import "./Navbar.scss";
import logo from "../../assets/logo-no-background.png";
import { categories, pages } from "../../Data";
import { MdClose, MdMenu } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import UserLink from "./UserLink";

const Navbar = () => {
  const [toogle, setToogle] = useState(false);
  const { logout, currentUser } = useContext(AuthContext);
  const currentLocation = useLocation().pathname;
  const active = (navLink) =>
    navLink === currentLocation ? "navbar__link--active" : "navbar__link";

  return (
    <>
      <div className="navbar">
        <Link to="/" className="navbar_logo">
          <img src={logo} alt="campuswave logo" />
        </Link>
        <div className="navbar_links">
          <div className="navbar_links--sub_1">
            {pages.map((page, index) => (
              <Link className={active(page.link)} key={index} to={page.link}>
                {page.name}
              </Link>
            ))}
          </div>
          <div className="navbar_links--sub_2">
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
                className="navbar_btn--toogle"
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
                className="navbar_btn--toogle"
                onClick={() => setToogle((init) => !init)}
              />
            )}
          </div>
        </div>
        {
          //menu for mobile and some tablet screens
          toogle && (
            <div
              className="navbar_mobile__modal"
              onClick={(e) => {
                e.target.className === "navbar_mobile__modal" &&
                  setToogle(false);
              }}
            >
              <div className="navbar_mobile__menu">
                {categories.map((category, index) => (
                  <Link
                    key={index}
                    className="navbar_mobile__menu--items_1"
                    to={`/?cat=${category.link}`}
                    onClick={() => setToogle((init) => !init)}
                  >
                    {category.name}
                  </Link>
                ))}
                <hr style={{ width: "90%", margin: "2rem 0" }} />
                <div className="navbar_mobile__menu--items_2">
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
