import React, { useContext, useState } from "react";
import "./UserLink.scss";
import profile from "../../assets/profile.jpg";
import { AuthContext } from "../../context/AuthContext";
import { GlobalContext } from "../../context/GlobalContext";
const UserLink = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { logout, currentUser } = useContext(AuthContext);
  const { setError } = useContext(GlobalContext);

  const [message, setMessage] = useState("Logout");
  const logOut = async () => {
    try {
      setMessage("Logging out");
      await logout();
      setMessage("Logged out");
    } catch (error) {
      console.log(error);
      setMessage("Couldn't log out");
      setError({ show: true, msg: error.message });
    }
  };
  return (
    <div className="navbar__profile">
      <img
        style={{ opacity: showMenu && 0.6 }}
        className="navbar__profile-image"
        src={currentUser.img || profile}
        alt="userName"
        onClick={() => setShowMenu((init) => !init)}
      />
      {showMenu && (
        <div className="navbar__profile-container">
          <div>
            <span>Username: </span> <i> {currentUser.username}</i>
          </div>
          <div>
            <span>Email: </span> <i> {currentUser.email}</i>
          </div>
          <div onClick={logOut}>{message}</div>
        </div>
      )}
    </div>
  );
};

export default UserLink;
