import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import axios from 'axios'

export default function Register(props) {

  const appPath = process.env.NODE_ENV !== 'production' ? 'http://localhost:4001/' : 'https://capstone-planning.vercel.app/' 
  console.log(appPath)
  console.log(process.env)

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
      <TextField id="fullName" label="full name" variant="standard" type="full_name" required/>
      <TextField id="username" label="username" variant="standard" type="username" required/>
      <TextField id="password" label="password" variant="standard" type="password" required/>
      <TextField id="email" label="email" variant="standard" type="email" required/>
      {/* I want to send this to my users table */}
      <Button variant="contained" onClick={handleRegistration}>Register</Button>
    </Box>
  );
}