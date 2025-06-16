import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FlixirLogo from "../../img/transplogo.png";
import Mockup from "../../img/mockup.png";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signin, signup } from "../../actions/auth";
import jwt_decode from "jwt-decode";

// require("dotenv").config();
const initialState = {
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(false);

  const [showPass, setShowPass] = useState(false);

  const [formData, setformData] = useState(initialState);

  const handleShowPassword = () => {
    setShowPass((prevShowPass) => !prevShowPass);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      //logic for signup
      dispatch(signup(formData, navigate));
    } else {
      //logic for signin
      dispatch(signin(formData, navigate));
    }
  };

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
  };

  const googleSuccess = async (res) => {
    const token = res.credential;
    const data = jwt_decode(token);
    // console.log(data);
    const result = {
      email: data.email,
      familyName: data.family_name,
      username: data.given_name,
      googleId: data.sub,
      imageUrl: data.picture,
      name: data.name,
    };
    try {
      dispatch({ type: "AUTH", data: { result, token } });
      navigate("/posts");
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = () => {
    console.log("Google Sign in Failed! Try again later.");
  };

  return (
    <div className="w-full min-h-screen p-4 md:p-8 flex justify-center items-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 md:w-96 h-72 md:h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 md:w-96 h-72 md:h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
        {/* Left Side - Mockup Image */}
        <div className="flex-1 flex justify-center items-center order-2 lg:order-1">
          <div className="relative group">
            <img
              src={Mockup}
              alt="FliXiR-mockup"
              className="w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl transition-all duration-700 group-hover:scale-105 drop-shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="flex-1 flex justify-center items-center order-1 lg:order-2">
          <div
            className="w-full max-w-md glass-effect rounded-3xl p-6 md:p-8 shadow-2xl border border-white/10 backdrop-blur-xl"
            style={{
              background: "rgba(30, 30, 46, 0.8)",
              boxShadow:
                "0 25px 50px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05)",
            }}
          >
            {/* Logo and Title */}
            <div className="text-center mb-6">
              <div className="flex justify-center items-center gap-3 mb-4">
                <div className="relative">
                  <img
                    src={FlixirLogo}
                    alt="FliXiR-Logo"
                    className="w-12 md:w-16 h-12 md:h-16 transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
                </div>
                <h1
                  className="text-4xl md:text-5xl lg:text-6xl font-normal text-white"
                  style={{
                    fontFamily: "Cookie, sans-serif",
                    textShadow: "0 0 30px rgba(99, 102, 241, 0.6)",
                    letterSpacing: "0.1rem",
                  }}
                >
                  FliXiR
                </h1>
              </div>
              {/* Welcome Text */}
              <div
                className="text-slate-300 text-base md:text-lg font-normal text-center leading-relaxed"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {isSignUp
                  ? "Join the creative community! Share your moments and connect with friends."
                  : "Welcome back! Sign in to continue your creative journey."}
              </div>
            </div>
            {/* Auth Form */}
            <form onSubmit={handleSubmit} className="w-full space-y-4">
              {/* Sign Up Fields */}
              {isSignUp && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-white/20 rounded-xl text-white text-sm md:text-base transition-all duration-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none placeholder-slate-400"
                      style={{
                        background: "rgba(255, 255, 255, 0.05)",
                        backdropFilter: "blur(10px)",
                      }}
                      placeholder="First Name"
                      name="firstName"
                      required
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-white/20 rounded-xl text-white text-sm md:text-base transition-all duration-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none placeholder-slate-400"
                      style={{
                        background: "rgba(255, 255, 255, 0.05)",
                        backdropFilter: "blur(10px)",
                      }}
                      placeholder="Last Name"
                      name="lastName"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-white/20 rounded-xl text-white text-sm md:text-base transition-all duration-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none placeholder-slate-400"
                    style={{
                      background: "rgba(255, 255, 255, 0.05)",
                      backdropFilter: "blur(10px)",
                    }}
                    placeholder="Username"
                    name="userName"
                    required
                    onChange={handleChange}
                  />
                </div>
              )}
              {/* Email Field */}
              <input
                type="email"
                className="w-full px-4 py-3 border border-white/20 rounded-xl text-white text-sm md:text-base transition-all duration-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none placeholder-slate-400"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(10px)",
                }}
                placeholder="Email Address"
                name="email"
                required
                onChange={handleChange}
              />

              {/* Password Field */}
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  className="w-full px-4 py-3 pr-12 border border-white/20 rounded-xl text-white text-sm md:text-base transition-all duration-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none placeholder-slate-400"
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(10px)",
                  }}
                  placeholder="Password"
                  name="password"
                  required
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={handleShowPassword}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors duration-300"
                >
                  <FontAwesomeIcon
                    icon={faEye}
                    className={`text-lg ${showPass ? "text-indigo-500" : ""}`}
                  />
                </button>
              </div>
              {/* Confirm Password Field */}
              {isSignUp && (
                <input
                  type="password"
                  className="w-full px-4 py-3 border border-white/20 rounded-xl text-white text-sm md:text-base transition-all duration-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none placeholder-slate-400"
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(10px)",
                  }}
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  required
                  onChange={handleChange}
                />
              )}

              {/* Submit Button */}
              <button
                className="w-full px-4 py-3 text-sm md:text-base font-semibold text-white rounded-xl border-none cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/25 mt-6"
                style={{
                  background:
                    "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
                  boxShadow: "0 8px 25px rgba(99, 102, 241, 0.4)",
                }}
                type="submit"
              >
                {isSignUp ? "Create Account" : "Sign In"}
              </button>

              {/* Switch Mode */}
              <div className="text-center mt-4">
                <button
                  type="button"
                  className="bg-transparent border-none cursor-pointer text-slate-300 text-sm font-medium transition-all duration-300 hover:text-white hover:underline"
                  onClick={switchMode}
                >
                  {isSignUp
                    ? "Already have an account? Sign In"
                    : "Don't have an account? Sign Up"}
                </button>
              </div>

              {/* Divider */}
              <div className="relative text-center my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-slate-800/50 text-slate-400">
                    or continue with
                  </span>
                </div>
              </div>

              {/* Google Login */}
              <div className="flex justify-center">
                <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_ID}>
                  <GoogleLogin
                    onSuccess={googleSuccess}
                    onError={googleFailure}
                    theme="outline"
                    size="medium"
                    width="100%"
                  />
                </GoogleOAuthProvider>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
