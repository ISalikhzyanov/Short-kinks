import React from 'react';
import {useRoutes} from "./routes";
import {BrowserRouter} from "react-router-dom";
import {useAuth} from "./hooks/auth.hook";
import 'materialize-css';
import "./App.css";
import {AuthContext} from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import AuthNavbar from "./components/AuthNavbar";

const App = () => {
    const {access_token, login, userId, logout, ready} = useAuth()
    const isAuthenticated = !!access_token
    const routes = useRoutes(isAuthenticated)

    if (!ready){
        return <Loader/>
    }
    return (
        <AuthContext.Provider value={{
            access_token, login, logout, userId, isAuthenticated, ready
        }}>
            <BrowserRouter>
                {isAuthenticated ?<Navbar/> : <AuthNavbar/> }
                <div>
                    {routes}
                </div>
            </BrowserRouter>
        </AuthContext.Provider>
    );
};

export default App;