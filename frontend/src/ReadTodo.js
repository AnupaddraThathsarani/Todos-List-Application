import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import moment from 'moment';
import './css/todo.css';
import HeaderNavBar from './HeaderNavBar';

function ReadTodo () {
    const {id} = useParams();
    const [todo, setTodo] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/read/'+id)
        .then(res => {
            const todoData = res.data[0];
            todoData.Date = moment.utc(todoData.Date).local().format('YYYY-MM-DD');
            setTodo(todoData);
        })
        .catch(err => console.log(err))
    }, [])

  return (
    <div>
        <HeaderNavBar />
        <div className='todo-container'>
            <div className='w-50 todo-content'>
                <form>
                    <h2>Todo Details</h2>
                    <div className='mb-2'>
                        <label htmlFor=''>Todo Description</label>
                        <input type='text' value={todo.Description} className='form-control'></input>
                        <label htmlFor=''>Todo Date</label>
                        <input type='text' value={todo.Date} className='form-control'></input>
                    </div>
                    <Link to="/" className='btn btn-success'>BACK</Link>
                    <Link to={`/update/${todo.todo_id}`} className='btn btn-success ms-2'>UPDATE</Link>
                </form>
            </div>
        </div>
    </div>
  )
}

export default ReadTodo