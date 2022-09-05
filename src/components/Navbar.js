import React, {useContext} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

const Navbar = () => {
    const navigate = useNavigate()
    const auth = useContext(AuthContext)
    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        navigate('/')
    }
    return (
        <nav>
            <div className="nav-wrapper blue-grey lighten-1" style={{padding: '0 2rem'}}>
                <span className="brand-logo">Сокращение ссылок</span>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/create">Создать</NavLink></li>
                    <li><NavLink to="/links">Список ссылок</NavLink></li>
                    <li><a href="/" onClick={logoutHandler}>Выйти</a></li>

                </ul>
            </div>
        </nav>

    );
};

export default Navbar;