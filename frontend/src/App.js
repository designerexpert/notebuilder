import React, { Component } from 'react';
import './App.css';
import './components/styles/index.css';
import Auth from './components/auth';

class App extends Component {
  render() {
    return (
      <div className="App">
        <img className='mainLogo' src='./img/MedNoteCompanion.svg' alt='MedNoteCompanion Logo' />
        <Auth />
      </div>
    );
  }
}

export default App;
