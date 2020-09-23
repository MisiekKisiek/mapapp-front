import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom'

//Tools
import ParticlesFunc from '../tools/particles';
import { AUTH } from '../tools/apiPrefixes';

const LoginComponent = () => {

    const [login, setlogin] = useState('');
    const [password, setpassword] = useState('');

    useEffect(() => {
        ParticlesFunc()
    }, []);

    const clearInputs = () => {
        setlogin('');
        setpassword('');
    }

    const handleInput = (e) => {
        switch (e.target.name) {
            case 'login':
                setlogin(e.target.value)
                break;
            case 'password':
                setpassword(e.target.value)
                break;
            default:
                break;
        }
    }

    const loginFetch = (e) => {
        e.preventDefault();
        fetch(`${AUTH}/login`, {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                login,
                password,
            }),
        })
            .then(e => e.json())
            .then(e => {
                clearInputs();
                sessionStorage.setItem('token', `${e.token}`)
            })
    }

    return (<>
        <div className="login">
            <canvas className='canvas-particles' id="myCanvas" width='1424' height='1200'></canvas>
            <div className="login__wrap">
                <h2 className="login__title">Login broo!</h2>
                <span className="login__alert">Hejka sklejka</span>
                <form className="login__form">
                    <div className="login__input">
                        <input id="login-input-login" name="login" type="text" value={login} onChange={handleInput} />
                        <label htmlFor="login-input-login">Login:</label>
                    </div>
                    <div className="login__input">
                        <input id="login-input-password" name="password" type="password" value={password} onChange={handleInput} />
                        <label htmlFor="login-input-password">Password:</label>
                        <span></span>
                    </div>
                    <span className="login__forgot-pass">
                        Forgot password?{` `}
                        <NavLink to="/forgotpass">
                            Click here!
                            </NavLink>
                    </span>
                    <button type="submit" onClick={loginFetch}>Log In</button>
                </form>
            </div>
        </div>
    </>);
}

export default LoginComponent;