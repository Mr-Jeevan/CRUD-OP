import edit from './Edit.jpg';
import create from './create.jpg';
import login from './login.jpg';
import './style.css';

import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {

    const [dataCount, setDataCount] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:3001/users/datacount')
            .then(response => {
                setDataCount(response.data.count);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []); // Empty dependency array to run only once on mount



    return (
        <>
            <div className="border border-2 border-secondary  mx-auto w-50 my-1 bg-black rounded-3">
                <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="true">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={create} className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src={login} className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src={edit} className="d-block w-100" alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>

            <div className='mt-4   border-top norder-1 border-secondary pt-3'>
                <div className="row">
                    <div className="col-6">
                        <div className="content text-center ">
                            <div className="create">
                                <Link className="feats-btn action text-light btn pt-4" to="/create-account"><h3>Create Account</h3> </Link>
                            </div>
                            <div className="login">
                                <Link className="feats-btn action text-light btn pt-4" to="/log-in"><h3>Log In</h3></Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-6">
                        <div className="content text-center ">
                            <div className="users_count ">
                                <Link className="feats-btn count text-light btn " to="/users"><h1>Users <div className='display-1'>{dataCount}</div></h1></Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}


export default Dashboard;