import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

//Components
import HeaderUnlogged from "../components/HeaderUnlogged";
import HeaderLogged from "../components/HeaderLogged";
import MainPageUnlogged from "../components/MainPageUnlogged";
import MainPageLogged from "../components/MainPageLogged";
import LoginComponent from "../components/LoginComponent";
import RegisterComponent from "../components/RegisterComponent";

const MainPage = ({ logIn, logOut, forceUpdateApp }) => {
  const renderHeaderComponent =
    sessionStorage.getItem("logged") === "unlogged" ? (
      <HeaderUnlogged logIn={logIn}></HeaderUnlogged>
    ) : (
      <HeaderLogged logOut={logOut}></HeaderLogged>
    );
  const renderLoggedPage =
    sessionStorage.getItem("logged") === "unlogged" ? (
      <MainPageUnlogged></MainPageUnlogged>
    ) : (
      <MainPageLogged
        logOut={logOut}
        forceUpdateApp={forceUpdateApp}
      ></MainPageLogged>
    );
  const renderLoginComponent =
    sessionStorage.getItem("logged") === "unlogged" ? (
      <LoginComponent forceUpdateApp={forceUpdateApp}></LoginComponent>
    ) : (
      <Redirect to="/"></Redirect>
    );
  const renderRegisterComponent =
    sessionStorage.getItem("logged") === "unlogged" ? (
      <RegisterComponent></RegisterComponent>
    ) : (
      <Redirect to="/"></Redirect>
    );
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
      </div>
    </>
  );
};

export default MainPage;
