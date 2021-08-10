import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './Task.css'

export default function Task({ task }) {
    console.log(task)
    const [title, setTitle] = useState(task.title)
    const [isChecked, setIsChecked] = useState(task.is_completed)
    const [selected, setSelected] = useState(false)
    const saveTask = () => {
        setSelected(!selected)
        const payload = {
            title,
            is_completed: isChecked,
        };
        if (task._id) {
            //Update
            console.log(payload)
            axios({
                url: '/api/todos',
                method: 'PUT',
                data: { ...payload, _id: task._id },
                headers: {
                    ["x-access-token"]: localStorage.getItem('x-access-token')
                }
            })
                .then(() => {
                    console.log("checked")
                })
                .catch(() => {
                    console.log('Todo data not sent')
                })
        } else {
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
        }
    }
    useEffect(() => saveTask(), [isChecked])
    const handleOnCheck = () => {
        setIsChecked(!isChecked)
    }

    return (
        <div>
            <div>
                {selected &&
                    <div>
                        <input className="task-text" type="text" value={title} onChange={(e) => setTitle(e.target.value)}></input>
                        <input type="checkbox" checked={isChecked} onChange={handleOnCheck} />
                        <button onClick={saveTask}>Click to save</button>
                    </div>
                }
                {!selected &&
                    <div onClick={() => setSelected(!selected)}>
                        <input className="task-text" type="text" value={title} onChange={(e) => setTitle(e.target.value)}></input>
                        <input type="checkbox" checked={isChecked} onChange={handleOnCheck} />
                    </div>
                }
            </div>
        </div>
    )
}