import React from 'react'
import './ButtonComponent.css'

export default function ButtonComponent({ text, onClick }) {
    return (
        <div className="button-container">
                <button className="button" onClick={onClick}>{text}</button>
        </div>
    )
}