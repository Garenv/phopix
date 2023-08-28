import React, {useEffect, useState} from 'react';
import Navbar from "../../Navbar/Navbar";
import {useUserContext} from "../../../utilities/UserContext";
import ApiClient from "../../../utilities/ApiClient";

const PrizeStatus = () => {

    let authToken                                                 = localStorage.getItem('token');
    const [thisWeeksWinnerData, setThisWeeksWinnerData]                  = useState([]);
    const { userId }                                                         = useUserContext();

    useEffect(() => {

        const headers = {
            "Accept": 'application/json',
            "Authorization": `Bearer ${authToken}`
        };

        ApiClient.get('/get-winners', {headers})
            .then(resp => {
                setThisWeeksWinnerData(resp.data);
            });

    }, []);

    const userIsWinner = thisWeeksWinnerData.some(item => item.UserID === userId);

    return (
        <>
            <Navbar/>
            {userIsWinner ? <h1>Congratulations! You are one of this week's winners.</h1> : <h1>You haven't won!</h1>}
        </>
    );
}

export default PrizeStatus;
