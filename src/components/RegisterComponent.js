import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

//Tools
import { ParticlesFunc } from "../tools/particles";
import { AUTH } from "../tools/apiPrefixes";

const RegisterComponent = () => {
  const [login, setlogin] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  useEffect(() => {
    ParticlesFunc();
    return () => {};
  }, []);

  const clearInputs = () => {
    setlogin("");
    setemail("");
    setpassword("");
  };

  const registerFetch = async (e) => {
    e.preventDefault();
    await fetch(`${AUTH}/register`, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        login,
        email,
        password,
      }),
    })
      .then((e) => e.json())
      .then((e) => {
        clearInputs();
        alert(e);
      });
  };

  const handleInput = (e) => {
    switch (e.target.name) {
      case "login":
        setlogin(e.target.value);
        break;
      case "email":
        setemail(e.target.value);
        break;
      case "password":
        setpassword(e.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="register">
        <canvas
          className="canvas-particles"
          id="myCanvas"
          width="1424"
          height="1200"
        ></canvas>
        <div className="register__wrap">
          <h2 className="register__title">Register broo!</h2>
          <span className="register__alert">Hejka sklejka</span>
          <form className="register__form">
            <div className="register__input">
              <input
                id="register-input-login"
                name="login"
                type="text"
                value={login}
                onChange={handleInput}
              />
              <label htmlFor="register-input-login">Login:</label>
            </div>
            <div className="register__input">
              <input
                id="register-input-email"
                name="email"
                type="email"
                value={email}
                onChange={handleInput}
              />
              <label htmlFor="register-input-email">E-mail:</label>
            </div>
            <div className="register__input">
              <input
                id="register-input-password"
                name="password"
                type="password"
                value={password}
                onChange={handleInput}
              />
              <label htmlFor="register-input-password">Password:</label>
            </div>
            <span className="register__login-redirect">
              You already have an account?{` `}
              <NavLink to="/login">Login here!</NavLink>
            </span>
            <button type="submit" onClick={registerFetch}>
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterComponent;
