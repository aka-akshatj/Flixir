import React, { useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./containers/Navbar/Navbar";
import UserPanel from "./containers/UserPanel/UserPanel";
import MobileMenu from "./containers/MobileMenu/MobileMenu";

function App() {
  


  return (
    <Router>
      <div>
        {/* Navbar */}
        <Navbar></Navbar>
        {/* Mobile-Menu */}
        <MobileMenu></MobileMenu>

        <div className="page-body">
          {/* <div className="userPanel">{<UserPanel></UserPanel>}</div> */}
          
        </div>
      </div>
    </Router>
  );
}

export default App;
