import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";

const CreatePage = () => {
    const navigate = useNavigate()
    const auth = useContext(AuthContext)
    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const [link, setLink] = useState('')
    const pressHandler = async () => {
        try {
            const response = await fetch(`http://79.143.31.216/squeeze?link=${link}`, {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Authorization': `Bearer ${auth.access_token}`,
                    'Content-Type': 'application/x-www-form-urlencoded'

                }

            })
            const data = await response.json()
            console.log(data)
            navigate(`/links`)
        } catch (e) {
        }
    }


    return (
        <div className="row" >
            <div className="col s8 offset-s2" style={{paddingTop: "2rem", margin:"0 auto"}}>
                <div className="input-field" style={{width:"50%",margin:"0 auto"}}>
                    <input
                        placeholder="Вставтье ссылку"
                        id="link"
                        type="text"
                        value={link}
                        onChange={e => setLink(e.target.value)}
                    />
                    <label htmlFor="link">Ссылка</label>
                    <button
                    className="btn"
                        onClick={pressHandler}
                    >
                        Сократить
                    </button>
                </div>

            </div>
        </div>
    );
};

export default CreatePage;