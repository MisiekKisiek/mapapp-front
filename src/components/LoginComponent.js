import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

//Tools
import { ParticlesFunc } from "../tools/particles";
import { AUTH } from "../tools/apiPrefixes";

const LoginComponent = ({ forceUpdateApp }) => {
  const [login, setlogin] = useState("");
  const [password, setpassword] = useState("");
  const [invalidFormMessage, setinvalidFormMessage] = useState("");

  useEffect(() => {
    ParticlesFunc();
  }, []);

  const clearInputs = () => {
    setlogin("");
    setpassword("");
    setinvalidFormMessage("");
  };

  const handleInput = (e) => {
    switch (e.target.name) {
      case "login":
        setlogin(e.target.value);
        break;
      case "password":
        setpassword(e.target.value);
        break;
      default:
        break;
    }
  };

  const fetchLoginFunc = () => {
    fetch(`${AUTH}/login`, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        login,
        password,
      }),
    })
      .then((e) => {
        if (e.ok === true) return e.json();
        clearInputs();
        if (e.status === 401) {
          setinvalidFormMessage("Invalid login or password");
          throw Error();
        } else throw Error("We have some problems, sorry");
      })
      .then(async (e) => {
        if (e.token) {
          await sessionStorage.setItem("token", `${e.token}`);
          await sessionStorage.setItem("user", e.user);
          await sessionStorage.setItem("email", e.email);
          await sessionStorage.setItem("logged", "logged");
          forceUpdateApp();
        }
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      });
  };

  const formValidation = (fetchFunc) => {
    if (login.length > 0 && password.length > 0) {
      fetchFunc();
      setinvalidFormMessage("");
    } else {
      setinvalidFormMessage("Login and password shouldn't be empty");
    }
  };

  const loginFetch = (e) => {
    e.preventDefault();
    formValidation(fetchLoginFunc);
  };

  return (
    <>
      <div className="login">
        <canvas
          className="canvas-particles"
          id="myCanvas"
          width="1424"
          height="1200"
        ></canvas>
        <div className="login__wrap">
          <h2 className="login__title">Login broo!</h2>
          <span className="login__alert">{invalidFormMessage}</span>
          <form className="login__form">
            <div className="login__input">
              <input
                id="login-input-login"
                name="login"
                type="text"
                value={login}
                onChange={handleInput}
              />
              <label htmlFor="login-input-login">Login:</label>
            </div>
            <div className="login__input">
              <input
                id="login-input-password"
                name="password"
                type="password"
                value={password}
                onChange={handleInput}
              />
              <label htmlFor="login-input-password">Password:</label>
              <span></span>
            </div>
            <span className="login__forgot-pass">
              Forgot password?{` `}
              <NavLink to="/forgotpass">Click here!</NavLink>
            </span>
            <button type="submit" onClick={loginFetch}>
              Log In
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginComponent;
