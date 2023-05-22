import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export default function Register(props) {

  const appPath = process.env.NODE_ENV === 'Production' ? 'http://localhost:4001/' : 'https://capstone-planning.vercel.app/' 
  console.log(appPath)
  console.log(process.env)
  const navigate = useNavigate();

  const handleRegistration = async () => {
    // Fetch form data
    const fullName = document.getElementById("fullName").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;

    const user = {
      fullName: fullName,
      username: username,
      password: password,
      email: email
    };
  
    // Make axios.post request
    try{ 
      await axios.post(appPath + "register", user)

      console.log('Registration successful', user)
      window.alert("Registration successful")
      navigate("/login")
    } catch (err) {
      // Handle error, e.g. show error message, etc.
      console.log('Registration failed:', err);
    }

  }

  return (
    <Box
      component="form"
      sx={{
        display: "grid",
        maxWidth: 300,
        gridGap: "10px",
        margin: "65px auto"
      }}
      noValidate
      autoComplete="off"
    >
     <div className="site-title">
          <h1>Register</h1>
         </div>
      <form style={{ display: "flex", flexDirection: "column", border: "1px solid lightgrey", borderRadius: "4px", padding: "16px", backgroundColor: "lightgrey", marginTop: -50  }}>
        <TextField id="fullName" label="full name" variant="standard" type="full_name" required sx={{ mb: 2, backgroundColor: "white"}}/>
        <TextField id="username" label="username" variant="standard" type="username" required sx={{ mb: 2, backgroundColor: "white"}}/>
        <TextField id="password" label="password" variant="standard" type="password" required sx={{ mb: 2, backgroundColor: "white"}}/>
        <TextField id="email" label="email" variant="standard" type="email" required sx={{ mb: 2, backgroundColor: "white"}}/>
        {/* I want to send this to my users table */}
        <Button variant="contained" onClick={handleRegistration}>Register</Button>
      </form>
    </Box>
  );
}