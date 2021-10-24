import React, {useState, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {login} from "../../actions/auth";

const LoginRegister = (props) => {
    const form = useRef();
    const checkBtn = useRef();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const {isLoggedIn} = useSelector(state => state.auth);
    const {message} = useSelector(state => state.message);

    const dispatch = useDispatch();

    const onChangeEmail = (e) => {
        const username = e.target.value;
        setEmail(username);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleLogin = (e) => {
        e.preventDefault();

        setLoading(true);

        JSON.stringify(email);
        JSON.stringify(password);

            console.log("inside handleLogin(); LoginRegister.js");
            dispatch(login(email, password))
                .then(() => {
                    console.log(email, password);
                    props.history.push("/gallery");
                    // window.location.reload();
                })
                .catch(() => {
                    setLoading(false);
                });
            setLoading(false);
    };

    if (isLoggedIn) {
        return <Redirect to="/gallery"/>;
    }

    return (
        <form onSubmit={handleLogin} ref={checkBtn}>
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
                                                </div>
                                            </div>
                                        </div>

                                    <div className="card-back">
                                        <div className="center-wrap">
                                            <div className="section text-center">
                                                <h4 className="mb-4 pb-3">Sign Up</h4>
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
        </form>
    );

}

export default LoginRegister;
