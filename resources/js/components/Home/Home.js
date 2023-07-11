import React, { useEffect, useState } from "react";
import { Link, useHistory } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import ApiClient from "../../utilities/ApiClient";
import {toast, ToastContainer} from "react-toastify";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ReactSwitch from "react-switch";
import {useUserContext} from "../../utilities/UserContext";


const LoginRegister = () => {
    const [name, setName]                                           = useState("");
    const [email, setEmail]                                         = useState("");
    const [dateOfBirth, setDateOfBirth]                             = useState("");
    const [password, setPassword]                                   = useState("");
    const [emailError, setEmailError]                               = useState("");
    const [errorStatus, setErrorStatus]                             = useState(null);
    const { refreshUserData } = useUserContext();

    // Handles password error upon logging in
    const [passwordError, setPasswordError]                         = useState("");

    // Close error
    const [errorClose, setErrorClose]                               = useState(false);

    const handleClose                                               = () => setShow(false);
    const handleShow                                                = () => setShow(true);
    let history                                                     = useHistory();

    // faq, about, random
    const [show, setShow]                                           = useState(false);

    const [selectedDate, setSelectedDate] = useState(null);

    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    useEffect(() => {
        document.body.style.backgroundColor = theme === 'dark' ? '#000000' : '#FFFFFF';
    }, [theme]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const closeMessages = () => {
        setErrorClose(true);
    }

    const handleLogin = (e) => {

        e.preventDefault();

        console.log("Clicked Login");

        let dataLogin = {
            'email': email,
            'password': password
        };

        JSON.stringify(dataLogin);

        ApiClient.post('/login', dataLogin)
            .then(resp => {
                console.log(resp);
                localStorage.setItem('token', resp.data.token);
                localStorage.setItem('UserID', resp.data.UserID);
                localStorage.setItem('name', resp.data.name);

                setTimeout(() => {
                    setIsLoading(false);
                }, 2000);

                refreshUserData();
                history.push('/gallery');
            }).catch(error => {
            let errorMessage = error.response.data.message;
            let errorStatus  = error.response.status;

            setPasswordError(errorMessage);
            setErrorStatus(errorStatus);
        });


    };

    const handleRegister = (e) => {
        e.preventDefault();

        let dataRegister = {
            'name': name,
            'email': email,
            'dateOfBirth': dateOfBirth,
            'password': password
        };

        JSON.stringify(dataRegister);

        ApiClient.post('/register', dataRegister)
            .then(resp => {
                let successMessage = resp.data.message;
                localStorage.setItem('token', resp.data.token);
                localStorage.setItem('UserID', resp.data.UserID);
                localStorage.setItem('name', resp.data.name);

                history.push('/gallery');

                toast.success(successMessage, {
                    closeOnClick: false,
                    closeButton: false,
                    autoClose: 1400,
                });
            }).catch(error => {
            let errorMessage = error.response.data.message;
            let errorStatus  = error.response.status;

            setEmailError(errorMessage);
            setErrorStatus(errorStatus);

            toast.error(errorMessage, {
                closeOnClick: false,
                closeButton: false,
                autoClose: 5000
            });
        });


        const headers = {
            "Accept": 'application/json',
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        };

        ApiClient.post('/verification-notification', {headers})
            .then(resp => {
                localStorage.setItem('token', resp.data.token);
                localStorage.setItem('UserID', resp.data.UserID);
                localStorage.setItem('name', resp.data.name);

                history.push('/gallery');
            }).catch(error => {
            let errorMessage = error.response.data.message;
            let errorStatus  = error.response.status;

            setEmailError(errorMessage);
            setErrorStatus(errorStatus);
        });

    };

    return (
        <>
            <nav className="navbar navbar-expand-md navbar-light bg-dark">
                <div className="container">
                    <a className="navbar-brand" href="#">
                        <img src="https://cruskip.s3.us-east-2.amazonaws.com/assets/images/phopix/logos/phopixel_320x314_transparent.jpg" className="logoHome" alt=""/>
                    </a>
                    <button className="navbar-toggler bg-white" type="button" data-toggle="collapse" data-target="#navbarNav">
                        <span className="navbar-toggler-icon text-white"></span>
                    </button>
                    <div className="collapse navbar-collapse text-white" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <a className="nav-link" ><Link to="/faq">FAQ</Link></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link"><Link to="/support">Support</Link></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link"><Link to="/prizes">Prizes</Link></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>


            <ToastContainer
                hideProgressBar
                closeButton={false}
            />

            <div className="section">
                <div className="container">
                    <div className="row full-height justify-content-center">
                        <div className="col-12 text-center align-self-center py-5">
                            <div className="section pb-5 pt-5 pt-sm-2 text-center">
                                <h6 className="mb-0 pb-3"><span>Log In </span><span>Sign Up</span></h6>
                                <input className="checkbox" type="checkbox" id="reg-log" name="reg-log"/>
                                <label htmlFor="reg-log"></label>
                                <div className="card-3d-wrap mx-auto">
                                    <div className="card-3d-wrapper">
                                        <div className="card-front">
                                            <div className="center-wrap">
                                                <div className="section text-center">
                                                    <h4 className="mb-4 pb-3 text-white">Log In</h4>
                                                    <form onSubmit={handleLogin} method="POST">
                                                        <div className="form-group">
                                                            <input type="email"
                                                                   name="email"
                                                                   className="form-style"
                                                                   placeholder="Your Email"
                                                                   id="logemail"
                                                                   autoComplete="none"
                                                                   onChange={(e) => setEmail(e.target.value)}
                                                            />
                                                            <i className="input-icon uil uil-at"></i>
                                                        </div>
                                                        <div className="form-group mt-2">
                                                            <input type="password"
                                                                   name="password"
                                                                   className="form-style"
                                                                   placeholder="Your Password"
                                                                   id="logpass"
                                                                   autoComplete="none"
                                                                   onChange={(e) => setPassword(e.target.value)}
                                                            />
                                                            <i className="input-icon uil uil-lock-alt"></i>
                                                        </div>
                                                        <button className="btn mt-4">Login</button>
                                                    </form>
                                                    <p className="mb-0 mt-4 text-center">
                                                        <p className="mb-0 mt-4 text-center">
                                                            <Link to="/password/reset" className="link">Forgot Password</Link>
                                                        </p>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card-back">
                                            <div className="center-wrap">
                                                <div className="section text-center">
                                                    <h4 className="mb-4 pb-3">Sign Up</h4>
                                                        <form onSubmit={handleRegister}>
                                                            <div className="form-group">
                                                                <input type="text"
                                                                       name="name"
                                                                       className="form-style"
                                                                       placeholder="Name"
                                                                       id="logname"
                                                                       autoComplete="none"
                                                                       onChange={(e) => setName(e.target.value)}
                                                                />
                                                                <i className="input-icon uil uil-user"></i>
                                                            </div>
                                                            <div className="form-group mt-2">
                                                                <input type="email"
                                                                       name="email"
                                                                       className="form-style"
                                                                       placeholder="Email"
                                                                       id="logemail"
                                                                       autoComplete="none"
                                                                       onChange={(e) => setEmail(e.target.value)}
                                                                />
                                                                <i className="input-icon uil uil-at"></i>
                                                            </div>
                                                            <div className="form-group mt-2">
                                                                <DatePicker
                                                                    className="form-style"
                                                                    selected={dateOfBirth}
                                                                    onChange={(date) => setDateOfBirth(date)}
                                                                    dateFormat="MM/dd/yyyy"
                                                                    placeholderText="Select a date"
                                                                />
                                                                <i className="input-icon uil uil-13-plus"></i>
                                                            </div>
                                                            <div className="form-group mt-2">
                                                                <input type="password"
                                                                       name="password"
                                                                       className="form-style"
                                                                       placeholder="Password"
                                                                       id="logpass"
                                                                       autoComplete="none"
                                                                       onChange={(e) => setPassword(e.target.value)}
                                                                />
                                                                <i className="input-icon uil uil-lock-alt"></i>
                                                            </div>
                                                        <button className="btn mt-4">Submit</button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*<div className="text-center">*/}
                    {/*    <ReactSwitch checked={theme === 'dark'} onChange={toggleTheme} />*/}
                    {/*    <p>Current Theme: {theme === 'dark' ? 'dark' : 'light'}</p>*/}
                    {/*</div>*/}

                </div>
            </div>



            <Nav defaultActiveKey="/home" as="ul" className="justify-content-center">
                <Nav.Item as="li">
                    <Nav.Link href="/termsAndConditions">Terms & Conditions</Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                    <Nav.Link eventKey="link-1"><Link to="/privacyPolicy">Privacy Policy</Link></Nav.Link>
                </Nav.Item>
            </Nav>
        </>
    );
}

export default LoginRegister;
