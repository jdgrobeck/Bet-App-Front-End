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
    <AppBar position="relative" className="nav-bar">
      <Toolbar className="nav-bar">
      <Typography variant="h6" style={{ fontFamily: "'He\\'s on Fire', sans-serif", color: "red", fontSize: "50px", WebkitTextStroke: "3px black", WebkitTextFillColor: "solid blue" }}>
        NBA Sportsbook
      </Typography>
        <ul className="nav-list" style={{ listStyle: "none", marginLeft: "auto"}}>
          {/* <li>
            <Link to="/listings" className="nav-item">Listings</Link>
          </li>
          {cookies["loggedIn"] ? <li>
            <Link to="/addlisting" className="nav-item">Add</Link>
          </li> : ""} */}
          <li>
            <Link 
            to="/login" onClick={deleteCookie} className="nav-item" style={{ textDecoration: "none", margin: "0 20px", fontFamily: "'He\\'s on Fire', sans-serif", color: "red", fontSize: "50px", WebkitTextStroke: "3px black", WebkitTextFillColor: "solid blue"}}>Logout
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