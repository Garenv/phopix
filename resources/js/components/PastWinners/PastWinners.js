import React, {useEffect, useState} from 'react';
import '../../../sass/pastWinners/pastWinners.scss';

const PastWinners = () => {
    const [legacyWinnersData, setLegacyWinnersData] = useState([]);
    const [statusCode, setStatusCode]               = useState(null);

    useEffect(() => {
        axios.get('http://localhost/api/get-all-legacy-winners')
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
            {
                legacyWinnersData.length !== 0 ?
                    <>
                        <img src="https://cruskip.s3.us-east-2.amazonaws.com/assets/images/phopix/logos/phopixel_320x314_transparent.jpg" className="phopixLogoPastWinners" alt="Past Winners Phopix Logo"/>
                        <h1>Past Winners</h1>
                        <ul className="cards">
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
                        </ul>
                    </> : <h1>No prizes at this time!!</h1>
            }
        </>
    );
};

export default PastWinners;
