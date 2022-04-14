import React, { useState } from "react";
import { Link, useHistory } from 'react-router-dom';
import { Button, Modal } from "react-bootstrap";

const LoginRegister = () => {
    const [name, setName]                                           = useState("");
    const [email, setEmail]                                         = useState("");
    const [age, setAge]                                             = useState("");
    const [password, setPassword]                                   = useState("");
    const [forgotPasswordEmail, setForgotPasswordEmailEmail]        = useState("");
    const [emailError, setEmailError]                               = useState("");
    const [errorStatus, setErrorStatus]                             = useState(null);

    // Handles password error upon logging in
    const [passwordError, setPasswordError]                         = useState("");

    // Close error
    const [errorClose, setErrorClose]                               = useState(false);


    const handleClose                                               = () => setShow(false);
    const handleShow                                                = () => setShow(true);
    let history                                                     = useHistory();

    // faq, about, random
    const [show, setShow]                                           = useState(false);

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

        axios.post('http://localhost/api/login', dataLogin)
            .then(resp => {
                console.log(resp);
                localStorage.setItem('token', resp.data.token);
                localStorage.setItem('UserID', resp.data.UserID);
                localStorage.setItem('name', resp.data.name);
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
            'age': age,
            'password': password
        };

        JSON.stringify(dataRegister);

        axios.post('http://localhost/api/register', dataRegister)
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

    const handleForgotPassword = (e) => {
        e.preventDefault();

        let dataRegister = {
            'email': forgotPasswordEmail,
        };

        console.log(dataRegister)

        axios.post('http://localhost/api/forgot-password', dataRegister);
    };

    return (
        <>
            { errorStatus === 400 ?
                <section>
                    <div className={`notification error ${errorClose ? 'closed' : null}`}>
                        <span className="title">Error</span> {emailError} <span className='close' onClick={closeMessages}>X</span>
                    </div>
                </section>
                : null }

            { errorStatus === 401 ?
                <section>
                    <div className={`notification error ${errorClose ? 'closed' : null}`}>
                        <span className="title">Error</span> {passwordError} <span className='close' onClick={closeMessages}>X</span>
                    </div>
                </section>
                : null }

                <div className="container">
                    <Link to="/faq"><Button>FAQ</Button></Link>
                    <Link to="/prizes"><Button>Prizes</Button></Link>
                </div>


            {/*<img src="https://cruskip.s3.us-east-2.amazonaws.com/assets/images/phopix/logos/phopixLogo_v2.png" className="phopixLogo" alt=""/>*/}

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
                                                    <h4 className="mb-4 pb-3">Log In</h4>
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
                                                            <Link onClick={handleShow} className="link">Forgot Password</Link>
                                                        </p>
                                                    </p>

                                                    <Modal show={show} onHide={handleClose}>
                                                        <Modal.Header closeButton className="modalHeader"></Modal.Header>
                                                        <h1 className="forgotPasswordText">Forgot Password</h1>
                                                        <Modal.Body>
                                                            <form onSubmit={handleForgotPassword} method="POST">
                                                                <div className="form-group row">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="Enter your email address"
                                                                        name="email"
                                                                        onChange={(e) => setForgotPasswordEmailEmail(e.target.value)}
                                                                        required
                                                                        autoFocus
                                                                    />
                                                                </div>
                                                                <div className="text-center sendPasswordResetLinkBtnWrapper">
                                                                    <button type="submit" className="btn btn-primary sendPasswordResetLinkBtn">
                                                                        Send Password Reset Link
                                                                    </button>
                                                                </div>
                                                            </form>
                                                        </Modal.Body>
                                                    </Modal>
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
                                                               placeholder="Your Full Name"
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
                                                               placeholder="Your Email"
                                                               id="logemail"
                                                               autoComplete="none"
                                                               onChange={(e) => setEmail(e.target.value)}
                                                        />
                                                        <i className="input-icon uil uil-at"></i>
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <input type="number"
                                                               name="age"
                                                               className="form-style"
                                                               placeholder="Your Age"
                                                               id="logemail"
                                                               autoComplete="none"
                                                               onChange={(e) => setAge(e.target.value)}
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
                </div>
            </div>

        </>
    );

}

export default LoginRegister;
