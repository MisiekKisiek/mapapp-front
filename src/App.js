import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

//Styles
import './scss/Main.scss'

//Components
import MainPage from './pages/MainPage'
import Footer from './components/Footer'

class App extends Component {
  constructor() {
    super();
    this.state = {
      logged: sessionStorage.getItem('logged')
    }
    this.forceUpdateApp = this.forceUpdateApp.bind(this)
  }

  forceUpdateApp() {
    this.setState({
      logged: sessionStorage.getItem('logged')
    })
  }

  logOut = () => {
    sessionStorage.setItem("token", "");
    sessionStorage.setItem("logged", "unlogged");
    sessionStorage.setItem('user', "");
    sessionStorage.setItem('email', "");
    this.forceUpdateApp()
  }

  componentDidMount() {
    if (!sessionStorage.setItem("token", "")) {
      sessionStorage.setItem("token", "");
      sessionStorage.setItem("logged", "logged");
      sessionStorage.setItem('user', "");
      sessionStorage.setItem('email', "");
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <MainPage logged={this.state.logged} logOut={this.logOut} logIn={this.logIn} forceUpdateApp={this.forceUpdateApp}></MainPage>
          <Footer></Footer>
        </div>
      </Router>);
  }
}

export default App;
