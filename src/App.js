import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

//Styles
import './scss/Main.scss'

//Components
import MainPage from './pages/MainPage'
import Footer from './components/Footer'

class App extends Component {
  state = {}

  forceUpdateTest = () => {
    this.forceUpdate();
  }

  logOut = () => {
    sessionStorage.setItem('logged', 'unlogged');
    sessionStorage.setItem('token', '');
    this.forceUpdate();
  }

  logIn = () => {
    sessionStorage.setItem('logged', 'logged');
    this.forceUpdate();
  }

  componentDidMount() {
    sessionStorage.setItem('logged', 'unlogged');
    sessionStorage.setItem('token', '');
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
