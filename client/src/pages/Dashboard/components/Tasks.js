import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DashboardTasksComponent from '../../../components/DashboardTasksComponent/DashboardTasksComponent'
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
                <div>
                    {tasks[0] &&
                        <DashboardTasksComponent text={tasks[0].title} checked={tasks[0].is_completed} />

                    }
                    {tasks[1] &&
                        <DashboardTasksComponent text={tasks[1].title} checked={tasks[1].is_completed} />

                    }
                    {tasks[2] &&
                        <DashboardTasksComponent text={tasks[2].title} checked={tasks[2].is_completed} />

                    }
                </div>
            }
        </div>
    )
}

