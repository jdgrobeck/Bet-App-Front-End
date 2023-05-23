import React from 'react'
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
import Navigation from './components/Navigation';
import cookie from "cookie"


function App() {
  const cookies = cookie.parse(document.cookie);
  return (
    <div className="App">
      <BrowserRouter>
      {cookies["loggedIn"] ? <Navigation /> : ""}
      <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
