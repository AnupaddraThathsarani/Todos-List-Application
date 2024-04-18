import axios from 'axios';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css'
import { useNavigate } from 'react-router-dom';
import './css/todo.css';
import HeaderNavBar from './HeaderNavBar';

function CreateTodo () {
    const [description, setDescription] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);

    const navigate = useNavigate();

    function handleSubmit(event){
        event.preventDefault();
        axios.post('http://localhost:8081/create', {description, selectedDate: moment(selectedDate).utc() })
        .then(res => {
            console.log(res);
            navigate('/')
        }).catch(err => console.log(err));
    }

  return (
    <div>
        <HeaderNavBar />
    
        <div className='todo-container'>
            <div className='w-50 todo-content'>
                <form onSubmit={handleSubmit}>
                    <h2>Add Todo</h2>
                    <div className='mb-2'>
                        <label htmlFor=''>Todo Description</label>
                        <input type='text' placeholder='Type the description for todo' className='form-control' onChange={des => setDescription(des.target.value)}></input>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor=''>Date</label><br/>
                        <DatePicker className='form-control' selected={selectedDate} onChange={date => setSelectedDate(date)}
                        dateFormat="yyyy-MM-dd"
                        minDate={new Date()}
                        showYearDropdown
                        />
                    </div>
                    <button className='btn btn-success'>Submit</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default CreateTodo