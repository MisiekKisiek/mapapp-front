import React from 'react';
import { NavLink } from 'react-router-dom';

const HeaderLogged = () => {
    return (
        <>
            <nav className="header-logged">
                <ul className="header-logged__wrap">
                    <li className="header-logged__item">
                        <button className="header-logged__markups-drop">
                            Markups
                        </button>
                    </li>
                    <li className="header-logged__item">
                        <div className="header-logged__logo">
                            <img src="" alt="" />
                        </div>
                    </li>
                    <li className="header-logged__item">
                        <button className="header-logged__logout">Log out</button>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default HeaderLogged;