import React, {useEffect, useState} from 'react';
import '../../../sass/pastWinners/pastWinners.scss';
import {Link} from "react-router-dom";
import ApiClient from "../../utilities/ApiClient";

const PastWinners = () => {
    const [legacyWinnersData, setLegacyWinnersData] = useState([]);
    const [statusCode, setStatusCode]               = useState(null);

    useEffect(() => {
        ApiClient.get('/get-all-legacy-winners')
            .then(resp => {
                console.log(resp.data);
                setLegacyWinnersData(resp.data);
            }).catch(error => {
            let errorStatus        = error.response.status;
            setStatusCode(errorStatus);
        });
    },[]);

    return (
        <>
            <Link to="/">
                <img src="https://cruskip.s3.us-east-2.amazonaws.com/assets/images/phopix/logos/p_1081x1080_transparent.png" className="pLogoPrizes" alt="Prize Page Logo"/>
            </Link>
            {/*<ul className="cards">*/}
                <li className="cards_item">
                    <div className="card">
                        {
                            legacyWinnersData.map((winnerData) => {
                                return(
                                    <>
                                        <div className="card_image"><img src={winnerData.url} className="giftCards" alt="Gift Card Images"/></div>
                                            <div className={`card_content ${winnerData.place === "1st Place" ? 'firstPlace' : winnerData.place === "2nd Place" ? 'secondPlace' : winnerData.place === "3rd Place" ? 'thirdPlace' : null}`}>
                                                <h2 className="card_title">{winnerData.name}</h2>
                                                <h2 className='card_title'>{winnerData.place}</h2>
                                                <h2 className="card_title">Likes: {winnerData.likes}</h2>
                                                <h2 className="card_title">Prize Won: {winnerData.prizeName}</h2>
                                            </div>
                                        <br/>
                                    </>
                                );
                            })
                        }
                    </div>
                </li>
            {/*</ul>*/}
        </>
    );
};

export default PastWinners;
