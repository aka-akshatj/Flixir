import React, { useEffect, useState } from "react";
// import "./UserPanel.css";
import UserLogo from "../../img/user.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faPlus,
  faBookmark,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showForm } from "../../actions/form";

const UserPanel = () => {
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  // console.log(user);
  const formState = useSelector((state) => state.form);
  const dispatch = useDispatch();

  const handleOpen = () => {
    dispatch(showForm());
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <div className="user-panel-container ">
      <div className="user-panel">
        <div className="user-info">
          <div className="user-img">
            {user?.result?.imageUrl ? (
              <img
                src={user.result.imageUrl}
                alt={user.result.name}
                className="profile-img"
              ></img>
            ) : (
              <img src={UserLogo} alt="guest-logo" className="profile-img" />
            )}
          </div>
          <div className="user-details">
            <div className="username">
              {user ? user.result.username.split(" ")[0] : "guestUsername"}
            </div>
            <div className="realname">
              {user ? user.result.name : "Guest User"}
            </div>
          </div>
        </div>
        {/* <div className="user-stats">
          <div className="post-count">
            <span className="count-num">0</span> posts
          </div>
          <div className="followers-count">
            <span className="count-num">0</span> likes
          </div>
          <div className="following-count">
            <span className="count-num">0</span> comments
          </div>
        </div> */}
        <div className="nav-links">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link nav-link-active" : "nav-link"
            }
            end
          >
            <div className="nav-link-logo">
              <FontAwesomeIcon icon={faHouse}></FontAwesomeIcon>
            </div>
            <div className="nav-link-text">Home</div>
          </NavLink>
          <div
            className={formState ? "nav-link nav-link-active" : "nav-link"}
            onClick={handleOpen}
          >
            <div className="nav-link-logo">
              <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
            </div>
            <div className="nav-link-text">Create a Flix</div>
          </div>
          {/* <NavLink
            to="/saved"
            className={({ isActive }) =>
              isActive ? "nav-link nav-link-active" : "nav-link"
            }
          >
            <div className="nav-link-logo">
              <FontAwesomeIcon icon={faBookmark}></FontAwesomeIcon>
            </div>
            <div className="nav-link-text">Saved Flixs</div>
          </NavLink>
          <NavLink
            to="/account"
            className={({ isActive }) =>
              isActive ? "nav-link nav-link-active" : "nav-link"
            }
          >
            <div className="nav-link-logo">
              <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
            </div>
            <div className="nav-link-text">My account</div>
          </NavLink> */}
        </div>
        <div className="footer">
          Flixir | &copy; Copyright 2025 
        </div>
      </div>
    </div>
  );
};

export default UserPanel;
