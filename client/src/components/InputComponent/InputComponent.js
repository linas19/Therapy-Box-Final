import React from 'react'
import './InputComponent.css'

export default function InputComponent({ type, value, placeholder, onChange }) {
    return (
        <div className="input-container">
            <input className="input" type={type} value={value} placeholder={placeholder} onChange={onChange} />
        </div>


    )
}