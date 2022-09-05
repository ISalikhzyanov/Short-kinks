import {createContext} from "react";

function noop(){}

export const AuthContext = createContext({
    access_token: null,
    userId: null,
    login:noop,
    logout:noop,
    isAuthenticated:false
})