import React, { useContext } from "react";

//Context
import AppLoggedContext from "../context/AppLoggedContext";

//images
import markerLogo from "../img/markerLogo1.png";

const HeaderLogged = () => {

  //Context
  const {
    handleLogOut,
    handleShowMarkerList,
    showMarkerList,
    handleActiveHelper,
    handleSetCenter,
    handleAlertComponentVisibility,
  } = useContext(AppLoggedContext);

  const logOutTriggerFunc = (e) => {
    e.preventDefault();
    handleAlertComponentVisibility(handleLogOut,"Do You want to log out?");
  };

  const activeHelperFunc = (e) => {
    e.preventDefault();
    handleActiveHelper();
  };

  const logoFunc = () => {
    handleSetCenter(52.27407266590533, 20.981537103652958, 20);
  };

  return (
    <>
      <header className="header-logged">
        <ul className="header-logged__wrap">
          <li className="header-logged__item">
            <button
              className={`header-logged__marker-drop ${
                showMarkerList ? "header-logged__marker-drop--active" : ""
              }`}
              onClick={handleShowMarkerList}
            >
              Markers
            </button>
          </li>
          <li className="header-logged__item">
            <div className="header-logged__logo" onClick={logoFunc}>
              <img src={markerLogo} alt="logo" />
              {` `}
              <p>Save the world</p>
            </div>
          </li>
          <li className="header-logged__item">
            <button className="header-logged_help" onClick={activeHelperFunc}>
              ?
            </button>
          </li>
          <li className="header-logged__item">
            <button className="header-logged__logout" onClick={logOutTriggerFunc}>
              Log out
            </button>
          </li>
        </ul>
      </header>
    </>
  );
};

export default HeaderLogged;
