import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";

//Styles
import "./scss/Main.scss";

//Components
import MainPage from "./pages/MainPage";
import Footer from "./components/Footer";
// import AlertComponent from "./components/AlertComponent";

//Context
import AppLoggedProvider from "./context/AppLoggedProvider";
import AppUnloggedProvider from "./context/AppUnloggedProvider";

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
    if (sessionStorage.getItem("token") !== "") {
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
        <AppLoggedProvider>
          <AppUnloggedProvider>
          <div className="App">
            <MainPage
              logged={this.state.logged}
              logOut={this.logOut}
              forceUpdateApp={this.forceUpdateApp}
            />
            <Footer />
            {/* <AlertComponent /> */}
          </div>
          </AppUnloggedProvider>
        </AppLoggedProvider>
      </Router>
    );
  }
}

export default App;
