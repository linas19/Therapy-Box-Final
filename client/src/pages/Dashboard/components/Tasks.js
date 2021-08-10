import React, { useState, useEffect } from 'react'
import axios from 'axios'
export default function Tasks() {
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
    return (
        <div>
            {tasks.length === 0 && <div>Click here to create your task list!</div>}
            {tasks.length > 0 &&
                <div><span>{tasks[0].title}</span><input type="checkbox" checked={tasks[0].is_completed} /></div>
            }
            {tasks.length > 1 &&
                <div><span>{tasks[1].title}</span><input type="checkbox" checked={tasks[1].is_completed} /></div>
            }
            {tasks.length > 2 &&
                <div>
                    <span>{tasks[2].title}</span><input type="checkbox" checked={tasks[2].is_completed} /></div>
            }
        </div>
    )
}

