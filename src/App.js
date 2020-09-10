import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'

//Styles
import './scss/Main.scss'

//Components
import MainPage from './pages/MainPage'
import Footer from './components/Footer'

class App extends Component {
  state = {}

  componentDidMount() {
    localStorage.setItem('logged', 'unlogged');
  }

  render() {
    return (
      <Router>
        <div className="App">
          <MainPage></MainPage>
          <Footer></Footer>
        </div>
      </Router>);
  }
}

export default App;
