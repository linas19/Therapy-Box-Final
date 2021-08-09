import React, { useState } from 'react';
import ButtonComponent from '../../../../components/ButtonComponent/ButtonComponent';
import InputComponent from '../../../../components/InputComponent/InputComponent';
import './Signin.css'

const axios = require('axios');
const loginStateFull = {
    user: '',
    password: '',
}
export default function Signin() {
    const [loginState, setLoginState] = useState(loginStateFull)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    // const resetLoginInputs = () => {
    //     setLoginState(loginStateFull)
    // }
    const submitLogin = (e) => {
        e.preventDefault();
        const payload = {
            username: loginState.username,
            password: loginState.password,
        };
        axios({
            url: 'api/auth/signin',
            method: 'POST',
            data: payload,
        })
            .then((response) => {
                localStorage.setItem('x-access-token', response.data.accessToken)
                setIsLoggedIn(true)
                // resetLoginInputs()
                window.location.reload(true);
            })
            .catch((error) => {
                console.log(error, 'Not logged in')
                setIsLoggedIn(false)
            })
    }
    return (
        <div className="signin-container">
            <div className="signin-input">
                <div className="signin-username">
                    <InputComponent type="text" value={loginState.username || ''} placeholder="Username" onChange={e => setLoginState({ ...loginState, username: e.target.value })} />
                </div>
                <div className="signin-password">
                    <InputComponent type="password" value={loginState.password || ''} placeholder='Password' onChange={e => setLoginState({ ...loginState, password: e.target.value })} />
                </div>
            </div>
            <ButtonComponent text="Login" onClick={submitLogin} />
        </div>
    )
}