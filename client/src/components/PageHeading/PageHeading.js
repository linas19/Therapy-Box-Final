import React from 'react'
import BackButton from '../BackButton/BackButton'
import './PageHeading.css'
export default function PageHeading({text}) {
    return (
        <div className="page-heading">
            <div className="page-title">{text}</div>
            <BackButton link="./dashboard" />
        </div>)
}