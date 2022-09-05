import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import LinksPage from "./pages/LinksPage";
import CreatePage from "./pages/CreatePage";
import AuthPage from "./pages/AuthPage";
import RegistrationPage from "./pages/RegistrationPage";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Routes>
                <Route path="/links" element={<LinksPage/>} exact/>
                <Route path="/create" element={<CreatePage/>} exact/>
                <Route path="*" element={<Navigate to="/create" replace/>}/>
            </Routes>
        )
    }
    return (
        <Routes>
            <Route path="/" element={<AuthPage/>}/>
            <Route path="/registration" element={<RegistrationPage/>} exact/>
            <Route path="*" element={<Navigate to="/" replace/>}/>

        </Routes>
    )
}