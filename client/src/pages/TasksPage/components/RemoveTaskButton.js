import React from 'react'
import './RemoveTaskButton.css'

export default function RemoveTaskButton({onClick}) {
    return (
        <div className="remove-task-container">
            <button className="remove-task-button" onClick={onClick}>
                Remove task
            </button>
        </div>
    )
}