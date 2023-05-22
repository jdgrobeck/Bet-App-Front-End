import React from 'react'
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
import Navigation from './components/Navigation';


function App() {
  const loggedIn = document.cookie.includes('loggedIn=true');
  return (
    <div className="App">
      <BrowserRouter>
      {loggedIn && <Navigation />}
      <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
