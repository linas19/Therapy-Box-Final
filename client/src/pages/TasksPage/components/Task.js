import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './Task.css'
import RemoveTaskButton from './RemoveTaskButton';


export default function Task({ task }) {
    console.log(task)
    const [title, setTitle] = useState(task.title)
    const [isChecked, setIsChecked] = useState(task.is_completed)
    const [deleting, setDeleting] = useState(false)
    const saveTask = () => {
        const payload = {
            title: title,
            is_completed: isChecked,
        };
        if (task._id) {
            axios({
                url: '/api/todos',
                method: 'PUT',
                data: { ...payload, _id: task._id },
                headers: {
                    ["x-access-token"]: localStorage.getItem('x-access-token')
                }
            })
                .then(() => {
                    console.log("Updated todo")
                })
                .catch(() => {
                    console.log('Todo data not sent')
                })
        } else {
            return
        }
    }
    useEffect(() => saveTask(), [isChecked, title])
    const handleOnCheck = () => {
        setIsChecked(!isChecked)
    }
    useEffect(() => fetchTasks(), [deleting])
    const fetchTasks = () => {
        axios({
            url: '/api/todos',
            method: 'GET',
            headers: {
                ["x-access-token"]: localStorage.getItem('x-access-token')
            }
        })
            .then((response) => {
                console.log('Fetched tasks:', response.data)
            })
            .catch((error) => {
                console.log(error, 'Not logged in to get tasks')
            })
    }
    // const fetchAfterDeleting
    return (
        <div className="new-task-container">
            <input className="task-text" type="text" value={title} onChange={(e) => setTitle(e.target.value)}></input>
            <input type="checkbox" checked={isChecked} onChange={handleOnCheck} />       
        </div>
    )
}