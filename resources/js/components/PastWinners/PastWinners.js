import React, {useEffect, useState} from 'react';
import '../../../sass/pastWinners/pastWinners.scss';

const PastWinners = () => {
    const [winnersData, setWinnersData]                               = useState([]);
    const [statusCode, setStatusCode]                                 = useState(null);

    useEffect(() => {
        axios.get('http://localhost/api/get-all-legacy-winners')
            .then(resp => {
                console.log(resp.data);
                setWinnersData(resp.data);
            }).catch(error => {
            let errorStatus        = error.response.status;

            setStatusCode(errorStatus);
        });
    },[]);

    return (
        <>
            {
                statusCode !== 404 ?
                    <>
                        <h1>Past Winners</h1>
                        <ul className="cards">
                            <li className="cards_item">
                                <div className="card">
                                    {
                                        winnersData.map((winnerData) => {
                                            return(
                                                <>
                                                    <div className="card_image"><img src={winnerData.url} className="giftCards"/></div>
                                                    <div className="card_content">
                                                        <h2 className="card_title">{winnerData.place}</h2>
                                                        <h2 className="card_title">Likes: {winnerData.likes}</h2>
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
