import React from 'react'
import './AddPictureComponent.css'

export default function AddPictureComponent({ text }) {
    return (
        <div className="add-container">
            <button className="add-button">{text}</button>
        </div>
    )
}