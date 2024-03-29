import React,{useContext} from "react";
import { Switch, Route, Redirect } from "react-router-dom";

//Components
import HeaderUnlogged from "../components/HeaderUnlogged";
import HeaderLogged from "../components/HeaderLogged";
import MainPageUnlogged from "../components/MainPageUnlogged";
import MainPageLogged from "../components/MainPageLogged";
import LoginComponent from "../components/LoginComponent";
import RegisterComponent from "../components/RegisterComponent";
import AlertComponent from "../components/AlertComponent";

//Context
import AppLoggedContext from "../context/AppLoggedContext";

const MainPage = () => {

  const {alertComponentVisibility} = useContext(AppLoggedContext);

  const renderHeaderComponent =
    sessionStorage.getItem("logged") === "logged" ? (<HeaderLogged/>) : (<HeaderUnlogged/>);
  const renderLoggedPage =
    sessionStorage.getItem("logged") === "logged" ? (<MainPageLogged/>) : (<MainPageUnlogged/>)  ;
  const renderLoginComponent =
    (sessionStorage.getItem("logged") === "unlogged" || sessionStorage.getItem("logged") === null) ? (<LoginComponent/>) : (<Redirect to="/"/>) ;
  const renderRegisterComponent =
    (sessionStorage.getItem("logged") === "unlogged" || sessionStorage.getItem("logged") === null) ? (<RegisterComponent/>) : (<Redirect to="/"/>);
  const renderAlertComponent = alertComponentVisibility.visibility?<AlertComponent/>:null;
  return (
    <>
      <div className="main-page">
        {renderHeaderComponent}
        <Switch>
          <Route exact path="/">
            {renderLoggedPage}
          </Route>
          <Route path="/login">{renderLoginComponent}</Route>
          <Route path="/register">{renderRegisterComponent}</Route>
          <Redirect to="/" />
        </Switch>
        {renderAlertComponent}
      </div>
    </>
  );
};

export default MainPage;
