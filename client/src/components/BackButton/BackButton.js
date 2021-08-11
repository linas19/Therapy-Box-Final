import React from 'react'
import './BackButton.css'
import { Link } from 'react-router-dom'

export default function BackButton({ link }) {
    return (
                <Link className="back-button-link" to={link}>To Dashboard</Link>
    )
}