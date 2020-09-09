import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom'

import Footer from './components/Footer'
import './scss/Main.scss'

//Components
import MainPage from './pages/MainPage'


function App() {
  return (
    <Router>
      <div className="App">
        <MainPage></MainPage>
        <Footer></Footer>
      </div>
    </Router>
  );
}

export default App;
