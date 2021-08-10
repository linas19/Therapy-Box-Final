

import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react'
import Tasks from '../Dashboard/components/Tasks';
import AddTaskButton from './components/AddTaskButton';
import Task from './components/Task';
import './TasksPage.css'

const todoState = {
    title: 'first',
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
        <div>
            {tasks && tasks.map((task)=><Task task={task}/>)}
            <AddTaskButton onClick={createTask}/>
        </div>
    )
}

