import React, { useEffect, useState, useRef } from "react";
import FlixirLogo from "../../img/transplogo.png";
import UserLogo from "../../img/user.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faUser,
  faCog,
  faBookmark,
  faSearch,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchUsers } from "../../actions/users";
import decode from "jwt-decode";

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchResults = useSelector((state) => state.users);
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    setUser(null);
    navigate("/");
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.trim()) {
      dispatch(searchUsers(value.trim()));
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      dispatch(searchUsers(searchQuery.trim()));
      setShowSearchResults(true);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setShowSearchResults(false);
  };

  const handleUserClick = (userId) => {
    // Navigate to user profile (implement when user profile page is ready)
    console.log("Navigate to user:", userId);
    setShowSearchResults(false);
    setSearchQuery("");
  };

  // Handle click outside dropdown and search
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowAccountDropdown(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const toggleAccountDropdown = () => {
    setShowAccountDropdown(!showAccountDropdown);
  };

  return (
    <div className="h-16 md:h-20 sticky top-0 z-50 glass-effect border-b border-white/10">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center gap-4 md:gap-8 h-full">
        <Link
          to="/"
          className="flex items-center gap-2 md:gap-3 group"
          style={{
            fontFamily: "Cookie, sans-serif",
          }}
        >
          <div className="relative">
            <img
              src={FlixirLogo}
              alt="Polaroid-Logo"
              className="w-8 h-8 md:w-12 md:h-12 transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </div>
          <h1 className="text-2xl md:text-3xl font-normal text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 transition-all duration-300">
            FliXiR
          </h1>
        </Link>

        {/* Search Bar - Hidden on mobile, shown on tablet+ */}
        <div
          className="hidden md:flex items-center flex-1 max-w-md mx-8"
          ref={searchRef}
        >
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full px-4 py-2 pl-10 pr-10 rounded-full bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-150"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
              <FontAwesomeIcon icon={faSearch} className="w-4 h-4" />
            </div>
            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors duration-150"
              >
                <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
              </button>
            )}

            {/* Search Results Dropdown */}
            {showSearchResults && (
              <div className="absolute top-full left-0 right-0 mt-2 glass-effect rounded-xl border border-white/10 shadow-2xl overflow-hidden z-50 max-h-80 overflow-y-auto">
                {searchResults.length > 0 ? (
                  <div className="py-2">
                    {searchResults.map((user) => (
                      <button
                        key={user._id}
                        onClick={() => handleUserClick(user._id)}
                        className="w-full flex items-center gap-3 px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-150 text-left"
                      >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold text-xs flex-shrink-0">
                          {user.name?.charAt(0)?.toUpperCase() || "U"}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">
                            {user.name}
                          </p>
                          <p className="text-xs text-slate-400 truncate">
                            @{user.username}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : searchQuery.trim() ? (
                  <div className="py-8 px-4 text-center">
                    <p className="text-slate-400 text-sm">No users found</p>
                    <p className="text-slate-500 text-xs mt-1">
                      Try a different search term
                    </p>
                  </div>
                ) : null}
              </div>
            )}
          </form>
        </div>
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
        {/* User Section */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              {/* User Avatar - Clickable */}
              <button
                onClick={toggleAccountDropdown}
                className="flex items-center gap-3 p-1 rounded-full hover:bg-white/10 transition-all duration-300"
              >
                <div className="relative group">
                  {user.result.imageUrl ? (
                    <img
                      src={user.result.imageUrl}
                      alt={user.result.name}
                      className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white/20 group-hover:border-indigo-400 transition-all duration-300"
                    />
                  ) : (
                    <img
                      src={UserLogo}
                      alt={user.result.name}
                      className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white/20 group-hover:border-indigo-400 transition-all duration-300"
                    />
                  )}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </div>

                {/* User Name - Hidden on mobile */}
                <span className="hidden md:block text-white/80 text-sm font-medium">
                  {user.result.name?.split(" ")[0] || user.result.username}
                </span>

                {/* Dropdown Arrow */}
                <svg
                  className={`w-4 h-4 text-white/60 transition-transform duration-300 ${
                    showAccountDropdown ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Account Dropdown */}
              {showAccountDropdown && (
                <div className="absolute right-0 top-full mt-2 w-72 glass-effect rounded-2xl border border-white/10 shadow-2xl overflow-hidden z-50">
                  {/* User Info Header */}
                  <div className="p-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        {user.result.imageUrl ? (
                          <img
                            src={user.result.imageUrl}
                            alt={user.result.name}
                            className="w-12 h-12 rounded-full border-2 border-white/20"
                          />
                        ) : (
                          <img
                            src={UserLogo}
                            alt={user.result.name}
                            className="w-12 h-12 rounded-full border-2 border-white/20"
                          />
                        )}
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-sm">
                          {user.result.name || user.result.username}
                        </h3>
                        <p className="text-slate-400 text-xs">
                          {user.result.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <Link
                      to="/account"
                      className="flex items-center gap-3 px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
                      onClick={() => setShowAccountDropdown(false)}
                    >
                      <FontAwesomeIcon
                        icon={faUser}
                        className="text-indigo-400"
                      />
                      <span className="text-sm font-medium">My Profile</span>
                    </Link>

                    <Link
                      to="/saved"
                      className="flex items-center gap-3 px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
                      onClick={() => setShowAccountDropdown(false)}
                    >
                      <FontAwesomeIcon
                        icon={faBookmark}
                        className="text-yellow-400"
                      />
                      <span className="text-sm font-medium">Saved Posts</span>
                    </Link>

                    <Link
                      to="/settings"
                      className="flex items-center gap-3 px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
                      onClick={() => setShowAccountDropdown(false)}
                    >
                      <FontAwesomeIcon
                        icon={faCog}
                        className="text-slate-400"
                      />
                      <span className="text-sm font-medium">Settings</span>
                    </Link>
                  </div>

                  {/* Logout Section */}
                  <div className="border-t border-white/10 p-2">
                    <button
                      onClick={() => {
                        logout();
                        setShowAccountDropdown(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-300"
                    >
                      <FontAwesomeIcon icon={faRightFromBracket} />
                      <span className="text-sm font-medium">Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/auth"
              className="px-4 md:px-6 py-2 md:py-2.5 text-sm md:text-base font-medium text-white rounded-full transition-all duration-300 hover:transform hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/25"
              style={{
                background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
                boxShadow: "0 4px 15px rgba(99, 102, 241, 0.3)",
              }}
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
