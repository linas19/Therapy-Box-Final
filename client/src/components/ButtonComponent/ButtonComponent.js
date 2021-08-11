import React from 'react'
import './ButtonComponent.css'
import { Link } from 'react-router-dom'

export default function ButtonComponent({ text, onClick }) {
    return (
        <div className="button-container">
                <button className="button" onClick={onClick}>{text}</button>
        </div>
    )
}