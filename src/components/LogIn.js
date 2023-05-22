import React, {useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import "../App.css";



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

  

  const login = (e) => {
    const url = "https://capstone-planning.vercel.app/login"
    
    e.preventDefault();
    axios.post(url, {
      username: state.username,
      password: state.password
    })
    .then(response => {
      // let userId = response.data.userId;
      console.log('Data sent successfully:', response.data.userId);
      localStorage.setItem("user id", response.data.userId);
      
      document.cookie = "loggedIn=true; max-age=3600"
      console.log(document.cookie)
      navigate("/dashboard");
      // Handle success, such as showing a success message, updating state, etc.
    })
    .catch(error => {
      console.error('Error sending data:', error);
      window.alert("Login failed. Try again.")
      // Handle error, such as showing an error message, etc.
    });
    // set cookie here
    // set loggedIn = true and max-age = 60*1000 (one minute)

    //max-age is when the cookies expire. Counts in miliseconds. 60*1000 is a minute
   
  };

  

  return (
    <Box 
    sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      
      
    }}
        noValidate
        autoComplete="off"    
        // style={{ display: "flex", flexDirection: "column", justifyContent: "center"}}
    
    >    <div className="site-title">
          <h1>NBA Sportsbook</h1>
         </div>
        <form className="login-form" onSubmit={login} style={{ display: "flex", flexDirection: "column", border: "1px solid lightgrey", borderRadius: "4px", padding: "16px", backgroundColor: "lightgrey"}} >
         
          <TextField
            required
            onChange={handleTextChange}
            value={state.username}
            name="username"
            label="Username"
            type="text"
            sx={{ mb: 2, backgroundColor: "white" }}
          />
          <TextField
            required
            onChange={handleTextChange}
            value={state.password}
            name="password"
            label="Password"
            type="password"
            sx={{ mb: 2, backgroundColor: "white" }}
          />
          <Link to='/register' style={{ textDecoration: 'none', color: "blue" }}>
          <Typography sx={{ mb: 2 }}>
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

}

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
