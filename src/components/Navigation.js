import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@mui/material";
import cookie from "cookie";




//isLoggedIn is passed as prop from Router.js

const Navigation = () => {
  const navigate = useNavigate();
  // const [loggedIn, setLoggedIn] = useState(false);


  // useEffect(() => {
  //   const cookies = cookie.parse(document.cookie);
  //   setLoggedIn(cookies["loggedIn"] === "true");
  // }, []);

  const deleteCookie = () => {
    document.cookie = "loggedIn=null; max-age=0";
    navigate('/login');
    // if(cookies["loggedIn"]){
    //   document.cookie = "loggedIn=null; max-age=0";
    //   console.log("deleteCookie", props.user.user.username);
    //   props.changeUserName("");
    //   navigate('/login');
    // } else {
    //   navigate('/login');
    // }
  }
  const cookies = cookie.parse(document.cookie);

  if (!cookies["loggedIn"]) {
    return null; // Render null if not logged in
  }

  return (
    <>
    <AppBar position="relative" className="nav-bar">
      <Toolbar className="nav-bar">
      <Link to="/dashboard" style={{ fontFamily: "'He\\'s on Fire', sans-serif", color: "red", fontSize: "50px", WebkitTextStroke: "3px black", WebkitTextFillColor: "solid blue", textDecoration: "none" }}>
        NBA Sportsbook
      </Link>
        <ul className="nav-list" style={{ listStyle: "none", marginLeft: "auto"}}>
        <li>
            <Link to="/history" className="nav-item" style={{ textDecoration: "none", margin: "0 20px", fontFamily: "'He\\'s on Fire', sans-serif", color: "red", fontSize: "50px", WebkitTextStroke: "3px black", WebkitTextFillColor: "solid blue", display: "flex", flexDirection: "row"}}>History
            </Link>
          </li>
          <li>
            <Link to="/login" onClick={deleteCookie} className="nav-item" style={{ textDecoration: "none", margin: "0 20px", fontFamily: "'He\\'s on Fire', sans-serif", color: "red", fontSize: "50px", WebkitTextStroke: "3px black", WebkitTextFillColor: "solid blue", display: "flex", flexDirection: "row"}}>Logout
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