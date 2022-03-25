import React from 'react';
import '../../sass/navbar/navbar.scss';

const Navbar = () => {
    let name = localStorage.getItem('name');

    return(
        <div className="phopixNavbar">
            <div className="container">
                <div className="logo-box">
                    <a href="/">
                        <img src="https://cruskip.s3.us-east-2.amazonaws.com/assets/images/phopix/logos/phopixLogo.png" className="phopixLogo" alt="Phopix Logo"/>
                    </a>
                </div>
                <nav>
                    <ul>
                        <li><a href="">Home</a></li>
                        <li><a href="">How To Win</a></li>
                        <li style={{color: "#000000"}}>Welcome, {name}!</li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Navbar;
