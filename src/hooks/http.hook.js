import {useCallback, useState} from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true)
        try {
            if(body){
                body = JSON.stringify(body)
                headers['accept'] = 'application/json'
                headers['Content-Type'] = 'application/json/x-www-form-urlencoded'

            }
            const response = await fetch(url, {method, body, headers})
            const data = await response.json()
            console.log("Data", data)
            if (!response.ok) {
                throw new Error(data.detail|| 'Что-то пошло не так')
            }
            setLoading(false)
            return data
        } catch (e) {
            setLoading(false)
            setError(e.message)
            throw e
        }
    }, [])

    const clearError = useCallback(()=>{setError(null)},[])

    return {loading, request, error, clearError}
}