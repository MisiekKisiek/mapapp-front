import React from 'react';
import { NavLink } from 'react-router-dom'

import '../scss/_Header.scss'

const HeaderUnlogged = () => {
    return (<>
        <nav className="header-unlogged">
            <div className="header-unlogged__wrap">
                <NavLink to="/" className='header_unlogged__logo'></NavLink>
                <NavLink to='/login' className='header-unlogged__link-login'>Log In</NavLink>
                <NavLink to='/register' className='header-unlogged__link-register'>Register</NavLink>
            </div>
        </nav>
    </>);
}

export default HeaderUnlogged;