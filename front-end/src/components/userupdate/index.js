import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import axios from 'axios';
import Swal from 'sweetalert2';

import { cloud_url } from "../../config"


function UserEditDelete() {
    //name min 3
    const [enterMInNameError, setenterMInNameError] = useState(false);

    //phone no
    const [enterPhoneError, setenterPhoneError] = useState("");
    const [entervalidPhoneError, setentervalidPhoneError] = useState("");

    //email valid
    const [entervalidemailError, setentervalidemailError] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    // onchange
    const handleInput = (event) => {
        const { name, value } = event.target;
        setinputValue({ ...inputValue, [name]: value });
    }


    const [inputValue, setinputValue] = useState({
        fName: "",
        lName: "",
        email: "",
        phoneno: "",
    });

    const { _id } = useParams();
    useEffect(() => {
        // axios.get('http://localhost:3001/users/alluserdetails/' + _id)
        axios.get(`${cloud_url}/alluserdetails/` + _id)
            .then(function (response) {
                setinputValue(response.data);
                console.log(response.data);
            })
            .catch(function (error) {
                console.log("..................", error);
            })
    }, []);


    // name validation
    const NameValidate = () => {
        const userfNameLength = inputValue.fName.length;
        if (userfNameLength < 3) {
            setenterMInNameError(true);
        } else {
            setenterMInNameError(false);

        }
    }

    // email validation
    const EmailValidate = () => {
        let validEmail = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm;
        if (inputValue.email.match(validEmail)) {
            setentervalidemailError(false)
        } else {
            setentervalidemailError(true)
        }
    }

    //phone no
    const PhoneValidate = () => {
        const validPhoneNo = '^[1-9][0-9]{9}$';
        if (inputValue.phoneno) {
            setenterPhoneError(false)
            if (String(inputValue.phoneno).match(validPhoneNo)) {
                setentervalidPhoneError(false)
            } else {
                setentervalidPhoneError(true)
            }
        } else {
            setentervalidPhoneError(false)
            setenterPhoneError(true)
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        EmailValidate()
        PhoneValidate()
        NameValidate()
        const userfNameLength = inputValue.fName.length;
        const validEmail = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm;
        const validPhoneNo = '^[1-9][0-9]{9}$';

        if (userfNameLength >= 3 && inputValue.email && inputValue.email.match(validEmail) && inputValue.phoneno && String(inputValue.phoneno).match(validPhoneNo)) {
            // console.log(enterMInNameError);

            try {
                // const response = await axios.put(`http://localhost:3001/users/alluserdetails/${_id}`, inputValue);
                const response = await axios.put(`${cloud_url}/alluserdetails/${_id}`, inputValue);
                console.log('User updated:', response.data);
            } catch (error) {
                console.error('Error updating user:', error);
            } finally {
                setIsSubmitting(false);
            }
            Swal.fire("Details updated",)
                .then((result) => {
                    if (result.isConfirmed) {
                        navigate('/users');
                    }
                });
            // navigate('/users'); // Navigate only after a successful update
        }
    };






    return (
        <div>
            <h2 className='text-center text-light'>Details</h2>
            <form >
                <div className='mx-auto p-4 w-50 border border-3 rounded-3 border-secondary'>

                    <div className='d-flex justify-content-evenly gap-3 mb-4 '>
                        <div>
                            <input
                                className='form-control bg-dark text-light '
                                type="text"
                                id="fName"
                                name="fName"
                                value={inputValue.fName}
                                // onChange={e => setinputValue({ ...inputValue, fName: e.target.value })}
                                onChange={handleInput}
                            />
                            {enterMInNameError ? <label style={{ "color": "red" }} id="minfnamewarning" htmlFor="text">Min 3 characters is required</label> : ""}

                        </div>
                        <div>
                            <input
                                className='form-control bg-dark text-light '
                                type="text"
                                id="lName"
                                name="lName"
                                value={inputValue.lName}
                                // onChange={e => setinputValue({ ...inputValue, lName: e.target.value })}
                                onChange={handleInput}

                            />
                        </div>
                    </div>
                    <div>
                        <input
                            className='form-control bg-dark text-light
                            bg-dark text-light mb-4 w-75 mx-auto'
                            type="number"
                            id="phoneno"
                            name="phoneno"
                            value={inputValue.phoneno}
                            // onChange={e => setinputValue({ ...inputValue, phone: e.target.value })}
                            onChange={handleInput}
                        />
                        {enterPhoneError ? <label style={{ "color": "red" }} id="enterphonenowarning" htmlFor="text">Enter Your Mobile Number</label> : ""}
                        {entervalidPhoneError ? <label style={{ "color": "red" }} id="entervalidphonenowarning" htmlFor="text">Enter a Valid Mobile Number</label> : ""}
                    </div>
                    <div>
                        <input
                            className='form-control bg-dark text-light
                            bg-dark text-light mb-4 w-75 mx-auto'
                            type="email"
                            id="email"
                            name="email"
                            value={inputValue.email}
                            // onChange={e => setinputValue({ ...inputValue, email: e.target.value })}
                            onChange={handleInput}
                        />
                        {entervalidemailError ? <label style={{ "color": "red" }} id="enterfnamewarning" htmlFor="text">Enter a Valid Email</label> : ""}
                    </div>
                    <div className=''>
                        <button onClick={handleUpdate} disabled={isSubmitting} className='form-control btn btn-info'>Update</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default UserEditDelete;