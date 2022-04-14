import React from "react";
import '../../../sass/pageNotFound/pageNotFound.scss';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
    return (
        <>
            <div className="pageNotFoundBody">
                <div className="containerPageNotFound">
                    <h2 className="pageNotFound">404</h2>
                    <h3 className="oopsPageNotFound">Oops, looks like the page you've navigated to cannot be found!</h3>
                    <Link to="/"><button className="btn mt-4">Go Home</button></Link>
                </div>
            </div>
        </>
    );
};

export default PageNotFound;
