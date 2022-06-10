import React, { useState } from 'react';

const CurrentUserClicks = (props) => {
    let authToken                                                 = localStorage.getItem('token');
    const [currentUserClicks, setCurrentUserClicks]               = useState(null);
    const [liked, setLiked]                                       = useState(false);

    const handleLikesBasedOnUserId = (liked) => {
        if(liked) {
            handleDislike(props.userId);
        } else {
            handleLike(props.userId);
        }

        setCurrentUserClicks(liked => !liked);
    };

    const handleLike = () => {
        const url = 'http://localhost/api/like';

        const headers = {
            "Accept": 'application/json',
            "Authorization": `Bearer ${authToken}`
        };

        let data = {
            'userId': props.userId
            // 'likeCount': currentUserClicks
        };

        axios.post(url, data, {headers})
            .then(resp => {
                console.log(resp.data);
                // setUserLike(resp.data.incrementDecrementLikes);
            }).catch(err => {
            console.log(err);
        });

    };

    const handleDislike = () => {
        const url = 'http://localhost/api/dislike';

        const headers = {
            "Accept": 'application/json',
            "Authorization": `Bearer ${authToken}`
        };

        let data = {
            'userId': props.userId
            // 'likeCount': currentUserClicks
        };

        axios.post(url, data, {headers})
            .then(resp => {
                console.log(resp.data);
                // setUserLike(resp.data.incrementDecrementLikes);
            }).catch(err => {
            console.log(err);
        });

    };

    return(
        <>
            <div className="card_image">
                <img src={props.src} alt="Photo" className="gallery-img" onClick={() => props.onClick(handleLikesBasedOnUserId)}/>
            </div>
        </>
    );
}

export default CurrentUserClicks;
