import React from "react";
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
    <>
      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 glass-effect border-t border-white/10">
        <div className="flex justify-around items-center py-3 px-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-300 ${
                isActive
                  ? "text-indigo-400 bg-indigo-500/20"
                  : "text-slate-400 hover:text-white hover:bg-white/10"
              }`
            }
            end
          >
            <FontAwesomeIcon icon={faHouse} className="text-xl" />
            <span className="text-xs font-medium">Home</span>
          </NavLink>

          {/* <NavLink
            to="/explore"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-300 ${
                isActive
                  ? "text-indigo-400 bg-indigo-500/20"
                  : "text-slate-400 hover:text-white hover:bg-white/10"
              }`
            }
          >
            <FontAwesomeIcon icon={faCompass} className="text-xl" />
            <span className="text-xs font-medium">Explore</span>
          </NavLink> */}

          {/* Create Post Button */}
          <button
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-300 ${
              formState
                ? "text-indigo-400 bg-indigo-500/20"
                : "text-slate-400 hover:text-white hover:bg-white/10"
            }`}
            onClick={handleOpen}
          >
            <FontAwesomeIcon icon={faPlus} className="text-xl" />
            <span className="text-xs font-medium">Create</span>
          </button>

          {/* <NavLink
            to="/notifications"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-300 ${
                isActive
                  ? "text-indigo-400 bg-indigo-500/20"
                  : "text-slate-400 hover:text-white hover:bg-white/10"
              }`
            }
          >
            <FontAwesomeIcon icon={faBell} className="text-xl" />
            <span className="text-xs font-medium">Alerts</span>
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-300 ${
                isActive
                  ? "text-indigo-400 bg-indigo-500/20"
                  : "text-slate-400 hover:text-white hover:bg-white/10"
              }`
            }
          >
            <FontAwesomeIcon icon={faUser} className="text-xl" />
            <span className="text-xs font-medium">Profile</span>
          </NavLink> */}
        </div>
      </div>

      {/* Floating Action Button for Desktop */}
      <div className="hidden lg:block fixed bottom-8 right-8 z-40">
        <button
          onClick={handleOpen}
          className={`w-14 h-14 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 ${
            formState
              ? "bg-gradient-to-r from-indigo-600 to-purple-600 shadow-indigo-500/50"
              : "bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 shadow-indigo-500/40"
          }`}
          title="Create new post"
        >
          <FontAwesomeIcon
            icon={faPlus}
            className={`text-white text-xl transition-transform duration-300 ${
              formState ? "rotate-45" : ""
            }`}
          />
        </button>
      </div>
    </>
  );
};

export default MobileMenu;
