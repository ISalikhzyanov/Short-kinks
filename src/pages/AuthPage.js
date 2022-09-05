import React, {useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, request, error,clearError} = useHttp()
    const [form, setForm] = useState({
        username: "",
        password: ""
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message,clearError])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }


    useEffect(()=>{
        window.M.updateTextFields()
    },[])
    const loginHandler = async () => {
       const response = await fetch('http://79.143.31.216/login', {
           method: 'POST',
           headers: {
               'accept': 'application/json'
           },
           body: new URLSearchParams({
               'grant_type': '',
               'username': `${form.username}`,
               'password': `${form.password}`,
               'scope': '',
               'client_id': '',
               'client_secret': ''
           })
       });
       const data = await response.json()
        console.log(data)
       auth.login(data.access_token, form.username)
        message(data.detail)
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3" style={{margin:'0 auto'}}>
                <h1 className="center">Slice Link</h1>
                <div className="card blue-grey darken-1" style={{width:"50%",margin:"0 auto"}}>
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        <div>
                            <div className="input-field">
                                <input
                                    placeholder="Введите email"
                                    id="username"
                                    type="text"
                                    name="username"
                                    value={form.username}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="username">Username</label>
                            </div>
                            <div className="input-field">
                                <input
                                    placeholder="Введите пароль"
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn yellow darken-4"
                            style={{marginRight: 10}}
                            disabled={loading}
                            onClick={loginHandler}
                        >
                            Войти
                        </button>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default AuthPage;