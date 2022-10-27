import React from 'react';
import '../../sass/navbar/navbar.scss';
import {Link, useHistory} from "react-router-dom";

const Navbar = () => {
    let authToken     = localStorage.getItem('token');
    let name          = localStorage.getItem('name');
    let history       = useHistory();

    const logout      = () => {
        const headers = {
            "Accept": 'application/json',
            "Authorization": `Bearer ${authToken}`
        };

        const data = "";

        axios.post('http://127.0.0.1:8000/api/logout', data, {headers})
            .then(resp => {
                localStorage.removeItem('token');
                history.push('/');
            }).catch(err => {
                console.log(err);
        });
    }

    return(
        <div className="phopixNavbar">
            <div className="container">
                <div className="logo-box">
                    <a href="/">
                        <img src="https://cruskip.s3.us-east-2.amazonaws.com/assets/images/phopix/logos/p_logo_large.png" className="phopixLogo" alt="Phopix Logo"/>
                    </a>
                </div>
                    <nav>
                        <ul>
                            <li style={{color: "#000000"}}>Welcome, {name}!</li>
                            <li>
                                <Link to="/prizeStatus">Prize Status</Link>
                            </li>
                            <li>
                                <Link to="/gallery">Gallery</Link>
                            </li>

                            <li><a href="/" className="myButton" onClick={logout}>Logout</a></li>
                        </ul>
                    </nav>
            </div>
        </div>
    );
};

export default Navbar;
