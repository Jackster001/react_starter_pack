import React from 'react';
import './App.css';
import Header from './components/header';
import Login from './components/Pages/login';
import Footer from './components/footer';
import Home from './components/Pages/home';

function App() {
  return (
    <div className="App">
      <Header/>
      <Footer/>
    </div>
  );
}

export default App;
