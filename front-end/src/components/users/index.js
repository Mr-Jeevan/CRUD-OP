
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Swal from 'sweetalert2';

import { cloud_url } from "../../config"


function Users() {
    const [message, setMessage] = useState('');
    const [usersList, setusersList] = useState([])
    useEffect(() => {
        // axios.get('http://localhost:3001/users/alluserdetails', {})
        axios.get(`${cloud_url}/alluserdetails`, {})
            .then(function (response) {
                setusersList(response.data.users);
                console.log(response.data.users)
                // console.log(usersList[0].identity);
                // console.log(usersList[0].email, usersList[0]._id);
            })
            .catch(function (error) {
                console.log("..................", error);
            })
    }, []);




    const deleteUser = async (_id, setMessage) => {
        try {
            // Show confirmation dialog
            const result = await Swal.fire({
                title: "Are you sure you want to delete this user?",
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'

            });

            // If confirmed, send delete request
            if (result.isConfirmed) {
                // setusersList(prevUsersList => prevUsersList.filter(user => user._id !== _id));

                // const response = await axios.delete(`http://localhost:3001/users/userdelete/${_id}`);
                const response = await axios.delete(`${cloud_url}/userdelete/${_id}`);
                console.log('response', response);
                console.log(response.data.message);
                // Update the UI to remove the deleted user
                setusersList(prevUsersList => prevUsersList.filter(user => user._id !== _id));
                // Show success message
                Swal.fire(
                    'Deleted!',
                    'The user has been deleted.',
                    'success'
                );
            } else if (result.isDenied) {
                console.log(usersList[0].identity);

                // Show info message if changes are not saved
                Swal.fire("Changes are not saved", "", "info");
            }
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    return (
        <>
            <Link className="btn btn-sm btn-info m-2" to="/create-account">Add a User</Link>
            <h2 className='text-center text-light'>Users List</h2>
            <Table striped bordered hover className="overflow-auto text-light">
                <thead>
                    <tr>
                        <th>#ID</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Mobile No</th>
                        <th>Identity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>


                    {usersList.map((user, index) => {
                        // Only render the first element

                        const identity_width = {
                            width: "100px",
                            height: "auto"
                        }

                        return (
                            <tr key={index}>
                                <td className='text-light'>{user._id}</td>
                                <td className='text-light'>{user.fName + " " + user.lName}</td>
                                <td className='text-light'>{user.email}</td>
                                <td className='text-light'>{user.phoneno}</td>
                                <td style={identity_width}><img src={"https://crud-op1.onrender.com/" + user.identity} alt="Identity Image" className="w-100" /></td>
                                <td className='text-light'>
                                    <div className="d-flex gap-1">
                                        <Link to={`/userupdate/${user._id}`} className="btn btn-sm btn-warning">Edit</Link> |
                                        <button onClick={(e) => deleteUser(user._id)} className="btn btn-sm btn-danger">Delete</button>
                                        <p>{message}</p>
                                        {/* <button onClick={edituser()(user._id)} className="btn btn-sm btn-warning">edit </button> */}
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </>
    );
}

export default Users;