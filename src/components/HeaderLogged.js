import React from 'react';
import { NavLink } from 'react-router-dom';

const HeaderLogged = ({ logOut, handleShowMarkerList }) => {

    return (
        <>
            <header className="header-logged">
                <ul className="header-logged__wrap">
                    <li className="header-logged__item">
                        <button className="header-logged__marker-drop active" onClick={(e) => {
                            e.target.classList.toggle('active')
                            handleShowMarkerList();
                        }}>
                            Markers
                        </button>
                    </li>
                    <li className="header-logged__item">
                        <div className="header-logged__logo">
                            <img src="" alt="" />
                        </div>
                    </li>
                    <li className="header-logged__item">
                        <button className="header-logged__logout" onClick={(e) => {
                            e.preventDefault();
                            logOut()
                        }}>Log out</button>
                    </li>
                </ul>
            </header>
        </>
    );
}

export default HeaderLogged;