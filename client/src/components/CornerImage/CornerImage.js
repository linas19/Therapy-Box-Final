import React from 'react'
import './CornerImage.css'

export default function CornerImage({ text }) {
    return (
        <div className="corner-image-container">
            <button className="corner-image">{text}</button>
        </div>
    )
}