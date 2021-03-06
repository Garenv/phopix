import React, { useState } from 'react';
import { useQuery } from 'react-query';
import '../../../sass/Modals/winnerModals.scss';

const SelectedWinners = () => {
    let authToken                                                 = localStorage.getItem('token');

    async function fetchWinners() {
        const headers = {
            "Accept": 'application/json',
            "Authorization": `Bearer ${authToken}`
        };

        const {data} = await axios.get('http://localhost/api/get-winners', {headers});
        return data;
    }

    const { data } = useQuery('winners', fetchWinners);

    const createUserPhotoNodes = () => {
        return (
            <>
                <div className="userData">
                    {
                        data?.map((photos, index) => {
                            return (
                                <div key={index}>
                                    <img src={photos.url} className="img-fluid" alt="Winner Photos" />
                                    <div className="winnerInfo">
                                        <h2 className="winnerUserName">{photos.name}</h2>
                                        <h2 className="winnerLikes">Likes {photos.likes}</h2>
                                        <h2 className="firstPlace">{photos.firstPlace}</h2>
                                        <h2 className="secondPlace">{photos.secondPlace}</h2>
                                        <h2 className="thirdPlace">{photos.thirdPlace}</h2>
                                        <br/>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
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
