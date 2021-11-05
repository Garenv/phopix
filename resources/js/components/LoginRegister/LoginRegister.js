import React, {useState, useRef} from "react";
import {useHistory} from 'react-router-dom';
// import {useDispatch, useSelector} from "react-redux";
// import {Redirect} from "react-router-dom";
// import {login} from "../../actions/auth";

const LoginRegister = ({ setUserState }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let history = useHistory();

    const handleLogin = (e) => {
        e.preventDefault();
        let dataLogin = {
            'email': email,
            'password': password
        };

        JSON.stringify(dataLogin);

        axios.post('http://phopix.test/api/login', dataLogin)
            .then(resp => {
                localStorage.setItem('token', resp.data.token);
                // console.log(localStorage.getItem('name'));
                // console.log(localStorage.getItem('email'));
                // console.log(localStorage.getItem('UserID'));
                console.log(resp);
                // console.log(localStorage.getItem('token'));
                history.push('/gallery');
            }).catch(error => {
            console.log(error);
        });

        // setUserState('myState');

    };

    return (
        <>
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
                                                    <form onSubmit={handleLogin}>
                                                        <div className="form-group">
                                                            <input type="email" name="email"
                                                                   className="form-style"
                                                                   placeholder="Your Email"
                                                                   id="logemail"
                                                                   autoComplete="none"
                                                                   onChange={(e) => setEmail(e.target.value)}
                                                            />
                                                            <i className="input-icon uil uil-at"></i>
                                                        </div>
                                                        <div className="form-group mt-2">
                                                            <input type="password" name="password"
                                                                   className="form-style"
                                                                   placeholder="Your Password"
                                                                   id="logpass"
                                                                   autoComplete="none"
                                                                   onChange={(e) => setPassword(e.target.value)}
                                                            />
                                                            <i className="input-icon uil uil-lock-alt"></i>
                                                        </div>
                                                        <button className="btn mt-4">Login</button>
                                                        <p className="mb-0 mt-4 text-center">
                                                            <a href="#0" className="link">Forgot your password?</a>
                                                        </p>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card-back">
                                            <div className="center-wrap">
                                                <div className="section text-center">
                                                    <h4 className="mb-4 pb-3">Sign Up</h4>
                                                    <form>
                                                    <div className="form-group">
                                                        <input type="text" name="name"
                                                               className="form-style"
                                                               placeholder="Your Full Name"
                                                               id="logname"
                                                               autoComplete="none"/>
                                                        <i className="input-icon uil uil-user"></i>
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <input type="email" name="email"
                                                               className="form-style"
                                                               placeholder="Your Email"
                                                               id="logemail" autoComplete="none"/>
                                                        <i className="input-icon uil uil-at"></i>
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <input type="number" name="age"
                                                               className="form-style"
                                                               placeholder="Your Age"
                                                               id="logemail" autoComplete="none"/>
                                                        <i className="input-icon uil uil-at"></i>
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <input type="password" name="password"
                                                               className="form-style"
                                                               placeholder="Your Password"
                                                               id="logpass"
                                                               autoComplete="none"/>
                                                        <i className="input-icon uil uil-lock-alt"></i>
                                                    </div>
                                                    <a href="#" className="btn mt-4">submit</a>
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
