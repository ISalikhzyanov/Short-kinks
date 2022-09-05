import React, {useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {useNavigate} from "react-router-dom";

const RegistrationPage = () => {
    const navigate = useNavigate()
    const message = useMessage();
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

    const registerHandler = async () => {
        try {
            const data = await request(`http://79.143.31.216/register?username=${form.username}&password=${form.password}`, "POST", {...form})
            message(data.username + ' успешно создан')
            console.log(data)
            navigate('/')

        } catch (e) {
        }
    }
    useEffect(()=>{
        window.M.updateTextFields()
    },[])

    return (
        <div className="row">
            <div className="col s6 offset-s3" style={{margin:'0 auto'}}>
                <h1 className="center">Slice Link</h1>
                <div className="card blue-grey darken-1" style={{width:"50%",margin:"0 auto"}}>
                    <div className="card-content white-text">
                        <span className="card-title">Регистрация</span>
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
                            className="btn"
                            onClick={registerHandler}
                            disabled={loading}
                        >
                            Регистрация
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default RegistrationPage;