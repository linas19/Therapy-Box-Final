import React, { useState } from 'react';
import InputComponent from '../../../../components/InputComponent/InputComponent';
import ButtonComponent from '../../../../components/ButtonComponent/ButtonComponent';
import './Signup.css'
import AddPictureComponent from '../../../../components/AddPictureComponent/AddPictureComponent';

const axios = require('axios');
const userState = {
    user: '',
    email: '',
    password: '',
}

export default function Signup() {
    const [confirmPassword, setConfirmPassword] = useState('')
    const [state, setState] = useState(userState);
    const resetUserInputs = () => {
        setState(userState)
    }
    const [signupSuccess, setsignupSuccess] = useState()
    const submit = (e) => {
        e.preventDefault();
        const payload = {
            username: state.username,
            email: state.email,
            password: state.password,
        };
        axios({
            url: 'api/auth/signup',
            method: 'POST',
            data: payload
        })
            .then(() => {
                resetUserInputs()
                setsignupSuccess(true)
            })
            .catch(() => {
                setsignupSuccess(false)
                console.log('Sign up failed')
            })
    }
    return (
        <div className="signup-container">
            <div className="signup-input">
                <div className="signup-text-email">
                    <div className="signup-left">
                        <div className="signup-top">
                            <InputComponent type="text" value={state.username} placeholder="Username" onChange={e => setState({ ...state, username: e.target.value })} />
                        </div>
                        <InputComponent type="password" value={state.password} placeholder="Password" onChange={e => setState({ ...state, password: e.target.value })} />
                    </div>
                    <div className="signup-right">
                        <div className="signup-top">
                            <InputComponent type="email" value={state.email} placeholder="Email" onChange={e => setState({ ...state, email: e.target.value })} />
                        </div>
                        {/* <InputComponent type="password" value={confirmPassword} placeholder="Confirm password" onChange={e => setState({ ...confirmPassword, confirmPassword: e.target.value }} /> */}
                    </div>
                </div>
            </div>
            <AddPictureComponent text="Add picture" />
            <ButtonComponent text="Register" onClick={submit} />
        </div>
    )
}