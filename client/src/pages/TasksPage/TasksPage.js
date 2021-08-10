

import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react'
import Tasks from '../Dashboard/components/Tasks';
import AddTaskButton from './components/AddTaskButton';
import Task from './components/Task';
import './TasksPage.css'

const todoList = [{
    title: 'first',
    is_completed: false,
}, {
    title: 'second',
    is_completed: true,}
]

export default function TasksPage() {
    const [tasks, setTasks] = useState([todoList])
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
        setTasks(tasks => [...tasks, todoList])
        console.log(tasks)
    }
    // const updateTodo = (index) => {
    //     // e.preventDefault()
    //     console.log('index')

    //     console.log(index)
    // }
    return (
        <div>
            {/* <h1>Tasks</h1>
            {tasks.length !== 0 && tasks.map((task, index) => (
                <div className="tasks-input-container" key={task._id}>
                    <div>
                        <input value={task.title} type="text" placeholder="enter task"></input>
                    </div>
                    {task.is_completed && <div className="tasks-input-checkbox-true" onClick={updateTodo(index)}>[+]</div>}
                    {!task.is_completed && <div className="tasks-input-checkbox-false" onClick={updateTodo(index)}>[-]</div>}
                </div>
            ))
            } */}
            {/* <button onClick={createTask}>+</button> */}
            {todoList.map((task)=><Task task={task}/>)}
            <AddTaskButton onClick={createTask}/>
        </div>
    )
}

