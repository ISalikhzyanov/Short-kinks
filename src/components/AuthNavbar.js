import React from 'react';
import {NavLink} from "react-router-dom";

const AuthNavbar = () => {
    return (
        <nav>
            <div className="nav-wrapper blue-grey lighten-1" style={{padding: '0 2rem'}}>
                <span className="brand-logo">Сокращение ссылок</span>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/">Вход</NavLink></li>
                    <li><NavLink to="/registration">Регистрация</NavLink></li>

                </ul>
            </div>
        </nav>
    );
};

export default AuthNavbar;