import React, { useState } from 'react'

export default function Tasks() {
    const [tasks, setTasks] = useState()

    return (
        <div>
            {!tasks && <div>Click here to create your task list!</div>}
        </div>
    )
}

