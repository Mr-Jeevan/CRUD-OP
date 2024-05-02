import React, { useState } from 'react';
import axios from 'axios'
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";



import { useNavigate } from 'react-router-dom';

function LoginPage() {

    const noaccount = {
        height: '10px'
    }
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/users/loginaccount',
                // const response = await axios.post('https://docs.github.com/articles/troubleshooting-custom-domains/#github-repository-setup-errors/loginaccount',
                { email, password },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            // Assuming the server sends the correct status codes and messages
            if (response.status === 200) {
                console.log('Login successful', response.data);
                Swal.fire({
                    title: "Good job!",
                    text: "You have been logged in!",
                    icon: "success"

                });
                navigate('/users');
            } else {
                // The server should handle 400, 404, 401, and 500 errors and send appropriate status codes
                setError(response.data.message); // Assuming the server sends back a message in the response
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: response.data.message, // Display the server-provided message
                });
                console.log('>>>>>>>>>>erore msg', response.data.message);
            }
        } catch (error) {
            // This will handle errors that occur during the request, such as network errors
            console.error('An error occurred:', error);
            setError('An error occurred while trying to log in');
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "The credentials might be Wrong",
            });

        }
    };


    return (
        <div>
            <h2 className='text-center text-light '>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className='mx-auto p-4 w-50 border border-3 rounded-3 border-secondary'>

                    <div className='d-flex justify-content-evenly gap-3 pb-4 '>
                        <div>
                            <input
                                className='form-control bg-dark text-light '
                                type="email"
                                id="email"
                                placeholder='Your Email Address'
                                value={email}
                                onChange={handleEmailChange}
                                required
                            />
                        </div>
                        <div>
                            <input
                                className='form-control bg-dark text-light '
                                type="password"
                                id="password"
                                placeholder='You Password'
                                value={password}
                                onChange={handlePasswordChange}
                                required
                            />
                        </div>
                    </div>
                    <div className=''>
                        <button className='form-control btn btn-info' type="submit">Login</button>
                    </div>
                    <div className='mt-2' style={noaccount}>
                        <p className="d-inline-block text-muted ">Didn't have an account?</p> <Link className=" text-muted link-light text-decoration-none" to="/create-account">Create Account</Link>

                    </div>
                </div>
            </form>
        </div>
    );
}

export default LoginPage;
