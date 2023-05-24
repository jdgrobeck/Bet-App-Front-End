import React from 'react'
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
import Navigation from './components/Navigation';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
