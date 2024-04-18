import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import { Link, useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import './css/todo.css';
import HeaderNavBar from './HeaderNavBar';

function UpdateTodo () {
    const [description, setDescription] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8081/read/'+id)
        .then(res => {
            console.log(res)
            setDescription(res.data[0].Description)
            setSelectedDate(moment.utc(res.data[0].Date).local().toDate());
        })
        .catch(err => console.log(err))
    }, [])

    function handleSubmit(event){
        event.preventDefault();
        axios.put('http://localhost:8081/update/'+id, {description, selectedDate: moment(selectedDate).utc()})
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
                    <h2>Update Todo</h2>
                    <div className='mb-2'>
                        <label htmlFor=''>Todo Description</label>
                        <input type='text' placeholder={description} className='form-control' onChange={des => setDescription(des.target.value)}></input>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor=''>Date</label><br/>
                        <DatePicker className='form-control' selected={selectedDate} onChange={date => setSelectedDate(date)}
                        dateFormat="yyyy-MM-dd"
                        minDate={new Date()}
                        showYearDropdown
                        />
                    </div>
                    <Link to="/" className='btn btn-success'>BACK</Link>
                    <button className='btn btn-success ms-2'>Update</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default UpdateTodo