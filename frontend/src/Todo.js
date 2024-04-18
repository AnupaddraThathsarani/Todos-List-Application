import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrash, faCircleCheck, faPenClip } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment'; 
import './css/todo.css';
import HeaderNavBar from './HeaderNavBar';

function Todo() {
    const [todo, settodo] = useState([]);
    const [activeTab, setActiveTab] = useState();

    useEffect(() => {
        setActiveTab('all');
        axios.get('http://localhost:8081/')
        .then(res =>{
            const formattedData = res.data.map(item => ({
                ...item,
                Date: moment.utc(item.Date).local().format('YYYY-MM-DD')
            }));
            settodo(formattedData);
        })
        .catch(err => console.log(err));

    }, [])

    const handleDelete =  async (id) =>{
        try{
            await axios.delete('http://localhost:8081/todo/'+id)
            window.location.reload();
        }catch(err){
            console.log(err);
        }       
    }

    const handleCompleted = async (id, checked) => {
        try {
            await axios.put(`http://localhost:8081/completed/`+id);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    }

    function openAll (){
        setActiveTab('all');
        axios.get('http://localhost:8081/')
        .then(res =>{
            const formattedData = res.data.map(item => ({
                ...item,
                Date: moment.utc(item.Date).local().format('YYYY-MM-DD')
            }));
            settodo(formattedData);
        })
        .catch(err => console.log(err)); 
    }

    function openPending (){
        setActiveTab('pending');
        axios.get('http://localhost:8081/pending')
        .then(res =>{
            const formattedData = res.data.map(item => ({
                ...item,
                Date: moment.utc(item.Date).local().format('YYYY-MM-DD')
            }));
            settodo(formattedData);
        })
        .catch(err => console.log(err)); 
    }

    function openCompleted (){
        setActiveTab('completed');
        axios.get('http://localhost:8081/completed')
        .then(res =>{
            const formattedData = res.data.map(item => ({
                ...item,
                Date: moment.utc(item.Date).local().format('YYYY-MM-DD')
            }));
            settodo(formattedData);
        })
        .catch(err => console.log(err)); 
    }

  return (
    <div>
        <HeaderNavBar />
        <div className='todo-container'>
            <div className='w-50 todo-content'>
                <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <button className={`nav-link ${activeTab === 'all' ? 'active' : ''}`} onClick={() => openAll()}>All Todos</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${activeTab === 'pending' ? 'active' : ''}`} onClick={() => openPending()}>Pending Todos</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${activeTab === 'completed' ? 'active' : ''}`} onClick={() => openCompleted()}>Completed Todos</button>
                        </li>
                    </ul>

                {activeTab === 'all' && (
                    <div id="all">
                        <table class="table table-light">
                            <thead>
                                <tr>
                                    <th scope="col">Todo</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Completed</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    todo.map((data, i) => (
                                        <tr key={i}>
                                            <td>{data.Description}</td>
                                            <td>{data.Date}</td>
                                            <td className="todo-checkbox">
                                                <div className="form-check form-switch">
                                                    <input className="form-check-input" type="checkbox" checked={data.Status} onChange={e => handleCompleted(data.todo_id, e.target.checked)} disabled={data.Status === 1}/>
                                                </div>
                                            </td>
                                            <td>
                                                <Link to={`read/${data.todo_id}`} className='btn btn-success'><FontAwesomeIcon icon={faEye} /></Link>
                                                {data.Status === 1 ? (
                                                    <button className='btn btn-primary ms-2' disabled><FontAwesomeIcon icon={faPenClip} /></button>
                                                ) : (
                                                    <Link to={`update/${data.todo_id}`} className='btn btn-primary ms-2'><FontAwesomeIcon icon={faPenClip} /></Link>
                                                )}
                                                <button className='btn btn-danger ms-2' onClick={e => handleDelete(data.todo_id)}><FontAwesomeIcon icon={faTrash} /></button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'pending' && (
                    <div id="pending">
                        <table class="table table-light">
                            <thead>
                                <tr>
                                    <th scope="col">Todo</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Completed</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    todo.map((data, i) => (
                                        <tr key={i}>
                                            <td>{data.Description}</td>
                                            <td>{data.Date}</td>
                                            <td className="todo-checkbox">
                                                <div className="form-check form-switch">
                                                    <input className="form-check-input" type="checkbox" checked={data.Status} onChange={e => handleCompleted(data.todo_id, e.target.checked)}/>
                                                </div>
                                            </td>
                                            <td>
                                                <Link to={`read/${data.todo_id}`} className='btn btn-success'><FontAwesomeIcon icon={faEye} /></Link>
                                                {data.Status === 1 ? (
                                                    <button className='btn btn-primary ms-2' disabled><FontAwesomeIcon icon={faPenClip} /></button>
                                                ) : (
                                                    <Link to={`update/${data.todo_id}`} className='btn btn-primary ms-2'><FontAwesomeIcon icon={faPenClip} /></Link>
                                                )}
                                                <button className='btn btn-danger ms-2' onClick={e => handleDelete(data.todo_id)}><FontAwesomeIcon icon={faTrash} /></button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'completed' && (
                    <div id="completed">
                        <table class="table table-light">
                            <thead>
                                <tr>
                                    <th scope="col">Todo</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Completed</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    todo.map((data, i) => (
                                        <tr key={i}>
                                            <td>{data.Description}</td>
                                            <td>{data.Date}</td>
                                            <td className="todo-checkbox">
                                                <div className="form-check form-switch">
                                                    <input className="form-check-input" type="checkbox" checked={data.Status} onChange={e => handleCompleted(data.todo_id)}/>
                                                </div>
                                            </td>
                                            <td>
                                                <Link to={`read/${data.todo_id}`} className='btn btn-success'><FontAwesomeIcon icon={faEye} /></Link>
                                                <button className='btn btn-danger ms-2' onClick={e => handleDelete(data.todo_id)}><FontAwesomeIcon icon={faTrash} /></button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                )}

                <Link to="/create"  className='btn btn-secondary'>Add +</Link>
            </div>
        </div>
    </div>
  )
}

export default Todo
