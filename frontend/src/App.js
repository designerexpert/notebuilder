import React, { Component } from 'react';
import './App.css';
import './components/styles/index.css';
import Auth from './components/auth';

class App extends Component {
  render() {
    return (
      <div className="App">
        <img className='mainLogo' src='./img/MedNoteCompanionLogo.png' />
        <Auth />
      </div>
    );
  }
}

export default App;
