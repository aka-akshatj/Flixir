import React, { useEffect, useState } from "react";
import "./Navbar.css";
import PolaroidLogo from "../../img/polaroid (1).png";
import UserLogo from "../../img/user.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  // console.log(user);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    setUser(null);
    navigate("/");
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <div className="navbar">
      <div className="containers navbar-content">
        <Link to="/" className="logo">
          <img src={PolaroidLogo} alt="Polaroid-Logo" />
          <h1 className="logo-text text-4xl">FliXiR</h1>
        </Link>
        {/* <div className="navbar-searchbar">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search a Flix"
                    />
                    <button className="search-submit-btn">
                        <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                        ></FontAwesomeIcon>
                    </button>
                </div> */}
        <div className="toolbar">
          {user ? (
            <div className="profile">
              {user.result.imageUrl ? (
                <img
                  src={user.result.imageUrl}
                  alt={user.result.name}
                  className="profile-img"
                ></img>
              ) : (
                <img
                  src={UserLogo}
                  alt={user.result.name}
                  className="profile-img"
                />
              )}
              {/* <div className="profile-name">
                                {user.result.username.split(" ")[0]}
                            </div> */}
              <FontAwesomeIcon
                icon={faRightFromBracket}
                className="logout-btn"
                onClick={logout}
              ></FontAwesomeIcon>
            </div>
          ) : (
            <Link to="/auth" className="main-btn login-btn">
              Log in
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
