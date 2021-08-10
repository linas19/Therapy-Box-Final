import React from 'react'
import './AddTaskButton.css'

export default function AddTaskButton({ onClick }) {


    return (
        <div className="add-task-container">
            <button className="add-task-button" onClick={onClick}>
                +
            </button>
        </div>
    )
}