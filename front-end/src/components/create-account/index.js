import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import axios from 'axios';
import Swal from 'sweetalert2';

import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import myImage from './preview-img copy1.jpg';
import mellStroy from './mellstroy hack laugh.gif'


function CreateAccount() {

    //identity style
    const identityStyle = {
        display: "inline-block",
        aspectRatio: '1/1',
        borderRadius: '6px',
        width: '120px',
        border: '3px dashed #999999db',
        backgroundColor: 'DodgerBlue',
        padding: '5px',
    };

    // name error
    const [enterNameError, setenterNameError] = useState("");
    const [enterMInNameError, setenterMInNameError] = useState("");

    // email erorr
    const [enteremailError, setemailError] = useState("");
    const [entervalidemailError, setentervalidemailError] = useState("");

    //phone no
    const [enterPhoneError, setenterPhoneError] = useState("");
    const [entervalidPhoneError, setentervalidPhoneError] = useState("");
    const validPhoneNo = '^[1-9][0-9]{9}$';

    //Identity error
    const [identity, setidentity] = useState(null);
    const [uploadIdentity, setuploadIdentity] = useState("")

    // password erorr
    const [enterpasswordError, setenterpasswordError] = useState("");
    const [entervalidpasswordError, setentervalidpasswordError] = useState("");

    // c_password erorr
    const [enterc_passwordError, setenterc_passwordError] = useState("");
    const [entercc_passwordError, setentercc_passwordError] = useState("");

    //submit waiting
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [inputValue, setinputValue] = useState({
        name: "",
        lname: "",
        email: "",
        phone: "",
        password: "",
        c_password: "",
    });


    // onchange
    const handleInput = (event) => {
        const { name, value } = event.target;
        setinputValue({ ...inputValue, [name]: value });
        // console.log(event.target.value);
    }
    const handleidentityChange = (e) => {
        const file = e.target.files[0];
        console.log(e.target.files);
        setidentity(file);
        // console.log("....identity>>>>>>", identity);
    };

    // user valued details
    const userfName = inputValue['name'];
    const userlName = inputValue['lname'];
    const userEmail = inputValue['email'];
    const userPhoneNo = inputValue['phone'];
    const userIdentity = identity;
    const userPassword = inputValue['password'];
    const userConfirmPassword = inputValue['c_password'];


    const navigate = useNavigate();

    const submitForm = async (event) => {
        event.preventDefault();

        console.log(identity);

        if (userfName && userlName && userEmail && userPhoneNo && userPhoneNo.match(validPhoneNo) && userIdentity && userPassword && userConfirmPassword === userPassword) {

            //formdata
            const formData = new FormData();
            formData.append('fName', userfName);
            formData.append('lName', userlName);
            formData.append('email', userEmail);
            formData.append('phoneno', userPhoneNo);
            formData.append('identity', userIdentity);
            formData.append('password', userPassword);
            formData.append('c_password', userConfirmPassword);

            try {
                const response = await axios.post('http://localhost:3001/users/Users', formData, {
                    // const response = await axios.post('https://docs.github.com/articles/troubleshooting-custom-domains/#github-repository-setup-errors/Users', formData, {
                    headers: {
                        'content-Type': 'multipart/form-data'
                    }
                });

                console.log('Data submitted successfully:', response.data);
            } catch (error) {
                console.error('Error submitting data:', error);
                // Handle error
            } finally {
                setIsSubmitting(false);
            }


            Swal.fire({
                title: "Success!",
                text: "You've successfully created an account!",
                imageUrl: mellStroy,
                imageWidth: 400,
                imageHeight: 200,
                // imageAlt: "Custom image"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/log-in');
                }
            });

        } else {
            Swal.fire({
                icon: "error",
                title: "Info Required",
                text: "Please fill your Data!",
            });
        }

        // name validation
        console.log("submit button is working")
        const userfNameLength = userfName.length
        if (userfName) {
            setenterNameError(false);

            if (userfNameLength >= 3) {
                setenterMInNameError(false);
            }
            else {
                setenterMInNameError(true);

            }

        } else {
            setenterNameError(true);
            setenterMInNameError(false);
        }

        // email validation
        let validEmail = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm;
        if (userEmail) {
            setemailError(false)

            if (userEmail.match(validEmail)) {
                setentervalidemailError(false)
            } else {
                setentervalidemailError(true)
            }
        } else {
            setentervalidemailError(false)
            setemailError(true)
        }

        //phone no
        if (userPhoneNo) {
            setenterPhoneError(false)
            if (userPhoneNo.match(validPhoneNo)) {
                setentervalidPhoneError(false)
            } else {
                setentervalidPhoneError(true)
            }
        } else {
            setentervalidPhoneError(false)
            setenterPhoneError(true)
        }

        //identity verification
        if (identity) {
            setuploadIdentity(false)
        } else {
            setuploadIdentity(true)
        }

        // password validation
        const validPassword = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";
        if (userPassword) {
            setenterpasswordError(false)
            if (userPassword.match(validPassword)) {
                setentervalidpasswordError(false);
            } else {
                setentervalidpasswordError(true)
            }
        } else {
            setentervalidpasswordError(false);
            setenterpasswordError(true)
        }

        // c_password validation
        if (userConfirmPassword) {
            setenterc_passwordError(false)
            if (userConfirmPassword === userPassword) {
                setentercc_passwordError(false);
            } else {
                setentercc_passwordError(true)
            }
        } else {
            setentercc_passwordError(false);
            setenterc_passwordError(true)
        }


    }


    return (
        <>
            <h2 className='text-center text-light'> Create Account</h2>
            {/* form >>>>>>>>>>>>>>>> */}
            <Form>
                <div className=' border border-secondary border-3 rounded-5 p-5 mx-auto my-4 w-75'>
                    <div className='d-flex gap-3'>

                        {/*first name */}
                        <div className='w-100'>
                            <input className="w-100 text-light bg-dark form-control" type="text" id="name" placeholder="Name*" name="name" value={inputValue.name} onChange={handleInput} />

                            {enterNameError ? <label style={{ "color": "red" }} id="enterfnamewarning" htmlFor="text">Enter Your First Name</label> : ""}
                            {enterMInNameError ? <label style={{ "color": "red" }} id="minfnamewarning" htmlFor="text">Min 3 characters is required</label> : ""}
                        </div>

                        {/* last name */}
                        <div className='w-100'>
                            <input className="w-100  text-light bg-dark form-control" type="text" id="lname" placeholder="Last Name (Optional)" name="lname" value={inputValue.lname} onChange={handleInput} />
                        </div>
                    </div>

                    {/* email */}
                    <div>
                        <input className="  w-100 my-3 text-light bg-dark form-control" type="email" name="email" placeholder="Email*" value={inputValue.email} onChange={handleInput} />
                        {enteremailError ? <label style={{ "color": "red" }} id="enteremailwarning" htmlFor="text">Enter Your Email</label> : ""}
                        {entervalidemailError ? <label style={{ "color": "red" }} id="entervalidemailwarning" htmlFor="text">Enter a Valid Email</label> : ""}
                    </div>

                    {/* phone */}
                    <div>
                        <input className="  w-100 my-3 text-light bg-dark form-control" type="number" name="phone" placeholder="Your Mobile No*" value={inputValue.phone} onChange={handleInput} />
                        {enterPhoneError ? <label style={{ "color": "red" }} id="enterphonenowarning" htmlFor="text">Enter Your Mobile Number</label> : ""}
                        {entervalidPhoneError ? <label style={{ "color": "red" }} id="entervalidphonenowarning" htmlFor="text">Enter a Valid Mobile Number</label> : ""}
                    </div>

                    {/* Password */}
                    <div>
                        <input className="  w-100 my-3 text-light bg-dark form-control" type="password" name="password" placeholder="password*" value={inputValue.password} onChange={handleInput} />
                        {enterpasswordError ? <label style={{ "color": "red" }} id="enterpasswordwarning" htmlFor="text">Enter Your password</label> : ""}
                        {entervalidpasswordError ? <label style={{ "color": "red" }} id="entervalidpasswordwarning" htmlFor="text">"Password must contain 8 characters and at least one number, one uppercase letter and one unique character"</label> : ""}
                    </div>

                    {/* confirm Password */}
                    <div>
                        <input className="  w-100 my-3 text-light bg-dark form-control" type="password" name="c_password" placeholder="confirm your password*" value={inputValue.c_password} onChange={handleInput} />
                        {enterc_passwordError ? <label style={{ "color": "red" }} id="enterfnamewarning" htmlFor="text">Enter confirm Password</label> : ""}
                        {entercc_passwordError ? <label style={{ "color": "red" }} id="enterfnamewarning" htmlFor="text">Confirm Password doesn't match your previous Password</label> : ""}
                    </div>

                    {/* identity file */}
                    <div>
                        <div className='d-flex gap-3'>
                            <input className='my-auto  w-25 text-light bg-dark form-control' type="file" name="identity" placeholder="Upload a Identity*" onChange={handleidentityChange} />
                            {identity ? <img className='identityPreview ' style={identityStyle} src={URL.createObjectURL(identity)} alt="identity preview" /> :
                                <img className='identityPreview ' style={identityStyle} src={myImage} alt='identity preview' />}
                        </div>
                        {uploadIdentity ? <label style={{ "color": "red" }} id="uploadidentity" htmlFor="text">Upload Your Identity</label> : ""}
                    </div>

                    {/* submit */}
                    <div className="mx-auto ">
                        <button className="btn btn-primary p-2 px-4 my-3" type="button" onClick={submitForm} disabled={isSubmitting}>Create Account</button>
                        <div className='d-inline-block'>
                            <p className=" d-inline-block text-muted mx-3 ">Existing User?</p><Link className=" text-muted link-light text-decoration-none" to="/log-in">Log In</Link>
                        </div>

                    </div>
                </div>
            </Form>
        </>
    );
}
export default CreateAccount;