import React, { useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./containers/Navbar/Navbar";
// import UserPanel from "./containers/UserPanel/UserPanel";
// import HomePage from "./Pages/HomePage";
// import AddPost from "./Pages/AddPost";
// import Saved from "./Pages/Saved";
// import Account from "./Pages/Account";
// import MobileMenu from "./containers/MobileMenu/MobileMenu";
// import Auth from "./containers/Auth/Auth";
// import PostDetails from "./components/PostDetails/PostDetails";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, []);

  console.log(user);

  return (
    <Router>
      <div>
        {/* Navbar */}
        <Navbar></Navbar>
        {/* Mobile-Menu */}
        
      </div>
    </Router>
  );
}

export default App;
