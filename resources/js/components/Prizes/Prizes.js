import React, {useEffect, useState} from "react";
import '../../../sass/prizes/prizes.scss';
import {Link} from "react-router-dom";

const Prizes = () => {

    const [prizeData, setPrizeData]                               = useState([]);
    const [statusCode, setStatusCode]                             = useState(null);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/prizes')
            .then(resp => {
                setPrizeData(resp.data);
            }).catch(error => {
            let errorStatus        = error.response.status;

            setStatusCode(errorStatus);
        });
    },[]);

    return (
        <>
            {
                statusCode !== 404 ?
                <div className="main">
                    <Link to="/">
                        <img src="https://cruskip.s3.us-east-2.amazonaws.com/assets/images/phopix/logos/p_1081x1080_transparent.png" className="pLogoPrizes" alt="Prize Page Logo"/>
                    </Link>
                    <ul className="cards">
                        <li className="cards_item">
                            <div className="card">
                                {
                                    prizeData.map((prizes) => {
                                        return(
                                            <>
                                                <div className="card_image"><img src={prizes.image_url} className="giftCards"/></div>
                                                <div className="card_content">
                                                    <h2 className="card_title">{prizes.prizeName}</h2>
                                                </div>
                                                <br/>
                                            </>
                                        );
                                    })
                                }
                            </div>
                        </li>
                    </ul>
                </div> : <h1>No prizes at this time!!</h1>
            }
        </>
    );
};

export default Prizes;
