import React, { useContext, useEffect, useState } from "react";
import "./UserLink.scss";
import profile from "../../assets/profile.jpg";
import { AuthContext } from "../../context/AuthContext";
import { GlobalContext } from "../../context/GlobalContext";
import { MdEdit } from "react-icons/md";
const UserLink = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { logout, currentUser } = useContext(AuthContext);
  const { setError } = useContext(GlobalContext);
  //editing user info logic
  const [edit, setEdit] = useState(false);
  const [username, setUsername] = useState(currentUser?.username);
  const [email, setEmail] = useState(currentUser?.email);
  const [saveMessage, setSaveMessage] = useState("Save");
  const handleEdit = () => {
    if (edit) {
      setSaveMessage("Saving");
      setEdit(false);
      logOut();
    }
  };

  //

  const [message, setMessage] = useState("Logout");
  const logOut = async () => {
    try {
      setMessage("Logging out");
      await logout();
      setMessage("Logged out");
    } catch (error) {
      console.log(error);
      setMessage("Couldn't log out");
      setError({ show: true, message: error.message });
    }
  };
  const onEditSave = () => {
    setSaveMessage("Save");
    setEdit(true);
  };

  return (
    <div className="navbar__profile">
      <img
        style={{ opacity: showMenu && 0.6 }}
        className="navbar__profile-image"
        src={currentUser?.img || profile}
        alt="userName"
        onClick={() => setShowMenu((init) => !init)}
      />
      {showMenu && (
        <div
          className="modal"
          onClick={(e) => {
            if (e.target.className === "modal") {
              setShowMenu(false);
            }
          }}
        >
          <div className="navbar__profile-container">
            <h2>User Profile</h2>
            <div className="profile-container__image ">
              <img src={currentUser?.img || profile} alt="profile" />
              <MdEdit size={28} />
            </div>
            <div onClick={logOut} className="btn-outline">
              {message}
            </div>
            <div className="profile-container__fields">
              <div className="profile-container__field">
                <span>Username </span>
                {edit ? (
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                ) : (
                  <i> {currentUser?.username}</i>
                )}
              </div>
              <div className="profile-container__field">
                <span>Email </span>
                {edit ? (
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                ) : (
                  <i> {currentUser?.email}</i>
                )}
              </div>
            </div>
            <button
              className="btn-fill"
              onClick={() => (edit ? handleEdit() : onEditSave())}
            >
              {edit ? saveMessage : "Edit"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserLink;
