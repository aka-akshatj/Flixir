import React from "react";
import "./MobileMenu.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faPlus,
  //   faBookmark,
  //   faUser,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showForm } from "../../actions/form";

const MobileMenu = () => {
  const formState = useSelector((state) => state.form);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpen = () => {
    navigate("/posts");
    dispatch(showForm());
  };
  return (
    <div className="mobile-menu-container">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "mobile-menu-link mobile-menu-link-active"
            : "mobile-menu-link"
        }
        end
      >
        <div className="mobile-menu-icon">
          <FontAwesomeIcon icon={faHouse}></FontAwesomeIcon>
        </div>
      </NavLink>
      <div
        className={
          formState
            ? "mobile-menu-link mobile-menu-link-active"
            : "mobile-menu-link"
        }
        onClick={handleOpen}
      >
        <div className="mobile-menu-icon">
          <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
        </div>
      </div>
      {/* <NavLink
                to="/saved"
                className={({ isActive }) =>
                    isActive
                        ? "mobile-menu-link mobile-menu-link-active"
                        : "mobile-menu-link"
                }
            >
                <div className="mobile-menu-icon">
                    <FontAwesomeIcon icon={faBookmark}></FontAwesomeIcon>
                </div>
            </NavLink>
            <NavLink
                to="/account"
                className={({ isActive }) =>
                    isActive
                        ? "mobile-menu-link mobile-menu-link-active"
                        : "mobile-menu-link"
                }
            >
                <div className="mobile-menu-icon">
                    <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                </div>
            </NavLink> */}
    </div>
  );
};

export default MobileMenu;
