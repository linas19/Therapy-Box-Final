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
    const [selectedFile, setSelectedFile] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState('')
    const [state, setState] = useState(userState);
    const [imageState, setImageState] = useState({})
    const resetUserInputs = () => {
        setState(userState)
    }
    const handleFileInput = async (e) => {
        console.log(e.target.files)
        setImageState({file: URL.createObjectURL(e.target.files[0])})
        setSelectedFile(e.target.files[0]);
        await handleUpload(selectedFile)
    }

    const handleUpload = (file) => {
        const formData = new FormData();
        formData.append('image', file);
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
                console.log('Sign up successfully')
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
                        <InputComponent type="password" value={confirmPassword} placeholder="Confirm password" onChange={e => setConfirmPassword(e.target.value)} />
                    </div>
                </div>
                {confirmPassword !== state.password && <div>Please confirm password</div>}
            </div>
            <AddPictureComponent text="Add picture" onChange={handleFileInput}/>
            {selectedFile !== null && <button onClick={() => handleUpload(selectedFile)}>Upload image</button>}
            <ButtonComponent text="Register" onClick={submit} />
            {signupSuccess && <div>Signed up Successfully</div>}
            <img src={imageState.file} />
            {/* {!signupSuccess && <div>Signed up Incomplete.</div>} */}
        </div>
    )
}