import {useCallback, useEffect, useState} from "react";

const storageName = 'userData'

export const useAuth = () => {
    const [access_token, setAccess_token] = useState(null)
    const [userId, setUserUd] = useState(null)
    const [ready, setReady] = useState(false)

    const login = useCallback((token, id) => {
        setAccess_token(token)


        setUserUd(id)

        localStorage.setItem(storageName, JSON.stringify({
            userId: id, access_token:token
        }))
    }, [])

    const logout = useCallback(() => {
        setAccess_token(null)
        setUserUd(null)
        localStorage.removeItem(storageName)
        localStorage.removeItem('value')
        localStorage.removeItem('offset')
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))
        if (data && data.access_token) {
            login(data.access_token, data.userId)
        }
        setReady(true)
    },[login])

    return {login, logout, access_token, userId,ready}
}