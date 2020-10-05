import React, { Component, createRef } from "react";
import { BrowserRouter as Router } from "react-router-dom";

//Styles
import "./scss/Main.scss";

//Components
import MainPage from "./pages/MainPage";
import Footer from "./components/Footer";
import AlertComponent from "./components/AlertComponent";

//Context
import AppProvider from "./context/AppProvider";

class App extends Component {
  constructor() {
    super();
    this.state = {
      logged: sessionStorage.getItem("logged"),
    };
    this.forceUpdateApp = this.forceUpdateApp.bind(this);
  }

  forceUpdateApp() {
    this.setState({
      logged: sessionStorage.getItem("logged"),
    });
  }

  logOut = () => {
    sessionStorage.setItem("token", "");
    sessionStorage.setItem("logged", "unlogged");
    sessionStorage.setItem("user", "");
    sessionStorage.setItem("email", "");
    this.forceUpdateApp();
  };

  componentDidMount() {
    if (!sessionStorage.setItem("token", "")) {
      sessionStorage.setItem("token", "");
      sessionStorage.setItem("logged", "logged");
      sessionStorage.setItem("user", "");
      sessionStorage.setItem("email", "");
    }
    document.addEventListener("click", () => {
      if (document.querySelector(".context-menu")) {
        document.querySelector(".context-menu").style.display = "none";
      }
    });
  }

  render() {
    return (
      <Router>
        <AppProvider>
          <div className="App">
            <MainPage
              logged={this.state.logged}
              logOut={this.logOut}
              forceUpdateApp={this.forceUpdateApp}
            />
            <Footer />
            {/* <AlertComponent /> */}
          </div>
        </AppProvider>
      </Router>
    );
  }
}

export default App;
