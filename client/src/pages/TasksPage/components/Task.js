import React, { useState } from 'react'

export default function Task({task}) {
    console.log(task)
    const [title, setTitle] = useState('')

    return (
        <div>
        <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)}></input>
        <input type="checkbox" checked={task.is_completed}/>
        <span>X</span>
        </div>

        
    )
}