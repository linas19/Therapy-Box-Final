import React from 'react'
import { Link } from 'react-router-dom'
import './CardContainer.css'

export default function CardContainer({ clickable, link, title, children }) {
    return (
        <div className="card">
            {
                clickable &&
                <div className="container">
                    <Link to={link}>
                        <div className="container-title">{title}</div>
                        <div className="container-content">{children}</div>
                    </Link>
                </div>
            }
            {
                !clickable &&
                <div className="container-not-clickable">
                        <div className="container-title">{title}</div>
                        <div className="container-content">{children}</div>
                </div>
            }
        </div>


    )
}