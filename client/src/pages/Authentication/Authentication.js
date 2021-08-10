import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Signup from './components/Signup/Signup'
import Signin from './components/Signin/Signin'
import './Authentication.css'

export default function Authentication() {
    const [signin, setSignin] = useState(true)
    return (
        <div className="authentication-container">
            <div className="title">
                Dev Challenge
            </div>
            {
                signin && (
                    <div className="form-container">
                        <Signin />
                        <div className="link-to-signup">
                            <div className="link-to-signup-text">New to the challenge? </div>
                            <button className="link-to-signup-button" onClick={() => { setSignin(false) }}>Sign up</button>
                        </div>
                    </div>
                )
            }
            {
                !signin && (
                    <div className="form-container">
                        <Signup />
                        <div className="link-to-signup">
                            <div className="link-to-signup-text">Already have an account? </div>
                            <button className="link-to-signup-button" onClick={() => { setSignin(true) }}>Sign in</button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}