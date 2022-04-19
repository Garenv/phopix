import React, {useEffect, useState} from "react";
import '../../../sass/prizes/prizes.scss';

const Prizes = () => {

    const [prizeData, setPrizeData]                               = useState([]);
    const [statusCode, setStatusCode]                             = useState(null);

    useEffect(() => {
        axios.get('http://localhost/api/prizes')
            .then(resp => {
                setPrizeData(resp.data);
            }).catch(error => {
            let errorStatus        = error.response.status;

            setStatusCode(errorStatus);
        });
    },[]);

    return (
        <>
            {statusCode !== 404 ?
                <div className="main">
                    <h1>Prizes</h1>
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
