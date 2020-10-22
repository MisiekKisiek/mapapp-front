import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";

//Styles
import "./scss/Main.scss";

//Components
import MainPage from "./pages/MainPage";
import Footer from "./components/Footer";

//Context
import AppLoggedProvider from "./context/AppLoggedProvider";
import AppUnloggedProvider from "./context/AppUnloggedProvider";

const App = () => {
  useEffect(() => {
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
  }, [])
  return ( 
    <Router>
    <AppLoggedProvider>
      <AppUnloggedProvider>
      <div className="App">
        <MainPage/>
        <Footer />
      </div>
      </AppUnloggedProvider>
    </AppLoggedProvider>
  </Router>
   );
}
 
export default App;