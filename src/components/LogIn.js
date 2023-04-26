import React, {useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';




export default function LogIn(props) {
  const navigate = useNavigate();

  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  // CHALLENGE 
  // The Nav button should say Log in when there's no cookie
  // After login, the cookie is set and the NAV button should say Log Out
  // When logged out, the cookie should either be deleted or set to ""

  const login = (e) => {
    e.preventDefault();
    // set cookie here
    // set loggedIn = true and max-age = 60*1000 (one minute)

    //max-age is when the cookies expire. Counts in miliseconds. 60*1000 is a minute
    document.cookie = "loggedIn=true;max-age=60*1000"

    navigate("/dashboard");
  };

  return (
    <Box 
        sx={{
          display: "grid",
          maxWidth: 300,
          gridGap: "10px",
          margin: "65px auto"
        }}
        noValidate
        autoComplete="off"    
    
    
    >
     
        <form className="login-form" onSubmit={login}>
          <TextField
            required
            onChange={handleTextChange}
            value={state.username}
            name="username"
            label="Username"
            type="text"
          />
          <TextField
            required
            onChange={handleTextChange}
            value={state.password}
            name="password"
            label="Password"
            type="password"
          />
          <Link to='/register' style={{ textDecoration: 'none' }}>
          <Typography>
            New User? Register Here
          </Typography>
          </Link>
          <Button
            type="submit"
            className="login-button"
            variant="contained"
            color="primary"
          >
            Login
          </Button>
        </form>
    </Box>
  );

  // return (
  //   <Box
  //     component="form"
  //     sx={{
  //       display: "grid",
  //       maxWidth: 300,
  //       gridGap: "10px",
  //       margin: "65px auto"
  //     }}
  //     noValidate
  //     autoComplete="off"
  //   >
  //     <TextField id="standard-basic" label="username" variant="standard" type="username" required/>
  //     <TextField id="standard-basic" label="password" variant="standard" type="password" required/>
  //     {/* How do I make a link that says "New User? Register here" and link it to my Register component. */}
  //     <Link to='/register' style={{ textDecoration: 'none' }}>
  //       <Typography>
  //         New User? Register Here
  //       </Typography>
  //     </Link>
  //     <Button variant="contained" onClick={login()}>Log In</Button>
  //   </Box>
  // );
}