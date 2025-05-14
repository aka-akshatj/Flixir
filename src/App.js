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
import HomePage from "./Pages/HomePage";
import MobileMenu from "./containers/MobileMenu/MobileMenu";
import Auth from "./containers/Auth/Auth";


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
        <MobileMenu></MobileMenu>
        {/* Page Content */}
        <div className="page-body">
          {/* <div className="userPanel">{<UserPanel></UserPanel>}</div> */}
          <div className="pages containers">
            <Routes>
              <Route
                path="/"
                element={
                  user !== null ? (
                    <Navigate to="/posts"></Navigate>
                  ) : (
                    <Navigate to="/auth"></Navigate>
                  )
                }
              ></Route>

              <Route path="/posts" element={<HomePage></HomePage>}></Route>
              <Route path="/auth" element={<Auth />}></Route>
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
