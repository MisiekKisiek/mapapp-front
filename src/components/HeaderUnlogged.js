import React from "react";
import { NavLink } from "react-router-dom";

//images
import markerLogo from "../img/markerLogo1.png";

const HeaderUnlogged = () => {
  return (
    <>
      <header className="header-unlogged">
        <nav className="header-unlogged__wrap">
          <div className="header_unlogged__logo">
            <NavLink to="/">
              <img src={markerLogo} alt="logo" />
              {` `}
              <p>Save the world</p>
            </NavLink>
          </div>
          <NavLink to="/login" className="header-unlogged__link-login">
            Log In
          </NavLink>
          <NavLink to="/register" className="header-unlogged__link-register">
            Register
          </NavLink>
        </nav>
      </header>
    </>
  );
};

export default HeaderUnlogged;
