

import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react'
import './TasksPage.css'

const taskState = {
    title: 'a',
    is_completed: false,
}

export default function TasksPage() {
    const [tasks, setTasks] = useState([taskState])
    // const [state, setState] = useState(todoState)
    // const [todo, setTodo] = useState([])
    // const resetUserInputs = () => {
    //     setState(todoState)
    // }
    // useEffect(() => fetchTodos(), [])
    // const fetchTodos = () => {
    //     axios({
    //         url: '/api/todos',
    //         method: 'GET',
    //         headers: {
    //             ["x-access-token"]: localStorage.getItem('x-access-token')
    //         }
    //     })
    //         .then((response) => {
    //             // console.log('response:', response.data)
    //             setTodo(response.data)
    //         })
    //         .catch((error) => {
    //             console.log(error, 'Not logged in to get tickets')
    //         })
    // }
    // const submit = (e) => {
    //     e.preventDefault();
    //     const payload = {
    //         title: state.title,
    //         is_completed: false,
    //     };
    //     // console.log(payload)
    //     axios({
    //         url: '/api/todos',
    //         method: 'POST',
    //         data: payload,
    //         headers: {
    //             ["x-access-token"]: localStorage.getItem('x-access-token')
    //         }
    //     })
    //         .then(() => {
    //             resetUserInputs();
    //             fetchTodos();
    //         })
    //         .catch(() => {
    //             console.log('Todo data not sent')
    //         })
    // }
    // const log = () => {
    //     console.log(todo[0]._id)
    // }
    // const handleOnChange = useCallback(
    //     (e) => {
    //         console.log('target',e.target.id)
    //       const index = e.target.id
    //       let items = [...todo];
    //       items[index].is_completed = !items[index].is_completed;
    //       const id = items[index]._id
    //       console.log(items[index].is_completed)
    //       setTodo(items);
    //       e.preventDefault();
    //       const payload = {
    //           _id: id,
    //           is_completed: items[index].is_completed,
    //       };
    //       console.log(payload)
    //       axios({
    //           url: '/api/todos',
    //           method: 'PUT',
    //           data: payload,
    //           headers: {
    //               ["x-access-token"]: localStorage.getItem('x-access-token')
    //           }
    //       })
    //           .then(() => {
    //               console.log("checked")
    //               resetUserInputs();
    //               fetchTodos();
    //           })
    //           .catch(() => {
    //               console.log('Todo data not sent')
    //           })
    //     }, [todo]
    //   );
    const createTask = () => {
        setTasks(tasks => [...tasks, taskState])
        console.log(tasks)
    }
    const updateTodo = (index) => {
        // e.preventDefault()
        console.log('index')

        console.log(index)
    }
    return (
        <div>
            <h1>Tasks</h1>
            {/* <form>
                <div>
                    {todo.length !== 0 &&
                        todo.map((todo, index) =>
                            <div key={todo._id}>
                                <div>{todo.title}</div>
                                    <input
                                        id={index}
                                        name="isGoing"
                                        type="checkbox"
                                        checked={todo.is_completed}
                                        onChange={handleOnChange} /> 
                            </div>
                        )
                    }
                    <TextField id="standard-basic" label="Enter a task" value={state.ticketName}
                        onChange={e => setState({ ...state, title: e.target.value })} />
                    <button onClick={submit}>Create new ticket</button>
                    <button onClick={log}>Log</button>
                </div>
            </form> */}
            {tasks.length !== 0 && tasks.map((task, index) => (
                <div className="tasks-input-container" key={task._id}>
                    <div>
                        <input value={task.title} type="text" placeholder="enter task"></input>
                    </div>
                    {task.is_completed && <div className="tasks-input-checkbox-true" onClick={updateTodo(index)}>[+]</div>}
                    {!task.is_completed && <div className="tasks-input-checkbox-false" onClick={updateTodo(index)}>[-]</div>}
                </div>
            ))
            }
            <button onClick={createTask}>+</button>
        </div>
    )
}

