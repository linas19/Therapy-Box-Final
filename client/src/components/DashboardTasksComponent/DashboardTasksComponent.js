import React from 'react'
import './DashboardTasksComponent.css'

export default function DashboardTasksComponent({ text, checked }) {
    return (
        <div className="dashboard-tasks-container">
            <span className="dashboard-tasks-text">{text}</span><input className="dashboard-tasks-checkbox" type="checkbox" defaultChecked={checked}/>
        </div>


    )
}