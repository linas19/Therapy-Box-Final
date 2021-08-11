

import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react'
import AddTaskButton from './components/AddTaskButton';
import Task from './components/Task';
import './TasksPage.css'
import RemoveTaskButton from './components/RemoveTaskButton';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import BackButton from '../../components/BackButton/BackButton';
import PageHeading from '../../components/PageHeading/PageHeading';

const taskState = {
    title: '',
    is_completed: false,
}

export default function TasksPage() {
    const [deleting, setDeleting] = useState(false)

    const [tasks, setTasks] = useState([])
    useEffect(() => fetchTasks(), [])
    const fetchTasks = () => {
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
        const payload = {
            title: '',
            is_completed: false,
        };
        axios({
            url: '/api/todos',
            method: 'POST',
            data: payload,
            headers: {
                ["x-access-token"]: localStorage.getItem('x-access-token')
            }
        })
            .then(() => {
                console.log('Posted todo')
            })
            .catch(() => {
                console.log('Todo data not sent')
            })
        fetchTasks()
    }
    const deleteTask = (taskId) => {
        axios({
            url: '/api/todos',
            method: 'DELETE',
            data: { _id: taskId },
            headers: {
                ["x-access-token"]: localStorage.getItem('x-access-token')
            }
        })
            .then(() => {
                console.log("Deleted todo")
                setDeleting(!deleting)
            })
            .catch(() => {
                console.log('Todo data not sent')
            })
        fetchTasks()
    }
    return (
        <div className="tasks-page-container">
            <PageHeading text="Tasks"/>
            <div className="tasks-task-container">
                {tasks && tasks.map((task) => <div key={task._id} className="single-task"><Task task={task} /> <span><RemoveTaskButton onClick={() => deleteTask(task._id)} /></span></div>)}
                <div className="task-page-add-btn">
                    <AddTaskButton onClick={createTask} />
                </div>
            </div>
        </div>
    )
}

