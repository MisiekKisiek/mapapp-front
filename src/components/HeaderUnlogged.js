import React from 'react';
import { NavLink } from 'react-router-dom'

const HeaderUnlogged = ({ logIn }) => {
    return (<>
        <nav className="header-unlogged">
            <div className="header-unlogged__wrap">
                <NavLink to="/" className='header_unlogged__logo'></NavLink>
                <NavLink to='/login' className='header-unlogged__link-login' onClick={(e) => { logIn() }}>Log In</NavLink>
                <NavLink to='/register' className='header-unlogged__link-register'>Register</NavLink>
            </div>
        </nav>
    </>);
}

export default HeaderUnlogged;