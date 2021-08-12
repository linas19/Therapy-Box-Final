import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './Task.css'

export default function Task({ task }) {
    const id = task._id
    const [title, setTitle] = useState(task.title)
    const [isChecked, setIsChecked] = useState(task.is_completed)

    useEffect(() => {

        const saveTask = () => {
            const payload = {
                title: title,
                is_completed: isChecked,
            };
            axios({
                url: '/api/todos',
                method: 'PUT',
                data: { ...payload, _id: id },
                headers: {
                    "x-access-token": localStorage.getItem('x-access-token')
                }
            })
                .then(() => {
                    console.log("Todo")
                })
                .catch(() => {
                    console.log('Todo data not sent')
                })
        }
        saveTask()
    }, [isChecked, title, id])
    const handleOnCheck = () => {
        setIsChecked(!isChecked)
    }
    return (
        <div className="new-task-container">
            <input className="task-text" type="text" value={title} onChange={(e) => setTitle(e.target.value)}></input>
            <input type="checkbox" checked={isChecked} onChange={handleOnCheck} />
        </div>
    )
}