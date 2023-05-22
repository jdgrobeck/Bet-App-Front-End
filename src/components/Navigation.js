import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@mui/material";
import cookie from "cookie";




//isLoggedIn is passed as prop from Router.js

const Navigation = () => {
  const navigate = useNavigate();
  const cookies = cookie.parse(document.cookie);

  const deleteCookie = () => {
    if(cookies["loggedIn"]){
      document.cookie = "loggedIn=null; max-age=0";
    //   console.log("deleteCookie", props.user.user.username);
    //   props.changeUserName("");
      navigate('/login');
    } else {
      navigate('/login');
    }
  }

  return (
    <>
    <AppBar position="relative">
      <Toolbar className="nav-bar">
        <Typography variant="h6" style={{ flexGrow: "1" }}>
          Place Your Bets!
        </Typography>
        <ul className="nav-list" style={{ listStyle: "none"}}>
          {/* <li>
            <Link to="/listings" className="nav-item">Listings</Link>
          </li>
          {cookies["loggedIn"] ? <li>
            <Link to="/addlisting" className="nav-item">Add</Link>
          </li> : ""} */}
          <li>
            <Link 
            to="/login" onClick={deleteCookie} className="nav-item" style={{ textDecoration: "none", margin: "0 20px", color: "white"}}>Logout
            </Link>
          </li>
        </ul>
      </Toolbar>
    </AppBar>
    {/* {cookies["loggedIn"] && props.user.user ? <div className="welcome-user">Logged in as: {props.user.user.username} </div> : null} */}
    </>
  );
};

export default Navigation;