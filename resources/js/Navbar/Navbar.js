import React, { useEffect } from 'react';
import '../../sass/navbar/navbar.scss';
import {useQuery} from "react-query";

const Navbar = () => {
    const data = useQuery('uploads');
    // const {data, error, isError, isLoading } = useQuery('uploads', fetchUploads)

    // console.log(data);

    useEffect(() => {
        console.log(data);
    })

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
                        <li><a href="">{localStorage.getItem('UserID')}</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Navbar;
