import React, { useEffect, useState } from 'react';
import '../../../sass/Modals/winnerModals.scss';
import { Image } from "react-bootstrap";
import {Link} from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import ApiClient from "../../utilities/ApiClient";

const SelectedWinners = () => {
    let authToken                                                 = localStorage.getItem('token');
    const [thisWeeksWinnerData, setThisWeeksWinnerData]           = useState([]);

    useEffect(() => {
        const headers = {
            "Accept": 'application/json',
            "Authorization": `Bearer ${authToken}`
        };

        ApiClient.get('/get-winners', {headers})
            .then(resp => {
                console.log(resp);
                setThisWeeksWinnerData(resp.data);
            });

    }, []);

    const getPrizePlace = (photos) => {
        switch (photos.place) {
            case "1st Place":
                return "firstPlace";
            case "2nd Place":
                return "secondPlace";
            case "3rd Place":
                return "thirdPlace";
        }
    };

    const createUserPhotoNodes = () => {
        return (
            <>
                <Navbar/>
                <Link to="/gallery">
                    <Image src="https://cruskip.s3.us-east-2.amazonaws.com/assets/images/phopix/logos/p_1081x1080_transparent.png" className="pLogoPrizes" fluid />
                </Link>
                <section className="gallery">
                    <div className="container">
                        <div className="img-container">

                            {
                                thisWeeksWinnerData.length !== 0 ?
                                thisWeeksWinnerData.map((photos, index) => {
                                    return (
                                        <>
                                            <Image src={photos.url} alt="Photo" className="gallery-img"/>
                                            <div className={`${getPrizePlace(photos)} text-center`}>
                                                <h2 className>{photos.place}</h2>
                                                <h2 className="winnerLikes">Likes {photos.likes}</h2>
                                                <h2 className="winnerUserName">{photos.name}</h2>
                                            </div>
                                        </>
                                    )
                                })    : <h1>This week's winners haven't been chosen yet!</h1>
                            }



                        </div>
                    </div>
                </section>
            </>
        );
    };

    return (
        <>
            {createUserPhotoNodes()}
        </>
    );

}

export default SelectedWinners;

