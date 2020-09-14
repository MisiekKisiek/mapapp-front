import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'

//Styles
import './scss/Main.scss'

//Components
import MainPage from './pages/MainPage'
import Footer from './components/Footer'

class App extends Component {
  state = {}

  logOut = () => {
    localStorage.setItem('logged', 'unlogged');
    this.forceUpdate();
  }

  logIn = () => {
    localStorage.setItem('logged', 'logged');
    this.forceUpdate();
  }

  componentDidMount() {
    localStorage.setItem('logged', 'logged');
  }

  render() {
    return (
      <Router>
        <div className="App">
          <MainPage logOut={this.logOut} logIn={this.logIn}></MainPage>
          <Footer></Footer>
        </div>
      </Router>);
  }
}

export default App;
