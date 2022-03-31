import React, { useState } from 'react';
// import '../../../sass/gallery/gallery.scss';

const SelectedWinners = (props) => {
    const [likes, setLikes] = useState(props.likes);

    const createUserPhotoNodes = () => {
        return (
            <>
                <img src={props.src} alt="WinnerPhoto" className="gallery-img"/>
                <div className="userData">
                    <h2 className="userName">{props.userName}</h2>
                    <span style={{display: 'none'}}>{props.currentUserClicks}</span>
                    <h2 className="likes">Likes {likes}</h2>
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
