

import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react'
import Tasks from '../Dashboard/components/Tasks';
import AddTaskButton from './components/AddTaskButton';
import Task from './components/Task';
import './TasksPage.css'

const todoState = {
    title: '',
    is_completed: false,
}

export default function TasksPage() {
    const [tasks, setTasks] = useState([])
    useEffect(() => fetchTodos(), [])
    const fetchTodos = () => {
        axios({
            url: '/api/todos',
            method: 'GET',
            headers: {
                ["x-access-token"]: localStorage.getItem('x-access-token')
            }
        })
            .then((response) => {
                console.log('response:', response.data)
                setTasks(response.data)
            })
            .catch((error) => {
                console.log(error, 'Not logged in to get tasks')
            })
    }
    const createTask = () => {
        setTasks(tasks => [...tasks, todoState])
        console.log(tasks)
    }
    return (
        <div className="tasks-page-container">
            <div className="tasks-page-title">Tasks</div>
            <div className="tasks-task-container">
                {tasks && tasks.map((task) => <Task task={task} />)}
                <div className="task-page-add-btn">
                    <AddTaskButton onClick={createTask} />
                </div>
            </div>

        </div>
    )
}

