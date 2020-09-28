import React from 'react';
import { NavLink } from 'react-router-dom'

const HeaderUnlogged = () => {
    return (<>
        <header className="header-unlogged">
            <nav className="header-unlogged__wrap">
                <NavLink to="/" className='header_unlogged__logo'></NavLink>
                <NavLink to='/login' className='header-unlogged__link-login'>Log In</NavLink>
                <NavLink to='/register' className='header-unlogged__link-register'>Register</NavLink>
            </nav>
        </header>
    </>);
}

export default HeaderUnlogged;